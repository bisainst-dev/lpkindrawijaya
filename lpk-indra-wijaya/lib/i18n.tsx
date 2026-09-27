"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, MultilingualString, MultilingualList } from './types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  tObj: (obj?: MultilingualString | null, fallback?: string) => string;
  tList: (list?: MultilingualList | null) => string[];
}

const translations: Record<Language, Record<string, string>> = {
  id: {
    // Nav
    "nav.home": "Beranda",
    "nav.about": "Tentang & Legalitas",
    "nav.programs": "Program Pelatihan",
    "nav.jobs": "Lowongan Jepang",
    "nav.process": "Alur Proses",
    "nav.gallery": "Galeri & Berita",
    "nav.testimonials": "Testimoni",
    "nav.japan_partner": "Mitra Jepang (日本語)",
    "nav.contact": "Kontak",
    "nav.register_btn": "Daftar Sekarang",
    "nav.admin": "CMS Admin",

    // Hero
    "hero.badge": "SO RESMI KEMENAKER RI • BERPUSAT DI INDRAMAYU",
    "hero.title_prefix": "Wujudkan Karier Impian di",
    "hero.title_highlight": "Negeri Sakura Jepang",
    "hero.title_suffix": "Bersama LPK Indra Wijaya",
    "hero.subtitle": "Lembaga Pelatihan Kerja & Sending Organization (SO) resmi berizin Kemenaker RI di Indramayu, Jawa Barat. Pelatihan intensif bahasa Jepang, pembinaan mental & disiplin (FMD), serta penyaluran kerja resmi program Tokutei Ginou (SSW) dan Pemagangan.",
    "hero.cta_register": "Daftar Pelatihan Online",
    "hero.cta_consult": "Konsultasi Gratis WhatsApp",
    "hero.cta_partner": "Untuk Perusahaan Jepang / 監理団体",
    "hero.stat_alumni": "Alumni Diberangkatkan",
    "hero.stat_partners": "Mitra Perusahaan Jepang",
    "hero.stat_pass_rate": "Tingkat Kelulusan Interview",
    "hero.stat_experience": "Tahun Pengalaman",
    "hero.card_badge": "PROFILE KEBERANGKATAN",
    "hero.card_accredited": "Terakreditasi",
    "hero.card_item1_title": "Program Tokutei Ginou (SSW) 1号",
    "hero.card_item1_desc": "Kaigo, Pertanian, Pabrik Makanan, Konstruksi & Manufaktur.",
    "hero.card_item2_title": "Program Pemagangan (Ginou Jisshuusei)",
    "hero.card_item2_desc": "Kontrak 3-5 tahun kerjasama puluhan Kumiai terpercaya OTIT.",
    "hero.card_item3_title": "Asrama & Pelatihan FMD Indramayu",
    "hero.card_item3_desc": "Fasilitas pembentukan karakter tangguh, disiplin, dan etika kerja 5S.",
    "hero.card_banner_title": "Pendaftaran Gelombang Terbaru Dibuka!",
    "hero.card_banner_subtitle": "Kuota Wawancara Perusahaan Jepang Terbatas",
    "hero.card_banner_cta": "Daftar Seleksi Sekarang →",

    // Trust & Credentials
    "trust.title": "Legalitas Resmi & Keunggulan Kami",
    "trust.subtitle": "Keamanan, transparansi, dan jaminan izin resmi Pemerintah Indonesia untuk masa depan Anda.",
    "trust.so_label": "Izin Sending Organization (SO)",
    "trust.disnaker_label": "Izin LPK Disnaker Indramayu",
    "trust.vin_label": "Verifikasi Identifikasi Nasional (VIN)",
    "trust.feature1_title": "100% Legal & Tanpa Calo",
    "trust.feature1_desc": "Seluruh alur dan skema pembiayaan transparan langsung dari kantor LPK di Lohbener, Indramayu.",
    "trust.feature2_title": "Fasilitas Asrama & Lab Lengkap",
    "trust.feature2_desc": "Tersedia asrama putra-putri, ruang kelas ber-AC, simulasi bed kaigo, dan sarana latihan fisik mandiri.",
    "trust.feature3_title": "Bimbingan Sampai Lulus Ujian",
    "trust.feature3_desc": "Pendampingan intensif sertifikasi JFT-Basic A2, JLPT N4/N3, serta ujian skill bidang oleh instruktur berlisensi.",
    "trust.feature4_title": "Mitra Luas di Seluruh Jepang",
    "trust.feature4_desc": "Jaringan kerjasama erat dengan puluhan Kumiai dan Ukirekikan terpercaya di Tokyo, Chiba, Aichi, Osaka, dsb.",

    // Programs
    "programs.section_title": "Program Pelatihan & Pemberangkatan",
    "programs.section_subtitle": "Pilihan jalur karier resmi sesuai minat dan kualifikasi Anda ke Jepang.",
    "programs.tab_all": "Semua Program",
    "programs.tab_ssw": "Tokutei Ginou (SSW)",
    "programs.tab_intern": "Pemagangan (Magang)",
    "programs.tab_lang": "Kelas Bahasa & FMD",
    "programs.duration": "Durasi Pelatihan",
    "programs.target": "Target Kelulusan",
    "programs.requirements": "Syarat Pendaftaran",
    "programs.benefits": "Keunggulan Program",
    "programs.apply_btn": "Daftar Program Ini",

    // Jobs
    "jobs.section_title": "Lowongan Kerja Jepang Terkini",
    "jobs.section_subtitle": "Job order resmi yang siap menerima kandidat dari LPK Indra Wijaya.",
    "jobs.salary_label": "Estimasi Gaji / Bulan",
    "jobs.location_label": "Prefektur Penempatan",
    "jobs.quota_label": "Sisa Kuota",
    "jobs.deadline_label": "Batas Pendaftaran",
    "jobs.benefit_housing": "Asrama Disediakan",
    "jobs.benefit_insurance": "Asuransi Lengkap",
    "jobs.benefit_ot": "Tersedia Lembur",
    "jobs.status_open": "Pendaftaran Dibuka",
    "jobs.status_interviewing": "Tahap Seleksi Interview",
    "jobs.status_closed": "Kuota Terpenuhi",
    "jobs.apply_btn": "Lamar Lowongan",

    // Process
    "process.section_title": "Alur 6 Langkah Menuju Jepang",
    "process.section_subtitle": "Transparan, terukur, dan didampingi mulai dari pendaftaran hingga pendaratan di Jepang.",
    "process.step1_title": "1. Pendaftaran & Seleksi Berkas",
    "process.step1_desc": "Pendaftaran online atau langsung ke kantor Indramayu, dilanjutkan tes fisik dasar, kesehatan, dan wawancara minat bakat.",
    "process.step2_title": "2. Pelatihan Bahasa & Asrama",
    "process.step2_desc": "Masuk asrama pelatihan di Lohbener Indramayu untuk materi bahasa Jepang, budaya kerja (5S & Hourenso), dan ketahanan fisik FMD.",
    "process.step3_title": "3. Kelulusan Ujian & Interview User",
    "process.step3_desc": "Mengikuti ujian JFT-Basic / JLPT dan tes keterampilan kerja, lalu wawancara langsung (*Menyetsu*) dengan perusahaan Jepang.",
    "process.step4_title": "4. Pengurusan Dokumen & CoE",
    "process.step4_desc": "Setelah lolos wawancara, LPK Indra Wijaya memproses kontrak kerja resmi dan *Certificate of Eligibility* (CoE) ke Imigrasi Jepang.",
    "process.step5_title": "5. Penerbitan Visa & Pembekalan Akhir",
    "process.step5_desc": "Penerbitan Visa Kerja di Kedutaan Jepang, pemantapan bahasa, serta doa bersama pelepasan keluarga.",
    "process.step6_title": "6. Terbang & Penjemputan di Jepang",
    "process.step6_desc": "Penerbangan resmi via Bandara Soekarno-Hatta dan disambut langsung oleh tim perwakilan serta mitra di Jepang.",

    // Japan Partner Section
    "partner.section_badge": "FOR JAPANESE ORGANIZATIONS & COMPANIES",
    "partner.section_title": "企業様・監理団体様へ：信頼の人材パートナー",
    "partner.intro": "LPK Indra Wijaya berkomitmen menjadi Sending Organization (SO) terbaik dari Jawa Barat yang mengutamakan kedisiplinan, kejujuran, dan kesiapan mental para kandidat.",
    "partner.point1_title": "Seleksi Ketat Berbasis Karakter",
    "partner.point1_desc": "Kandidat kami berasal dari pemuda-pemudi Indramayu dan sekitarnya yang terbiasa bekerja keras, sopan santun, dan memiliki daya juang tinggi.",
    "partner.point2_title": "Fasilitas Pelatihan Mandiri",
    "partner.point2_desc": "Pusat pelatihan kami di Lohbener dilengkapi asrama karantina, lab keperawatan (kaigo), dan area latihan fisik standar Jepang.",
    "partner.point3_title": "Tingkat Retensi Tinggi (Zero Kabo)",
    "partner.point3_desc": "Pendidikan mental FMD dan bimbingan kepatuhan hukum meminimalkan risiko kepulangan dini atau pelarian.",
    "partner.cta_inquiry": "Kirim Inkuiri Kerjasama / 求人・面接のお問合せ",

    // Testimonials & Gallery
    "testi.section_title": "Kisah Sukses Alumni di Jepang",
    "testi.section_subtitle": "Putra-putri daerah Indramayu yang kini mandiri dan berpenghasilan mapan di Negeri Sakura.",
    "gallery.section_badge": "DOKUMENTASI KEGIATAN",
    "gallery.section_title": "Galeri & Dokumentasi Kegiatan",
    "gallery.section_subtitle": "Aktivitas nyata di asrama Indramayu, pembekalan fisik & mental, hingga pelepasan keberangkatan ke Jepang.",
    "gallery.filter_all": "Semua Dokumentasi",
    "gallery.filter_departure": "Keberangkatan",
    "gallery.filter_training": "Pelatihan & FMD",
    "gallery.filter_japan": "Mitra Jepang",
    "gallery.slideshow_prev": "Foto Sebelumnya",
    "gallery.slideshow_next": "Foto Berikutnya",
    "gallery.slideshow_autoplay": "Putar Otomatis",
    "gallery.slideshow_pause": "Jeda Slideshow",
    "gallery.view_full": "Perbesar Foto",
    "gallery.close_modal": "Tutup",

    // Registration Form
    "reg.modal_title": "Formulir Pendaftaran Calon Siswa",
    "reg.modal_subtitle": "Isi data diri Anda dengan benar. Tim admin LPK Indra Wijaya akan segera menghubungi Anda via WhatsApp.",
    "reg.name_label": "Nama Lengkap (Sesuai KTP)",
    "reg.gender_label": "Jenis Kelamin",
    "reg.male": "Laki-laki",
    "reg.female": "Perempuan",
    "reg.birth_label": "Tanggal Lahir",
    "reg.wa_label": "Nomor WhatsApp Aktif",
    "reg.email_label": "Email (Opsional)",
    "reg.district_label": "Kecamatan / Asal Daerah",
    "reg.district_placeholder": "Contoh: Lohbener / Jatibarang / Sindang",
    "reg.education_label": "Pendidikan Terakhir",
    "reg.program_label": "Pilihan Minat Program",
    "reg.jp_level_label": "Kemampuan Bahasa Jepang Saat Ini",
    "reg.height_weight_label": "Tinggi (cm) & Berat Badan (kg)",
    "reg.notes_label": "Catatan Tambahan (Opsional)",
    "reg.submit_btn": "Kirim Pendaftaran Sekarang",
    "reg.submitting": "Sedang Mengirim...",
    "reg.success_title": "Pendaftaran Berhasil Dikirim!",
    "reg.success_desc": "Data Anda telah masuk ke sistem LPK Indra Wijaya. Kami akan segera menghubungi Anda melalui WhatsApp untuk jadwal seleksi.",
    "reg.direct_wa_btn": "Lanjut Chat WhatsApp Admin",

    // Partner Inquiry Form
    "inq.modal_title": "監理団体・受入れ企業様 お問合せフォーム",
    "inq.modal_subtitle": "Partner Inquiry for Supervising Organizations & Accepting Companies in Japan",
    "inq.company_name": "貴社名 / 団体名 (Company / Organization Name)",
    "inq.org_type": "組織区分 (Organization Type)",
    "inq.contact_person": "ご担当者様氏名 (Contact Person)",
    "inq.position": "役職 (Position)",
    "inq.email": "メールアドレス (Email)",
    "inq.phone": "電話番号 (Phone Number)",
    "inq.sector": "希望職種・分野 (Sector Needed)",
    "inq.count": "採用予定人数 (Number of Candidates)",
    "inq.period": "希望配属時期 (Target Arrival Period)",
    "inq.message": "ご要望・メッセージ (Message / Requirements)",
    "inq.submit_btn": "お問合せを送信 (Submit Inquiry)",
    "inq.submitting": "送信中...",
    "inq.success_title": "お問合せありがとうございます",
    "inq.success_desc": "内容を確認のうえ、担当責任者より速やかにご連絡申し上げます。",

    // FAQ
    "faq.section_title": "Pertanyaan yang Sering Diajukan (FAQ)",
    "faq.section_subtitle": "Jawaban lengkap seputar pendaftaran, asrama, dan skema pembiayaan.",

    // Footer
    "footer.about_title": "Tentang LPK Indra Wijaya",
    "footer.quick_links": "Tautan Cepat",
    "footer.contact_title": "Kantor & Pusat Pelatihan",
    "footer.legal_title": "Legalitas & Izin Resmi",
    "footer.copyright": "© 2026 LPK Indra Wijaya. Hak Cipta Dilindungi Undang-Undang. Sending Organization Resmi Kemenaker RI di Indramayu, Jawa Barat."
  },
  ja: {
    // Nav
    "nav.home": "ホーム",
    "nav.about": "機関概要・許認可",
    "nav.programs": "研修プログラム",
    "nav.jobs": "求人案件一覧",
    "nav.process": "派遣フロー",
    "nav.gallery": "活動実績・視察",
    "nav.testimonials": "修了生の声",
    "nav.japan_partner": "受入企業様へ",
    "nav.contact": "お問合せ・アクセス",
    "nav.register_btn": "オンライン申込",
    "nav.admin": "CMS管理",

    // Hero
    "hero.badge": "インドネシア労働省公認送出し機関 • 西ジャワ州インドラマユ",
    "hero.title_prefix": "日本で輝く未来へ、確かな架け橋",
    "hero.title_highlight": "LPKインドラ・ウィジャヤ",
    "hero.title_suffix": "公認送出し機関",
    "hero.subtitle": "西ジャワ州インドラマユ県を拠点とするインドネシア労働省認可の公認送出し機関（SO）。特定技能1号および技能実習生を対象に、徹底した日本語教育、心身の規律指導（FMD）、日本ビジネスマナーを指導し、優良な受入れ企業様・監理団体様へ安定派遣を行っています。",
    "hero.cta_register": "実習生・特定技能 応募登録",
    "hero.cta_consult": "WhatsApp オンライン相談",
    "hero.cta_partner": "受入れ企業・監理団体様はこちら",
    "hero.stat_alumni": "日本派遣実績（名）",
    "hero.stat_partners": "提携日本受入企業・監理団体",
    "hero.stat_pass_rate": "企業面接合格率",
    "hero.stat_experience": "年の育成実績",
    "hero.card_badge": "派遣・育成プロファイル",
    "hero.card_accredited": "公認・認定校",
    "hero.card_item1_title": "特定技能1号 プログラム",
    "hero.card_item1_desc": "介護、農業、飲食料品製造、建設、製造分野など。",
    "hero.card_item2_title": "技能実習生プログラム（TITP）",
    "hero.card_item2_desc": "3〜5年間契約、OTIT認可の優良監理団体と直接連携。",
    "hero.card_item3_title": "インドラマユ宿舎・規律教育（FMD）",
    "hero.card_item3_desc": "強靭な心身、5Sの徹底、日本の規律・マナーを育成。",
    "hero.card_banner_title": "新規生 随時募集中！",
    "hero.card_banner_subtitle": "日本受入企業 面接選考枠あり",
    "hero.card_banner_cta": "今すぐ選考に応募 →",

    // Trust & Credentials
    "trust.title": "公認許認可と当校の強み",
    "trust.subtitle": "法令遵守と透明性の高い運営で、日本とインドネシアの強固な信頼関係を築きます。",
    "trust.so_label": "インドネシア労働省送出し機関（SO）認可",
    "trust.disnaker_label": "インドラマユ県労働局職業訓練校許認可",
    "trust.vin_label": "全国教育機関識別番号 (VIN)",
    "trust.feature1_title": "100% 合法・ブローカー完全排除",
    "trust.feature1_desc": "中間搾取や悪質な仲介業者を一切排除し、明確で適正な募集・選考手続きを徹底しています。",
    "trust.feature2_title": "自社寮・最新実習設備完備",
    "trust.feature2_desc": "インドラマユ校内に男女寄宿舎、冷房付き語学教室、介護模擬ベッド、体力鍛錬場を備えています。",
    "trust.feature3_title": "検定合格率を誇るカリキュラム",
    "trust.feature3_desc": "JFT-Basic A2、JLPT N4/N3、各分野特定技能評価試験の合格まで経験豊富な講師陣がマンツーマン指導。",
    "trust.feature4_title": "日本全国への豊富な派遣ネットワーク",
    "trust.feature4_desc": "東京、神奈川、千葉、愛知、大阪、茨城など全国の監理団体様・登録支援機関様と密に連携。",

    // Programs
    "programs.section_title": "育成・派遣プログラム",
    "programs.section_subtitle": "希望するキャリアと適性に合わせた専門コースをご用意しています。",
    "programs.tab_all": "全コース",
    "programs.tab_ssw": "特定技能（SSW）",
    "programs.tab_intern": "技能実習生（TITP）",
    "programs.tab_lang": "日本語・FMD講習",
    "programs.duration": "研修期間",
    "programs.target": "目標レベル",
    "programs.requirements": "応募資格",
    "programs.benefits": "特長と待遇",
    "programs.apply_btn": "このコースに応募",

    // Jobs
    "jobs.section_title": "募集中の日本求人案件",
    "jobs.section_subtitle": "現在募集中の特定技能・技能実習の日本受入れ求人一覧です。",
    "jobs.salary_label": "月額給与目安",
    "jobs.location_label": "配属予定都道府県",
    "jobs.quota_label": "残枠",
    "jobs.deadline_label": "募集締切",
    "jobs.benefit_housing": "寮・社宅完備",
    "jobs.benefit_insurance": "社会保険完備",
    "jobs.benefit_ot": "残業手当あり",
    "jobs.status_open": "募集中",
    "jobs.status_interviewing": "面接選考中",
    "jobs.status_closed": "募集締切",
    "jobs.apply_btn": "この案件に応募",

    // Process
    "process.section_title": "日本入国までの6段階フロー",
    "process.section_subtitle": "応募から出国、日本到着まで透明性を持ってサポートします。",
    "process.step1_title": "1. 応募・書類選考・適性検査",
    "process.step1_desc": "オンライン応募後、インドラマユ本校にて健康診断、基礎体力テスト、個別適性面談を実施。",
    "process.step2_title": "2. 合宿集中日本語・FMD研修",
    "process.step2_desc": "寄宿舎に入寮し、日本語会話、日本の生活習慣、5S・報連相、挨拶の規律訓練を徹底。",
    "process.step3_title": "3. 技能評価試験合格 & 企業面接",
    "process.step3_desc": "JFT/技能試験に合格後、日本の受入れ企業様・監理団体様とオンラインまたは対面面接を実施。",
    "process.step4_title": "4. 雇用契約・在留資格CoE申請",
    "process.step4_desc": "内定通知後、公的雇用契約を締結し、出入国在留管理局へ在留資格認定証明書（CoE）を申請代行。",
    "process.step5_title": "5. ビザ発給・出国前オリエンテーション",
    "process.step5_desc": "在留資格交付後、大使館にてビザ発給。最終健康診断と心構え確認の壮行会を実施。",
    "process.step6_title": "6. 日本出発・空港出迎え・受入れ配属",
    "process.step6_desc": "スカルノハッタ空港から日本へ出発。成田・羽田・関西等の空港にて監理団体様とお出迎え。",

    // Japan Partner Section
    "partner.section_badge": "FOR JAPANESE ORGANIZATIONS & COMPANIES",
    "partner.section_title": "日本の受入れ企業様・監理団体様へ",
    "partner.intro": "インドラ・ウィジャヤ（LPK INDRA WIJAYA）は、西ジャワ州インドラマユ県に位置する労働省公認の送出し機関です。素朴で粘り強いインドラマユの若者を厳選し、日本企業が最も重視する「礼儀・規律・コミュニケーション」を徹底指導しています。",
    "partner.point1_title": "徹底した人物本位の選考体制",
    "partner.point1_desc": "家族背景や生活態度まで調査し、日本で途中で投げ出さない忍耐力と高い就労意欲を持つ候補者のみを推薦。",
    "partner.point2_title": "合宿型・自社訓練センター完備",
    "partner.point2_desc": "毎日早朝の体力鍛錬から始まり、介護模擬実習室や語学マルチメディア教室で実践的な即戦力教育を実施。",
    "partner.point3_title": "失踪ゼロを目指す生活指導体制",
    "partner.point3_desc": "出国前の厳格な倫理指導に加え、日本滞在中のメンタルケアや母国家族との定期連絡体制を構築。",
    "partner.cta_inquiry": "人材推薦・オンライン面接のお問合せ",

    // Testimonials & Gallery
    "testi.section_title": "日本で活躍中の修了生の声",
    "testi.section_subtitle": "インドラマユから日本へ渡り、夢を叶えた先輩たちのリアルな体験談です。",
    "gallery.section_badge": "活動実績・フォトギャラリー",
    "gallery.section_title": "活動ドキュメンテーション",
    "gallery.section_subtitle": "インドラマユ校での日本語教育・規律訓練（FMD）から、成田・関西空港出発までの記録です。",
    "gallery.filter_all": "すべての写真",
    "gallery.filter_departure": "日本出国風景",
    "gallery.filter_training": "授業・FMD訓練",
    "gallery.filter_japan": "日本監理団体視察",
    "gallery.slideshow_prev": "前の写真",
    "gallery.slideshow_next": "次の写真",
    "gallery.slideshow_autoplay": "自動スライド再生",
    "gallery.slideshow_pause": "一時停止",
    "gallery.view_full": "拡大表示",
    "gallery.close_modal": "閉じる",

    // Registration Form
    "reg.modal_title": "実習生・特定技能 応募登録フォーム",
    "reg.modal_subtitle": "必要事項をご入力ください。インドラ・ウィジャヤ事務局より面談案内を返信いたします。",
    "reg.name_label": "氏名（ローマ字・KTP通り）",
    "reg.gender_label": "性別",
    "reg.male": "男性",
    "reg.female": "女性",
    "reg.birth_label": "生年月日",
    "reg.wa_label": "WhatsApp番号（連絡用）",
    "reg.email_label": "メールアドレス（任意）",
    "reg.district_label": "出身地域・郡（インドラマユ県内等）",
    "reg.district_placeholder": "例：Lohbener / Jatibarang / Sindang",
    "reg.education_label": "最終学歴",
    "reg.program_label": "希望職種・コース",
    "reg.jp_level_label": "現在の日本語レベル",
    "reg.height_weight_label": "身長 (cm) & 体重 (kg)",
    "reg.notes_label": "志望動機・特記事項（任意）",
    "reg.submit_btn": "応募内容を送信する",
    "reg.submitting": "送信中...",
    "reg.success_title": "応募登録が完了しました",
    "reg.success_desc": "データがインドラ・ウィジャヤの管理システムに登録されました。担当スタッフより順次ご連絡いたします。",
    "reg.direct_wa_btn": "事務局WhatsAppへ直接連絡",

    // Partner Inquiry Form
    "inq.modal_title": "監理団体・受入れ企業様 お問合せフォーム",
    "inq.modal_subtitle": "インドネシア人材の採用・面接依頼・現地視察のご相談",
    "inq.company_name": "貴社名 / 団体名",
    "inq.org_type": "組織区分",
    "inq.contact_person": "ご担当者様氏名",
    "inq.position": "役職",
    "inq.email": "メールアドレス",
    "inq.phone": "電話番号",
    "inq.sector": "希望職種・分野",
    "inq.count": "採用予定人数",
    "inq.period": "希望配属時期",
    "inq.message": "ご要望・メッセージ",
    "inq.submit_btn": "お問合せを送信",
    "inq.submitting": "送信中...",
    "inq.success_title": "お問合せありがとうございました",
    "inq.success_desc": "内容を確認のうえ、日本人対応窓口または担当責任者より速やかにご連絡申し上げます。",

    // FAQ
    "faq.section_title": "よくあるご質問 (FAQ)",
    "faq.section_subtitle": "応募条件、寄宿舎生活、費用に関する疑問にお答えします。",

    // Footer
    "footer.about_title": "LPKインドラ・ウィジャヤについて",
    "footer.quick_links": "クイックリンク",
    "footer.contact_title": "インドラマユ本校・アクセス",
    "footer.legal_title": "公認許認可番号",
    "footer.copyright": "© 2026 LPK INDRA WIJAYA. 無断転載を禁じます。インドネシア労働省公認送出し機関（西ジャワ州インドラマユ）"
  },
  en: {
    // Nav
    "nav.home": "Home",
    "nav.about": "About & Legality",
    "nav.programs": "Programs",
    "nav.jobs": "Japan Jobs",
    "nav.process": "Process Flow",
    "nav.gallery": "Gallery & News",
    "nav.testimonials": "Testimonials",
    "nav.japan_partner": "For Japanese Partners",
    "nav.contact": "Contact Us",
    "nav.register_btn": "Apply Now",
    "nav.admin": "CMS Admin",

    // Hero
    "hero.badge": "OFFICIALLY LICENSED SENDING ORGANIZATION • INDRAMAYU, WEST JAVA",
    "hero.title_prefix": "Build a Fulfilling Career in",
    "hero.title_highlight": "Japan with LPK Indra Wijaya",
    "hero.title_suffix": "Official Sending Org",
    "hero.subtitle": "Officially certified Vocational Training Center & Sending Organization (SO) licensed by the Indonesian Ministry of Manpower. Specializing in Specified Skilled Worker (SSW) and Technical Intern Training Programs with intensive Japanese language, professional ethics, and physical-mental discipline (FMD).",
    "hero.cta_register": "Online Trainee Application",
    "hero.cta_consult": "Free WhatsApp Consultation",
    "hero.cta_partner": "For Japanese Supervising Orgs",
    "hero.stat_alumni": "Trainees Dispatched",
    "hero.stat_partners": "Japanese Partner Companies",
    "hero.stat_pass_rate": "Interview Pass Rate",
    "hero.stat_experience": "Years of Excellence",
    "hero.card_badge": "DISPATCH & TRAINING PROFILE",
    "hero.card_accredited": "Accredited",
    "hero.card_item1_title": "Specified Skilled Worker (SSW) 1",
    "hero.card_item1_desc": "Caregiving, Agriculture, Food Processing, Construction & Manufacturing.",
    "hero.card_item2_title": "Technical Intern Training (TITP)",
    "hero.card_item2_desc": "3-5 year contracts partnered with trusted OTIT-registered Supervising Orgs.",
    "hero.card_item3_title": "Indramayu Dormitory & FMD Training",
    "hero.card_item3_desc": "Fostering resilience, high discipline, 5S principles, and Japanese work ethics.",
    "hero.card_banner_title": "New Batch Admissions Now Open!",
    "hero.card_banner_subtitle": "Limited Interview Slots with Japanese Companies",
    "hero.card_banner_cta": "Apply for Selection Now →",

    // Trust & Credentials
    "trust.title": "Official Credentials & Core Advantages",
    "trust.subtitle": "Guaranteed legal transparency and complete compliance with Indonesian and Japanese regulations.",
    "trust.so_label": "Sending Organization (SO) License",
    "trust.disnaker_label": "Manpower Agency (Disnaker) License",
    "trust.vin_label": "National Institution Verification (VIN)",
    "trust.feature1_title": "100% Legal & Broker-Free",
    "trust.feature1_desc": "Transparent process directly managed from our main campus in Lohbener, Indramayu with zero illegal middlemen.",
    "trust.feature2_title": "Comprehensive Dormitory & Labs",
    "trust.feature2_desc": "Separate male & female dorms, air-conditioned language classrooms, nursing care bed simulation, and fitness training grounds.",
    "trust.feature3_title": "High Pass Rate Certification",
    "trust.feature3_desc": "Structured preparation for JFT-Basic A2, JLPT N4/N3, and SSW skill evaluations coached by certified instructors.",
    "trust.feature4_title": "Extensive Nationwide Japan Network",
    "trust.feature4_desc": "Active partnerships with trusted Kumiai and Accepting Companies in Tokyo, Chiba, Aichi, Osaka, Ibaraki, etc.",

    // Programs
    "programs.section_title": "Training & Dispatch Programs",
    "programs.section_subtitle": "Select your career pathway according to your ambitions and technical interests.",
    "programs.tab_all": "All Programs",
    "programs.tab_ssw": "Specified Skilled Worker (SSW)",
    "programs.tab_intern": "Technical Internship",
    "programs.tab_lang": "Language & FMD Course",
    "programs.duration": "Training Duration",
    "programs.target": "Target Proficiency",
    "programs.requirements": "Requirements",
    "programs.benefits": "Key Benefits",
    "programs.apply_btn": "Apply for this Program",

    // Jobs
    "jobs.section_title": "Latest Job Openings in Japan",
    "jobs.section_subtitle": "Verified job orders currently accepting candidates from LPK Indra Wijaya.",
    "jobs.salary_label": "Estimated Monthly Salary",
    "jobs.location_label": "Prefecture Placement",
    "jobs.quota_label": "Remaining Quota",
    "jobs.deadline_label": "Application Deadline",
    "jobs.benefit_housing": "Accommodation Provided",
    "jobs.benefit_insurance": "Full Social Insurance",
    "jobs.benefit_ot": "Overtime Available",
    "jobs.status_open": "Now Accepting",
    "jobs.status_interviewing": "Interview Selection",
    "jobs.status_closed": "Quota Filled",
    "jobs.apply_btn": "Apply for Job",

    // Process
    "process.section_title": "6-Step Pathway to Japan",
    "process.section_subtitle": "A transparent, structured journey from registration in Indramayu to arrival in Japan.",
    "process.step1_title": "1. Registration & Assessment",
    "process.step1_desc": "Submit application online or at our Indramayu office, followed by initial medical check, fitness screening, and interview.",
    "process.step2_title": "2. Intensive Dormitory Training",
    "process.step2_desc": "Boarding education focusing on Japanese fluency, 5S & Hourenso business etiquette, and physical endurance (FMD).",
    "process.step3_title": "3. Skill Tests & Japanese User Interview",
    "process.step3_desc": "Passing JFT-Basic / JLPT exams followed by direct interview (Menyetsu) with prospective Japanese employers.",
    "process.step4_title": "4. Contract & CoE Application",
    "process.step4_desc": "Official labor contract signing and application for Certificate of Eligibility (CoE) via Japanese Immigration.",
    "process.step5_title": "5. Working Visa & Pre-Departure Briefing",
    "process.step5_desc": "Issuance of Japanese working visa, final cultural preparation, and official family farewell ceremony.",
    "process.step6_title": "6. Flight & Airport Reception in Japan",
    "process.step6_desc": "Official flight departure via Soekarno-Hatta International Airport, warmly welcomed by partner teams in Japan.",

    // Japan Partner Section
    "partner.section_badge": "FOR JAPANESE ORGANIZATIONS & COMPANIES",
    "partner.section_title": "A Trusted Partner for Japanese Enterprises",
    "partner.intro": "LPK Indra Wijaya is dedicated to being a premier Sending Organization from West Java, cultivating disciplined, honest, and resilient Indonesian youth ready for immediate workplace integration in Japan.",
    "partner.point1_title": "Rigorous Character Screening",
    "partner.point1_desc": "Our candidates originate from Indramayu and neighboring regions, recognized for their strong work ethic and politeness.",
    "partner.point2_title": "Dedicated Training Campus",
    "partner.point2_desc": "Our facility in Lohbener features boarding dormitories, nursing care simulation labs, and Japanese standard discipline grounds.",
    "partner.point3_title": "Zero Desertion Commitment",
    "partner.point3_desc": "Thorough pre-departure legal and ethical training combined with ongoing support systems minimizes workplace dropouts.",
    "partner.cta_inquiry": "Submit Candidate Recruitment Inquiry",

    // Testimonials & Gallery
    "testi.section_title": "Alumni Success Stories in Japan",
    "testi.section_subtitle": "Young achievers from Indramayu now thriving with established careers across Japan.",
    "gallery.section_badge": "ACTIVITY DOCUMENTATION",
    "gallery.section_title": "Photo Documentation & Slideshow",
    "gallery.section_subtitle": "Authentic records from daily training in Indramayu to official airport departure ceremonies for Japan.",
    "gallery.filter_all": "All Photos",
    "gallery.filter_departure": "Departures",
    "gallery.filter_training": "Training & FMD",
    "gallery.filter_japan": "Japan Partners",
    "gallery.slideshow_prev": "Previous Photo",
    "gallery.slideshow_next": "Next Photo",
    "gallery.slideshow_autoplay": "Auto-Play Slideshow",
    "gallery.slideshow_pause": "Pause Slideshow",
    "gallery.view_full": "View Fullscreen",
    "gallery.close_modal": "Close",

    // Registration Form
    "reg.modal_title": "Trainee Online Registration",
    "reg.modal_subtitle": "Fill in your details accurately. Our admissions team will reach out via WhatsApp.",
    "reg.name_label": "Full Legal Name (as in KTP)",
    "reg.gender_label": "Gender",
    "reg.male": "Male",
    "reg.female": "Female",
    "reg.birth_label": "Date of Birth",
    "reg.wa_label": "Active WhatsApp Number",
    "reg.email_label": "Email (Optional)",
    "reg.district_label": "District / Hometown",
    "reg.district_placeholder": "E.g. Lohbener / Jatibarang / Sindang",
    "reg.education_label": "Highest Education Level",
    "reg.program_label": "Program of Interest",
    "reg.jp_level_label": "Current Japanese Proficiency",
    "reg.height_weight_label": "Height (cm) & Weight (kg)",
    "reg.notes_label": "Additional Notes (Optional)",
    "reg.submit_btn": "Submit Application Now",
    "reg.submitting": "Submitting...",
    "reg.success_title": "Application Successfully Submitted!",
    "reg.success_desc": "Your details have been saved to LPK Indra Wijaya's admissions database. We will contact you soon for the next assessment steps.",
    "reg.direct_wa_btn": "Chat with Admissions WhatsApp",

    // Partner Inquiry Form
    "inq.modal_title": "Corporate Partner Inquiry Form",
    "inq.modal_subtitle": "For Japanese Supervising Organizations, Registered Support Orgs & Accepting Companies",
    "inq.company_name": "Company / Organization Name",
    "inq.org_type": "Organization Category",
    "inq.contact_person": "Contact Person Name",
    "inq.position": "Title / Role",
    "inq.email": "Official Email Address",
    "inq.phone": "Telephone Number",
    "inq.sector": "Industry / Sector Needed",
    "inq.count": "Target Number of Hires",
    "inq.period": "Target Arrival Period",
    "inq.message": "Message / Requirements",
    "inq.submit_btn": "Send Inquiry",
    "inq.submitting": "Submitting...",
    "inq.success_title": "Thank You for Your Inquiry",
    "inq.success_desc": "We have received your message. Our international cooperation team will get in touch with you shortly.",

    // FAQ
    "faq.section_title": "Frequently Asked Questions (FAQ)",
    "faq.section_subtitle": "Answers regarding eligibility, boarding life, training costs, and Japanese work contracts.",

    // Footer
    "footer.about_title": "About LPK Indra Wijaya",
    "footer.quick_links": "Quick Navigation",
    "footer.contact_title": "Campus & Contact",
    "footer.legal_title": "Accreditation & Licenses",
    "footer.copyright": "© 2026 LPK Indra Wijaya. All Rights Reserved. Official Sending Organization licensed by Ministry of Manpower Indonesia."
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('id');

  useEffect(() => {
    const saved = localStorage.getItem('lpk_language') as Language;
    if (saved && (saved === 'id' || saved === 'ja' || saved === 'en')) {
      setLanguageState(saved);
      if (typeof window !== 'undefined') {
        document.documentElement.lang = saved;
      }
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('lpk_language', lang);
      document.documentElement.lang = lang;
    }
  };

  const t = (key: string): string => {
    const dict = translations[language] || translations['id'];
    return dict[key] || translations['id'][key] || key;
  };

  const tObj = (obj?: MultilingualString | null, fallback = ''): string => {
    if (!obj) return fallback;
    return obj[language] || obj['id'] || obj['en'] || fallback;
  };

  const tList = (list?: MultilingualList | null): string[] => {
    if (!list) return [];
    return list[language] || list['id'] || list['en'] || [];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, tObj, tList }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
