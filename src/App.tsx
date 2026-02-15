import { useState, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CustomCursor from './components/CustomCursor';
import LoadingScreen from './components/LoadingScreen';
import Navigation from './components/Navigation';
import ParticleBackground from './components/ParticleBackground';
import HeroSection from './sections/HeroSection';
import ManifestoSection from './sections/ManifestoSection';
import ServicesSection from './sections/ServicesSection';
import ProcessSection from './sections/ProcessSection';
import WorkSection from './sections/WorkSection';
import TechnologySection from './sections/TechnologySection';
import BeforeAfterSection from './sections/BeforeAfterSection';
import TestimonialsSection from './sections/TestimonialsSection';
import CTASection from './sections/CTASection';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleLoadComplete = useCallback(() => {
    setIsLoading(false);
    // Refresh ScrollTrigger after loading
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#060612]">
      {/* Noise Texture Overlay */}
      <div className="noise" />

      {/* Custom Cursor */}
      <CustomCursor />

      {/* Particle Background */}
      <ParticleBackground />

      {/* Loading Screen */}
      {isLoading && <LoadingScreen onLoadComplete={handleLoadComplete} />}

      {/* Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 h-[2px] z-[9999] transition-all duration-100"
        style={{
          width: `${scrollProgress}%`,
          background: 'linear-gradient(90deg, #8B5CF6, #22D3EE, #2DD4BF, #8B5CF6)'
        }}
      />

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className={`relative z-10 transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <HeroSection />
        <ManifestoSection />
        <ServicesSection />
        <ProcessSection />
        <WorkSection />
        <TechnologySection />
        <BeforeAfterSection />
        <TestimonialsSection />
        <CTASection />
        <Footer />
      </main>
    </div>
  );
}

export default App;
