"use client";

import React, { useState } from 'react';
import { useLanguage } from '@/lib/i18n';
import { X, CheckCircle, Send, Building2, Mail, Phone, User, Globe } from 'lucide-react';

interface PartnerInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PartnerInquiryModal({ isOpen, onClose }: PartnerInquiryModalProps) {
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    companyName: "",
    organizationType: "監理団体 (Supervising Org)" as any,
    country: "日本 (Japan)",
    contactPerson: "",
    position: "",
    email: "",
    phone: "",
    sectorNeeded: "介護 (Kaigo - Caregiver)",
    candidateCountNeeded: 10,
    targetArrivalPeriod: "2027年春 (Spring 2027)",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const res = await fetch('/api/mitra-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        throw new Error("送信に失敗しました。時間をおいて再度お試しください。");
      }

      setIsSuccess(true);
    } catch (err: any) {
      setErrorMsg(err.message || "通信エラーが発生しました。");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-slate-900">
              {t("inq.success_title")}
            </h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              {t("inq.success_desc")}
            </p>
            <div className="pt-4">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 transition"
              >
                閉じる (Close)
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full mb-1">
                <Globe className="w-3.5 h-3.5" />
                <span>FOR JAPANESE ENTERPRISES</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                {t("inq.modal_title")}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                {t("inq.modal_subtitle")}
              </p>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 text-red-700 text-xs font-semibold border border-red-200">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              
              {/* Company Name */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {t("inq.company_name")} *
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="例: 株式会社〇〇 / 〇〇協同組合"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-slate-900"
                  />
                </div>
              </div>

              {/* Org Type & Sector */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {t("inq.org_type")} *
                  </label>
                  <select
                    value={formData.organizationType}
                    onChange={(e) => setFormData({ ...formData, organizationType: e.target.value as any })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white text-slate-900"
                  >
                    <option value="監理団体 (Supervising Org)">監理団体 (Supervising Org)</option>
                    <option value="受入企業 (Accepting Company)">受入企業 (Accepting Company)</option>
                    <option value="登録支援機関 (Registered Support Org)">登録支援機関 (Registered Support Org)</option>
                    <option value="Lainnya">その他 (Other)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {t("inq.sector")} *
                  </label>
                  <select
                    value={formData.sectorNeeded}
                    onChange={(e) => setFormData({ ...formData, sectorNeeded: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white text-slate-900"
                  >
                    <option value="介護 (Kaigo - Caregiver)">特定技能1号・介護 (Caregiver)</option>
                    <option value="農業 (Agriculture)">特定技能1号・農業 (Agriculture)</option>
                    <option value="飲食料品製造 (Food Processing)">特定技能1号・飲食料品製造 (Food Processing)</option>
                    <option value="外食業 (Food Service)">特定技能1号・外食業 (Food Service)</option>
                    <option value="建設 (Construction)">特定技能 / 技能実習・建設 (Construction)</option>
                    <option value="製造・機械加工 (Manufacturing)">特定技能 / 技能実習・製造 (Manufacturing)</option>
                  </select>
                </div>
              </div>

              {/* Contact Person & Position */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {t("inq.contact_person")} *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="例: 山田 太郎"
                      value={formData.contactPerson}
                      onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {t("inq.position")}
                  </label>
                  <input
                    type="text"
                    placeholder="例: 専務理事 / 採用担当部長"
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-slate-900"
                  />
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {t("inq.email")} *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      placeholder="info@company.co.jp"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {t("inq.phone")} *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      placeholder="+81 3-XXXX-XXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-slate-900"
                    />
                  </div>
                </div>
              </div>

              {/* Candidate Count & Target Period */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {t("inq.count")}
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={formData.candidateCountNeeded}
                    onChange={(e) => setFormData({ ...formData, candidateCountNeeded: Number(e.target.value) })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {t("inq.period")}
                  </label>
                  <input
                    type="text"
                    placeholder="例: 2027年4月入社希望"
                    value={formData.targetArrivalPeriod}
                    onChange={(e) => setFormData({ ...formData, targetArrivalPeriod: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-slate-900"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {t("inq.message")}
                </label>
                <textarea
                  rows={3}
                  placeholder="希望する人材像、面接実施形態（オンライン/現地対面）、その他ご要望をご記入ください。"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-slate-900"
                />
              </div>

              {/* Submit */}
              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? t("inq.submitting") : t("inq.submit_btn")}</span>
                </button>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
}
