"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Check } from 'lucide-react';
import { usePathname, useRouter } from '@/i18n/navigation';

const LANGUAGES: { code: string; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'hi', label: 'हिन्दी', flag: '🇮🇳' },
  { code: 'ar', label: 'العربية', flag: '🇸🇦' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'pt', label: 'Português', flag: '🇵🇹' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
  { code: 'zh', label: '中文', flag: '🇨🇳' },
];

export const LanguageSwitcher: React.FC = () => {
  const t = useTranslations('LanguageSwitcher');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const current = LANGUAGES.find((l) => l.code === locale) ?? LANGUAGES[0];

  const switchTo = (code: string) => {
    setOpen(false);
    router.replace(pathname, { locale: code });
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={t('changeLanguage')}
        title={t('changeLanguage')}
        className="relative w-9 h-9 rounded-lg flex items-center justify-center text-base hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B5198]"
      >
        <span aria-hidden="true">{current.flag}</span>
      </button>

      {open && (
        <div className="absolute top-full right-0 mt-2 w-48 max-h-80 overflow-y-auto bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-100 dark:border-slate-800 py-2 z-50">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => switchTo(lang.code)}
              className="w-full text-left px-4 py-2 text-sm flex items-center justify-between gap-2 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <span className="flex items-center gap-2">
                <span aria-hidden="true">{lang.flag}</span>
                {lang.label}
              </span>
              {lang.code === locale && <Check className="w-4 h-4 text-[#0B5198] dark:text-sky-400" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
