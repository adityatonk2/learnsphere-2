"use client";

import React, { useEffect, useState } from 'react';
import { CheckCircle2, Send, Building, Mail, Phone, User } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ContactFormData } from '../types';
import { NotARobotCheckbox } from './NotARobotCheckbox';
import { DocumentUploadField } from './DocumentUploadField';

interface ContactFormProps {
  defaultSubject?: string;
  variant?: 'compact' | 'page';
  onSuccess?: () => void;
  header?: React.ReactNode;
}

const TRAINING_MODE_VALUES = ['Fly-Me-A-Trainer (FMAT)', 'Flexi (Self-Paced)', '1-on-1 Training', 'Customised Programmes', 'Virtual Live Online'] as const;
const TRAINING_MODE_KEYS = ['fmat', 'flexi', 'oneOnOne', 'customised', 'virtual'] as const;
const PARTICIPANTS_VALUES = ['1 Employee', '2-5 Employees', '5-10 Employees', '10-25 Employees', '50+ Enterprise Cohort'] as const;
const PARTICIPANTS_KEYS = ['one', 'twoToFive', 'fiveToTen', 'tenToTwentyFive', 'fiftyPlus'] as const;

const inputClass =
  'w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0B5198] focus:border-transparent focus:bg-white dark:focus:bg-slate-900 transition-shadow';
const labelClass = 'block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5';
const fieldsetLabelClass = 'text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3 block';

