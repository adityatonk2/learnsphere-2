"use client";

import React, { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Header } from './Header';
import { Footer } from './Footer';
import { CourseDirectorySection } from './CourseDirectorySection';
import { ContactModal } from './ContactModal';

const CourseDirectoryWithVendorParam: React.FC<{ onOpenContact: (courseName?: string) => void }> = ({ onOpenContact }) => {
  const searchParams = useSearchParams();
  const initialVendorId = searchParams.get('vendor') || undefined;
  return <CourseDirectorySection onOpenContact={onOpenContact} initialVendorId={initialVendorId} />;
};

export const CoursesPageClient: React.FC = () => {
  const [activeSection, setActiveSection] = useState('courses');
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [contactDefaultSubject, setContactDefaultSubject] = useState<string>('');

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
        <Suspense fallback={null}>
          <CourseDirectoryWithVendorParam onOpenContact={(courseName) => handleOpenContact(courseName)} />
        </Suspense>
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
