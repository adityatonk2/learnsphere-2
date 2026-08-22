"use client";

import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { Search, X, GraduationCap, Compass, Layers, CornerDownLeft, ArrowUp, ArrowDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { LEARNING_OPTIONS } from '../data/coursesData';
import { CATALOG } from '../data/courseContent';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Scrolls the page to the given section id (reuses Header's scrollToSection). */
  onNavigate: (sectionId: string) => void;
}

type ResultKind = 'Course' | 'Section' | 'Learning';

interface SearchItem {
  id: string;
  kind: ResultKind;
  label: string;
  sub: string;
  target: string;       // section id to scroll to
  href?: string;        // if set, navigate to this route instead of scrolling
  searchText: string;   // pre-lowercased haystack
  popular?: boolean;
}

const SECTIONS: Omit<SearchItem, 'searchText'>[] = [
  { id: 'sec-home', kind: 'Section', label: 'Home', sub: 'Back to the top', target: 'home' },
  { id: 'sec-solutions', kind: 'Section', label: 'Solutions', sub: 'Enterprise learning solutions', target: 'solutions' },
  { id: 'sec-why-us', kind: 'Section', label: 'Why NexMentor Solutions', sub: 'What sets us apart', target: 'why-us' },
  { id: 'sec-training', kind: 'Section', label: 'Training Modes', sub: 'Flexible delivery formats', target: 'training-modes' },
  { id: 'sec-courses', kind: 'Section', label: 'Top Technology Courses', sub: 'Full certification directory', target: 'courses' },
  { id: 'sec-leadership', kind: 'Section', label: 'Leadership', sub: 'Meet the founders', target: 'leadership' },
  { id: 'sec-mvv', kind: 'Section', label: 'Mission, Vision & Values', sub: 'What we stand for', target: 'mission-vision-values' },
  { id: 'sec-testimonials', kind: 'Section', label: 'Testimonials', sub: 'Learner & client feedback', target: 'testimonials' },
  { id: 'sec-about', kind: 'Section', label: 'About Us', sub: 'Company overview', target: 'about' },
];

const KIND_META: Record<ResultKind, { icon: React.ElementType; badge: string; badgeClass: string }> = {
  Course: { icon: GraduationCap, badge: 'Course', badgeClass: 'bg-sky-50 dark:bg-slate-800 text-[#0B5198] dark:text-sky-400' },
  Section: { icon: Compass, badge: 'Page', badgeClass: 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400' },
  Learning: { icon: Layers, badge: 'Learning', badgeClass: 'bg-indigo-50 text-indigo-600' },
};

// Build the full search index once from the site's data.
function buildIndex(): SearchItem[] {
  const courses: SearchItem[] = CATALOG.map((c) => {
    const sub = [c.vendorName, c.code, c.level, c.duration].filter(Boolean).join(' · ');
    return {
      id: `course-${c.id}`,
      kind: 'Course' as const,
      label: c.title,
      sub,
      target: 'courses',
      href: `/courses/${c.slug}`,
      popular: c.popular,
      searchText: `${c.title} ${c.code ?? ''} ${c.level ?? ''} ${c.domain ?? ''} ${c.vendorName}`.toLowerCase(),
    };
  });

  const sections: SearchItem[] = SECTIONS.map((s) => ({
    ...s,
    searchText: `${s.label} ${s.sub}`.toLowerCase(),
  }));

  const learning: SearchItem[] = LEARNING_OPTIONS.map((opt, i) => ({
    id: `learn-${i}`,
    kind: 'Learning' as const,
    label: opt,
    sub: 'Learning option',
    target: opt === 'MentorQuiz' ? 'courses' : 'training-modes',
    searchText: opt.toLowerCase(),
  }));

  return [...courses, ...sections, ...learning];
}

function scoreItem(item: SearchItem, q: string): number {
  const idx = item.searchText.indexOf(q);
  if (idx === -1) return -1;
  const labelLower = item.label.toLowerCase();
  if (labelLower.startsWith(q)) return 3;
  if (labelLower.includes(q)) return 2;
  return 1; // matched only on code/level/vendor/sub
}

// Splits a label so the matched span can be highlighted.
function highlight(label: string, q: string): React.ReactNode {
  if (!q) return label;
  const lower = label.toLowerCase();
  const idx = lower.indexOf(q);
  if (idx === -1) return label;
  return (
    <>
      {label.slice(0, idx)}
      <mark className="bg-sky-100 dark:bg-sky-900/40 text-[#0B5198] dark:text-sky-400 rounded-sm px-0.5">{label.slice(idx, idx + q.length)}</mark>
      {label.slice(idx + q.length)}
    </>
  );
}

const KIND_ORDER: ResultKind[] = ['Course', 'Section', 'Learning'];
const PER_KIND_CAP: Record<ResultKind, number> = { Course: 7, Section: 6, Learning: 6 };

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const index = useMemo(buildIndex, []);
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const q = query.trim().toLowerCase();

  // Grouped + capped results. Empty query shows quick links + popular courses.
  const grouped = useMemo(() => {
    let pool: SearchItem[];
    if (!q) {
      pool = [
        ...index.filter((i) => i.kind === 'Course' && i.popular),
        ...index.filter((i) => i.kind === 'Section'),
      ];
    } else {
      pool = index
        .map((i) => ({ i, s: scoreItem(i, q) }))
        .filter((x) => x.s >= 0)
        .sort((a, b) => b.s - a.s || a.i.label.localeCompare(b.i.label))
        .map((x) => x.i);
    }

    const out: { kind: ResultKind; items: SearchItem[] }[] = [];
    for (const kind of KIND_ORDER) {
      const items = pool.filter((i) => i.kind === kind).slice(0, PER_KIND_CAP[kind]);
      if (items.length) out.push({ kind, items });
    }
    return out;
  }, [index, q]);

  // Flat ordered list for keyboard navigation.
  const flat = useMemo(() => grouped.flatMap((g) => g.items), [grouped]);

  // Reset highlight whenever the result set changes.
  useEffect(() => setActiveIdx(0), [q, isOpen]);

  const handleSelect = useCallback(
    (item: SearchItem) => {
      if (item.href) {
        router.push(item.href);
      } else {
        onNavigate(item.target);
      }
      onClose();
      setQuery('');
    },
    [onNavigate, onClose, router]
  );

  // Focus the input when the palette opens.
  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => inputRef.current?.focus(), 20);
      return () => clearTimeout(t);
    }
    setQuery('');
  }, [isOpen]);

  // Keyboard handling while open.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIdx((i) => Math.min(i + 1, Math.max(flat.length - 1, 0)));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIdx((i) => Math.max(i - 1, 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const item = flat[activeIdx];
        if (item) handleSelect(item);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, flat, activeIdx, onClose, handleSelect]);

  // Keep the highlighted row scrolled into view.
  useEffect(() => {
    if (!isOpen || !listRef.current) return;
    const el = listRef.current.querySelector<HTMLElement>(`[data-idx="${activeIdx}"]`);
    el?.scrollIntoView({ block: 'nearest' });
  }, [activeIdx, isOpen]);

  if (!isOpen) return null;

  let runningIdx = -1; // maps grouped rows back to flat index for keyboard sync

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[12vh] sm:pt-[15vh]"
      role="dialog"
      aria-modal="true"
      aria-label="Search NexMentor Solutions"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm nx-fade-in"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden nx-pop-in">
        <div className="h-1 w-full bg-gradient-to-r from-[#003B73] via-[#0B5198] to-[#00A3FF]" />

        {/* Input row */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-100 dark:border-slate-800">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search courses, certifications, pages…"
            className="flex-1 bg-transparent outline-none text-[15px] text-slate-800 dark:text-slate-100 placeholder:text-slate-400"
            autoComplete="off"
            spellCheck={false}
            aria-label="Search"
          />
          <button
            onClick={onClose}
            className="shrink-0 p-1.5 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B5198]"
            aria-label="Close search"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results */}
        <div ref={listRef} className="max-h-[52vh] overflow-y-auto py-2">
          {flat.length === 0 ? (
            <div className="px-5 py-10 text-center">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                No matches for <span className="font-semibold text-slate-700 dark:text-slate-200">“{query}”</span>
              </p>
              <p className="text-xs text-slate-400 mt-1">Try a vendor (AWS, CISSP), a topic, or a page name.</p>
            </div>
          ) : (
            grouped.map((group) => {
              const Meta = KIND_META[group.kind];
              return (
                <div key={group.kind} className="mb-1">
                  <div className="px-4 pt-2 pb-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    {group.kind === 'Course' ? 'Courses' : group.kind === 'Section' ? 'Pages' : 'Learning Options'}
                  </div>
                  {group.items.map((item) => {
                    runningIdx += 1;
                    const idx = runningIdx;
                    const isActive = idx === activeIdx;
                    const Icon = Meta.icon;
                    return (
                      <button
                        key={item.id}
                        data-idx={idx}
                        onClick={() => handleSelect(item)}
                        onMouseMove={() => setActiveIdx(idx)}
                        className={`w-full text-left px-4 py-2.5 flex items-center gap-3 transition-colors ${
                          isActive ? 'bg-sky-50 dark:bg-slate-800' : 'hover:bg-slate-50 dark:hover:bg-slate-800'
                        }`}
                      >
                        <span
                          className={`shrink-0 w-9 h-9 rounded-lg flex items-center justify-center ${
                            isActive ? 'bg-white dark:bg-slate-900 text-[#0B5198] dark:text-sky-400 shadow-sm' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                          }`}
                        >
                          <Icon className="w-4.5 h-4.5" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-medium text-slate-800 dark:text-slate-100 truncate">
                            {highlight(item.label, q)}
                          </span>
                          <span className="block text-xs text-slate-400 truncate">{item.sub}</span>
                        </span>
                        <span
                          className={`shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full ${Meta.badgeClass}`}
                        >
                          {Meta.badge}
                        </span>
                      </button>
                    );
                  })}
                </div>
              );
            })
          )}
        </div>

        {/* Footer hint bar */}
        <div className="hidden sm:flex items-center gap-4 px-4 py-2.5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 text-[11px] text-slate-400">
          <span className="flex items-center gap-1.5">
            <kbd className="inline-flex items-center gap-0.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded px-1.5 py-0.5">
              <ArrowUp className="w-3 h-3" />
              <ArrowDown className="w-3 h-3" />
            </kbd>
            navigate
          </span>
          <span className="flex items-center gap-1.5">
            <kbd className="inline-flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded px-1.5 py-0.5">
              <CornerDownLeft className="w-3 h-3" />
            </kbd>
            open
          </span>
          <span className="flex items-center gap-1.5">
            <kbd className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded px-1.5 py-0.5 font-sans">esc</kbd>
            close
          </span>
          <span className="ml-auto">{flat.length} result{flat.length === 1 ? '' : 's'}</span>
        </div>
      </div>
    </div>
  );
};
