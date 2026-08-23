"use client";

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Header } from './Header';
import { Footer } from './Footer';
import { ContactModal } from './ContactModal';

interface LegalPageShellProps {
  eyebrow: string;
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

export const LegalPageShell: React.FC<LegalPageShellProps> = ({ eyebrow, title, lastUpdated, children }) => {
  const tCommon = useTranslations('LegalPage');
  const [activeSection, setActiveSection] = useState('');
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [contactDefaultSubject, setContactDefaultSubject] = useState('');

  const handleOpenContact = (subject?: string) => {
    setContactDefaultSubject(subject || '');
    setIsContactOpen(true);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans">
      <Header
        onOpenContact={(subject) => handleOpenContact(subject)}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <main>
        <section className="py-14 sm:py-16 bg-slate-50 dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="text-[#0B5198] dark:text-sky-400 font-bold text-sm uppercase tracking-wider block mb-2">
              {eyebrow}
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0A2540] dark:text-white tracking-tight mb-2">
              {title}
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {tCommon('lastUpdated', { date: lastUpdated })}
            </p>
          </div>
        </section>

        <section className="py-14">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10 flex items-start gap-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 rounded-xl p-4">
              <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">{tCommon('draftNotice')}</p>
            </div>

            <div className="space-y-10">{children}</div>
          </div>
        </section>
      </main>

      <Footer onOpenContact={() => handleOpenContact()} setActiveSection={setActiveSection} />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        defaultSubject={contactDefaultSubject}
      />
    </div>
  );
};

export const LegalSection: React.FC<{ heading: string; children: React.ReactNode }> = ({ heading, children }) => (
  <div>
    <h2 className="text-lg font-bold text-[#0A2540] dark:text-white mb-3">{heading}</h2>
    <div className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed space-y-3">{children}</div>
  </div>
);
