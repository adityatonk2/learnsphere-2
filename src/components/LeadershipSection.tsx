"use client";

import React from 'react';
import { Quote } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useScrollReveal } from '../hooks/useScrollReveal';

// NOTE: initials are shown as a placeholder for any leader without a photo yet.
const LEADERS = [
  {
    id: 'tarunSharma',
    name: 'Tarun Sharma',
    initials: 'TS',
    photo: '/assets/images/leadership/tarun-sharma.jpg' as string | null,
  },
];

export const LeadershipSection: React.FC = () => {
  const containerRef = useScrollReveal({ y: 40, duration: 0.8, stagger: 0.12 });
  const t = useTranslations('Leadership');

  return (
    <section id="leadership" className="py-20 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
      <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 gsap-reveal">
          <span className="text-[#0B5198] dark:text-sky-400 font-bold text-sm uppercase tracking-wider block mb-2">
            {t('eyebrow')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A2540] dark:text-white tracking-tight">
            {t('heading')}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 max-w-sm mx-auto">
          {LEADERS.map((leader) => (
            <div
              key={leader.id}
              className="gsap-reveal bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 flex flex-col items-center text-center hover:shadow-lg transition-all duration-300"
            >
              {/* Circular photo frame */}
              <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-[#003B73] via-[#0B5198] to-[#0088FF] p-1 shadow-md mb-5">
                <div className="w-full h-full rounded-full bg-white dark:bg-slate-900 flex items-center justify-center overflow-hidden">
                  {leader.photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={leader.photo} alt={leader.name} className="w-full h-full object-cover rounded-full" />
                  ) : (
                    <span className="text-2xl font-black text-[#0B5198] dark:text-sky-400">{leader.initials}</span>
                  )}
                </div>
              </div>

              <h3 className="text-lg font-bold text-[#0A2540] dark:text-white">{leader.name}</h3>
              <p className="text-sm font-semibold text-[#0B5198] dark:text-sky-400 mb-4">
                {t(`leaders.${leader.id}.role`)}
              </p>

              <div className="relative">
                <Quote className="w-6 h-6 text-sky-200 absolute -top-3 -left-4" />
                <p className="text-sm text-slate-600 dark:text-slate-300 italic leading-relaxed px-2">
                  "{t(`leaders.${leader.id}.quote`)}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
