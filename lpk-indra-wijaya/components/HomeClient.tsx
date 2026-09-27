"use client";

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import TrustSection from '@/components/TrustSection';
import ProgramsSection from '@/components/ProgramsSection';
import JobOrdersSection from '@/components/JobOrdersSection';
import JapanPartnerSection from '@/components/JapanPartnerSection';
import ProcessTimeline from '@/components/ProcessTimeline';
import GallerySection from '@/components/GallerySection';
import TestimonialsSection from '@/components/TestimonialsSection';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import RegistrationModal from '@/components/RegistrationModal';
import PartnerInquiryModal from '@/components/PartnerInquiryModal';
import { AppDatabase } from '@/lib/types';

interface HomeClientProps {
  initialData: AppDatabase;
}

export default function HomeClient({ initialData }: HomeClientProps) {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isPartnerOpen, setIsPartnerOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<string>("");
  const [selectedJob, setSelectedJob] = useState<string>("");

  const handleOpenRegister = (programId = "", jobTitle = "") => {
    setSelectedProgram(programId);
    setSelectedJob(jobTitle);
    setIsRegisterOpen(true);
  };

  return (
    <div className="flex-1 flex flex-col">
      <Navbar 
        company={initialData.company}
        onOpenRegisterModal={() => handleOpenRegister()} 
        onOpenPartnerModal={() => setIsPartnerOpen(true)} 
      />

      <main className="flex-1">
        <Hero 
          company={initialData.company}
          galleryItems={initialData.articlesAndGallery}
          onOpenRegisterModal={() => handleOpenRegister()}
          onOpenPartnerModal={() => setIsPartnerOpen(true)}
        />
        <TrustSection company={initialData.company} />
        <ProgramsSection 
          programs={initialData.programs} 
          onSelectProgramForApply={(progId) => handleOpenRegister(progId)}
        />
        <JobOrdersSection 
          jobOrders={initialData.jobOrders} 
          onSelectJobForApply={(jobTitle) => handleOpenRegister("", jobTitle)}
        />
        <ProcessTimeline />
        <GallerySection items={initialData.articlesAndGallery} />
        <TestimonialsSection testimonials={initialData.testimonials} />
        <JapanPartnerSection 
          onOpenPartnerModal={() => setIsPartnerOpen(true)}
        />
        <FAQSection />
      </main>

      <Footer company={initialData.company} />

      <FloatingWhatsApp 
        phone={initialData.company.whatsapp}
        defaultMessage={initialData.company.whatsappMessage}
      />

      <RegistrationModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        preselectedProgram={selectedProgram}
        preselectedJob={selectedJob}
      />

      <PartnerInquiryModal
        isOpen={isPartnerOpen}
        onClose={() => setIsPartnerOpen(false)}
      />
    </div>
  );
}
