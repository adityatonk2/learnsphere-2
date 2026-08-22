"use client";

import React from 'react';
import { Globe, Mail, Phone, MapPin, ShieldCheck, Instagram, Facebook, Linkedin, Youtube, MessageCircle } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const SOCIAL_LINKS = [
  { name: 'Instagram', href: 'https://instagram.com/nexmentorsolutions', Icon: Instagram },
  { name: 'Facebook', href: 'https://facebook.com/nexmentorsolutions', Icon: Facebook },
  { name: 'LinkedIn', href: 'https://linkedin.com/company/nexmentorsolutions', Icon: Linkedin },
  { name: 'YouTube', href: 'https://youtube.com/@nexmentorsolutions', Icon: Youtube },
  { name: 'WhatsApp', href: 'https://wa.me/918005558920', Icon: MessageCircle },
];

interface FooterProps {
  onOpenContact: () => void;
  setActiveSection: (section: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenContact, setActiveSection }) => {
  const containerRef = useScrollReveal({ y: 40, duration: 0.9 });
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
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#003B73] via-[#0B5198] to-[#0088FF] p-0.5">
                <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center p-1">
                  <svg viewBox="0 0 100 100" className="w-full h-full text-sky-400" fill="currentColor">
                    <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="8" />
                    <ellipse cx="50" cy="50" rx="45" ry="16" fill="none" stroke="#00A3FF" strokeWidth="6" transform="rotate(-25 50 50)" />
                    <circle cx="50" cy="50" r="14" fill="#00A3FF" />
                  </svg>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight text-white">
                  NexMentor
                </span>
                <span className="text-[9px] font-semibold tracking-widest text-slate-400 uppercase -mt-1">
                  Solutions
                </span>
              </div>
            </div>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm font-light">
              Global provider of enterprise corporate learning, authorized IT vendor certifications, and custom workforce upskilling solutions.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-sky-400 font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>ISO 9001:2015 & ISO 27001 Certified Training Partner</span>
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
                href="https://pinterest.com/nexmentorsolutions"
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
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={() => scrollTo('home')} className="hover:text-white transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('solutions')} className="hover:text-white transition-colors">
                  Our Solutions
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('training-modes')} className="hover:text-white transition-colors">
                  Learning Formats
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('courses')} className="hover:text-white transition-colors">
                  Course Directory
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('about')} className="hover:text-white transition-colors">
                  About Us
                </button>
              </li>
            </ul>
          </div>

          {/* Delivery Formats */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Delivery Options
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={() => scrollTo('training-modes')} className="hover:text-white transition-colors">
                  Fly-Me-A-Trainer (FMAT)
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('training-modes')} className="hover:text-white transition-colors">
                  Flexi (Self-Paced)
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('training-modes')} className="hover:text-white transition-colors">
                  1-on-1 Training
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('training-modes')} className="hover:text-white transition-colors">
                  Customised Programmes
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('training-modes')} className="hover:text-white transition-colors">
                  Virtual Live Online
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Corporate Headquarters
            </h4>
            <ul className="space-y-3 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span>100 Technology Square, Suite 800, Boston, MA 02139</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-sky-400 shrink-0" />
                <span>+1 (800) 555-8920</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <span>contact@nexmentorsolutions.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} NexMentor Solutions Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-400 cursor-pointer">Accreditations</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
