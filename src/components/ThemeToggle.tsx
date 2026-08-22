"use client";

import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  className?: string;
}

/**
 * Light/dark toggle. Initial theme is set pre-paint by the inline script in layout.tsx
 * (defaults to the visitor's system preference). This button flips + persists the choice.
 */
export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    const root = document.documentElement;
    if (next) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <button
      onClick={toggle}
      aria-label={mounted && isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={mounted && isDark ? 'Light mode' : 'Dark mode'}
      className={`relative w-9 h-9 rounded-lg flex items-center justify-center text-slate-600 hover:text-[#0B5198] hover:bg-slate-100 dark:text-slate-300 dark:hover:text-sky-300 dark:hover:bg-slate-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B5198] ${className}`}
    >
      {/* Render both and cross-fade via opacity so there is no layout shift or hydration mismatch */}
      <Sun
        className={`w-5 h-5 absolute transition-all duration-300 ${
          mounted && isDark ? 'opacity-0 -rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'
        }`}
      />
      <Moon
        className={`w-5 h-5 absolute transition-all duration-300 ${
          mounted && isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-50'
        }`}
      />
    </button>
  );
};
