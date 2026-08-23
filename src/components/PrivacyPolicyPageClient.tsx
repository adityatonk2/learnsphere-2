"use client";

import React from 'react';
import { useTranslations } from 'next-intl';
import { LegalPageShell, LegalSection } from './LegalPageShell';

const SECTION_IDS = [
  'introduction',
  'informationWeCollect',
  'howWeUseInformation',
  'cookies',
  'thirdPartyServices',
  'dataSecurity',
  'dataRetention',
  'yourRights',
  'childrensPrivacy',
  'changes',
  'contactUs',
] as const;

export const PrivacyPolicyPageClient: React.FC = () => {
  const t = useTranslations('PrivacyPolicy');
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
