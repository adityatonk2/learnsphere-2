"use client";

import React, { useState } from 'react';
import { TRAINING_MODES } from '../data/coursesData';
import { TrainingMode } from '../types';
import { ArrowRight, CheckCircle2, X, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface TrainingModesSectionProps {
  onOpenContact: (defaultMode?: string) => void;
}

export const TrainingModesSection: React.FC<TrainingModesSectionProps> = ({ onOpenContact }) => {
  const [selectedModeModal, setSelectedModeModal] = useState<TrainingMode | null>(null);
  const containerRef = useScrollReveal({ y: 60, duration: 0.9, stagger: 0.2 });

  return (
    <section id="training-modes" className="py-20 bg-[#042138] text-white relative overflow-hidden">
      {/* Decorative background subtle ambient lighting */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-sky-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3 gsap-reveal">
          <span className="text-sky-400 font-bold text-sm tracking-wider uppercase">
            Flexible Learning Options
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Tailored Delivery Formats for Every Organization
          </h2>
          <p className="text-slate-300 text-base sm:text-lg font-light">
            Choose how, where, and when your team learns best with our flexible learning delivery frameworks.
          </p>
        </div>

        {/* 4 Cards Grid matching Image 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRAINING_MODES.map((mode) => (
          <div
            key={mode.id}
            className="bg-[#082e4e] rounded-2xl border border-sky-900/60 shadow-xl hover:shadow-2xl hover:border-sky-500/50 transition-all duration-300 flex flex-col overflow-hidden group gsap-reveal"
          >
              {/* Image Container with Badge overlay (Matching Image 2) */}
              <div className="relative h-48 overflow-hidden bg-slate-800">
                <Image
                  src={mode.image.replace('/src/assets', '/assets')}
                  alt={mode.title}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#082e4e] via-transparent to-transparent opacity-80" />

                {/* Pill Badge at Top Left (Fastest, Most Flexible, Most Focused, Bespoke) matching Image 2 */}
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md text-[#042138] text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  {mode.badge}
                </div>
              </div>

              {/* Card Body matching Image 2 */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-sky-300 transition-colors">
                    {mode.title}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed font-normal">
                    {mode.description}
                  </p>
                </div>

                {/* Learn More Button matching Image 2 */}
                <div className="pt-2">
                  <button
                    onClick={() => setSelectedModeModal(mode)}
                    className="w-full bg-[#007AB8] hover:bg-[#006396] text-white py-3 px-4 rounded-xl font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2 group/btn active:scale-95"
                  >
                    <span>Learn More</span>
                    <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for "Learn More" on a Training Mode */}
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
                {selectedModeModal.badge}
              </span>
              <h3 className="text-2xl font-bold text-[#0A2540]">
                {selectedModeModal.title}
              </h3>
            </div>

            <Image
              src={selectedModeModal.image.replace('/src/assets', '/assets')}
              alt={selectedModeModal.title}
              width={600}
              height={250}
              className="w-full h-44 object-cover rounded-xl shadow-inner"
            />

            <p className="text-slate-600 text-sm leading-relaxed">
              {selectedModeModal.description}
            </p>

            <div className="space-y-2">
              <h4 className="text-sm font-bold text-[#0A2540] uppercase tracking-wider">
                Key Deliverables
              </h4>
              <ul className="space-y-2">
                {selectedModeModal.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs text-slate-600">
              <strong className="text-slate-900 block mb-1">Recommended for:</strong>
              {selectedModeModal.recommendedFor}
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => {
                  const modeTitle = selectedModeModal.title;
                  setSelectedModeModal(null);
                  onOpenContact(modeTitle);
                }}
                className="w-full bg-[#0052CC] hover:bg-[#003B99] text-white py-3 rounded-xl font-bold text-sm shadow-md transition-all text-center"
              >
                Inquire About {selectedModeModal.title}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
