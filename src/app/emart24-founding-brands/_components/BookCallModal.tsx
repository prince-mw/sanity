'use client';

import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, CheckCircle2, Loader2 } from 'lucide-react';
import { RESPONSE_TIME } from '../_data';
import { firstName, isValidEmail, isValidPhone, submitLead } from './submitLead';

interface Props {
  open: boolean;
  onClose: () => void;
  audience: 'brand' | 'agency';
  defaultCompany?: string;
}

const inputCls =
  'w-full rounded-md border border-[#c8cec9] bg-white px-3 py-2.5 text-[#15181a] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#127a4a] focus:border-transparent';

export const BookCallModal: React.FC<Props> = ({ open, onClose, audience, defaultCompany = '' }) => {
  const [name, setName] = useState('');
  const [company, setCompany] = useState(defaultCompany);
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState<string | null>(null);
  const firstInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!company && defaultCompany) setCompany(defaultCompany);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultCompany]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    const t = setTimeout(() => firstInput.current?.focus(), 50);
    return () => {
      window.removeEventListener('keydown', onKey);
      clearTimeout(t);
    };
  }, [open, onClose]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !company.trim() || !email.trim()) {
      setError('Please add your name, company and email.');
      return;
    }
    if (!isValidEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (whatsapp.trim() && !isValidPhone(whatsapp)) {
      setError('Please enter a valid WhatsApp number, or leave it empty.');
      return;
    }
    setError('');
    setSending(true);
    const res = await submitLead('bookCall', {
      audience: audience === 'agency' ? 'Agency' : 'Brand',
      name: name.trim(),
      company: company.trim(),
      email: email.trim(),
      whatsapp: whatsapp.trim(),
    });
    setSending(false);
    if (!res.ok) {
      setError(res.error || 'Something went wrong. Please try again.');
      return;
    }
    setDone(firstName(name));
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[120] flex items-end sm:items-center justify-center p-0 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-[#0d1311]/70 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="book-call-title"
            className="relative w-full sm:max-w-md bg-[#f4f6f3] rounded-t-2xl sm:rounded-2xl shadow-2xl p-6 sm:p-8"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: 'spring', damping: 26, stiffness: 300 }}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 p-1.5 rounded-full text-gray-500 hover:bg-gray-200 hover:text-[#15181a] cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {done !== null ? (
              <div className="text-center py-6" role="status">
                <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring' }}>
                  <CheckCircle2 className="w-14 h-14 mx-auto text-[#127a4a]" />
                </motion.div>
                <h2 className="mt-4 text-2xl font-bold text-[#15181a]">
                  Thank you{done ? `, ${done}` : ''}. We&apos;ll be in touch shortly.
                </h2>
                <p className="mt-3 text-[#596166]">Our team will contact you {RESPONSE_TIME} to set a time that suits you.</p>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-6 inline-flex px-5 py-2.5 rounded-md bg-[#15181a] text-white font-semibold cursor-pointer hover:bg-black"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate>
                <h2 id="book-call-title" className="text-2xl font-bold text-[#15181a] pr-8">
                  Book a 15-minute call
                </h2>
                <p className="mt-2 text-[#596166]">Tell us how to reach you and we&apos;ll set a time that suits you.</p>
                <div className="mt-6 space-y-4">
                  <label className="block">
                    <span className="block text-sm font-semibold text-[#15181a] mb-1.5">Your name</span>
                    <input ref={firstInput} className={inputCls} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" required />
                  </label>
                  <label className="block">
                    <span className="block text-sm font-semibold text-[#15181a] mb-1.5">Company</span>
                    <input className={inputCls} value={company} onChange={(e) => setCompany(e.target.value)} autoComplete="organization" required />
                  </label>
                  <label className="block">
                    <span className="block text-sm font-semibold text-[#15181a] mb-1.5">Email</span>
                    <input type="email" className={inputCls} value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required />
                  </label>
                  <label className="block">
                    <span className="block text-sm font-semibold text-[#15181a] mb-1.5">
                      WhatsApp number <span className="font-normal text-[#596166]">(optional)</span>
                    </span>
                    <input type="tel" className={inputCls} value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} autoComplete="tel" placeholder="+60" />
                  </label>
                </div>
                {error && (
                  <p className="mt-3 text-sm text-red-600" role="alert">
                    {error}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={sending}
                  id="emart24-book-call-submit"
                  className="mt-6 w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-md bg-[#127a4a] text-white font-bold text-base cursor-pointer hover:bg-[#0e6a3f] disabled:opacity-70"
                >
                  {sending && <Loader2 className="w-4 h-4 animate-spin" />}
                  Book my call
                </button>
                <p className="mt-3 text-center text-xs text-[#596166]">15 minutes. No obligation.</p>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
