"use client";

import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, Users, Search, Download, Inbox, Building2, Handshake } from 'lucide-react';

export interface Lead {
  id: string;
  type: 'partner' | 'customer';
  name: string;
  email: string;
  company: string | null;
  message: string | null;
  createdAt: string;
}

type FilterValue = 'all' | Lead['type'];

const FILTERS: { value: FilterValue; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'customer', label: 'Customer' },
  { value: 'partner', label: 'Partner' },
];

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'UTC',
  });
}

function csvCell(value: string): string {
  const escaped = value.replace(/"/g, '""');
  return /[",\n]/.test(value) ? `"${escaped}"` : escaped;
}

function downloadCsv(leads: Lead[]) {
  const header = ['Type', 'Name', 'Email', 'Company', 'Message', 'Submitted'];
  const rows = leads.map((lead) => [
    lead.type,
    lead.name,
    lead.email,
    lead.company || '',
    (lead.message || '').replace(/\n/g, ' '),
    lead.createdAt ? formatDate(lead.createdAt) : '',
  ]);

  const csv = [header, ...rows].map((row) => row.map(csvCell).join(',')).join('\n');
  const blob = new Blob([`﻿${csv}`], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `nexmentor-leads-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export const AdminDashboardClient: React.FC<{ leads: Lead[] }> = ({ leads }) => {
  const router = useRouter();
  const [filter, setFilter] = useState<FilterValue>('all');
  const [search, setSearch] = useState('');
  const [loggingOut, setLoggingOut] = useState(false);

  const counts = useMemo(
    () => ({
      all: leads.length,
      customer: leads.filter((l) => l.type === 'customer').length,
      partner: leads.filter((l) => l.type === 'partner').length,
    }),
    [leads]
  );

  const filteredLeads = useMemo(() => {
    const byType = filter === 'all' ? leads : leads.filter((lead) => lead.type === filter);
    const query = search.trim().toLowerCase();
    if (!query) return byType;
    return byType.filter(
      (lead) =>
        lead.name.toLowerCase().includes(query) ||
        lead.email.toLowerCase().includes(query) ||
        (lead.company || '').toLowerCase().includes(query)
    );
  }, [leads, filter, search]);

  const handleLogout = async () => {
    setLoggingOut(true);
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#0B5198]/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-[#0B5198] dark:text-sky-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#0A2540] dark:text-white">Leads Dashboard</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {leads.length} total lead{leads.length === 1 ? '' : 's'}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Log Out</span>
          </button>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5 text-slate-500 dark:text-slate-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#0A2540] dark:text-white leading-none">{counts.all}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Total Leads</p>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-950/40 flex items-center justify-center shrink-0">
              <Building2 className="w-5 h-5 text-sky-600 dark:text-sky-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#0A2540] dark:text-white leading-none">{counts.customer}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Customer Leads</p>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-50 dark:bg-violet-950/40 flex items-center justify-center shrink-0">
              <Handshake className="w-5 h-5 text-violet-600 dark:text-violet-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#0A2540] dark:text-white leading-none">{counts.partner}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Partner Leads</p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
          <div className="flex items-center gap-2">
            {FILTERS.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setFilter(value)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                  filter === value
                    ? 'bg-[#0052CC] text-white'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {label}
                <span className="ml-1.5 opacity-70">{counts[value]}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search name, email, company…"
                className="w-56 pl-8 pr-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#0B5198] focus:border-transparent transition-shadow"
              />
            </div>
            <button
              onClick={() => downloadCsv(filteredLeads)}
              disabled={filteredLeads.length === 0}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-[#0052CC] hover:bg-[#003B99] disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors shrink-0"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download CSV</span>
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50">
                  <th className="text-left px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Type</th>
                  <th className="text-left px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Name</th>
                  <th className="text-left px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Email</th>
                  <th className="text-left px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Company</th>
                  <th className="text-left px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Message</th>
                  <th className="text-left px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Submitted</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-14">
                      <div className="flex flex-col items-center justify-center gap-2 text-slate-400">
                        <Inbox className="w-8 h-8" />
                        <p className="text-sm">No leads found.</p>
                      </div>
                    </td>
                  </tr>
                )}
                {filteredLeads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="border-b border-slate-100 dark:border-slate-800/60 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex px-2 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wide ${
                          lead.type === 'partner'
                            ? 'bg-violet-100 text-violet-700 dark:bg-violet-950/50 dark:text-violet-300'
                            : 'bg-sky-100 text-sky-700 dark:bg-sky-950/50 dark:text-sky-300'
                        }`}
                      >
                        {lead.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-800 dark:text-slate-100 font-medium whitespace-nowrap">{lead.name}</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300 whitespace-nowrap">{lead.email}</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300 whitespace-nowrap">{lead.company || '—'}</td>
                    <td className="px-4 py-3 text-slate-500 dark:text-slate-400 max-w-xs">
                      <p className="truncate" title={lead.message || undefined}>
                        {lead.message || '—'}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-slate-500 dark:text-slate-400 whitespace-nowrap">
                      {lead.createdAt ? formatDate(lead.createdAt) : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
