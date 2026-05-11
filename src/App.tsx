import { useState, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CustomCursor from './components/CustomCursor';
import LoadingScreen from './components/LoadingScreen';
import CardNav from './components/CardNav';
import Silk from './components/Silk';
import HeroSection from './sections/HeroSection';
import ManifestoSection from './sections/ManifestoSection';
import ServicesSection from './sections/ServicesSection';
import ProcessSection from './sections/ProcessSection';
import WorkSection from './sections/WorkSection';
import TechnologySection from './sections/TechnologySection';
import BeforeAfterSection from './sections/BeforeAfterSection';
import CTASection from './sections/CTASection';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

const WA_CTA = 'https://wa.me/918019818999?text=Hi%20Lakshmi%20Art%20Fixers%20Team%2C%0AI%E2%80%99m%20interested%20in%20commercial%20wall%20branding%20for%20my%20space.%0A%0A%F0%9F%93%8D%20Location%3A%0A%F0%9F%8F%A2%20Business%20Type%3A%0A%F0%9F%93%90%20Approx%20Wall%20Area%3A%0A%F0%9F%93%85%20Expected%20Completion%20Date%3A';

const navItems = [
  {
    label: 'Services',
    bgColor: '#0D0C09',
    textColor: '#fff',
    links: [
      { label: 'Wall Branding', href: '#services', ariaLabel: 'Wall Branding' },
      { label: 'Texture & Effects', href: '#services', ariaLabel: 'Texture and Effects' },
      { label: 'Commercial Spaces', href: '#services', ariaLabel: 'Commercial Spaces' },
    ],
  },
  {
    label: 'Our Work',
    bgColor: '#13100A',
    textColor: '#fff',
    links: [
      { label: 'Portfolio', href: '#work', ariaLabel: 'Portfolio Gallery' },
      { label: 'Transformations', href: '#beforeafter', ariaLabel: 'Before & After' },
    ],
  },
  {
    label: 'About',
    bgColor: '#1A1508',
    textColor: '#fff',
    links: [
      { label: 'Our Process', href: '#process', ariaLabel: 'Our Process' },
      { label: 'Technology', href: '#technology', ariaLabel: 'Our Technology' },
      { label: 'Contact Us', href: '#contact', ariaLabel: 'Contact Us' },
    ],
  },
];

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleLoadComplete = useCallback(() => {
    setIsLoading(false);
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleCTAClick = () => {
    window.open(WA_CTA, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="relative min-h-screen bg-[#060612]">
      {/* Noise Texture Overlay */}
      <div className="noise" />

      {/* Custom Cursor */}
      <CustomCursor />

      {/* Silk Background — replaces ParticleBackground */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20">
        <Silk
          speed={3}
          scale={1}
          color="#C9A962"
          noiseIntensity={1.5}
          rotation={0}
        />
      </div>

      {/* Loading Screen */}
      {isLoading && <LoadingScreen onLoadComplete={handleLoadComplete} />}

      {/* Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 h-[2px] z-[9999] transition-all duration-100"
        style={{
          width: `${scrollProgress}%`,
          background: 'linear-gradient(90deg, #C9A962, #E8D5A3, #9A7B3D, #C9A962)',
        }}
      />

      {/* CardNav — replaces Navigation */}
      <CardNav
        logo="/images/logo-no-bg.png"
        logoAlt="Lakshmi Art Fixers"
        items={navItems}
        directLinks={[
          { label: 'Interiors', href: '/interiors' },
        ]}
        baseColor="#ffffff"
        menuColor="#1a1409"
        buttonBgColor="#C9A962"
        buttonTextColor="#fff"
        ease="power3.out"
        onCTAClick={handleCTAClick}
      />

      {/* Main Content */}
      <main className={`relative z-10 transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <HeroSection />
        <ManifestoSection />
        <ServicesSection />
        <ProcessSection />
        <WorkSection />
        <TechnologySection />
        <BeforeAfterSection />
        <CTASection />
        <Footer />
      </main>
    </div>
  );
}

export default App;
