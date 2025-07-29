import HeroSection from '@/components/hero/HeroSection'
import AIOrchestrationDemo from '@/components/orchestration/AIOrchestrationDemo'
import TechShowcaseSection from '@/components/interactive/TechShowcaseSection'
import PerformanceCharts from '@/components/charts/PerformanceCharts'
import ArchitectureDiagram from '@/components/architecture/ArchitectureDiagram'
import SecuritySection from '@/components/security/SecuritySection'
import EnterpriseSection from '@/components/enterprise/EnterpriseSection'
import PricingCalculator from '@/components/pricing/PricingCalculator'
import TestimonialsSection from '@/components/testimonials/TestimonialsSection'
import CallToActionSection from '@/components/cta/CallToActionSection'
import TechLogos from '@/components/common/TechLogos'

export default function Home() {
  return (
    <main className="relative bg-black min-h-screen w-full overflow-x-hidden pt-16 lg:pt-20">
      <section id="hero">
        <HeroSection />
      </section>
      
      <TechLogos />
      
      <section id="features">
        <AIOrchestrationDemo />
        <TechShowcaseSection />
        <PerformanceCharts />
      </section>
      
      <section id="architecture">
        <ArchitectureDiagram />
      </section>
      
      <section id="security">
        <SecuritySection />
      </section>
      
      <section id="enterprise">
        <EnterpriseSection />
      </section>
      
      <section id="pricing">
        <PricingCalculator />
      </section>
      
      <section id="testimonials">
        <TestimonialsSection />
      </section>
      
      <section id="contact">
        <CallToActionSection />
      </section>
    </main>
  );
}
