"use client";

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n';
import { CompanyProfile } from '@/lib/types';
import { MapPin, Phone, Mail, Clock, ShieldCheck, Instagram, Facebook, Youtube, ExternalLink } from 'lucide-react';

interface FooterProps {
  company: CompanyProfile;
}

export default function Footer({ company }: FooterProps) {
  const { t, tObj } = useLanguage();

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs sm:text-sm pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1: About Brand (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              {company?.logoUrl ? (
                <img 
                  src={company.logoUrl} 
                  alt={company.name || 'LPK INDRA WIJAYA'} 
                  className="h-10 w-auto max-w-[150px] object-contain rounded-lg bg-white/90 p-1"
                />
              ) : (
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white font-black text-lg">
                  IW
                </div>
              )}
              {company?.showBrandText !== false && (
                <div>
                  <span className="font-black text-base text-white tracking-tight block">
                    {company?.name || 'LPK INDRA WIJAYA'}
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium">
                    {company?.brandSubtitle || 'Sending Organization Resmi ke Jepang'}
                  </span>
                </div>
              )}
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              {tObj(company.description)}
            </p>

            {/* License Badges */}
            <div className="space-y-1.5 pt-2 text-[11px] text-slate-300">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>Izin SO Kemenaker: <strong className="text-white font-mono">{company.soLicenseNumber}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                <span>Izin LPK Disnaker: <strong className="text-white font-mono">{company.disnakerLicenseNumber}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                <span>VIN Kemnaker: <strong className="text-white font-mono">{company.vinNumber}</strong></span>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase">
              {t("footer.quick_links")}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#beranda" className="hover:text-emerald-400 transition">
                  {t("nav.home")}
                </a>
              </li>
              <li>
                <a href="#legalitas" className="hover:text-emerald-400 transition">
                  {t("nav.about")}
                </a>
              </li>
              <li>
                <a href="#program" className="hover:text-emerald-400 transition">
                  {t("nav.programs")}
                </a>
              </li>
              <li>
                <a href="#lowongan" className="hover:text-emerald-400 transition">
                  {t("nav.jobs")}
                </a>
              </li>

              <li>
                <Link href="/admin/login" className="text-orange-400 hover:underline">
                  Portal CMS Admin LPK →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Address (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase">
              {t("footer.contact_title")}
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span>
                  {company.address}, {company.district}, {company.regency}, {company.province} {company.postalCode}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Telp / WA: {company.phone} / {company.whatsapp}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>Email: {company.email}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>{tObj(company.operatingHours)}</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href={company.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-red-600 text-white flex items-center justify-center transition"
                title="Instagram LPK Indra Wijaya"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={company.socials.facebook}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-blue-600 text-white flex items-center justify-center transition"
                title="Facebook LPK Indra Wijaya"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={company.socials.youtube}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-red-700 text-white flex items-center justify-center transition"
                title="YouTube LPK Indra Wijaya"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-8 text-center text-xs text-slate-500">
          <p>{t("footer.copyright")}</p>
        </div>

      </div>
    </footer>
  );
}
