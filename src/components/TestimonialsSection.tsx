"use client";

import React from 'react';
import { Star, ShieldCheck } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useScrollReveal } from '../hooks/useScrollReveal';

/**
 * PLACEHOLDER DATA — replace before launch.
 * The client checklist explicitly requires genuine testimonials with real
 * names, ratings, and comments (no fabricated identities). Until verified
 * reviews are collected, entries below use anonymized role labels instead
 * of invented names. Wire this array to the admin panel / CMS once built
 * so testimonials can be added and moderated without a code deploy.
 */
const TESTIMONIALS = [
  { id: 'ldManager', rating: 5 },
  { id: 'itDirector', rating: 5 },
  { id: 'individualLearner', rating: 4 },
];

export const TestimonialsSection: React.FC = () => {
  const containerRef = useScrollReveal({ y: 40, duration: 0.8, stagger: 0.1 });
  const t = useTranslations('Testimonials');

  return (
    <section id="testimonials" className="py-20 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
      <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 gsap-reveal">
          <span className="text-[#0B5198] dark:text-sky-400 font-bold text-sm uppercase tracking-wider block mb-2">
            {t('eyebrow')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A2540] dark:text-white tracking-tight">
            {t('heading')}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-base mt-3 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            {t('subheading')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="gsap-reveal bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all duration-300 p-7 flex flex-col"
            >
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < item.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-200'}`}
                  />
                ))}
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed flex-1">
                "{t(`items.${item.id}.comment`)}"
              </p>
              <p className="text-xs font-semibold text-[#0B5198] dark:text-sky-400 mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
                {t(`items.${item.id}.role`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
