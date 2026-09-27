export type Language = 'id' | 'ja' | 'en';

export interface MultilingualString {
  id: string;
  ja: string;
  en: string;
}

export interface MultilingualList {
  id: string[];
  ja: string[];
  en: string[];
}

export interface CompanyProfile {
  name: string;
  shortName: string;
  legalName: string;
  logoUrl?: string;
  brandTag?: string;
  brandSubtitle?: string;
  showBrandText?: boolean;
  tagline: MultilingualString;
  description: MultilingualString;
  soLicenseNumber: string;
  disnakerLicenseNumber: string;
  vinNumber: string;
  address: string;
  district: string;
  regency: string;
  province: string;
  postalCode: string;
  phone: string;
  whatsapp: string;
  whatsappMessage: string;
  email: string;
  operatingHours: MultilingualString;
  googleMapsEmbedUrl: string;
  socials: {
    instagram: string;
    tiktok: string;
    facebook: string;
    youtube: string;
  };
  stats: {
    traineesDeparted: number;
    partnerCompanies: number;
    interviewPassRate: number;
    yearsExperience: number;
  };
}

export interface ProgramItem {
  id: string;
  slug: string;
  title: MultilingualString;
  category: 'ssw' | 'intern' | 'language';
  duration: MultilingualString;
  targetLevel: string;
  description: MultilingualString;
  highlights: MultilingualList;
  requirements: MultilingualList;
  icon: string;
  active: boolean;
  featured: boolean;
}

export interface JobOrderItem {
  id: string;
  title: MultilingualString;
  sector: string;
  category: 'ssw' | 'intern';
  prefecture: MultilingualString;
  salaryRangeJpy: string;
  salaryEstimatedIdr: string;
  quota: number;
  remainingQuota: number;
  deadline: string;
  housingProvided: boolean;
  insuranceProvided: boolean;
  overtimeAvailable: boolean;
  requirements: MultilingualList;
  status: 'open' | 'interviewing' | 'closed';
  featured: boolean;
}

export interface EducationEntry {
  year: string;
  month: string;
  name: string;
  status: '入学' | '卒業' | '中退' | '在学中' | 'Masuk' | 'Lulus';
}

export interface WorkEntry {
  year: string;
  month: string;
  name: string;
  status: '入社' | '退社' | 'Masuk' | 'Keluar' | '現在に至る';
}

export interface LicenseEntry {
  year: string;
  month: string;
  name: string;
}

export interface ApplicantItem {
  id: string;
  fullName: string;
  katakanaName?: string;
  gender: 'Laki-laki' | 'Perempuan';
  birthDate: string;
  birthPlace?: string;
  age: number;
  phoneWhatsapp: string;
  email?: string;
  originDistrict: string;
  originRegency: string;
  fullAddress?: string;
  addressFurigana?: string;
  postalCode?: string;
  emergencyContact?: {
    name?: string;
    relationship?: string;
    phone?: string;
    address?: string;
    postalCode?: string;
  };
  lastEducation: string;
  heightCm: number;
  weightKg: number;
  bloodType?: 'A' | 'B' | 'AB' | 'O' | '-';
  dominantHand?: 'Kanan' | 'Kiri' | '右' | '左';
  vision?: {
    left?: string;
    right?: string;
  };
  maritalStatus?: 'Belum Menikah' | 'Menikah' | 'Cerai' | '未婚' | '既婚';
  religion?: string;
  interestedProgram: string;
  interestedSector?: string;
  preferredPrefecture?: string;
  japaneseLevel: 'Belum Pernah' | 'Dasar / Hiragana Katakana' | 'N5' | 'N4' | 'N3+';
  photoUrl?: string;
  educationHistory?: EducationEntry[];
  workHistory?: WorkEntry[];
  certifications?: LicenseEntry[];
  personalPreferences?: string;
  motivation?: string;
  notes?: string;
  status: 'baru' | 'terjadwal_seleksi' | 'sedang_pelatihan' | 'lolos_wawancara' | 'selesai' | 'ditolak';
  createdAt: string;
}

export interface PartnerInquiryItem {
  id: string;
  companyName: string;
  organizationType: '監理団体 (Supervising Org)' | '受入企業 (Accepting Company)' | '登録支援機関 (Registered Support Org)' | 'Lainnya';
  country: string;
  contactPerson: string;
  position: string;
  email: string;
  phone: string;
  sectorNeeded: string;
  candidateCountNeeded: number;
  targetArrivalPeriod: string;
  message: string;
  status: 'baru' | 'dihubungi' | 'kerjasama_aktif';
  createdAt: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  origin: string;
  role?: string;
  sector: MultilingualString;
  prefecture: MultilingualString;
  companyName: string;
  quote: MultilingualString;
  photoUrl: string;
  yearDeparted: number;
  visaType: 'Tokutei Ginou (SSW)' | 'Ginou Jisshuusei (Magang)' | 'Gijinkoku (Engineer)';
}

export interface ArticleGalleryItem {
  id: string;
  type: 'article' | 'gallery';
  title: MultilingualString;
  summary: MultilingualString;
  content?: MultilingualString;
  category: string;
  imageUrl: string;
  date: string;
  published: boolean;
}

export interface AppDatabase {
  company: CompanyProfile;
  programs: ProgramItem[];
  jobOrders: JobOrderItem[];
  applicants: ApplicantItem[];
  partnerInquiries: PartnerInquiryItem[];
  testimonials: TestimonialItem[];
  articlesAndGallery: ArticleGalleryItem[];
  adminUser: {
    username: string;
    passwordHash: string;
    lastLogin?: string;
  };
}
