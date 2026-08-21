"use client";

import React, { useState } from 'react';
import { X, CheckCircle2, Send, Building2, Mail, Phone, Globe, User, Handshake } from 'lucide-react';
import { PartnerFormData } from '../types';

interface PartnerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PartnerModal: React.FC<PartnerModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<PartnerFormData>({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    website: '',
    partnershipType: 'Corporate Training Reseller',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    setAgreedToTerms(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <span className="text-xs font-bold text-[#0B5198] uppercase tracking-wider flex items-center gap-1.5 mb-1">
                <Handshake className="w-3.5 h-3.5" />
                Partner Program
              </span>
              <h3 className="text-2xl font-bold text-[#0A2540]">
                Become a Partner
              </h3>
              <p className="text-slate-500 text-xs mt-1">
                Tell us about your company and we'll get back with partnership terms and next steps.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Company Name *
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="Acme Training Partners Pvt. Ltd."
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0B5198] focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Contact Person *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="Jane Doe, Business Development Head"
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0B5198] focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Work Email *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="jane@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0B5198] focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0B5198] focus:bg-white"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Company Website
                </label>
                <div className="relative">
                  <Globe className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="url"
                    placeholder="https://www.company.com"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0B5198] focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Partnership Type
                </label>
                <select
                  value={formData.partnershipType}
                  onChange={(e) => setFormData({ ...formData, partnershipType: e.target.value })}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0B5198] focus:bg-white"
                >
                  <option value="Corporate Training Reseller">Corporate Training Reseller</option>
                  <option value="Content / Courseware Partner">Content / Courseware Partner</option>
                  <option value="Affiliate / Referral Partner">Affiliate / Referral Partner</option>
                  <option value="Technology Integration Partner">Technology Integration Partner</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tell us about the partnership
                </label>
                <textarea
                  rows={3}
                  placeholder="Briefly describe your company and the partnership you have in mind..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0B5198] focus:bg-white"
                />
              </div>
            </div>

            <label className="flex items-start gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded border-slate-300 text-[#0B5198] focus:ring-2 focus:ring-[#0B5198] shrink-0"
              />
              <span className="text-xs text-slate-500 leading-relaxed">
                I agree to the{' '}
                <a href="/privacy-policy" target="_blank" className="text-[#0B5198] font-semibold hover:underline">
                  Privacy Policy
                </a>{' '}
                and{' '}
                <a href="/terms-of-service" target="_blank" className="text-[#0B5198] font-semibold hover:underline">
                  Terms &amp; Conditions
                </a>
                . *
              </span>
            </label>

            <button
              type="submit"
              disabled={!agreedToTerms}
              className="w-full bg-[#0052CC] hover:bg-[#003B99] disabled:bg-slate-300 disabled:cursor-not-allowed disabled:hover:bg-slate-300 text-white py-3.5 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <Send className="w-4 h-4" />
              <span>Submit Partnership Request</span>
            </button>
          </form>
        ) : (
          <div className="py-10 text-center space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-[#0A2540]">
              Request Received!
            </h3>
            <p className="text-slate-600 text-sm max-w-sm mx-auto">
              Thank you, <strong className="text-slate-800">{formData.contactPerson}</strong>. Our partnerships team will reach out to <span className="underline">{formData.email}</span> within 2 business days.
            </p>
            <div className="pt-4">
              <button
                onClick={handleClose}
                className="bg-slate-900 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-800 transition-colors"
              >
                Close Window
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
