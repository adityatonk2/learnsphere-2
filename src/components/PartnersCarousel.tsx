"use client";

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useScrollReveal } from '../hooks/useScrollReveal';

const COMPANY_LOGOS = [
  { id: 'aws', name: 'AWS', file: 'aws.png' },
  { id: 'microsoft', name: 'Microsoft', file: 'microsoft.png' },
  { id: 'google', name: 'Google', file: 'google.png' },
  { id: 'oracle', name: 'Oracle', file: 'oracle.png' },
  { id: 'dell', name: 'Dell', file: 'dell.png' },
  { id: 'hp', name: 'HP', file: 'hp.png' },
  { id: 'cognizant', name: 'Cognizant', file: 'cognizant.png' },
  { id: 'pwc', name: 'PwC', file: 'pwc.png' },
];

const LOOP_LOGOS = [...COMPANY_LOGOS, ...COMPANY_LOGOS];

export const PartnersCarousel: React.FC = () => {
  const containerRef = useScrollReveal({ y: 30, duration: 0.7 });
  const t = useTranslations('Partners');

  return (
    <section className="py-16 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
      <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 gsap-reveal">
        <p className="text-center text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-100 mb-10">
          {t('heading')}
        </p>
      </div>

      <div className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex w-max animate-marquee-left gap-6 group-hover:[animation-play-state:paused]">
          {LOOP_LOGOS.map((logo, i) => (
            <div
              key={`${logo.id}-${i}`}
              className="shrink-0 w-40 h-24 rounded-xl border border-slate-200 dark:border-slate-700 bg-white flex items-center justify-center p-4 shadow-sm"
            >
              <Image
                src={`/assets/images/companies/${logo.file}`}
                alt={logo.name}
                width={140}
                height={70}
                className="object-contain max-h-16 w-auto"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
