import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import ServicesSection from "@/components/services-section";
import ToolsSection from "@/components/tools-section";
import CaseStudiesSection from "@/components/case-studies-section";
import BlogSection from "@/components/blog-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ToolsSection />
      <CaseStudiesSection />
      <BlogSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
