"use client";

import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, Phone, Mail, Search } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { SearchModal } from './SearchModal';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSwitcher } from './LanguageSwitcher';

interface HeaderProps {
  onOpenContact: (subject?: string) => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

interface NavLinkProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`text-sm font-medium transition-colors relative py-2 ${
      active
        ? 'text-[#0B5198] dark:text-sky-400 font-semibold'
        : 'text-slate-700 dark:text-slate-200 hover:text-[#0B5198] dark:hover:text-sky-400'
    }`}
  >
    {label}
    {active && (
      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#0B5198] dark:bg-sky-400 rounded-full" />
    )}
  </button>
);

export const Header: React.FC<HeaderProps> = ({ onOpenContact, activeSection, setActiveSection }) => {
  const locale = useLocale();
  const t = useTranslations('Header');
  const tCommon = useTranslations('Common');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const NAV_ITEMS: { id: string; label: string }[] = [
    { id: 'solutions', label: t('nav.solutions') },
    { id: 'training-modes', label: t('nav.training') },
    { id: 'courses', label: t('nav.courses') },
    { id: 'about', label: t('nav.about') },
  ];

  useEffect(() => {
    const handleShortcut = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const typing = target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable);
      if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchOpen((v) => !v);
      } else if (e.key === '/' && !typing && !searchOpen) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    document.addEventListener('keydown', handleShortcut);
    return () => document.removeEventListener('keydown', handleShortcut);
  }, [searchOpen]);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = typeof document !== 'undefined' ? document.getElementById(id) : null;
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (typeof window !== 'undefined') {
      window.location.href = id === 'home' ? `/${locale}` : `/${locale}#${id}`;
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 shadow-xs transition-all">
      <div className="bg-slate-900 text-slate-300 text-xs py-1 px-4 sm:px-8 flex justify-between items-center border-b border-slate-800">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
            <Globe className="w-3.5 h-3.5 text-sky-400" /> {t('globalReach')}
          </span>
          <span className="hidden md:flex items-center gap-1.5 hover:text-white transition-colors">
            <Phone className="w-3.5 h-3.5 text-sky-400" /> {t('enterpriseSupport')}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <a href="mailto:contact@nexmentorsolutions.com" className="hover:text-white transition-colors hidden sm:flex items-center gap-1">
            <Mail className="w-3.5 h-3.5 text-sky-400" /> contact@nexmentorsolutions.com
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div
          onClick={() => scrollToSection('home')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#003B73] via-[#0B5198] to-[#0088FF] p-0.5 shadow-md group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-white dark:bg-slate-900 rounded-full flex items-center justify-center p-1.5">
              <svg viewBox="0 0 100 100" className="w-full h-full text-[#0B5198] dark:text-sky-400" fill="currentColor">
                <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="8" />
                <ellipse cx="50" cy="50" rx="45" ry="16" fill="none" stroke="#00A3FF" strokeWidth="6" transform="rotate(-25 50 50)" />
                <circle cx="50" cy="50" r="14" fill="#0B5198" />
              </svg>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-[#0A2540] dark:text-white flex items-center gap-1">
              NexMentor
            </span>
            <span className="text-[10px] font-semibold tracking-widest text-slate-500 dark:text-slate-400 uppercase -mt-1">
              Solutions
            </span>
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.id}
              label={item.label}
              active={activeSection === item.id}
              onClick={() => scrollToSection(item.id)}
            />
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-1.5">
          <LanguageSwitcher />
          <ThemeToggle />
          <button
            onClick={() => setSearchOpen(true)}
            aria-label={t('searchTitle')}
            title={t('searchTitle')}
            className="relative w-9 h-9 rounded-lg flex items-center justify-center text-slate-600 hover:text-[#0B5198] hover:bg-slate-100 dark:text-slate-300 dark:hover:text-sky-300 dark:hover:bg-slate-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B5198]"
          >
            <Search className="w-5 h-5" />
          </button>

          <span className="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-1.5" aria-hidden="true" />

          <button
            onClick={() => onOpenContact(t('connectAdvisorSubject'))}
            className="text-sm font-semibold text-[#0B5198] dark:text-sky-400 border border-[#0B5198]/30 hover:border-[#0B5198] hover:bg-sky-50 dark:hover:bg-slate-800 px-4 py-2.5 rounded-lg transition-all active:scale-95"
          >
            {t('connectAdvisor')}
          </button>

          <button
            onClick={() => onOpenContact()}
            className="bg-[#0052CC] hover:bg-[#003B99] text-white px-6 py-2.5 rounded-lg text-sm font-semibold shadow-md hover:shadow-lg transition-all active:scale-95"
          >
            {tCommon('getStarted')}
          </button>
        </div>

        <div className="lg:hidden flex items-center gap-1">
          <LanguageSwitcher />
          <ThemeToggle />
          <button
            onClick={() => setSearchOpen(true)}
            className="p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label={t('searchTitle')}
          >
            <Search className="w-6 h-6" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 pt-3 pb-6 space-y-1 shadow-xl">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`block w-full text-left py-2 px-3 text-base font-medium rounded-lg transition-colors ${
                activeSection === item.id
                  ? 'text-[#0B5198] dark:text-sky-400 bg-sky-50 dark:bg-slate-800'
                  : 'text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenContact(t('connectAdvisorSubject'));
            }}
            className="w-full mt-3 border border-[#0B5198] text-[#0B5198] dark:text-sky-400 py-3 rounded-lg font-semibold text-center"
          >
            {t('connectAdvisor')}
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenContact();
            }}
            className="w-full mt-2 bg-[#0052CC] text-white py-3 rounded-lg font-semibold text-center shadow-md"
          >
            {tCommon('getStarted')}
          </button>
        </div>
      )}

      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onNavigate={(sectionId) => scrollToSection(sectionId)}
      />
    </header>
  );
};
