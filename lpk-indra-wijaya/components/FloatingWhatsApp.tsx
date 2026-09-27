"use client";

import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

interface FloatingWhatsAppProps {
  phone: string;
  defaultMessage: string;
}

export default function FloatingWhatsApp({ phone, defaultMessage }: FloatingWhatsAppProps) {
  const [isOpen, setIsOpen] = useState(false);

  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Tooltip popover */}
      {isOpen && (
        <div className="mb-3 bg-white rounded-2xl p-4 shadow-2xl border border-slate-200 w-72 text-slate-800 text-xs animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-bold text-slate-900">Admin LPK Indra Wijaya</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="mt-2 text-slate-600 leading-relaxed">
            Konnichiwa! Ada yang bisa kami bantu seputar program pelatihan dan lowongan kerja resmi ke Jepang di Indramayu?
          </p>
          <a
            href={waUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-3 block w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-center shadow-sm transition"
          >
            Mulai Chat WhatsApp
          </a>
        </div>
      )}

      {/* Floating Button */}
      <div className="flex items-center gap-2">
        {!isOpen && (
          <span className="hidden sm:inline-block bg-slate-900 text-white text-xs font-bold py-1.5 px-3 rounded-full shadow-lg border border-slate-800 animate-bounce">
            Konsultasi Gratis Jepang 💬
          </span>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl shadow-emerald-600/30 flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer"
          aria-label="Chat WhatsApp"
        >
          <MessageCircle className="w-7 h-7" />
        </button>
      </div>
    </div>
  );
}
