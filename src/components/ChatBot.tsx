"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { X, Send, Loader2, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export const ChatBot: React.FC = () => {
  const t = useTranslations('ChatBot');
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ role: 'model', text: t('greeting') }]);
    }
  }, [open, messages.length, t]);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, loading]);

  const sendMessage = async (override?: string) => {
    const text = (override ?? input).trim();
    if (!text || loading) return;

    const nextMessages: ChatMessage[] = [...messages, { role: 'user', text }];
    setMessages(nextMessages);
    setInput('');
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: nextMessages.slice(0, -1),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || t('errorMessage'));
      }
      setMessages((prev) => [...prev, { role: 'model', text: data.reply }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : t('errorMessage'));
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating toggle button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? t('closeLabel') : t('openLabel')}
        className={`fixed bottom-5 right-5 z-[60] w-14 h-14 rounded-full bg-gradient-to-tr from-[#003B73] via-[#0B5198] to-[#0088FF] shadow-xl hover:scale-105 active:scale-95 transition-transform items-center justify-center border-2 border-white/20 ${
          open ? 'hidden sm:flex' : 'flex'
        }`}
      >
        {open ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden p-0.5">
            <Image
              src="/assets/images/chatbot-icon.png"
              alt=""
              width={197}
              height={137}
              className="w-full h-full object-contain"
            />
          </div>
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed inset-0 sm:inset-auto sm:bottom-24 sm:right-5 z-[59] w-full h-full sm:w-[380px] sm:h-[560px] sm:max-h-[calc(100vh-7rem)] flex flex-col bg-white dark:bg-slate-900 sm:rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3.5 bg-gradient-to-r from-[#0B5198] to-[#083b6e] text-white shrink-0">
            <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center overflow-hidden p-0.5 shrink-0">
              <Image
                src="/assets/images/chatbot-icon.png"
                alt=""
                width={197}
                height={137}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold truncate">{t('title')}</p>
              <p className="text-[11px] text-sky-200 truncate">{t('subtitle')}</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label={t('closeLabel')}
              className="p-1.5 rounded-lg hover:bg-white/10 transition-colors shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cute CTA strip */}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="flex items-center justify-center gap-1.5 px-4 py-2 bg-sky-50 dark:bg-sky-950/40 border-b border-sky-100 dark:border-slate-800 text-[11px] font-medium text-[#0B5198] dark:text-sky-300 hover:bg-sky-100 dark:hover:bg-sky-950/70 transition-colors shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('ctaText')}</span>
            <span className="font-bold underline underline-offset-2">{t('ctaLinkLabel')}</span>
          </Link>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-slate-50 dark:bg-slate-950">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === 'user'
                      ? 'bg-[#0052CC] text-white rounded-br-sm'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-bl-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {messages.length === 1 && !loading && (
              <div className="pt-1">
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  {t('suggestedPromptsHeading')}
                </p>
                <div className="flex flex-wrap gap-2">
                  {t.raw('suggestedPrompts').map((prompt: string) => (
                    <button
                      key={prompt}
                      onClick={() => sendMessage(prompt)}
                      className="px-3 py-1.5 rounded-full text-xs font-medium bg-white dark:bg-slate-800 border border-sky-200 dark:border-slate-700 text-[#0B5198] dark:text-sky-300 hover:bg-sky-50 dark:hover:bg-slate-700 hover:border-sky-300 transition-colors"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl rounded-bl-sm px-3.5 py-2.5 flex items-center gap-1.5">
                  <Loader2 className="w-3.5 h-3.5 text-slate-400 animate-spin" />
                  <span className="text-xs text-slate-400">{t('thinking')}</span>
                </div>
              </div>
            )}
            {error && (
              <div className="flex justify-start">
                <div className="max-w-[85%] px-3.5 py-2.5 rounded-2xl text-xs bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/50">
                  {error}
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t('placeholder')}
                disabled={loading}
                className="flex-1 px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0B5198] focus:border-transparent disabled:opacity-60"
              />
              <button
                onClick={() => sendMessage()}
                disabled={loading || !input.trim()}
                aria-label={t('sendLabel')}
                className="w-10 h-10 shrink-0 rounded-xl bg-[#0052CC] hover:bg-[#003B99] disabled:bg-slate-300 disabled:cursor-not-allowed text-white flex items-center justify-center transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[10px] text-slate-400 text-center mt-2">{t('disclaimer')}</p>
          </div>
        </div>
      )}
    </>
  );
};
