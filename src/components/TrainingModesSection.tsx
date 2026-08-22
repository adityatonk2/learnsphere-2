"use client";

import React, { useState } from 'react';
import { TRAINING_MODES } from '../data/coursesData';
import { TrainingMode } from '../types';
import { CheckCircle2, X, RotateCcw, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface TrainingModesSectionProps {
  onOpenContact: (defaultMode?: string) => void;
}

export const TrainingModesSection: React.FC<TrainingModesSectionProps> = ({ onOpenContact }) => {
  const [selectedModeModal, setSelectedModeModal] = useState<TrainingMode | null>(null);
  const [flippedId, setFlippedId] = useState<string | null>(null);
  const containerRef = useScrollReveal({ y: 60, duration: 0.9, stagger: 0.2 });
  const t = useTranslations('TrainingModes');

  const modeTitle = (mode: TrainingMode) => t(`items.${mode.id}.title`);
  const modeBadge = (mode: TrainingMode) => t(`items.${mode.id}.badge`);
  const modeDescription = (mode: TrainingMode) => t(`items.${mode.id}.description`);
  const modeFeatures = (mode: TrainingMode) => t.raw(`items.${mode.id}.features`) as string[];
  const modeRecommendedFor = (mode: TrainingMode) => t(`items.${mode.id}.recommendedFor`);

  return (
    <section id="training-modes" className="py-20 bg-[#042138] text-white relative overflow-hidden">
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-sky-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3 gsap-reveal">
          <span className="text-sky-400 font-bold text-sm tracking-wider uppercase">
            {t('eyebrow')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t('heading')}
          </h2>
          <p className="text-slate-300 text-base sm:text-lg font-light">
            {t('subheading')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRAINING_MODES.map((mode) => {
            const isFlipped = flippedId === mode.id;
            return (
              <div key={mode.id} className="group [perspective:1400px] h-[452px] gsap-reveal">
                <div
                  className={`relative w-full h-full transition-transform duration-700 ease-out will-change-transform [transform-style:preserve-3d] motion-reduce:transition-none motion-reduce:duration-0 ${
                    isFlipped ? '[transform:rotateY(180deg)]' : 'md:group-hover:[transform:rotateY(180deg)]'
                  }`}
                >
                  <div className="absolute inset-0 [backface-visibility:hidden] bg-[#082e4e] rounded-2xl border border-sky-900/60 shadow-xl group-hover:shadow-2xl group-hover:border-sky-500/50 transition-shadow flex flex-col overflow-hidden">
                    <div className="relative h-48 overflow-hidden bg-slate-800">
                      <Image
                        src={mode.image.replace('/src/assets', '/assets')}
                        alt={modeTitle(mode)}
                        fill
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#082e4e] via-transparent to-transparent opacity-80" />
                      <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md text-[#042138] text-xs font-bold px-3 py-1 rounded-full shadow-md">
                        {modeBadge(mode)}
                      </div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold text-white group-hover:text-sky-300 transition-colors">
                          {modeTitle(mode)}
                        </h3>
                        <p className="text-slate-300 text-sm leading-relaxed font-normal">
                          {modeDescription(mode)}
                        </p>
                      </div>

                      <div className="pt-2">
                        <button
                          onClick={() => setFlippedId(mode.id)}
                          className="w-full bg-[#007AB8] hover:bg-[#006396] text-white py-3 px-4 rounded-xl font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2 active:scale-95"
                        >
                          <span>{t('seeWhatsIncluded')}</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                        <p className="hidden md:block text-center text-[11px] text-slate-400 mt-2">{t('hoverToFlip')}</p>
                      </div>
                    </div>
                  </div>

                  <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-gradient-to-b from-[#0B3A6B] to-[#082e4e] rounded-2xl border border-sky-500/40 shadow-2xl flex flex-col overflow-hidden">
                    <div className="p-6 flex-1 flex flex-col overflow-y-auto">
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="bg-white/10 border border-white/15 text-sky-200 text-[11px] font-bold px-2.5 py-1 rounded-full">
                          {modeBadge(mode)}
                        </span>
                        <button
                          onClick={() => setFlippedId(null)}
                          aria-label={t('flipBack')}
                          className="p-1.5 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                        >
                          <RotateCcw className="w-4 h-4" />
                        </button>
                      </div>

                      <h3 className="text-lg font-bold text-white leading-snug mb-3">{modeTitle(mode)}</h3>

                      <ul className="space-y-2 flex-1">
                        {modeFeatures(mode).map((feat, i) => (
                          <li key={i} className="flex items-start gap-2 text-[13px] text-slate-200 leading-snug">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>

                      <p className="text-[11px] text-slate-400 leading-relaxed mt-3 mb-4">
                        <span className="font-semibold text-slate-300">{t('bestForLabel')} </span>
                        {modeRecommendedFor(mode)}
                      </p>

                      <div className="flex gap-2">
                        <button
                          onClick={() => onOpenContact(modeTitle(mode))}
                          className="flex-1 bg-[#0052CC] hover:bg-[#003B99] text-white py-2.5 rounded-lg font-bold text-sm shadow-md transition-all active:scale-95"
                        >
                          {t('inquire')}
                        </button>
                        <button
                          onClick={() => setSelectedModeModal(mode)}
                          className="px-3 bg-white/10 hover:bg-white/15 border border-white/15 text-white py-2.5 rounded-lg font-semibold text-sm transition-all"
                        >
                          {t('details')}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedModeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white text-slate-900 rounded-2xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl border border-slate-200 space-y-6">
            <button
              onClick={() => setSelectedModeModal(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <span className="bg-sky-100 text-[#0B5198] text-xs font-bold px-3 py-1 rounded-full">
                {modeBadge(selectedModeModal)}
              </span>
              <h3 className="text-2xl font-bold text-[#0A2540]">
                {modeTitle(selectedModeModal)}
              </h3>
            </div>

            <Image
              src={selectedModeModal.image.replace('/src/assets', '/assets')}
              alt={modeTitle(selectedModeModal)}
              width={600}
              height={250}
              className="w-full h-44 object-cover rounded-xl shadow-inner"
            />

            <p className="text-slate-600 text-sm leading-relaxed">
              {modeDescription(selectedModeModal)}
            </p>

            <div className="space-y-2">
              <h4 className="text-sm font-bold text-[#0A2540] uppercase tracking-wider">
                {t('keyDeliverables')}
              </h4>
              <ul className="space-y-2">
                {modeFeatures(selectedModeModal).map((feat, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs text-slate-600">
              <strong className="text-slate-900 block mb-1">{t('recommendedForLabel')}</strong>
              {modeRecommendedFor(selectedModeModal)}
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => {
                  const title = modeTitle(selectedModeModal);
                  setSelectedModeModal(null);
                  onOpenContact(title);
                }}
                className="w-full bg-[#0052CC] hover:bg-[#003B99] text-white py-3 rounded-xl font-bold text-sm shadow-md transition-all text-center"
              >
                {t('inquireAbout', { mode: modeTitle(selectedModeModal) })}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
