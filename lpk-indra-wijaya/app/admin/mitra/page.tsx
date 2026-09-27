"use client";

import React, { useState, useEffect } from 'react';
import { PartnerInquiryItem } from '@/lib/types';
import { Building2, Mail, Phone, Calendar, Users, CheckCircle, MessageSquare } from 'lucide-react';

export default function MitraManagementPage() {
  const [inquiries, setInquiries] = useState<PartnerInquiryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchInquiries = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/mitra-inquiry');
      const data = await res.json();
      setInquiries(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleStatusChange = async (id: string, newStatus: PartnerInquiryItem['status']) => {
    try {
      const res = await fetch('/api/mitra-inquiry', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus })
      });

      if (res.ok) {
        setInquiries(prev => prev.map(i => i.id === id ? { ...i, status: newStatus } : i));
      }
    } catch (err) {
      alert("Gagal memperbarui status.");
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Inkuiri Kemitraan Perusahaan Jepang (Kumiai & Ukirekikan)
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Daftar pesan dan permintaan kebutuhan tenaga kerja dari organisasi pengawas dan perusahaan di Jepang
        </p>
      </div>

      {/* Inquiries Cards */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="py-20 text-center text-xs text-slate-500">
            Memuat data inkuiri...
          </div>
        ) : inquiries.length === 0 ? (
          <div className="py-20 text-center text-xs text-slate-500">
            Belum ada inkuiri kemitraan masuk.
          </div>
        ) : (
          inquiries.map((inq) => (
            <div
              key={inq.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-start justify-between gap-6"
            >
              <div className="space-y-3 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-lg bg-blue-50 text-blue-700 border border-blue-200">
                    {inq.organizationType}
                  </span>
                  <span className="text-xs text-slate-400">
                    {inq.country} • Masuk: {new Date(inq.createdAt).toLocaleDateString('id-ID')}
                  </span>
                </div>

                <h3 className="text-lg font-extrabold text-slate-900">
                  {inq.companyName}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <div>
                    <span className="text-slate-400 block">Contact Person:</span>
                    <strong className="text-slate-900">{inq.contactPerson}</strong> ({inq.position})
                  </div>
                  <div>
                    <span className="text-slate-400 block">Kebutuhan Tenaga Kerja:</span>
                    <strong className="text-red-600">{inq.candidateCountNeeded} Orang</strong> ({inq.sectorNeeded})
                  </div>
                  <div>
                    <span className="text-slate-400 block">Target Penempatan:</span>
                    <strong className="text-slate-800">{inq.targetArrivalPeriod}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Email & Telepon:</span>
                    <a href={`mailto:${inq.email}`} className="text-blue-600 font-bold hover:underline block">
                      {inq.email}
                    </a>
                    <span>{inq.phone}</span>
                  </div>
                </div>

                {/* Message */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 italic">
                  &ldquo;{inq.message}&rdquo;
                </div>
              </div>

              {/* Status Update Control */}
              <div className="flex flex-col sm:items-end gap-3 min-w-[200px]">
                <div className="w-full">
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Status Respon:
                  </label>
                  <select
                    value={inq.status}
                    onChange={(e) => handleStatusChange(inq.id, e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs font-bold"
                  >
                    <option value="baru">Baru Masuk</option>
                    <option value="dihubungi">Sudah Dihubungi</option>
                    <option value="kerjasama_aktif">Kerjasama Aktif</option>
                  </select>
                </div>

                <a
                  href={`mailto:${inq.email}?subject=${encodeURIComponent(`Balasan Kerjasama LPK Indra Wijaya - ${inq.companyName}`)}`}
                  className="w-full py-2 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs text-center transition flex items-center justify-center gap-2"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Kirim Email Balasan</span>
                </a>
              </div>

            </div>
          ))
        )}
      </div>

    </div>
  );
}
