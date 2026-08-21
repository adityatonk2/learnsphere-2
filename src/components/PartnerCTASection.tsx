"use client";

import React from 'react';
import { Handshake, ArrowRight } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface PartnerCTASectionProps {
  onOpenPartnerForm: () => void;
}

export const PartnerCTASection: React.FC<PartnerCTASectionProps> = ({ onOpenPartnerForm }) => {
  const containerRef = useScrollReveal({ y: 30, duration: 0.8 });

  return (
    <section className="py-14 bg-[#0A2540] border-t border-slate-800">
      <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="gsap-reveal flex flex-col sm:flex-row items-center justify-between gap-6 bg-gradient-to-r from-[#0B5198] to-[#083b6e] rounded-2xl p-8 sm:p-10 shadow-xl">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="hidden sm:flex w-12 h-12 rounded-xl bg-white/10 border border-white/20 items-center justify-center shrink-0">
              <Handshake className="w-6 h-6 text-sky-200" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                Interested in becoming a partner?
              </h3>
              <p className="text-sky-100 text-sm mt-1">
                Resellers, training companies, and integration partners — let's grow together.
              </p>
            </div>
          </div>
          <button
            onClick={onOpenPartnerForm}
            className="bg-white hover:bg-sky-50 text-[#0B5198] px-7 py-3.5 rounded-xl font-bold text-sm shadow-md transition-all active:scale-95 flex items-center gap-2 shrink-0"
          >
            <span>Become a Partner</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
