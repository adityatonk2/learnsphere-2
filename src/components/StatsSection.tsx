"use client";

import React from 'react';
import { useTranslations } from 'next-intl';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { StatCounter } from './StatCounter';

const STAT_CONFIG = [
  { key: 'studentsTrained', target: 100, suffix: 'k+', decimals: 0 },
  { key: 'employeesTrained', target: 25, suffix: 'k+', decimals: 0 },
  { key: 'coursesOffered', target: 500, suffix: '+', decimals: 0 },
  { key: 'certificationVendors', target: 40, suffix: '+', decimals: 0 },
  { key: 'successfulLearners', target: 98, suffix: '%', decimals: 0 },
  { key: 'countriesServed', target: 195, suffix: '+', decimals: 0 },
];

export const StatsSection: React.FC = () => {
  const containerRef = useScrollReveal({ y: 30, duration: 0.7, stagger: 0.08 });
  const t = useTranslations('Stats');

  return (
    <section className="py-16 bg-[#0A2540] border-t border-slate-800">
      <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
          {STAT_CONFIG.map((stat) => (
            <div key={stat.key} className="gsap-reveal text-center">
              <StatCounter
                target={stat.target}
                suffix={stat.suffix}
                decimals={stat.decimals}
                label={t(stat.key)}
                valueClassName="text-3xl sm:text-4xl font-black text-white block"
                labelClassName="text-xs sm:text-sm text-sky-200 mt-1 block"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
