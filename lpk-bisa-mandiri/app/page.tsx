import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustSection from "@/components/TrustSection";
import Ecosystem from "@/components/Ecosystem";
import Roadmap from "@/components/Roadmap";
import BisajftPreview from "@/components/BisajftPreview";
import WhyUs from "@/components/WhyUs";
import Testimonials from "@/components/Testimonials";
import FinalCTA from "@/components/FinalCTA";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustSection />
        <Ecosystem />
        <Roadmap />
        <BisajftPreview />
        <WhyUs />
        <Testimonials />
        <FinalCTA />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
