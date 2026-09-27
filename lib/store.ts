import fs from 'fs';
import path from 'path';
import { AppDatabase, CompanyProfile, ProgramItem, JobOrderItem, ApplicantItem, PartnerInquiryItem, TestimonialItem, ArticleGalleryItem } from './types';
import { initialData } from './initialData';

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

function ensureDataDirectory(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

export function getDatabase(): AppDatabase {
  try {
    ensureDataDirectory();
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
      return initialData;
    }
    const fileContent = fs.readFileSync(DB_FILE, 'utf-8');
    const parsed = JSON.parse(fileContent) as AppDatabase;
    return parsed;
  } catch (error) {
    console.error("Error reading database file, using fallback initialData:", error);
    return initialData;
  }
}

export function saveDatabase(data: AppDatabase): void {
  ensureDataDirectory();
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

// Company Profile
export function updateCompanyProfile(updates: Partial<CompanyProfile>): CompanyProfile {
  const db = getDatabase();
  db.company = { ...db.company, ...updates };
  saveDatabase(db);
  return db.company;
}

// Applicants
export function addApplicant(input: Omit<ApplicantItem, 'id' | 'createdAt'>): ApplicantItem {
  const db = getDatabase();
  const newApplicant: ApplicantItem = {
    ...input,
    id: `app-${Date.now()}`,
    createdAt: new Date().toISOString()
  };
  db.applicants.unshift(newApplicant);
  saveDatabase(db);
  return newApplicant;
}

export function updateApplicantStatus(id: string, status: ApplicantItem['status'], notes?: string): boolean {
  const db = getDatabase();
  const applicant = db.applicants.find(a => a.id === id);
  if (!applicant) return false;
  applicant.status = status;
  if (notes !== undefined) {
    applicant.notes = notes;
  }
  saveDatabase(db);
  return true;
}

export function deleteApplicant(id: string): boolean {
  const db = getDatabase();
  const initialLength = db.applicants.length;
  db.applicants = db.applicants.filter(a => a.id !== id);
  if (db.applicants.length !== initialLength) {
    saveDatabase(db);
    return true;
  }
  return false;
}

// Partner Inquiries
export function addPartnerInquiry(input: Omit<PartnerInquiryItem, 'id' | 'createdAt'>): PartnerInquiryItem {
  const db = getDatabase();
  const newInquiry: PartnerInquiryItem = {
    ...input,
    id: `inq-${Date.now()}`,
    createdAt: new Date().toISOString()
  };
  db.partnerInquiries.unshift(newInquiry);
  saveDatabase(db);
  return newInquiry;
}

export function updatePartnerInquiryStatus(id: string, status: PartnerInquiryItem['status']): boolean {
  const db = getDatabase();
  const inquiry = db.partnerInquiries.find(i => i.id === id);
  if (!inquiry) return false;
  inquiry.status = status;
  saveDatabase(db);
  return true;
}

// Programs
export function saveProgram(program: ProgramItem): ProgramItem {
  const db = getDatabase();
  const existingIdx = db.programs.findIndex(p => p.id === program.id);
  if (existingIdx >= 0) {
    db.programs[existingIdx] = program;
  } else {
    if (!program.id) {
      program.id = `prog-${Date.now()}`;
    }
    db.programs.push(program);
  }
  saveDatabase(db);
  return program;
}

export function deleteProgram(id: string): boolean {
  const db = getDatabase();
  const initialLength = db.programs.length;
  db.programs = db.programs.filter(p => p.id !== id);
  if (db.programs.length !== initialLength) {
    saveDatabase(db);
    return true;
  }
  return false;
}

// Job Orders
export function saveJobOrder(job: JobOrderItem): JobOrderItem {
  const db = getDatabase();
  const existingIdx = db.jobOrders.findIndex(j => j.id === job.id);
  if (existingIdx >= 0) {
    db.jobOrders[existingIdx] = job;
  } else {
    if (!job.id) {
      job.id = `job-${Date.now()}`;
    }
    db.jobOrders.unshift(job);
  }
  saveDatabase(db);
  return job;
}

export function deleteJobOrder(id: string): boolean {
  const db = getDatabase();
  const initialLength = db.jobOrders.length;
  db.jobOrders = db.jobOrders.filter(j => j.id !== id);
  if (db.jobOrders.length !== initialLength) {
    saveDatabase(db);
    return true;
  }
  return false;
}

// Testimonials
export function saveTestimonial(testimonial: TestimonialItem): TestimonialItem {
  const db = getDatabase();
  const existingIdx = db.testimonials.findIndex(t => t.id === testimonial.id);
  if (existingIdx >= 0) {
    db.testimonials[existingIdx] = testimonial;
  } else {
    if (!testimonial.id) {
      testimonial.id = `testi-${Date.now()}`;
    }
    db.testimonials.unshift(testimonial);
  }
  saveDatabase(db);
  return testimonial;
}

export function deleteTestimonial(id: string): boolean {
  const db = getDatabase();
  const initialLength = db.testimonials.length;
  db.testimonials = db.testimonials.filter(t => t.id !== id);
  if (db.testimonials.length !== initialLength) {
    saveDatabase(db);
    return true;
  }
  return false;
}

// Articles & Gallery
export function saveArticleGallery(item: ArticleGalleryItem): ArticleGalleryItem {
  const db = getDatabase();
  const existingIdx = db.articlesAndGallery.findIndex(a => a.id === item.id);
  if (existingIdx >= 0) {
    db.articlesAndGallery[existingIdx] = item;
  } else {
    if (!item.id) {
      item.id = `art-${Date.now()}`;
    }
    db.articlesAndGallery.unshift(item);
  }
  saveDatabase(db);
  return item;
}

export function deleteArticleGallery(id: string): boolean {
  const db = getDatabase();
  const initialLength = db.articlesAndGallery.length;
  db.articlesAndGallery = db.articlesAndGallery.filter(a => a.id !== id);
  if (db.articlesAndGallery.length !== initialLength) {
    saveDatabase(db);
    return true;
  }
  return false;
}

// Admin Auth
export function verifyAdminCredentials(username: string, password: string): boolean {
  const db = getDatabase();
  return (
    db.adminUser.username.trim().toLowerCase() === username.trim().toLowerCase() &&
    db.adminUser.passwordHash === password
  );
}

export function updateAdminPassword(newPassword: string): boolean {
  const db = getDatabase();
  db.adminUser.passwordHash = newPassword;
  saveDatabase(db);
  return true;
}
