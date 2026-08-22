"use client";

import React from 'react';
import { Target, Eye, Heart } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const PILLARS = [
  {
    icon: Target,
    label: 'Our Mission',
    heading: 'Make certification-grade expertise accessible to every workforce.',
    description:
      'To transform how organizations build technical capability — delivering official, vendor-aligned training that turns learning hours into job-ready, certified skills.',
  },
  {
    icon: Eye,
    label: 'Our Vision',
    heading: 'To be the most trusted enterprise learning partner in the world.',
    description:
      'We envision a future where every technology professional has a clear, guided, and verifiable path from foundational knowledge to expert-level certification.',
  },
  {
    icon: Heart,
    label: 'Our Values',
    heading: 'Integrity, mastery, and outcomes over shortcuts.',
    description:
      'We stand behind official courseware and genuine outcomes — real instructors, real labs, real exam readiness, and honest reporting to every client we serve.',
  },
];

export const MissionVisionValuesSection: React.FC = () => {
  const containerRef = useScrollReveal({ y: 40, duration: 0.8, stagger: 0.1 });

  return (
    <section id="mission-vision-values" className="py-20 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
      <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 gsap-reveal">
          <span className="text-[#0B5198] dark:text-sky-400 font-bold text-sm uppercase tracking-wider block mb-2">
            What Drives Us
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A2540] dark:text-white tracking-tight">
            Mission, Vision & Values
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.label}
                className="gsap-reveal bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all duration-300 p-8 flex flex-col"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0B5198] to-[#0088FF] text-white flex items-center justify-center mb-6 shadow-md">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-[#0B5198] dark:text-sky-400 font-bold text-xs uppercase tracking-wider mb-2">
                  {pillar.label}
                </span>
                <h3 className="text-lg font-bold text-[#0A2540] dark:text-white mb-3 leading-snug">
                  {pillar.heading}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
