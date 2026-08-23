"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Check, Loader2, ShieldCheck } from 'lucide-react';

interface NotARobotCheckboxProps {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  verifyingLabel: string;
}

/**
 * Lightweight client-side "I'm not a robot" gate. This is NOT a real bot/
 * spam verification service (no reCAPTCHA or similar is wired up — these
 * forms don't submit to a backend yet) — it's a UI checkpoint matching the
 * pattern the client asked for, with a brief "verifying" animation so it
 * reads as a real check rather than an instant toggle. Swap for a real
 * verification provider (reCAPTCHA, hCaptcha, Turnstile) once these forms
 * have a live submission endpoint.
 */
export const NotARobotCheckbox: React.FC<NotARobotCheckboxProps> = ({ id, checked, onChange, label, verifyingLabel }) => {
  const [verifying, setVerifying] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  const handleClick = () => {
    if (checked || verifying) {
      onChange(false);
      return;
    }
    setVerifying(true);
    const delay = 700 + Math.random() * 500;
    timerRef.current = setTimeout(() => {
      setVerifying(false);
      onChange(true);
    }, delay);
  };

  return (
    <button
      type="button"
      id={id}
      role="checkbox"
      aria-checked={checked}
      aria-busy={verifying}
      onClick={handleClick}
      className="flex items-center gap-3 w-full max-w-xs px-4 py-3 border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-900 select-none hover:border-slate-300 dark:hover:border-slate-700 transition-colors text-left"
    >
      <span
        className={`relative w-5 h-5 shrink-0 rounded-md border flex items-center justify-center transition-colors ${
          checked
            ? 'bg-[#0B5198] border-[#0B5198]'
            : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-950'
        }`}
      >
        {verifying && <Loader2 className="w-3.5 h-3.5 text-[#0B5198] dark:text-sky-400 animate-spin" />}
        {checked && !verifying && <Check className="w-3.5 h-3.5 text-white animate-in zoom-in-50 duration-200" />}
      </span>
      <span className="text-sm font-medium text-slate-700 dark:text-slate-200 flex-1">
        {verifying ? verifyingLabel : label}
      </span>
      <ShieldCheck
        className={`w-5 h-5 shrink-0 transition-colors ${checked ? 'text-emerald-500' : 'text-slate-300 dark:text-slate-600'}`}
      />
    </button>
  );
};
