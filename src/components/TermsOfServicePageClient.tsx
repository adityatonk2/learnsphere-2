"use client";

import React from 'react';
import { useTranslations } from 'next-intl';
import { LegalPageShell, LegalSection } from './LegalPageShell';

const SECTION_IDS = [
  'acceptance',
  'services',
  'enrollmentAndPayment',
  'cancellations',
  'vouchers',
  'intellectualProperty',
  'userConduct',
  'disclaimers',
  'trademarks',
  'governingLaw',
  'changes',
  'contactUs',
] as const;

export const TermsOfServicePageClient: React.FC = () => {
  const t = useTranslations('TermsOfService');
  const tLegal = useTranslations('LegalPage');

  return (
    <LegalPageShell eyebrow={tLegal('eyebrow')} title={t('heading')} lastUpdated="August 23, 2026">
      {SECTION_IDS.map((id) => (
        <LegalSection key={id} heading={t(`sections.${id}.heading`)}>
          <p>{t(`sections.${id}.body`)}</p>
        </LegalSection>
      ))}
    </LegalPageShell>
  );
};
