"use client";

import React from 'react';
import { CheckCircle2, Award, Users, Globe2, ShieldCheck, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface AboutSectionProps {
  onOpenContact: () => void;
}

const BULLET_IDS = ['whoWeAre', 'ourMission', 'globalInstructors'] as const;
const BADGE_IDS = ['vendorAligned', 'globalDelivery', 'certifiedCourseware'] as const;

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenContact }) => {
  const containerRef = useScrollReveal({ y: 50, duration: 0.9 });
  const t = useTranslations('About');

  return (
    <section id="about" className="py-20 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
      <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">

          {/* Left Column: About NexMentor Solutions text matching Image 1 */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6 gsap-reveal">
            <div className="space-y-4">
              <span className="text-[#0B5198] dark:text-sky-400 font-bold text-sm uppercase tracking-wider block">
                {t('eyebrow')}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A2540] dark:text-white tracking-tight">
                {t('heading')}
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed font-normal">
                {t('description')}
              </p>
            </div>

            {/* Bullet points matching Image 1 exact content */}
            <div className="space-y-5">
              {BULLET_IDS.map((id) => (
                <div key={id} className="flex items-start gap-3.5">
                  <div className="w-6 h-6 rounded-full bg-sky-100 dark:bg-sky-900/40 text-[#0B5198] dark:text-sky-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#0A2540] dark:text-white">
                      {t(`bullets.${id}.title`)}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 text-sm mt-0.5">
                      {t(`bullets.${id}.description`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quality Badges */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-slate-200/80 dark:border-slate-800/80">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-200">
                <ShieldCheck className="w-4 h-4 text-sky-600" />
                <span>{t(`badges.${BADGE_IDS[0]}`)}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-200">
                <Globe2 className="w-4 h-4 text-sky-600" />
                <span>{t(`badges.${BADGE_IDS[1]}`)}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-200">
                <Award className="w-4 h-4 text-sky-600" />
                <span>{t(`badges.${BADGE_IDS[2]}`)}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Blue Callout Banner matching Image 1 */}
          <div className="lg:col-span-5 flex gsap-reveal">
            <div className="w-full bg-gradient-to-br from-[#0B5198] via-[#083b6e] to-[#042138] rounded-3xl p-8 sm:p-10 text-white flex flex-col justify-between relative overflow-hidden shadow-xl border border-sky-800/40">
              {/* Decorative wave graphic overlay matching Image 1 callout */}
              <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-xl pointer-events-none" />

              <div className="relative z-10 space-y-6">
                <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                  <Sparkles className="w-6 h-6 text-sky-300" />
                </div>

                <div className="space-y-3">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                    {t('calloutHeading')}
                  </h3>
                  <p className="text-sky-100 text-sm font-light leading-relaxed">
                    {t('calloutDescription')}
                  </p>
                </div>
              </div>

              {/* White Contact Us Button matching Image 1 */}
              <div className="relative z-10 pt-8">
                <button
                  onClick={onOpenContact}
                  className="w-full sm:w-auto bg-white dark:bg-slate-900 hover:bg-sky-50 dark:hover:bg-slate-800 text-[#0B5198] dark:text-sky-400 px-8 py-3.5 rounded-xl font-bold text-sm shadow-xl transition-all active:scale-95 text-center"
                >
                  {t('contactButton')}
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
