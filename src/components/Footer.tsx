"use client";

import React from 'react';
import Image from 'next/image';
import { Globe, Mail, Phone, MapPin, ShieldCheck, Instagram, Youtube, MessageCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useScrollReveal } from '../hooks/useScrollReveal';

// Trademark ownership statements — kept verbatim/untranslated across all
// locales since these are legally operative attributions of third-party
// marks, not general UI copy.
const TRADEMARK_DISCLAIMER = [
  'SAFe is a registered trademark of Scaled Agile, Inc.',
  'PMP, PMI are registered marks of the Project Management Institute, Inc.',
  'Certified ScrumMaster® (CSM) and Certified Scrum Trainer® (CST) are registered trademarks of SCRUM ALLIANCE®',
  'ITIL® is a registered trademark of AXELOS Limited.',
  'Professional Scrum Master is a registered trademark of Scrum.org',
  'Java is the registered trademarks of Oracle and/or its affiliates',
  'Azure is a registered trademark of Microsoft Corporation.',
  'Power BI is a registered trademark of Microsoft Corporation.',
];

const SOCIAL_LINKS = [
  { name: 'Instagram', href: 'https://www.instagram.com/nexmentorsolutions/?hl=en', Icon: Instagram },
  { name: 'YouTube', href: 'https://www.youtube.com/@NEXMENTORSOLUTIONS', Icon: Youtube },
  { name: 'WhatsApp', href: 'https://wa.me/919548988153', Icon: MessageCircle },
];

interface FooterProps {
  onOpenContact: () => void;
  setActiveSection: (section: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenContact, setActiveSection }) => {
  const containerRef = useScrollReveal({ y: 40, duration: 0.9 });
  const t = useTranslations('Footer');
  const scrollTo = (id: string) => {
    setActiveSection(id);
    const element = typeof document !== 'undefined' ? document.getElementById(id) : null;
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (typeof window !== 'undefined') {
      window.location.href = id === 'home' ? '/' : `/#${id}`;
    }
  };

  return (
    <footer ref={containerRef} className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 gsap-reveal">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Image
              src="/assets/images/nexmentor-logo-transparent.png"
              alt="NexMentor Solutions"
              width={1270}
              height={281}
              className="h-10 w-auto object-contain [filter:drop-shadow(0_0_1px_rgba(255,255,255,0.9))_drop-shadow(0_0_3px_rgba(255,255,255,0.6))]"
            />

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm font-light">
              {t('description')}
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-sky-400 font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{t('certification')}</span>
            </div>

            {/* Social Media Links */}
            <div className="pt-3 flex items-center gap-3">
              {SOCIAL_LINKS.map(({ name, href, Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="w-8 h-8 rounded-full bg-slate-800 hover:bg-[#0B5198] flex items-center justify-center transition-colors group"
                >
                  <Icon className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                </a>
              ))}
              {/* Pinterest (no dedicated lucide icon) */}
              <a
                href="https://in.pinterest.com/nexmentorsolutions/?actingBusinessId=1100004415144240754"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Pinterest"
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-[#0B5198] flex items-center justify-center transition-colors group"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" fill="currentColor">
                  <path d="M12 0a12 12 0 0 0-4.373 23.178c-.035-.987-.008-2.176.239-3.253.263-1.14 1.75-7.42 1.75-7.42s-.446-.892-.446-2.21c0-2.07 1.2-3.616 2.696-3.616 1.271 0 1.884.955 1.884 2.1 0 1.28-.815 3.19-1.235 4.96-.352 1.48.744 2.686 2.204 2.686 2.646 0 4.42-3.398 4.42-7.425 0-3.06-2.06-5.35-5.808-5.35-4.233 0-6.87 3.157-6.87 6.68 0 1.216.36 2.073.92 2.737.258.305.294.428.2.778-.067.256-.22.872-.284 1.117-.093.35-.38.475-.7.346-1.955-.797-2.865-2.938-2.865-5.347 0-3.976 3.353-8.74 10.007-8.74 5.347 0 8.86 3.87 8.86 8.023 0 5.496-3.06 9.6-7.577 9.6-1.516 0-2.943-.82-3.43-1.75 0 0-.815 3.223-.988 3.85-.296 1.075-.876 2.15-1.406 2.99A12 12 0 1 0 12 0z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              {t('navigation.title')}
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={() => scrollTo('home')} className="hover:text-white transition-colors">
                  {t('navigation.home')}
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('solutions')} className="hover:text-white transition-colors">
                  {t('navigation.solutions')}
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('training-modes')} className="hover:text-white transition-colors">
                  {t('navigation.learningFormats')}
                </button>
              </li>
              <li>
                <Link href="/courses" className="hover:text-white transition-colors">
                  {t('navigation.courseDirectory')}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  {t('navigation.aboutUs')}
                </Link>
              </li>
              <li>
                <Link href="/vouchers" className="hover:text-white transition-colors">
                  {t('navigation.vouchers')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  {t('navigation.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Delivery Formats */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              {t('deliveryOptions.title')}
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={() => scrollTo('training-modes')} className="hover:text-white transition-colors">
                  {t('deliveryOptions.fmat')}
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('training-modes')} className="hover:text-white transition-colors">
                  {t('deliveryOptions.flexi')}
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('training-modes')} className="hover:text-white transition-colors">
                  {t('deliveryOptions.oneOnOne')}
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('training-modes')} className="hover:text-white transition-colors">
                  {t('deliveryOptions.customised')}
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('training-modes')} className="hover:text-white transition-colors">
                  {t('deliveryOptions.virtual')}
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              {t('contact.title')}
            </h4>
            <ul className="space-y-3 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span>{t('contact.address')}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-sky-400 shrink-0" />
                <span>+91 95489 88153</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <span>info@nexmentorsolutions.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Trademark Disclaimer */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">{t('trademarkDisclaimer.heading')}</h4>
          <ul className="text-[11px] text-slate-500 leading-relaxed space-y-1">
            {TRADEMARK_DISCLAIMER.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>{t('copyright', { year: new Date().getFullYear() })}</p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-slate-400 transition-colors">{t('legal.privacyPolicy')}</Link>
            <Link href="/terms-of-service" className="hover:text-slate-400 transition-colors">{t('legal.termsOfService')}</Link>
            <span className="hover:text-slate-400 cursor-pointer">{t('legal.accreditations')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
