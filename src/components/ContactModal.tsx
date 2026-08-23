"use client";

import React from 'react';
import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { ContactForm } from './ContactForm';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultSubject?: string;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, defaultSubject }) => {
  const t = useTranslations('ContactModal');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <ContactForm
          variant="compact"
          defaultSubject={defaultSubject}
          header={
            <div className="mb-5">
              <span className="text-xs font-bold text-[#0B5198] dark:text-sky-400 uppercase tracking-wider block mb-1">
                {t('eyebrow')}
              </span>
              <h3 className="text-2xl font-bold text-[#0A2540] dark:text-white">{t('heading')}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">{t('subheading')}</p>
            </div>
          }
        />
      </div>
    </div>
  );
};
