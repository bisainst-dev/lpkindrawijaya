"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n';
import { Language, CompanyProfile } from '@/lib/types';
import {
  Globe,
  Menu,
  X,
  PhoneCall,
  ShieldCheck,
  UserCheck,
  ChevronDown,
  ChevronRight,
  Check
} from 'lucide-react';

interface NavbarProps {
  company?: CompanyProfile;
  onOpenRegisterModal?: () => void;
  onOpenPartnerModal?: () => void;
}

export default function Navbar({ company, onOpenRegisterModal, onOpenPartnerModal }: NavbarProps) {
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { label: t("nav.home"), href: "#beranda" },
    { label: t("nav.about"), href: "#legalitas" },
    { label: t("nav.programs"), href: "#program" },
    { label: t("nav.jobs"), href: "#lowongan" },
  ];

  const languages: { code: Language; label: string; subLabel: string; flag: string }[] = [
    { code: 'id', label: 'Indonesia', subLabel: 'Bahasa Indonesia', flag: '🇮🇩' },
    { code: 'ja', label: '日本語', subLabel: 'Japanese', flag: '🇯🇵' },
    { code: 'en', label: 'English', subLabel: 'International', flag: '🇬🇧' }
  ];

  const currentLang = languages.find(l => l.code === language) || languages[0];

  return (
    <>

      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md py-2.5 border-b border-slate-100'
            : 'bg-white py-3.5 border-b border-slate-100'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="#beranda" className="flex items-center gap-3 group">
            {company?.logoUrl ? (
              <img 
                src={company.logoUrl} 
                alt={company.name || 'LPK INDRA WIJAYA'} 
                className="h-10 sm:h-11 w-auto max-w-[170px] object-contain rounded-lg group-hover:scale-105 transition"
              />
            ) : (
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white font-black text-lg shadow-md shadow-emerald-500/20 group-hover:scale-105 transition shrink-0">
                IW
              </div>
            )}

            {company?.showBrandText !== false && (
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 leading-tight">
                    {company?.name || 'LPK INDRA WIJAYA'}
                  </span>
                  {company?.brandTag && (
                    <span className="bg-orange-50 text-orange-700 text-[10px] font-bold px-1.5 py-0.5 rounded border border-orange-200">
                      {company.brandTag}
                    </span>
                  )}
                </div>
                <p className="text-[11px] font-medium text-slate-500 tracking-wide">
                  {company?.brandSubtitle || 'Indramayu Sending Organization to Japan'}
                </p>
              </div>
            )}
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3.5 py-2 rounded-lg text-sm font-medium text-slate-700 hover:text-emerald-600 hover:bg-emerald-50/50 transition whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={onOpenPartnerModal}
              className="px-3.5 py-2 rounded-lg text-sm font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200/60 transition ml-2 whitespace-nowrap"
            >
              🇯🇵 {t("nav.japan_partner")}
            </button>
          </nav>

          {/* Right Action: Language Dropdown & Register CTA */}
          <div className="hidden lg:flex items-center gap-3">

            {/* Language Dropdown */}
            <div className="relative" ref={langDropdownRef}>
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-xs font-bold text-slate-800 transition cursor-pointer"
                aria-expanded={langDropdownOpen}
                aria-label="Pilih Bahasa"
              >
                <Globe className="w-3.5 h-3.5 text-slate-500" />
                <span className="text-sm">{currentLang.flag}</span>
                <span className="font-semibold">{currentLang.label}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${langDropdownOpen ? 'rotate-180' : ''
                    }`}
                />
              </button>

              {/* Floating Dropdown Menu */}
              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                    Pilih Bahasa / Language
                  </div>
                  {languages.map((item) => {
                    const isSelected = language === item.code;
                    return (
                      <button
                        key={item.code}
                        onClick={() => {
                          setLanguage(item.code);
                          setLangDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs text-left transition cursor-pointer ${isSelected
                            ? 'bg-emerald-50 text-emerald-700 font-bold'
                            : 'text-slate-700 hover:bg-slate-50'
                          }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-base">{item.flag}</span>
                          <div>
                            <span className="block font-semibold leading-tight">{item.label}</span>
                            <span className="text-[10px] text-slate-400 font-normal">{item.subLabel}</span>
                          </div>
                        </div>
                        {isSelected && (
                          <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* CTA Register Button */}
            <button
              onClick={onOpenRegisterModal}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-sm shadow-md shadow-orange-500/25 hover:shadow-lg hover:shadow-orange-500/35 hover:-translate-y-0.5 active:translate-y-0 transition cursor-pointer whitespace-nowrap"
            >
              {t("nav.register_btn")}
            </button>
          </div>

          {/* Mobile Menu & Language Dropdown */}
          <div className="flex items-center gap-2 xl:hidden">

            {/* Mobile Language Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800"
              >
                <span>{currentLang.flag}</span>
                <span className="text-[11px]">{currentLang.code.toUpperCase()}</span>
                <ChevronDown className="w-3 h-3 text-slate-500" />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-xl border border-slate-100 py-1 z-50">
                  {languages.map((item) => (
                    <button
                      key={item.code}
                      onClick={() => {
                        setLanguage(item.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left ${language === item.code ? 'bg-emerald-50 text-emerald-700 font-bold' : 'text-slate-700 hover:bg-slate-50'
                        }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{item.flag}</span>
                        <span>{item.label}</span>
                      </span>
                      {language === item.code && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-hidden"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 shadow-xl animate-in fade-in duration-200">
            <div className="space-y-1 mb-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2.5 rounded-lg text-base font-medium text-slate-800 hover:bg-emerald-50 hover:text-emerald-700"
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPartnerModal?.();
                }}
                className="w-full text-left px-3 py-2.5 rounded-lg text-base font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 flex items-center justify-between"
              >
                <span>🇯🇵 {t("nav.japan_partner")}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenRegisterModal?.();
                }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-center shadow-md shadow-orange-500/25"
              >
                {t("nav.register_btn")}
              </button>

              <div className="flex items-center justify-between text-xs text-slate-500 px-1 pt-1">
                <span>📍 Lohbener, Indramayu</span>
                <Link href="/admin/login" className="text-blue-600 hover:underline">
                  {t("nav.admin")}
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
