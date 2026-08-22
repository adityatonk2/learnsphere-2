"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft, Clock, BarChart3, Layers, Award, CheckCircle2, GraduationCap,
  Users, ChevronRight, Home, Sparkles, ShieldCheck, Calendar,
} from 'lucide-react';
import { Header } from './Header';
import { Footer } from './Footer';
import { ContactModal } from './ContactModal';
import type { CatalogCourse, CourseContent } from '../data/courseContent';

interface CoursePageClientProps {
  course: CatalogCourse;
  content: CourseContent;
  related: CatalogCourse[];
}

export const CoursePageClient: React.FC<CoursePageClientProps> = ({ course, content, related }) => {
  const [active, setActive] = useState('courses');
  const [contactOpen, setContactOpen] = useState(false);
  const [subject, setSubject] = useState('');

  const openEnroll = (s: string) => {
    setSubject(s);
    setContactOpen(true);
  };

  const facts = [
    course.duration && { icon: Clock, label: 'Duration', value: course.duration },
    course.level && { icon: BarChart3, label: 'Level', value: course.level },
    course.domain && { icon: Layers, label: 'Domain', value: course.domain },
    course.code && { icon: Award, label: 'Exam Code', value: course.code },
  ].filter(Boolean) as { icon: React.ElementType; label: string; value: string }[];

  // Course structured data for SEO.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description: content.overview,
    provider: { '@type': 'Organization', name: 'NexMentor Solutions' },
    ...(course.vendorName ? { brand: course.vendorName } : {}),
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans">
      <Header onOpenContact={(s) => openEnroll(s || 'Course Enquiry')} activeSection={active} setActiveSection={setActive} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#0A2540] via-[#0B3A6B] to-[#0B5198] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '28px 28px' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-sky-200/80 mb-6 flex-wrap" aria-label="Breadcrumb">
            <Link href="/" className="flex items-center gap-1 hover:text-white transition-colors">
              <Home className="w-3.5 h-3.5" /> Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            <Link href="/#courses" className="hover:text-white transition-colors">Courses</Link>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            <span className="text-sky-100/70">{course.vendorName}</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider bg-white/10 border border-white/15 px-3 py-1 rounded-full">
                <GraduationCap className="w-3.5 h-3.5 text-[#00A3FF]" />
                {course.vendorName} {course.domain ? `· ${course.domain}` : 'Training'}
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold leading-tight mt-4">
                {course.title}
              </h1>
              {course.code && (
                <p className="text-sky-200 mt-2 text-sm font-mono">Exam / Track: <span className="font-semibold text-white">{course.code}</span></p>
              )}

              <div className="flex flex-wrap gap-2.5 mt-6">
                {facts.map((f) => (
                  <span key={f.label} className="inline-flex items-center gap-1.5 text-sm bg-white/10 border border-white/15 rounded-lg px-3 py-1.5">
                    <f.icon className="w-4 h-4 text-[#00A3FF]" />
                    <span className="text-sky-100/80">{f.label}:</span>
                    <span className="font-semibold">{f.value}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3 shrink-0 w-full lg:w-auto">
              <button
                onClick={() => openEnroll(`Enrollment: ${course.title}`)}
                className="bg-[#00A3FF] hover:bg-[#0088FF] text-white px-7 py-3.5 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <Calendar className="w-5 h-5" /> Enroll / Request Schedule
              </button>
              <button
                onClick={() => openEnroll(`Advisor call: ${course.title}`)}
                className="bg-white/10 hover:bg-white/15 border border-white/20 text-white px-7 py-3 rounded-xl font-semibold transition-all"
              >
                Talk to a Course Advisor
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main */}
        <main className="lg:col-span-8 space-y-10">
          <section>
            <h2 className="text-2xl font-bold text-[#0A2540] dark:text-white mb-3">Course overview</h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{content.overview}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0A2540] dark:text-white mb-4">What you'll learn</h2>
            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
              {content.outcomes.map((o, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700 dark:text-slate-200 leading-snug">{o}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="grid sm:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-bold text-[#0A2540] dark:text-white mb-3 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#0B5198] dark:text-sky-400" /> Prerequisites
              </h3>
              <ul className="space-y-2">
                {content.prerequisites.map((p, i) => (
                  <li key={i} className="text-sm text-slate-600 dark:text-slate-300 flex items-start gap-2">
                    <span className="text-[#0B5198] dark:text-sky-400 mt-1">•</span> {p}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#0A2540] dark:text-white mb-3 flex items-center gap-2">
                <Users className="w-5 h-5 text-[#0B5198] dark:text-sky-400" /> Who should attend
              </h3>
              <ul className="space-y-2">
                {content.audience.map((a, i) => (
                  <li key={i} className="text-sm text-slate-600 dark:text-slate-300 flex items-start gap-2">
                    <span className="text-[#0B5198] dark:text-sky-400 mt-1">•</span> {a}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="bg-sky-50/60 border border-sky-100 dark:border-sky-900/50 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-[#0A2540] dark:text-white mb-3 flex items-center gap-2">
              <Award className="w-5 h-5 text-[#0B5198] dark:text-sky-400" /> Certification
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">{content.certification}</p>
          </section>
        </main>

        {/* Sidebar */}
        <aside className="lg:col-span-4">
          <div className="lg:sticky lg:top-28 space-y-6">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
              <div className="h-1.5 bg-gradient-to-r from-[#0B5198] to-[#00A3FF]" />
              <div className="p-6 space-y-5">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">This program includes</span>
                  <ul className="mt-3 space-y-2.5">
                    {content.includes.map((inc, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> {inc}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-slate-100 dark:border-slate-800 pt-5">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Delivery formats</span>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {content.formats.map((f) => (
                      <span key={f} className="text-xs font-medium text-[#0B5198] dark:text-sky-400 bg-sky-50 dark:bg-slate-800 border border-sky-100 dark:border-sky-900/50 px-2.5 py-1 rounded-full">{f}</span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => openEnroll(`Enrollment: ${course.title}`)}
                  className="w-full bg-[#0052CC] hover:bg-[#003B99] text-white py-3.5 rounded-xl font-bold shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" /> Get schedule & pricing
                </button>
                <p className="text-[11px] text-slate-400 text-center">A NexMentor advisor replies within 2 business hours.</p>
              </div>
            </div>

            <Link
              href="/#courses"
              className="flex items-center justify-center gap-2 text-sm font-semibold text-[#0B5198] dark:text-sky-400 hover:text-[#003B99] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to full course directory
            </Link>
          </div>
        </aside>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-2xl font-bold text-[#0A2540] dark:text-white mb-6">Related {course.vendorName} courses</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/courses/${r.slug}`}
                  className="group bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 hover:border-sky-200 hover:shadow-md transition-all flex flex-col"
                >
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">{r.domain || r.vendorName}</span>
                  <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100 group-hover:text-[#0B5198] transition-colors mt-1.5 leading-snug flex-1">{r.title}</h3>
                  <div className="flex items-center justify-between mt-4 text-xs text-slate-500 dark:text-slate-400">
                    <span>{r.level || 'Training'}</span>
                    <span className="flex items-center gap-1 text-[#0B5198] dark:text-sky-400 font-semibold group-hover:gap-1.5 transition-all">View <ChevronRight className="w-3.5 h-3.5" /></span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer onOpenContact={() => openEnroll('Course Enquiry')} setActiveSection={setActive} />

      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} defaultSubject={subject} />
    </div>
  );
};
