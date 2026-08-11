"use client";

import React from 'react';
import { CheckCircle2, Award, Users, Globe2, ShieldCheck, Sparkles } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface AboutSectionProps {
  onOpenContact: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenContact }) => {
  const containerRef = useScrollReveal({ y: 50, duration: 0.9 });

  return (
    <section id="about" className="py-20 bg-slate-50 border-t border-slate-100">
      <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column: About LearnSphere Technologies text matching Image 1 */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6 gsap-reveal">
            <div className="space-y-4">
              <span className="text-[#0B5198] font-bold text-sm uppercase tracking-wider block">
                Company Overview
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A2540] tracking-tight">
                About LearnSphere Technologies
              </h2>
              <p className="text-slate-600 text-base leading-relaxed font-normal">
                LearnSphere Technologies is a global leader in enterprise learning, authorized vendor certifications, and technical workforce upskilling.
              </p>
            </div>

            {/* Bullet points matching Image 1 exact content */}
            <div className="space-y-5">
              <div className="flex items-start gap-3.5">
                <div className="w-6 h-6 rounded-full bg-sky-100 text-[#0B5198] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  ✓
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0A2540]">
                    Who We Are
                  </h3>
                  <p className="text-slate-600 text-sm mt-0.5">
                    Leaders in cutting-edge corporate education delivering accredited training across 40+ countries.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-6 h-6 rounded-full bg-sky-100 text-[#0B5198] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  ✓
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0A2540]">
                    Our Mission
                  </h3>
                  <p className="text-slate-600 text-sm mt-0.5">
                    To transform learning through technology, equipping workforce teams with verified, job-ready technology expertise.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-6 h-6 rounded-full bg-sky-100 text-[#0B5198] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  ✓
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0A2540]">
                    Global Certified Instructors
                  </h3>
                  <p className="text-slate-600 text-sm mt-0.5">
                    A network of over 1,200+ certified practitioner trainers with real-world industry experience.
                  </p>
                </div>
              </div>
            </div>

            {/* Quality Badges */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-slate-200/80">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <ShieldCheck className="w-4 h-4 text-sky-600" />
                <span>Authorized Partner</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <Globe2 className="w-4 h-4 text-sky-600" />
                <span>Global On-Site Delivery</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <Award className="w-4 h-4 text-sky-600" />
                <span>Certified Courseware</span>
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
                    Ready to Transform Your Workforce?
                  </h3>
                  <p className="text-sky-100 text-sm font-light leading-relaxed">
                    Join us and elevate your corporate training today. Get a customized quote for your enterprise team.
                  </p>
                </div>
              </div>

              {/* White Contact Us Button matching Image 1 */}
              <div className="relative z-10 pt-8">
                <button
                  onClick={onOpenContact}
                  className="w-full sm:w-auto bg-white hover:bg-sky-50 text-[#0B5198] px-8 py-3.5 rounded-xl font-bold text-sm shadow-xl transition-all active:scale-95 text-center"
                >
                  Contact Us
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
