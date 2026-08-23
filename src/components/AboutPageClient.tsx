"use client";

import React, { useState } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { AboutSection } from './AboutSection';
import { LeadershipSection } from './LeadershipSection';
import { MissionVisionValuesSection } from './MissionVisionValuesSection';
import { TestimonialsSection } from './TestimonialsSection';
import { PartnerCTASection } from './PartnerCTASection';
import { ContactModal } from './ContactModal';
import { PartnerModal } from './PartnerModal';

export const AboutPageClient: React.FC = () => {
  const [activeSection, setActiveSection] = useState('about');
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [contactDefaultSubject, setContactDefaultSubject] = useState<string>('');
  const [isPartnerOpen, setIsPartnerOpen] = useState(false);

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
        <AboutSection onOpenContact={() => handleOpenContact('Corporate Partnership')} />
        <LeadershipSection />
        <MissionVisionValuesSection />
        <TestimonialsSection />
        <PartnerCTASection onOpenPartnerForm={() => setIsPartnerOpen(true)} />
      </main>

      <Footer onOpenContact={() => handleOpenContact()} setActiveSection={setActiveSection} />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        defaultSubject={contactDefaultSubject}
      />

      <PartnerModal isOpen={isPartnerOpen} onClose={() => setIsPartnerOpen(false)} />
    </div>
  );
};
