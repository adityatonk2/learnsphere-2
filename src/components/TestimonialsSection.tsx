"use client";

import React from 'react';
import { Star, ShieldCheck, Quote } from 'lucide-react';
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
const COLUMNS: { id: string; rating: number }[][] = [
  [
    { id: 'ldManager', rating: 5 },
    { id: 'dataScienceManager', rating: 5 },
    { id: 'solutionsConsultant', rating: 4 },
  ],
  [
    { id: 'itDirector', rating: 5 },
    { id: 'hrPartner', rating: 5 },
    { id: 'networkSecurityLead', rating: 4 },
  ],
  [
    { id: 'individualLearner', rating: 4 },
    { id: 'devopsLead', rating: 5 },
    { id: 'programManager', rating: 5 },
  ],
];

const COLUMN_ANIMATION = ['animate-marquee-up', 'animate-marquee-down', 'animate-marquee-up-slow'];

const TestimonialCard: React.FC<{ id: string; rating: number; t: ReturnType<typeof useTranslations> }> = ({ id, rating, t }) => (
  <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg hover:border-sky-200 dark:hover:border-sky-900/50 transition-all duration-300 p-6">
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-3.5 h-3.5 ${i < rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200 dark:text-slate-700 fill-slate-200 dark:fill-slate-700'}`}
          />
        ))}
      </div>
      <Quote className="w-5 h-5 text-sky-100 dark:text-slate-800" />
    </div>
    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
      "{t(`items.${id}.comment`)}"
    </p>
    <p className="text-xs font-semibold text-[#0B5198] dark:text-sky-400 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
      {t(`items.${id}.role`)}
    </p>
  </div>
);

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 gsap-reveal">
          {COLUMNS.map((column, colIndex) => (
            <div
              key={colIndex}
              className="group relative h-[560px] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_8%,black_92%,transparent)]"
            >
              <div className={`flex flex-col gap-6 ${COLUMN_ANIMATION[colIndex]} group-hover:[animation-play-state:paused] motion-reduce:animate-none`}>
                {[...column, ...column].map((item, i) => (
                  <TestimonialCard key={`${item.id}-${i}`} id={item.id} rating={item.rating} t={t} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
