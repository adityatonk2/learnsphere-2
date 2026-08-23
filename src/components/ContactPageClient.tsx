"use client";

import React, { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Mail, MapPin, Phone, ShieldCheck, GraduationCap, Globe2, Award, ArrowRight, Ticket } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Header } from './Header';
import { Footer } from './Footer';
import { ContactForm } from './ContactForm';
import { PartnerForm } from './PartnerForm';

type InquiryType = 'general' | 'partner';

const ContactPageForms: React.FC = () => {
  const t = useTranslations('ContactPage');
  const searchParams = useSearchParams();
  const defaultSubject = searchParams.get('subject') || undefined;
  const initialType: InquiryType = searchParams.get('type') === 'partner' ? 'partner' : 'general';
  const [activeTab, setActiveTab] = useState<InquiryType>(initialType);

  return (
    <>
      <div className="inline-flex p-1 mb-6 bg-slate-100 dark:bg-slate-800 rounded-xl">
        <button
          type="button"
          onClick={() => setActiveTab('general')}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
            activeTab === 'general'
              ? 'bg-white dark:bg-slate-900 text-[#0B5198] dark:text-sky-400 shadow-sm'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
          }`}
        >
          {t('tabs.general')}
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('partner')}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
            activeTab === 'partner'
              ? 'bg-white dark:bg-slate-900 text-[#0B5198] dark:text-sky-400 shadow-sm'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
          }`}
        >
          {t('tabs.partner')}
        </button>
      </div>

      {activeTab === 'general' ? (
        <ContactForm variant="page" defaultSubject={defaultSubject} />
      ) : (
        <PartnerForm variant="page" />
      )}
    </>
  );
};

const TRUST_STATS = [
  { icon: GraduationCap, key: 'employeesTrained' as const },
  { icon: Award, key: 'coursesOffered' as const },
  { icon: Globe2, key: 'certificationVendors' as const },
];

const HOW_IT_WORKS_STEPS = ['submit', 'review', 'respond'] as const;

export const ContactPageClient: React.FC = () => {
  const t = useTranslations('ContactPage');
  const tStats = useTranslations('Stats');
  const [activeSection, setActiveSection] = useState('contact');

  const scrollToForm = () => {
    if (typeof document !== 'undefined') {
      document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans">
      <Header onOpenContact={scrollToForm} activeSection={activeSection} setActiveSection={setActiveSection} />

      <main>
        <section className="py-16 sm:py-20 bg-slate-50 dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-10">
              <span className="text-[#0B5198] dark:text-sky-400 font-bold text-sm uppercase tracking-wider block mb-2">
                {t('eyebrow')}
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0A2540] dark:text-white tracking-tight mb-3">
                {t('heading')}
              </h1>
              <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
                {t('subheading')}
              </p>

              <div className="flex flex-wrap items-center gap-x-8 gap-y-3 mt-6 pt-6 border-t border-slate-200 dark:border-slate-800">
                {TRUST_STATS.map(({ icon: Icon, key }) => (
                  <div key={key} className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-[#0B5198] dark:text-sky-400" />
                    </div>
                    <span className="text-xs text-slate-500 dark:text-slate-400">{tStats(key)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-7">
                <div id="contact-form" className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 scroll-mt-24">
                  <Suspense fallback={null}>
                    <ContactPageForms />
                  </Suspense>
                </div>
              </div>

              <aside className="lg:col-span-5">
                <div className="lg:sticky lg:top-28 space-y-6">
                  <div className="bg-gradient-to-br from-[#0B5198] via-[#083b6e] to-[#042138] rounded-2xl p-8 text-white shadow-xl">
                    <h2 className="text-lg font-bold mb-5">{t('sidebar.heading')}</h2>
                    <ul className="space-y-4 text-sm">
                      <li className="flex items-start gap-3">
                        <MapPin className="w-4 h-4 text-sky-300 shrink-0 mt-0.5" />
                        <span className="text-sky-100">{t('sidebar.address')}</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Phone className="w-4 h-4 text-sky-300 shrink-0" />
                        <span className="text-sky-100">+91 95489 88153</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Mail className="w-4 h-4 text-sky-300 shrink-0" />
                        <span className="text-sky-100">info@nexmentorsolutions.com</span>
                      </li>
                    </ul>
                    <div className="mt-6 pt-6 border-t border-white/15 flex items-start gap-2.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-300 shrink-0 mt-0.5" />
                      <p className="text-xs text-sky-100">{t('sidebar.responseTime')}</p>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
                    <h3 className="text-sm font-bold text-[#0A2540] dark:text-white uppercase tracking-wider mb-5">
                      {t('howItWorks.heading')}
                    </h3>
                    <ol className="space-y-5">
                      {HOW_IT_WORKS_STEPS.map((step, i) => (
                        <li key={step} className="flex gap-3.5">
                          <span className="w-6 h-6 rounded-full bg-sky-50 dark:bg-slate-800 text-[#0B5198] dark:text-sky-400 flex items-center justify-center text-xs font-bold shrink-0 border border-sky-100 dark:border-sky-900/50">
                            {i + 1}
                          </span>
                          <div>
                            <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                              {t(`howItWorks.${step}.title`)}
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                              {t(`howItWorks.${step}.description`)}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
                    <h3 className="text-sm font-bold text-[#0A2540] dark:text-white uppercase tracking-wider mb-4">
                      {t('quickLinks.heading')}
                    </h3>
                    <div className="space-y-1">
                      <Link
                        href="/courses"
                        className="group flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                      >
                        <span className="flex items-center gap-2.5 text-sm text-slate-700 dark:text-slate-200">
                          <GraduationCap className="w-4 h-4 text-[#0B5198] dark:text-sky-400" />
                          {t('quickLinks.courses')}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:translate-x-0.5 group-hover:text-[#0B5198] dark:group-hover:text-sky-400 transition-all" />
                      </Link>
                      <Link
                        href="/vouchers"
                        className="group flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                      >
                        <span className="flex items-center gap-2.5 text-sm text-slate-700 dark:text-slate-200">
                          <Ticket className="w-4 h-4 text-[#0B5198] dark:text-sky-400" />
                          {t('quickLinks.vouchers')}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:translate-x-0.5 group-hover:text-[#0B5198] dark:group-hover:text-sky-400 transition-all" />
                      </Link>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>

      <Footer onOpenContact={scrollToForm} setActiveSection={setActiveSection} />
    </div>
  );
};
