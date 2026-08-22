"use client";

import React from 'react';
import { ShieldCheck, Users2, Globe2, Clock, Award, Headset } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useScrollReveal } from '../hooks/useScrollReveal';

const REASON_ICONS = [ShieldCheck, Users2, Globe2, Clock, Award, Headset];

export const WhyUsSection: React.FC = () => {
  const containerRef = useScrollReveal({ y: 40, duration: 0.8, stagger: 0.08 });
  const t = useTranslations('WhyUs');
  const reasons = t.raw('reasons') as { title: string; description: string }[];

  return (
    <section id="why-us" className="py-20 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
      <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 gsap-reveal">
          <span className="text-[#0B5198] dark:text-sky-400 font-bold text-sm uppercase tracking-wider block mb-2">
            {t('eyebrow')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A2540] dark:text-white tracking-tight">
            {t('heading')}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-base mt-3">
            {t('subheading')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, idx) => {
            const Icon = REASON_ICONS[idx];
            return (
              <div
                key={reason.title}
                className="gsap-reveal group p-7 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-sky-50/40 hover:border-sky-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-sky-50 dark:bg-slate-800 text-[#0B5198] dark:text-sky-400 flex items-center justify-center border border-sky-100 dark:border-sky-900/50 group-hover:bg-[#0B5198] group-hover:text-white transition-colors mb-5">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-[#0A2540] dark:text-white mb-2">{reason.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{reason.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
