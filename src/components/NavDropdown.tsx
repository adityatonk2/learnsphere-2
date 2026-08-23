"use client";

import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';

export interface NavDropdownItem {
  id: string;
  label: string;
  href: string;
  count?: number;
}

interface NavDropdownProps {
  label: string;
  active: boolean;
  items: NavDropdownItem[];
  exploreAllLabel: string;
  exploreAllHref: string;
  variant?: 'list' | 'grid';
  panelHeading?: string;
  countLabel?: (count: number) => string;
}

export const NavDropdown: React.FC<NavDropdownProps> = ({
  label,
  active,
  items,
  exploreAllLabel,
  exploreAllHref,
  variant = 'list',
  panelHeading,
  countLabel,
}) => {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), 150);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) setOpen(false);
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative"
      onMouseEnter={() => {
        cancelClose();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        className={`flex items-center gap-1 text-sm font-medium transition-colors relative py-2 ${
          active
            ? 'text-[#0B5198] dark:text-sky-400 font-semibold'
            : 'text-slate-700 dark:text-slate-200 hover:text-[#0B5198] dark:hover:text-sky-400'
        }`}
      >
        {label}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? 'rotate-180' : ''}`} />
        {active && (
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#0B5198] dark:bg-sky-400 rounded-full" />
        )}
      </button>

      {open && variant === 'grid' && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[90vw] max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden z-50">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950/40">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{panelHeading}</span>
            <Link
              href={exploreAllHref}
              onClick={() => setOpen(false)}
              className="flex items-center gap-1.5 text-sm font-semibold text-[#0B5198] dark:text-sky-400 hover:gap-2 transition-all"
            >
              {exploreAllLabel}
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-4 max-h-[420px] overflow-y-auto">
            {items.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setOpen(false)}
                className="group flex items-center gap-3 p-3 rounded-xl border border-transparent hover:border-sky-100 dark:hover:border-sky-900/50 hover:bg-sky-50/60 dark:hover:bg-slate-800 transition-all"
              >
                <div className="w-9 h-9 shrink-0 rounded-lg bg-sky-50 dark:bg-slate-800 text-[#0B5198] dark:text-sky-400 flex items-center justify-center font-bold text-sm border border-sky-100 dark:border-sky-900/50 group-hover:scale-105 transition-transform">
                  {item.label.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate group-hover:text-[#0B5198] dark:group-hover:text-sky-400 transition-colors">
                    {item.label}
                  </p>
                  {typeof item.count === 'number' && (
                    <p className="text-[11px] text-slate-400">{countLabel ? countLabel(item.count) : item.count}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {open && variant === 'list' && (
        <div className="absolute top-full left-0 mt-1 w-64 max-h-96 overflow-y-auto bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-100 dark:border-slate-800 py-2 z-50">
          <Link
            href={exploreAllHref}
            onClick={() => setOpen(false)}
            className="block px-4 py-2.5 text-sm font-semibold text-[#0B5198] dark:text-sky-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border-b border-slate-100 dark:border-slate-800 mb-1"
          >
            {exploreAllLabel}
          </Link>
          {items.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-[#0B5198] dark:hover:text-sky-400 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
