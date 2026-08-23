"use client";

import React from 'react';
import { Search, SlidersHorizontal, GraduationCap, TrendingUp, ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useScrollReveal } from '../hooks/useScrollReveal';

const STAGES = [
  { id: 'recognise', letter: 'R', icon: Search },
  { id: 'individualise', letter: 'I', icon: SlidersHorizontal },
  { id: 'skill', letter: 'S', icon: GraduationCap },
  { id: 'elevate', letter: 'E', icon: TrendingUp },
] as const;

export const RiseFrameworkSection: React.FC = () => {
  const containerRef = useScrollReveal({ y: 40, duration: 0.8, stagger: 0.1 });
  const t = useTranslations('RiseFramework');
  const journeySteps = t.raw('journey.steps') as string[];

  return (
    <section className="py-16 bg-[#04101F] relative overflow-hidden">
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />

      <div ref={containerRef} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 gsap-reveal">
          <span className="text-sky-400 font-bold text-xs uppercase tracking-wider block mb-1.5">{t('eyebrow')}</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">{t('heading')}</h2>
          <p className="text-base font-semibold text-sky-300 mb-2">{t('subheading')}</p>
          <p className="text-slate-400 text-xs leading-relaxed">{t('description')}</p>
        </div>

        {/* Stage cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {STAGES.map((stage) => {
            const Icon = stage.icon;
            const tags = t.raw(`stages.${stage.id}.tags`) as string[];
            return (
              <div
                key={stage.id}
                className="gsap-reveal relative rounded-xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm p-4 overflow-hidden hover:border-sky-900/60 transition-colors"
              >
                <span className="absolute -bottom-2 -right-1 text-6xl font-black text-white/5 select-none leading-none">
                  {stage.letter}
                </span>
                <div className="relative z-10">
                  <div className="w-9 h-9 rounded-lg bg-sky-500/10 border border-sky-800/50 text-sky-400 flex items-center justify-center mb-3">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-extrabold text-white mb-0.5">
                    {stage.letter} — {t(`stages.${stage.id}.title`)}
                  </h3>
                  <p className="text-xs font-semibold text-sky-400 mb-2">{t(`stages.${stage.id}.subtitle`)}</p>
                  <p className="text-xs text-slate-400 leading-relaxed mb-3 line-clamp-4">{t(`stages.${stage.id}.description`)}</p>
                  <div className="flex flex-wrap gap-1">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-medium text-sky-300 bg-sky-950/60 border border-sky-900/50 px-1.5 py-0.5 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* RISE Journey flow */}
        <div className="gsap-reveal rounded-xl border border-slate-800 bg-gradient-to-br from-[#0B5198]/20 via-slate-900/60 to-slate-900/60 p-5 sm:p-6 text-center">
          <span className="text-sky-400 font-bold text-[11px] uppercase tracking-wider block mb-3">{t('journey.eyebrow')}</span>
          <div className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-2 mb-3">
            {STAGES.map((stage, i) => (
              <React.Fragment key={stage.id}>
                <span className="text-sm sm:text-base font-extrabold text-white tracking-wide">
                  {t(`stages.${stage.id}.title`)}
                </span>
                {i < STAGES.length - 1 && <ArrowRight className="w-4 h-4 text-sky-500 shrink-0" />}
              </React.Fragment>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1.5 text-[11px] sm:text-xs text-slate-400">
            {journeySteps.map((step, i) => (
              <React.Fragment key={step}>
                <span>{step}</span>
                {i < journeySteps.length - 1 && <ArrowRight className="w-3 h-3 text-slate-600 shrink-0" />}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Closing statement */}
        <div className="gsap-reveal text-center mt-8">
          <p className="text-sm sm:text-base text-slate-200 font-medium max-w-2xl mx-auto leading-relaxed">
            {t('closing.line1')}
            <br />
            <span className="text-white font-bold">{t('closing.line2')}</span>
          </p>
          <div className="mt-5 pt-5 border-t border-slate-800 max-w-xs mx-auto">
            <span className="text-lg font-black tracking-tight text-white block">NEXMENTOR</span>
            <span className="text-[11px] font-semibold text-sky-400 uppercase tracking-widest">{t('tagline')}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
