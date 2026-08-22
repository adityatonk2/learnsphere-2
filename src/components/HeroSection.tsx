"use client";

import React from 'react';
import { ArrowRight, Award } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { StatCounter } from './StatCounter';

interface HeroSectionProps {
  onOpenContact: () => void;
  onExploreCourses: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenContact, onExploreCourses }) => {
  const containerRef = useScrollReveal({ y: 30, duration: 1, stagger: 0.1 });
  const t = useTranslations('Hero');
  const tCommon = useTranslations('Common');

  return (
    <section id="home" className="relative bg-slate-900 overflow-hidden text-white">
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/images/hero_learning_team_1786357207634.jpg"
          alt="Corporate learning team"
          fill
          className="object-cover object-center scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#031d38] via-[#083b6e]/90 to-[#0b5198]/40 md:to-transparent" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-slate-950/20 to-slate-950/60" />
      </div>

      <div ref={containerRef} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-36 min-h-[560px] flex flex-col justify-center">
        <div className="max-w-2xl space-y-6 gsap-reveal">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-xs font-semibold text-sky-200 shadow-sm gsap-reveal">
            <Award className="w-3.5 h-3.5 text-sky-400" />
            <span>{t('badge')}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.12]">
            {t('headlineLine1')} <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-200 via-blue-100 to-white">
              {t('headlineLine2')}
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-sky-100/90 font-light max-w-xl leading-relaxed">
            {t('subtitle')}
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-4 gsap-reveal">
            <button
              onClick={onOpenContact}
              className="bg-[#0052CC] hover:bg-[#003B99] text-white px-8 py-3.5 rounded-lg text-base font-bold shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 group"
            >
              <span>{tCommon('getStarted')}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onExploreCourses}
              className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-md px-6 py-3.5 rounded-lg text-base font-semibold border border-white/30 hover:border-white/50 transition-all flex items-center gap-2"
            >
              <span>{t('browseCatalog')}</span>
            </button>
          </div>

          <div className="pt-8 grid grid-cols-3 gap-4 border-t border-white/15 max-w-lg gsap-reveal">
            <StatCounter target={500} suffix="+" label={t('statCourses')} />
            <StatCounter target={100} suffix="k+" label={t('statEmployees')} />
            <StatCounter target={99.4} decimals={1} suffix="%" label={t('statPassRate')} />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-slate-50 to-transparent z-10" />
    </section>
  );
};
