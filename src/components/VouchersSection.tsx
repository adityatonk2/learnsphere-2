"use client";

import React, { useState } from 'react';
import { ChevronRight, Ticket } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { VOUCHERS_DATA } from '../data/vouchersData';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface VouchersSectionProps {
  initialVendorId?: string;
}

const formatPrice = (price: number, currency: string) => {
  try {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency, maximumFractionDigits: 0 }).format(price);
  } catch {
    return `${currency} ${price}`;
  }
};

export const VouchersSection: React.FC<VouchersSectionProps> = ({ initialVendorId }) => {
  const t = useTranslations('Vouchers');
  const containerRef = useScrollReveal({ y: 50, duration: 0.9 });
  const [selectedVendorId, setSelectedVendorId] = useState<string>(
    initialVendorId && VOUCHERS_DATA.some((v) => v.id === initialVendorId) ? initialVendorId : VOUCHERS_DATA[0].id
  );

  const selectedVendor = VOUCHERS_DATA.find((v) => v.id === selectedVendorId) || VOUCHERS_DATA[0];
  const totalVouchers = VOUCHERS_DATA.reduce((n, v) => n + v.vouchers.length, 0);

  return (
    <section className="py-20 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border-t border-slate-100 dark:border-slate-800">
      <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 gsap-reveal">
          <span className="text-[#0B5198] dark:text-sky-400 font-bold text-sm uppercase tracking-wider block mb-1">{t('eyebrow')}</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0A2540] dark:text-white">{t('heading')}</h1>
          <p className="text-slate-500 dark:text-slate-400 text-base mt-1">{t('subtitle', { count: totalVouchers })}</p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[400px] gsap-reveal">
          <div className="md:col-span-3 lg:col-span-3 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 py-2">
            <div className="px-4 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">{t('providersLabel')}</div>
            <div className="space-y-0.5">
              {VOUCHERS_DATA.map((vendor) => {
                const isSelected = selectedVendorId === vendor.id;
                return (
                  <button
                    key={vendor.id}
                    onClick={() => setSelectedVendorId(vendor.id)}
                    className={`w-full text-left px-5 py-3 text-sm font-medium transition-all flex items-center justify-between group border-l-4 ${
                      isSelected ? 'bg-[#EAF5FC] text-[#0B5198] dark:text-sky-400 font-bold border-[#0B5198]' : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white border-transparent'
                    }`}
                  >
                    <span className="flex items-center gap-2">{vendor.name}</span>
                    <span className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-400 font-normal">{vendor.vouchers.length}</span>
                      <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-[#0B5198] dark:text-sky-400 translate-x-0.5' : 'text-slate-400 group-hover:translate-x-0.5'}`} />
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="md:col-span-9 lg:col-span-9 p-6 sm:p-10">
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-slate-800 text-[#0B5198] dark:text-sky-400 flex items-center justify-center font-bold text-lg border border-sky-100 dark:border-sky-900/50">
                  {selectedVendor.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#0A2540] dark:text-white">{t('vendorVouchersTitle', { vendor: selectedVendor.name })}</h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{t('vouchersCount', { count: selectedVendor.vouchers.length })}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {selectedVendor.vouchers.map((voucher) => (
                <div
                  key={voucher.id}
                  className="rounded-xl border border-slate-200 dark:border-slate-800 p-5 flex flex-col justify-between hover:shadow-md hover:border-sky-200 dark:hover:border-sky-900/50 transition-all"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Ticket className="w-4 h-4 text-[#0B5198] dark:text-sky-400" />
                      {voucher.code && (
                        <span className="text-[11px] font-mono font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">{voucher.code}</span>
                      )}
                    </div>
                    <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100 leading-snug">{voucher.title}</h3>
                    <p className="text-lg font-extrabold text-[#0B5198] dark:text-sky-400 mt-3">
                      {voucher.price != null && voucher.currency ? formatPrice(voucher.price, voucher.currency) : t('onRequest')}
                    </p>
                  </div>
                  <Link
                    href={`/contact?subject=${encodeURIComponent(t('requestSubject', { title: voucher.title }))}`}
                    className="mt-4 text-center border border-[#0B5198] dark:border-sky-400 text-[#0B5198] dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-slate-800 text-sm font-semibold py-2.5 rounded-lg transition-colors"
                  >
                    {t('requestButton')}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