export const ContactForm: React.FC<ContactFormProps> = ({ defaultSubject, variant = 'compact', onSuccess, header }) => {
  const t = useTranslations('ContactModal');
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    trainingMode: 'Fly-Me-A-Trainer (FMAT)',
    participants: '5-10 Employees',
    message: '',
    tocDocument: null,
  });
  const [submitted, setSubmitted] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [notRobot, setNotRobot] = useState(false);

  useEffect(() => {
    if (defaultSubject) {
      setFormData((prev) => ({
        ...prev,
        message: t('inquiryRegardingPrefix', { subject: defaultSubject }),
      }));
    }
  }, [defaultSubject, t]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    onSuccess?.();
  };

  if (submitted) {
    return (
      <div className="py-10 text-center space-y-4 animate-in zoom-in-95 duration-200">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h3 className="text-2xl font-bold text-[#0A2540] dark:text-white">{t('successHeading')}</h3>
        <p className="text-slate-600 dark:text-slate-300 text-sm max-w-sm mx-auto">
          {t('successMessagePart1')} <strong className="text-slate-800 dark:text-slate-100">{formData.fullName}</strong>.{' '}
          {t('successMessagePart2')} <span className="underline">{formData.email}</span> {t('successMessagePart3')}
        </p>
        <div className="pt-4">
          <button
            onClick={() => {
              setSubmitted(false);
              setAgreedToTerms(false);
              setNotRobot(false);
              setFormData((prev) => ({ ...prev, tocDocument: null }));
            }}
            className="bg-slate-900 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-800 transition-colors"
          >
            {t('closeButton')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {header}
      <form onSubmit={handleSubmit} className={variant === 'page' ? 'space-y-8' : 'space-y-5'}>
      <fieldset className="space-y-4">
        {variant === 'page' && <legend className={fieldsetLabelClass}>{t('sections.contactDetails')}</legend>}
        <div>
          <label htmlFor="contact-fullName" className={labelClass}>
            {t('fields.fullName.label')}
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              id="contact-fullName"
              type="text"
              required
              aria-required="true"
              placeholder={t('fields.fullName.placeholder')}
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className={inputClass}
            />
          </div>
        </div>

        <div className={variant === 'page' ? 'grid grid-cols-1 sm:grid-cols-2 gap-5' : 'grid grid-cols-1 sm:grid-cols-2 gap-4'}>
          <div>
            <label htmlFor="contact-email" className={labelClass}>
              {t('fields.email.label')}
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                id="contact-email"
                type="email"
                required
                aria-required="true"
                placeholder={t('fields.email.placeholder')}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label htmlFor="contact-phone" className={labelClass}>
              {t('fields.phone.label')}
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                id="contact-phone"
                type="tel"
                placeholder={t('fields.phone.placeholder')}
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={inputClass}
              />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="contact-company" className={labelClass}>
            {t('fields.company.label')}
          </label>
          <div className="relative">
            <Building className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              id="contact-company"
              type="text"
              required
              aria-required="true"
              placeholder={t('fields.company.placeholder')}
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              className={inputClass}
            />
          </div>
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        {variant === 'page' && <legend className={fieldsetLabelClass}>{t('sections.preferences')}</legend>}
        <div className={variant === 'page' ? 'grid grid-cols-1 sm:grid-cols-2 gap-5' : 'grid grid-cols-1 sm:grid-cols-2 gap-4'}>
          <div>
            <label htmlFor="contact-trainingMode" className={labelClass}>
              {t('fields.trainingMode.label')}
            </label>
            <select
              id="contact-trainingMode"
              value={formData.trainingMode}
              onChange={(e) => setFormData({ ...formData, trainingMode: e.target.value })}
              className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0B5198] focus:border-transparent focus:bg-white dark:focus:bg-slate-900 transition-shadow"
            >
              {TRAINING_MODE_VALUES.map((value, i) => (
                <option key={value} value={value}>
                  {t(`trainingModeOptions.${TRAINING_MODE_KEYS[i]}`)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="contact-participants" className={labelClass}>
              {t('fields.participants.label')}
            </label>
            <select
              id="contact-participants"
              value={formData.participants}
              onChange={(e) => setFormData({ ...formData, participants: e.target.value })}
              className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0B5198] focus:border-transparent focus:bg-white dark:focus:bg-slate-900 transition-shadow"
            >
              {PARTICIPANTS_VALUES.map((value, i) => (
                <option key={value} value={value}>
                  {t(`participantsOptions.${PARTICIPANTS_KEYS[i]}`)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="contact-message" className={labelClass}>
            {t('fields.message.label')}
          </label>
          <textarea
            id="contact-message"
            rows={variant === 'page' ? 5 : 3}
            placeholder={t('fields.message.placeholder')}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0B5198] focus:border-transparent focus:bg-white dark:focus:bg-slate-900 transition-shadow"
          />
        </div>

        <DocumentUploadField
          id="contact-toc"
          label={t('fields.tocDocument.label')}
          placeholder={t('fields.tocDocument.placeholder')}
          hint={t('fields.tocDocument.hint')}
          removeLabel={t('fields.tocDocument.remove')}
          file={formData.tocDocument}
          onChange={(file) => setFormData({ ...formData, tocDocument: file })}
          required
        />
      </fieldset>

      <label className="flex items-start gap-2.5 cursor-pointer select-none">
        <input
          type="checkbox"
          required
          aria-required="true"
          checked={agreedToTerms}
          onChange={(e) => setAgreedToTerms(e.target.checked)}
          className="mt-0.5 w-4 h-4 rounded border-slate-300 dark:border-slate-700 text-[#0B5198] dark:text-sky-400 focus:ring-2 focus:ring-[#0B5198] shrink-0"
        />
        <span className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          {t('privacy.prefix')}{' '}
          <Link href="/privacy-policy" target="_blank" className="text-[#0B5198] dark:text-sky-400 font-semibold hover:underline">
            {t('privacy.privacyPolicy')}
          </Link>{' '}
          {t('privacy.and')}{' '}
          <Link href="/terms-of-service" target="_blank" className="text-[#0B5198] dark:text-sky-400 font-semibold hover:underline">
            {t('privacy.termsConditions')}
          </Link>
          {t('privacy.suffix')}
        </span>
      </label>

      <NotARobotCheckbox
        id="contact-not-robot"
        checked={notRobot}
        onChange={setNotRobot}
        label={t('notARobot')}
        verifyingLabel={t('verifying')}
      />

      <button
        type="submit"
        disabled={!agreedToTerms || !notRobot || !formData.tocDocument}
        className="w-full bg-[#0052CC] hover:bg-[#003B99] disabled:bg-slate-300 disabled:cursor-not-allowed disabled:hover:bg-slate-300 text-white py-3.5 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 active:scale-95"
      >
        <Send className="w-4 h-4" />
        <span>{t('submitButton')}</span>
      </button>
      </form>
    </>
  );
};
