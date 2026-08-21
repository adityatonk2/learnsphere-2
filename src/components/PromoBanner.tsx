"use client";

import React, { useState } from 'react';
import { Sparkles, X, ArrowRight } from 'lucide-react';

interface PromoBannerProps {
  onOpenContact: (subject?: string) => void;
}

export const PromoBanner: React.FC<PromoBannerProps> = ({ onOpenContact }) => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="relative bg-gradient-to-r from-[#FF7A00] via-[#FF9500] to-[#FFB800] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-center gap-3 text-center">
        <Sparkles className="w-4 h-4 shrink-0 hidden sm:block" />
        <p className="text-xs sm:text-sm font-semibold leading-snug">
          <span className="font-extrabold">Monsoon Sale — Members Only:</span>{' '}
          Up to 70% off Top Vendor courses & exam vouchers.{' '}
          <button
            onClick={() => onOpenContact('Monsoon Sale — Membership Inquiry')}
            className="underline underline-offset-2 font-bold hover:no-underline inline-flex items-center gap-1"
          >
            Become a member <ArrowRight className="w-3 h-3" />
          </button>
        </p>
        <button
          onClick={() => setDismissed(true)}
          aria-label="Dismiss promotion"
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/20 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
