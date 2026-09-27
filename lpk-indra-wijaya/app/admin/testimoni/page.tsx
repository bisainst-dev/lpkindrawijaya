"use client";

import React, { useState, useEffect } from 'react';
import { TestimonialItem } from '@/lib/types';
import { Quote, Plus, Edit2, Trash2, MapPin, Building2, Calendar, Star, X } from 'lucide-react';

export default function TestimoniManagementPage() {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TestimonialItem | null>(null);

  const [formData, setFormData] = useState<Partial<TestimonialItem>>({
    id: '',
    name: '',
    origin: 'Jatibarang, Indramayu',
    role: 'Caregiver di Tokyo',
    sector: { id: 'Perawat Lansia (Kaigo)', ja: '介護職', en: 'Caregiver' },
    prefecture: { id: 'Tokyo', ja: '東京都', en: 'Tokyo' },
    companyName: 'Social Welfare Corp. Tokyo Smile Care',
    quote: { id: '', ja: '', en: '' },
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    yearDeparted: 2025,
    visaType: 'Tokutei Ginou (SSW)'
  });

  const fetchTestimonials = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/admin/testimoni');
      const data = await res.json();
      setTestimonials(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleOpenModal = (item?: TestimonialItem) => {
    if (item) {
      setEditingItem(item);
      setFormData(JSON.parse(JSON.stringify(item)));
    } else {
      setEditingItem(null);
      setFormData({
        id: `testi-${Date.now()}`,
        name: '',
        origin: 'Lohbener, Indramayu',
        role: 'Staff di Jepang',
        sector: { id: 'Pengolahan Makanan', ja: '食品加工', en: 'Food Processing' },
        prefecture: { id: 'Chiba', ja: '千葉県', en: 'Chiba' },
        companyName: 'Kanto Delica Foods Corp.',
        quote: { id: '', ja: '', en: '' },
        photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
        yearDeparted: 2025,
        visaType: 'Tokutei Ginou (SSW)'
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/testimoni', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setIsModalOpen(false);
        fetchTestimonials();
      } else {
        alert("Gagal menyimpan testimoni.");
      }
    } catch (err) {
      alert("Terjadi kesalahan.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus testimoni ini?")) return;

    try {
      const res = await fetch(`/api/admin/testimoni?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setTestimonials(prev => prev.filter(t => t.id !== id));
      }
    } catch (err) {
      alert("Gagal menghapus testimoni.");
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Kelola Testimoni Alumni di Jepang
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Kisah sukses putra-putri daerah asal Indramayu dan sekitarnya yang telah bekerja di Jepang
          </p>
        </div>

        <button
          onClick={() => handleOpenModal()}
          className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-2 transition self-start sm:self-auto cursor-pointer shadow-md shadow-red-600/20"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Testimoni Baru</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testi) => (
          <div
            key={testi.id}
            className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={testi.photoUrl}
                  alt={testi.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-red-500/40"
                />
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 leading-tight">
                    {testi.name}
                  </h3>
                  <div className="text-[11px] text-red-600 font-bold">
                    {testi.origin} ({testi.visaType})
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-slate-500">
                    <MapPin className="w-3 h-3 text-red-500" />
                    <span>{testi.prefecture.id} • {testi.yearDeparted}</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-600 italic line-clamp-4 leading-relaxed bg-slate-50 p-3 rounded-2xl border border-slate-100">
                &ldquo;{testi.quote.id}&rdquo;
              </p>
            </div>

            {/* Actions */}
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => handleOpenModal(testi)}
                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>

              <button
                onClick={() => handleDelete(testi.id)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Modal Add/Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <h3 className="text-lg font-black text-slate-900">
                {editingItem ? 'Edit Testimoni Alumni' : 'Tambah Testimoni Alumni Baru'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs sm:text-sm">
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Nama Alumni</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                    placeholder="Contoh: Rizki Ramadhan"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Asal Daerah (Kecamatan)</label>
                  <input
                    type="text"
                    required
                    value={formData.origin}
                    onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                    placeholder="Contoh: Jatibarang, Indramayu"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Jenis Visa</label>
                  <select
                    value={formData.visaType}
                    onChange={(e) => setFormData({ ...formData, visaType: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
                  >
                    <option value="Tokutei Ginou (SSW)">Tokutei Ginou (SSW)</option>
                    <option value="Ginou Jisshuusei (Magang)">Ginou Jisshuusei (Magang)</option>
                    <option value="Gijinkoku (Engineer)">Gijinkoku (Engineer)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tahun Keberangkatan</label>
                  <input
                    type="number"
                    value={formData.yearDeparted}
                    onChange={(e) => setFormData({ ...formData, yearDeparted: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Prefektur di Jepang</label>
                  <input
                    type="text"
                    required
                    value={formData.prefecture?.id || ''}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      prefecture: { id: e.target.value, ja: e.target.value, en: e.target.value } 
                    })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                    placeholder="Setagaya, Tokyo"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">URL Foto Alumni</label>
                  <input
                    type="url"
                    required
                    value={formData.photoUrl}
                    onChange={(e) => setFormData({ ...formData, photoUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              {/* Quote in 3 languages */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">Kutipan Testimoni (Bahasa Indonesia)</label>
                <textarea
                  rows={3}
                  required
                  value={formData.quote?.id || ''}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    quote: { 
                      id: e.target.value, 
                      ja: formData.quote?.ja || e.target.value, 
                      en: formData.quote?.en || e.target.value 
                    } 
                  })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  placeholder="Ceritakan pengalaman pelatihan di asrama Lohbener Indramayu dan karier di Jepang..."
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 transition"
                >
                  Simpan Testimoni
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
