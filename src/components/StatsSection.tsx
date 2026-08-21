"use client";

import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { StatCounter } from './StatCounter';

// NOTE: these figures are placeholders. Wire to the admin panel once built
// so the numbers stay accurate and editable without a code deploy.
const BUSINESS_STATS = [
  { target: 100, suffix: 'k+', decimals: 0, label: 'Students Trained' },
  { target: 25, suffix: 'k+', decimals: 0, label: 'Employees Trained' },
  { target: 500, suffix: '+', decimals: 0, label: 'Courses Offered' },
  { target: 40, suffix: '+', decimals: 0, label: 'Certification Vendors' },
  { target: 98, suffix: '%', decimals: 0, label: 'Successful Learners' },
  { target: 40, suffix: '+', decimals: 0, label: 'Countries Served' },
];

export const StatsSection: React.FC = () => {
  const containerRef = useScrollReveal({ y: 30, duration: 0.7, stagger: 0.08 });

  return (
    <section className="py-16 bg-[#0A2540] border-t border-slate-800">
      <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
          {BUSINESS_STATS.map((stat) => (
            <div key={stat.label} className="gsap-reveal text-center">
              <StatCounter
                target={stat.target}
                suffix={stat.suffix}
                decimals={stat.decimals}
                label={stat.label}
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
