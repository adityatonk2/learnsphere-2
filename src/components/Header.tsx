"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Menu, X, Globe, Phone, Mail, Search, ChevronDown } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { SearchModal } from './SearchModal';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSwitcher } from './LanguageSwitcher';
import { NavDropdown } from './NavDropdown';
import { VENDORS_DATA } from '../data/coursesData';
import { VOUCHERS_DATA } from '../data/vouchersData';
import { Link as IntlLink } from '@/i18n/navigation';

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

const NavRouteLink: React.FC<{ label: string; href: string; active: boolean }> = ({ label, href, active }) => (
  <IntlLink
    href={href}
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
  </IntlLink>
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
  ];

  const [mobileCoursesOpen, setMobileCoursesOpen] = useState(false);
  const [mobileVouchersOpen, setMobileVouchersOpen] = useState(false);
  const courseVendorItems = VENDORS_DATA.map((v) => ({ id: v.id, label: v.name, href: `/courses?vendor=${v.id}`, count: v.courses.length }));
  const voucherVendorItems = VOUCHERS_DATA.map((v) => ({ id: v.id, label: v.name, href: `/vouchers?vendor=${v.id}` }));

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
    <>
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
          <a href="mailto:info@nexmentorsolutions.com" className="hover:text-white transition-colors hidden sm:flex items-center gap-1">
            <Mail className="w-3.5 h-3.5 text-sky-400" /> info@nexmentorsolutions.com
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div
          onClick={() => scrollToSection('home')}
          className="flex items-center cursor-pointer group select-none"
        >
          <Image
            src="/assets/images/nexmentor-logo-transparent.png"
            alt="NexMentor Solutions"
            width={1517}
            height={352}
            priority
            className="h-10 w-auto object-contain group-hover:scale-105 transition-transform dark:hidden"
          />
          <Image
            src="/assets/images/nexmentor-logo-dark.png"
            alt="NexMentor Solutions"
            width={1759}
            height={407}
            priority
            className="hidden h-10 w-auto object-contain group-hover:scale-105 transition-transform dark:block"
          />
        </div>

        <nav className="hidden lg:flex items-center gap-8">
          <NavLink
            label={NAV_ITEMS[0].label}
            active={activeSection === NAV_ITEMS[0].id}
            onClick={() => scrollToSection(NAV_ITEMS[0].id)}
          />
          <NavLink
            label={NAV_ITEMS[1].label}
            active={activeSection === NAV_ITEMS[1].id}
            onClick={() => scrollToSection(NAV_ITEMS[1].id)}
          />
          <NavDropdown
            label={t('nav.courses')}
            active={activeSection === 'courses'}
            items={courseVendorItems}
            exploreAllLabel={t('nav.exploreAllCourses')}
            exploreAllHref="/courses"
            variant="grid"
            panelHeading={t('nav.coursesPanelHeading')}
            countLabel={(count) => t('nav.coursesCount', { count })}
          />
          <NavDropdown
            label={t('nav.vouchers')}
            active={activeSection === 'vouchers'}
            items={voucherVendorItems}
            exploreAllLabel={t('nav.exploreAllVouchers')}
            exploreAllHref="/vouchers"
          />
          <NavRouteLink label={t('nav.about')} href="/about" active={activeSection === 'about'} />
          <NavRouteLink label={t('nav.contact')} href="/contact" active={activeSection === 'contact'} />
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
            aria-label={t('toggleMenu')}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 pt-3 pb-6 space-y-1 shadow-xl">
          <button
            onClick={() => scrollToSection(NAV_ITEMS[0].id)}
            className={`block w-full text-left py-2 px-3 text-base font-medium rounded-lg transition-colors ${
              activeSection === NAV_ITEMS[0].id
                ? 'text-[#0B5198] dark:text-sky-400 bg-sky-50 dark:bg-slate-800'
                : 'text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            {NAV_ITEMS[0].label}
          </button>
          <button
            onClick={() => scrollToSection(NAV_ITEMS[1].id)}
            className={`block w-full text-left py-2 px-3 text-base font-medium rounded-lg transition-colors ${
              activeSection === NAV_ITEMS[1].id
                ? 'text-[#0B5198] dark:text-sky-400 bg-sky-50 dark:bg-slate-800'
                : 'text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            {NAV_ITEMS[1].label}
          </button>

          <div>
            <button
              onClick={() => setMobileCoursesOpen((v) => !v)}
              aria-expanded={mobileCoursesOpen}
              className="flex items-center justify-between w-full text-left py-2 px-3 text-base font-medium rounded-lg transition-colors text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              {t('nav.courses')}
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileCoursesOpen ? 'rotate-180' : ''}`} />
            </button>
            {mobileCoursesOpen && (
              <div className="pl-4 mt-1 space-y-0.5 border-l-2 border-slate-100 dark:border-slate-800 ml-3">
                <IntlLink
                  href="/courses"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1.5 px-3 text-sm font-semibold text-[#0B5198] dark:text-sky-400"
                >
                  {t('nav.exploreAllCourses')}
                </IntlLink>
                {courseVendorItems.map((item) => (
                  <IntlLink
                    key={item.id}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-1.5 px-3 text-sm text-slate-600 dark:text-slate-300 hover:text-[#0B5198] dark:hover:text-sky-400"
                  >
                    {item.label}
                  </IntlLink>
                ))}
              </div>
            )}
          </div>

          <div>
            <button
              onClick={() => setMobileVouchersOpen((v) => !v)}
              aria-expanded={mobileVouchersOpen}
              className="flex items-center justify-between w-full text-left py-2 px-3 text-base font-medium rounded-lg transition-colors text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              {t('nav.vouchers')}
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileVouchersOpen ? 'rotate-180' : ''}`} />
            </button>
            {mobileVouchersOpen && (
              <div className="pl-4 mt-1 space-y-0.5 border-l-2 border-slate-100 dark:border-slate-800 ml-3">
                <IntlLink
                  href="/vouchers"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1.5 px-3 text-sm font-semibold text-[#0B5198] dark:text-sky-400"
                >
                  {t('nav.exploreAllVouchers')}
                </IntlLink>
                {voucherVendorItems.map((item) => (
                  <IntlLink
                    key={item.id}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-1.5 px-3 text-sm text-slate-600 dark:text-slate-300 hover:text-[#0B5198] dark:hover:text-sky-400"
                  >
                    {item.label}
                  </IntlLink>
                ))}
              </div>
            )}
          </div>

          <IntlLink
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className={`block w-full text-left py-2 px-3 text-base font-medium rounded-lg transition-colors ${
              activeSection === 'about'
                ? 'text-[#0B5198] dark:text-sky-400 bg-sky-50 dark:bg-slate-800'
                : 'text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            {t('nav.about')}
          </IntlLink>
          <IntlLink
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className={`block w-full text-left py-2 px-3 text-base font-medium rounded-lg transition-colors ${
              activeSection === 'contact'
                ? 'text-[#0B5198] dark:text-sky-400 bg-sky-50 dark:bg-slate-800'
                : 'text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            {t('nav.contact')}
          </IntlLink>
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

    </header>

    <SearchModal
      isOpen={searchOpen}
      onClose={() => setSearchOpen(false)}
      onNavigate={(sectionId) => scrollToSection(sectionId)}
    />
    </>
  );
};
