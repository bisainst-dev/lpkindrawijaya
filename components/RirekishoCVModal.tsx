"use client";

import React, { useState } from 'react';
import { ApplicantItem, EducationEntry, WorkEntry, LicenseEntry } from '@/lib/types';
import { 
  Printer, 
  Download, 
  X, 
  Edit3, 
  Check, 
  Sparkles, 
  FileText,
  ZoomIn,
  ZoomOut
} from 'lucide-react';

interface RirekishoCVModalProps {
  applicant: ApplicantItem;
  isOpen: boolean;
  onClose: () => void;
}

export default function RirekishoCVModal({ applicant, isOpen, onClose }: RirekishoCVModalProps) {
  if (!isOpen || !applicant) return null;

  // Current Date in Japanese format
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear().toString());
  const [currentMonth, setCurrentMonth] = useState((today.getMonth() + 1).toString());
  const [currentDay, setCurrentDay] = useState(today.getDate().toString());

  // Editable CV fields for fine-tuning
  const [katakanaName, setKatakanaName] = useState(applicant.katakanaName || convertToKatakana(applicant.fullName));
  const [fullName, setFullName] = useState(applicant.fullName || '');
  const [addressFurigana, setAddressFurigana] = useState(applicant.addressFurigana || convertToKatakana(applicant.originDistrict || 'Indramayu'));
  const [fullAddress, setFullAddress] = useState(
    applicant.fullAddress || `${applicant.originDistrict || ''}, ${applicant.originRegency || 'Indramayu'}, Jawa Barat, INDONESIA`
  );
  const [postalCode, setPostalCode] = useState(applicant.postalCode || '45214');
  const [phone, setPhone] = useState(applicant.phoneWhatsapp || '');
  const [email, setEmail] = useState(applicant.email || '');

  // Emergency contact
  const [emergencyPhone, setEmergencyPhone] = useState(applicant.emergencyContact?.phone || applicant.phoneWhatsapp || '');
  const [emergencyAddress, setEmergencyAddress] = useState(applicant.emergencyContact?.address || '同上');

  // Education list (Default generated if empty)
  const defaultEducation: EducationEntry[] = applicant.educationHistory && applicant.educationHistory.length > 0
    ? applicant.educationHistory
    : generateDefaultEducation(applicant);

  const [educationList, setEducationList] = useState<EducationEntry[]>(defaultEducation);

  // Work list (Default generated if empty)
  const defaultWork: WorkEntry[] = applicant.workHistory && applicant.workHistory.length > 0
    ? applicant.workHistory
    : generateDefaultWork(applicant);

  const [workList, setWorkList] = useState<WorkEntry[]>(defaultWork);

  // License / Certifications list
  const defaultLicenses: LicenseEntry[] = applicant.certifications && applicant.certifications.length > 0
    ? applicant.certifications
    : generateDefaultLicenses(applicant);

  const [licenseList, setLicenseList] = useState<LicenseEntry[]>(defaultLicenses);

  // Preferences & Motivation
  const defaultPreferences = applicant.personalPreferences || 
    `【希望職種】 ${formatProgramTitle(applicant.interestedProgram, applicant.interestedSector)}\n【希望勤務地】 関東地方、中部地方、関西地方（全国どこでも意欲的に勤務可能）\n【希望給与】 貴社の規定に従います。\n【その他】 日本のルール・規律を守り、明るく元気に誠心誠意貢献いたします。`;

  const [personalPreferences, setPersonalPreferences] = useState(defaultPreferences);

  // Zoom control
  const [zoomLevel, setZoomLevel] = useState<number>(0.9);

  // Edit mode toggle
  const [isQuickEdit, setIsQuickEdit] = useState(false);

  // Handle Print
  const handlePrint = () => {
    window.print();
  };

  // Calculate Birthdate details
  let birthYear = '2004';
  let birthMonth = '1';
  let birthDay = '1';
  if (applicant.birthDate) {
    const parts = applicant.birthDate.split('-');
    if (parts.length === 3) {
      birthYear = parts[0];
      birthMonth = String(parseInt(parts[1], 10));
      birthDay = String(parseInt(parts[2], 10));
    }
  }

  // Gender in Japanese
  const genderJp = applicant.gender === 'Perempuan' ? '女' : '男';

  // Total lines for Page 1 Education (fixed rows for JIS sheet aesthetic: 14 rows total)
  const page1RowsCount = 13;
  const page2WorkRowsCount = 6;
  const page2LicenseRowsCount = 6;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-xs flex flex-col items-center justify-start p-2 sm:p-6 print:p-0 print:bg-white print:static print:overflow-visible">
      
      {/* Top Bar Controls (Hidden in Print) */}
      <div className="w-full max-w-4xl bg-slate-900 text-white px-5 py-3.5 rounded-2xl flex flex-wrap items-center justify-between gap-3 shadow-2xl mb-4 print:hidden">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-orange-500 text-white flex items-center justify-center font-bold text-sm">
            履歴
          </div>
          <div>
            <h3 className="font-extrabold text-sm text-white flex items-center gap-2">
              <span>CV Standar Jepang (履歴書 - Rirekisho)</span>
              <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-400 font-mono">
                JIS A4 2-Halaman
              </span>
            </h3>
            <p className="text-[11px] text-slate-400">
              Kandidat: <strong className="text-white">{applicant.fullName}</strong> ({applicant.gender}, {applicant.age} th)
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Zoom controls */}
          <div className="hidden sm:flex items-center bg-slate-800 rounded-xl p-1 border border-slate-700 text-xs">
            <button
              onClick={() => setZoomLevel(prev => Math.max(0.6, prev - 0.1))}
              className="p-1.5 hover:bg-slate-700 rounded text-slate-300 hover:text-white"
              title="Perkecil"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="px-2 font-mono text-[11px] text-slate-300">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={() => setZoomLevel(prev => Math.min(1.2, prev + 0.1))}
              className="p-1.5 hover:bg-slate-700 rounded text-slate-300 hover:text-white"
              title="Perbesar"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={() => setIsQuickEdit(!isQuickEdit)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition cursor-pointer ${
              isQuickEdit 
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md' 
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{isQuickEdit ? 'Selesai Edit' : 'Edit Teks CV'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-emerald-600/30 transition cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Cetak / Download PDF</span>
          </button>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer ml-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Quick Edit Banner */}
      {isQuickEdit && (
        <div className="w-full max-w-4xl bg-amber-50 border border-amber-300 p-4 rounded-2xl text-xs text-amber-900 mb-4 print:hidden space-y-3">
          <div className="flex items-center justify-between font-bold text-amber-950">
            <span>Mode Edit Cepat Teks 履歴書 (Perubahan langsung tercermin di pratinjau lembar A4):</span>
            <button onClick={() => setIsQuickEdit(false)} className="text-amber-800 underline">Tutup Panel Edit</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Nama Katakana (ふりがな)</label>
              <input
                type="text"
                value={katakanaName}
                onChange={(e) => setKatakanaName(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-white border border-amber-300 rounded-lg text-xs"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Nama Romaji (氏名)</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-white border border-amber-300 rounded-lg text-xs"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Kode Pos & Furigana Alamat</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Kode Pos"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  className="w-24 px-2 py-1.5 bg-white border border-amber-300 rounded-lg text-xs font-mono"
                />
                <input
                  type="text"
                  placeholder="Furigana Alamat"
                  value={addressFurigana}
                  onChange={(e) => setAddressFurigana(e.target.value)}
                  className="flex-1 px-2 py-1.5 bg-white border border-amber-300 rounded-lg text-xs"
                />
              </div>
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">Alamat Lengkap (現住所)</label>
            <input
              type="text"
              value={fullAddress}
              onChange={(e) => setFullAddress(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-white border border-amber-300 rounded-lg text-xs"
            />
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* JAPANESE RIREKISHO (履歴書) A4 TWO-PAGE SHEETS CONTAINER */}
      {/* ======================================================== */}
      <div 
        style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top center' }}
        className="transition-transform duration-200 space-y-8 print:space-y-0 print:transform-none print:m-0"
      >
        
        {/* ======================================================== */}
        {/* PAGE 1 (A4) - 個人基本情報 & 学歴 */}
        {/* ======================================================== */}
        <div className="rirekisho-page w-[210mm] min-h-[297mm] max-h-[297mm] bg-white p-[12mm] text-slate-900 border border-slate-300 shadow-2xl print:shadow-none print:border-none print:p-[10mm] print:m-0 relative font-serif select-text page-break-after">
          
          {/* Sheet Header: 履 歴 書 & Date */}
          <div className="flex items-end justify-between border-b-2 border-black pb-1 mb-2">
            <h1 className="text-2xl font-black tracking-[1.2em] pl-4 font-serif">
              履 歴 書
            </h1>
            <div className="text-[12px] font-sans text-right pr-2">
              <span>{currentYear}</span> 年 <span>{currentMonth}</span> 月 <span>{currentDay}</span> 日 現在
            </div>
          </div>

          {/* Top Block: Profile Table + Photo Box */}
          <div className="flex border-2 border-black mb-3">
            
            {/* Left 4 Rows Personal Information Grid */}
            <div className="flex-1 flex flex-col divide-y divide-black text-[11px] font-sans">
              
              {/* Row 1: ふりがな & 氏名 */}
              <div className="flex divide-x divide-black h-[54px]">
                <div className="w-[60px] p-1.5 bg-slate-50 flex items-center justify-center font-bold text-[10px] text-center">
                  ふりがな
                </div>
                <div className="flex-1 px-3 py-1 flex flex-col justify-center">
                  <div className="text-[10px] text-slate-600 font-sans tracking-wide">
                    {katakanaName}
                  </div>
                  <div className="text-[16px] font-bold tracking-wider font-serif">
                    {fullName.toUpperCase()}
                  </div>
                </div>
              </div>

              {/* Row 2: 生年月日 & 性別 */}
              <div className="flex divide-x divide-black h-[32px] items-center">
                <div className="w-[60px] h-full p-1 bg-slate-50 flex items-center justify-center font-bold text-[10px] text-center">
                  生年月日
                </div>
                <div className="flex-1 px-3 text-[11px] flex items-center gap-1.5 font-sans">
                  <span>{birthYear}</span> 年 <span>{birthMonth}</span> 月 <span>{birthDay}</span> 日生
                  <span className="ml-3 font-semibold">（ 満 {applicant.age} 歳 ）</span>
                </div>
                <div className="w-[45px] h-full p-1 bg-slate-50 flex items-center justify-center text-[10px] font-bold text-center">
                  ※性別
                </div>
                <div className="w-[55px] h-full flex items-center justify-center font-bold text-xs">
                  {genderJp}
                </div>
              </div>

              {/* Row 3: 現住所 & 電話 / Email */}
              <div className="flex divide-x divide-black">
                <div className="flex-1 flex flex-col divide-y divide-black">
                  <div className="flex divide-x divide-black h-[22px] items-center">
                    <div className="w-[60px] h-full bg-slate-50 flex items-center justify-center font-bold text-[10px] text-center">
                      ふりがな
                    </div>
                    <div className="flex-1 px-3 text-[10px] text-slate-600 truncate">
                      {addressFurigana}
                    </div>
                  </div>
                  <div className="flex divide-x divide-black min-h-[44px]">
                    <div className="w-[60px] p-1 bg-slate-50 flex items-center justify-center font-bold text-[10px] text-center">
                      現住所
                    </div>
                    <div className="flex-1 p-2 leading-tight">
                      <div className="text-[10px] font-mono mb-0.5">
                        〒 {postalCode}
                      </div>
                      <div className="text-[11px] font-sans">
                        {fullAddress}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right sub-column: Phone & Email */}
                <div className="w-[180px] flex flex-col divide-y divide-black text-[10px]">
                  <div className="p-1.5 flex items-center justify-between">
                    <span className="font-bold text-slate-700">電 話</span>
                    <span className="font-mono text-[11px] font-semibold">{phone}</span>
                  </div>
                  <div className="p-1.5 flex-1 flex flex-col justify-center">
                    <span className="font-bold text-slate-700 block text-[9px]">E-mail</span>
                    <span className="font-mono text-[10px] text-slate-800 truncate" title={email}>
                      {email || '-'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Row 4: 連絡先 (Emergency / Alternative Contact) */}
              <div className="flex divide-x divide-black">
                <div className="flex-1 flex flex-col divide-y divide-black">
                  <div className="flex divide-x divide-black h-[20px] items-center">
                    <div className="w-[60px] h-full bg-slate-50 flex items-center justify-center font-bold text-[9px] text-center">
                      ふりがな
                    </div>
                    <div className="flex-1 px-3 text-[9px] text-slate-500">
                      {emergencyAddress === '同上' ? '' : addressFurigana}
                    </div>
                  </div>
                  <div className="flex divide-x divide-black min-h-[40px]">
                    <div className="w-[60px] p-1 bg-slate-50 flex items-center justify-center font-bold text-[10px] text-center">
                      連絡先
                    </div>
                    <div className="flex-1 p-2 leading-tight text-[11px]">
                      {emergencyAddress === '同上' ? (
                        <span className="text-slate-800 font-sans font-semibold">同上</span>
                      ) : (
                        <div>
                          <div className="text-[10px] font-mono mb-0.5">〒 {postalCode}</div>
                          <div>{emergencyAddress}</div>
                        </div>
                      )}
                      <span className="text-[9px] text-slate-400 block mt-0.5">
                        （現住所以外に連絡を希望する場合のみ記入）
                      </span>
                    </div>
                  </div>
                </div>

                <div className="w-[180px] flex flex-col divide-y divide-black text-[10px]">
                  <div className="p-1.5 flex items-center justify-between">
                    <span className="font-bold text-slate-700">電 話</span>
                    <span className="font-mono text-[11px] font-semibold">{emergencyPhone || phone}</span>
                  </div>
                  <div className="p-1.5 flex-1 flex flex-col justify-center">
                    <span className="font-bold text-slate-700 block text-[9px]">E-mail</span>
                    <span className="font-mono text-[10px] text-slate-800 truncate">
                      {email || '-'}
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Photo Box (Exact standard dimensions ~36-40mm x 24-30mm) */}
            <div className="w-[115px] border-l-2 border-black flex flex-col items-center justify-center p-1 bg-white relative">
              {applicant.photoUrl ? (
                <div className="w-full h-full min-h-[148px] max-h-[155px] overflow-hidden flex items-center justify-center border border-slate-200">
                  <img
                    src={applicant.photoUrl}
                    alt={applicant.fullName}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-full h-full min-h-[148px] border border-dashed border-slate-400 p-1 flex flex-col items-center justify-center text-center text-[9px] leading-[13px] text-slate-500 font-sans">
                  <div className="font-bold text-slate-700 mb-1">写真を貼る位置</div>
                  <div>写真を貼る必要があ</div>
                  <div>る場合</div>
                  <div className="text-[8px] text-slate-400 mt-1">1. 縦 36～40mm</div>
                  <div className="text-[8px] text-slate-400">横 24～30mm</div>
                  <div className="text-[8px] text-slate-400">2. 本人単身胸から上</div>
                  <div className="text-[8px] text-slate-400">3. 裏面のりづけ</div>
                  <div className="text-[8px] text-slate-400">4. 裏面に氏名記入</div>
                </div>
              )}
            </div>

          </div>

          {/* Main Table: 学歴 (Education History) */}
          <div className="border-2 border-black text-[11px]">
            {/* Table Header */}
            <div className="flex divide-x divide-black border-b border-black bg-slate-50 text-center font-bold h-[26px] items-center text-xs">
              <div className="w-[60px]">年</div>
              <div className="w-[45px]">月</div>
              <div className="flex-1 tracking-[0.8em]">学 歴 ・ 職 歴</div>
            </div>

            {/* Subheader: 学歴 */}
            <div className="flex divide-x divide-black border-b border-black h-[22px] items-center">
              <div className="w-[60px] h-full" />
              <div className="w-[45px] h-full" />
              <div className="flex-1 font-bold text-center tracking-[0.6em] text-xs">
                学 歴
              </div>
            </div>

            {/* Education Rows (Padded up to 13 lines) */}
            {Array.from({ length: page1RowsCount }).map((_, idx) => {
              const edu = educationList[idx];
              return (
                <div
                  key={`edu-${idx}`}
                  className="flex divide-x divide-black border-b border-black last:border-b-0 h-[22px] items-center text-[11px] font-sans"
                >
                  <div className="w-[60px] h-full flex items-center justify-center font-mono">
                    {edu?.year || ''}
                  </div>
                  <div className="w-[45px] h-full flex items-center justify-center font-mono">
                    {edu?.month || ''}
                  </div>
                  <div className="flex-1 px-3 flex items-center justify-between">
                    <span className="truncate">{edu?.name || ''}</span>
                    <span className="text-[10px] text-slate-700 font-semibold">{edu?.status || ''}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sheet Footer Note */}
          <div className="mt-2 text-[9px] text-slate-500 font-sans">
            ※「性別」欄：記載は任意です。未記載とすることも可能です。
          </div>

          {/* Page 1 indicator badge (Hidden in print) */}
          <div className="absolute bottom-2 right-4 text-[10px] text-slate-400 print:hidden">
            (Lembar 1 dari 2)
          </div>
        </div>

        {/* ======================================================== */}
        {/* PAGE 2 (A4) - 職歴, 免許・資格, 本人希望記入欄 */}
        {/* ======================================================== */}
        <div className="rirekisho-page w-[210mm] min-h-[297mm] max-h-[297mm] bg-white p-[12mm] text-slate-900 border border-slate-300 shadow-2xl print:shadow-none print:border-none print:p-[10mm] print:m-0 relative font-serif select-text">
          
          {/* Top Table: 職歴 (Work Experience Continuation) */}
          <div className="border-2 border-black text-[11px] mb-3">
            {/* Header */}
            <div className="flex divide-x divide-black border-b border-black bg-slate-50 text-center font-bold h-[26px] items-center text-xs">
              <div className="w-[60px]">年</div>
              <div className="w-[45px]">月</div>
              <div className="flex-1 tracking-[0.8em]">学 歴 ・ 職 歴</div>
            </div>

            {/* Subheader: 職歴 */}
            <div className="flex divide-x divide-black border-b border-black h-[22px] items-center">
              <div className="w-[60px] h-full" />
              <div className="w-[45px] h-full" />
              <div className="flex-1 font-bold text-center tracking-[0.6em] text-xs">
                職 歴
              </div>
            </div>

            {/* Work Rows */}
            {Array.from({ length: page2WorkRowsCount }).map((_, idx) => {
              const work = workList[idx];
              return (
                <div
                  key={`work-${idx}`}
                  className="flex divide-x divide-black border-b border-black last:border-b-0 h-[22px] items-center text-[11px] font-sans"
                >
                  <div className="w-[60px] h-full flex items-center justify-center font-mono">
                    {work?.year || ''}
                  </div>
                  <div className="w-[45px] h-full flex items-center justify-center font-mono">
                    {work?.month || ''}
                  </div>
                  <div className="flex-1 px-3 flex items-center justify-between">
                    <span className="truncate">{work?.name || ''}</span>
                    <span className="text-[10px] text-slate-700 font-semibold">{work?.status || ''}</span>
                  </div>
                </div>
              );
            })}

            {/* Closing row: 現在に至る / 以上 */}
            <div className="flex divide-x divide-black border-b border-black h-[22px] items-center text-[11px] font-sans">
              <div className="w-[60px] h-full" />
              <div className="w-[45px] h-full" />
              <div className="flex-1 px-4 flex items-center justify-between text-[11px]">
                <span className="text-slate-600">現在に至る</span>
                <span className="font-bold tracking-widest mr-8">以 上</span>
              </div>
            </div>
          </div>

          {/* Middle Table: 免許・資格 (Licenses & Certifications) */}
          <div className="border-2 border-black text-[11px] mb-3">
            {/* Header */}
            <div className="flex divide-x divide-black border-b border-black bg-slate-50 text-center font-bold h-[26px] items-center text-xs">
              <div className="w-[60px]">年</div>
              <div className="w-[45px]">月</div>
              <div className="flex-1 tracking-[0.8em]">免 許 ・ 資 格</div>
            </div>

            {/* License Rows */}
            {Array.from({ length: page2LicenseRowsCount }).map((_, idx) => {
              const lic = licenseList[idx];
              return (
                <div
                  key={`lic-${idx}`}
                  className="flex divide-x divide-black border-b border-black last:border-b-0 h-[22px] items-center text-[11px] font-sans"
                >
                  <div className="w-[60px] h-full flex items-center justify-center font-mono">
                    {lic?.year || ''}
                  </div>
                  <div className="w-[45px] h-full flex items-center justify-center font-mono">
                    {lic?.month || ''}
                  </div>
                  <div className="flex-1 px-3 flex items-center justify-between">
                    <span className="truncate">{lic?.name || ''}</span>
                    {idx === licenseList.length - 1 && lic?.name && (
                      <span className="text-[10px] font-bold text-slate-600 mr-8">以 上</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Box: 本人希望記入欄 (Personal Wishes & Notes) */}
          <div className="border-2 border-black flex flex-col h-[180px]">
            <div className="p-2 border-b border-black bg-slate-50 text-[10px] font-bold">
              本人希望記入欄（特に給与、職種、勤務時間、勤務地、その他についての希望などがあれば記入）
            </div>
            <div className="p-3.5 flex-1 text-[11px] leading-relaxed whitespace-pre-line font-sans text-slate-800">
              {personalPreferences}
            </div>
          </div>

          {/* Page 2 indicator badge (Hidden in print) */}
          <div className="absolute bottom-2 right-4 text-[10px] text-slate-400 print:hidden">
            (Lembar 2 dari 2)
          </div>
        </div>

      </div>

      {/* Print Specific CSS (Strict A4 Page Breaks) */}
      <style jsx global>{`
        @media print {
          body {
            background: white !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          nav, header, footer, aside, .print\\:hidden {
            display: none !important;
          }
          @page {
            size: A4 portrait;
            margin: 8mm 8mm 8mm 8mm;
          }
          .page-break-after {
            page-break-after: always !important;
            break-after: page !important;
          }
          .rirekisho-page {
            box-shadow: none !important;
            border: none !important;
            margin: 0 auto !important;
            width: 100% !important;
            max-width: 100% !important;
            height: auto !important;
          }
        }
      `}</style>

    </div>
  );
}

// ==========================================
// HELPER CONVERTERS (ROMANJI TO KATAKANA & RESUME GENERATOR)
// ==========================================

function convertToKatakana(name: string): string {
  if (!name) return '';
  // Basic Romanized Katakana Mapping
  const dict: Record<string, string> = {
    'a': 'ア', 'i': 'イ', 'u': 'ウ', 'e': 'エ', 'o': 'オ',
    'ka': 'カ', 'ki': 'キ', 'ku': 'ク', 'ke': 'ケ', 'ko': 'コ',
    'sa': 'サ', 'shi': 'シ', 'si': 'シ', 'su': 'ス', 'se': 'セ', 'so': 'ソ',
    'ta': 'タ', 'chi': 'チ', 'ti': 'チ', 'tsu': 'ツ', 'tu': 'ツ', 'te': 'テ', 'to': 'ト',
    'na': 'ナ', 'ni': 'ニ', 'nu': 'ヌ', 'ne': 'ネ', 'no': 'ノ',
    'ha': 'ハ', 'hi': 'ヒ', 'fu': 'フ', 'hu': 'フ', 'he': 'ヘ', 'ho': 'ホ',
    'ma': 'マ', 'mi': 'ミ', 'mu': 'ム', 'me': 'メ', 'mo': 'モ',
    'ya': 'ヤ', 'yu': 'ユ', 'yo': 'ヨ',
    'ra': 'ラ', 'ri': 'リ', 'ru': 'ル', 're': 'レ', 'ro': 'ロ',
    'wa': 'ワ', 'wo': 'ヲ', 'n': 'ン',
    'ga': 'ガ', 'gi': 'ギ', 'gu': 'グ', 'ge': 'ゲ', 'go': 'ゴ',
    'za': 'ザ', 'ji': 'ジ', 'zi': 'ジ', 'zu': 'ズ', 'ze': 'ゼ', 'zo': 'ゾ',
    'da': 'ダ', 'di': 'ディ', 'de': 'デ', 'do': 'ド',
    'ba': 'バ', 'bi': 'ビ', 'bu': 'ブ', 'be': 'ベ', 'bo': 'ボ',
    'pa': 'パ', 'pi': 'ピ', 'pu': 'プ', 'pe': 'ペ', 'po': 'ポ',
    'fa': 'ファ', 'fi': 'フィ', 'fe': 'フェ', 'fo': 'フォ',
    'dwi': 'ドウィ', 'tri': 'トリ', 'adi': 'アディ', 'putra': 'プトラ', 'putri': 'プトリ',
    'siti': 'シティ', 'agus': 'アグス', 'nurul': 'ヌルル', 'dimas': 'ディマス', 'rizky': 'リズキ'
  };

  // Convert clean space separated tokens
  const words = name.toLowerCase().split(/\s+/);
  const convertedWords = words.map(w => {
    let result = '';
    let i = 0;
    while (i < w.length) {
      if (i + 4 <= w.length && dict[w.substr(i, 4)]) {
        result += dict[w.substr(i, 4)];
        i += 4;
      } else if (i + 3 <= w.length && dict[w.substr(i, 3)]) {
        result += dict[w.substr(i, 3)];
        i += 3;
      } else if (i + 2 <= w.length && dict[w.substr(i, 2)]) {
        result += dict[w.substr(i, 2)];
        i += 2;
      } else if (dict[w[i]]) {
        result += dict[w[i]];
        i += 1;
      } else {
        // Fallback consonant
        result += w[i].toUpperCase();
        i += 1;
      }
    }
    return result;
  });

  return convertedWords.join('・');
}

function generateDefaultEducation(applicant: ApplicantItem): EducationEntry[] {
  const currentYear = new Date().getFullYear();
  const birthYear = applicant.birthDate ? parseInt(applicant.birthDate.split('-')[0], 10) : currentYear - 22;
  const sdEnter = birthYear + 7;
  const sdGrad = sdEnter + 6;
  const smpEnter = sdGrad;
  const smpGrad = smpEnter + 3;
  const smaEnter = smpGrad;
  const smaGrad = smaEnter + 3;

  return [
    { year: sdEnter.toString(), month: '7', name: 'インドネシア共和国 公立小学校', status: '入学' },
    { year: sdGrad.toString(), month: '6', name: 'インドネシア共和国 公立小学校', status: '卒業' },
    { year: smpEnter.toString(), month: '7', name: 'インドネシア共和国 公立中学校', status: '入学' },
    { year: smpGrad.toString(), month: '6', name: 'インドネシア共和国 公立中学校', status: '卒業' },
    { year: smaEnter.toString(), month: '7', name: `インドネシア共和国 ${applicant.lastEducation || '高等学校'}`, status: '入学' },
    { year: smaGrad.toString(), month: '6', name: `インドネシア共和国 ${applicant.lastEducation || '高等学校'}`, status: '卒業' },
    { year: (currentYear).toString(), month: '1', name: 'LPKインドラ・ウィジャヤ (日本語及び技能講習)', status: '在学中' },
  ];
}

function generateDefaultWork(applicant: ApplicantItem): WorkEntry[] {
  const currentYear = new Date().getFullYear();
  return [
    { year: (currentYear - 2).toString(), month: '8', name: 'インドネシア現地企業・工場等', status: '入社' },
    { year: (currentYear - 1).toString(), month: '12', name: '技能向上及び訪日準備のため', status: '退社' }
  ];
}

function generateDefaultLicenses(applicant: ApplicantItem): LicenseEntry[] {
  const currentYear = new Date().getFullYear();
  const list: LicenseEntry[] = [];

  if (applicant.japaneseLevel && applicant.japaneseLevel !== 'Belum Pernah') {
    list.push({
      year: currentYear.toString(),
      month: '4',
      name: `国際交流基金日本語基礎テスト (JFT-Basic A2 / JLPT) 合格`
    });
  }

  if (applicant.interestedProgram?.includes('kaigo')) {
    list.push({
      year: currentYear.toString(),
      month: '6',
      name: '特定技能1号評価試験 (介護分野・介護日本語) 合格'
    });
  } else if (applicant.interestedProgram?.includes('nogyo')) {
    list.push({
      year: currentYear.toString(),
      month: '6',
      name: '特定技能1号評価試験 (農業技能測定試験) 合格'
    });
  } else if (applicant.interestedProgram?.includes('shokuhin')) {
    list.push({
      year: currentYear.toString(),
      month: '6',
      name: '特定技能1号評価試験 (飲食料品製造業技能測定試験) 合格'
    });
  }

  list.push({
    year: (currentYear - 2).toString(),
    month: '5',
    name: '普通自動車第一種運転免許 (インドネシアSIM A/C) 取得'
  });

  return list;
}

function formatProgramTitle(programKey = '', sector = ''): string {
  if (sector) return sector;
  if (programKey.includes('kaigo')) return '介護職（特定技能1号）';
  if (programKey.includes('nogyo')) return '農業分野（特定技能1号・耕種農業）';
  if (programKey.includes('shokuhin')) return '飲食料品製造業（特定技能1号）';
  if (programKey.includes('intern')) return '技能実習生派遣プログラム';
  return '特定技能1号制度による就労';
}
