import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, MousePointer2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.5 });

      // Title word-by-word animation
      const words = contentRef.current?.querySelectorAll('.word');
      if (words) {
        tl.from(words, {
          y: 50,
          opacity: 0,
          duration: 1,
          stagger: 0.05,
          ease: 'power3.out',
        });
      }

      // Description reveal
      const desc = contentRef.current?.querySelector('.hero-desc');
      if (desc) {
        tl.from(desc, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
        }, '-=0.5');
      }

      // CTA buttons reveal
      const ctas = contentRef.current?.querySelector('.hero-cta');
      if (ctas) {
        tl.from(ctas, {
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
        }, '-=0.6');
      }

      // Scroll indicator reveal
      tl.from(scrollIndicatorRef.current, {
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
      }, '-=0.5');

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-60"
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>
        {/* Dark Gradient Overlay for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />
      </div>

      {/* Main Content - Bottom Left Alignment */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 sm:px-12 pb-20 sm:pb-32 flex flex-col justify-end items-start text-left pointer-events-none">
        <div ref={contentRef} className="max-w-4xl pointer-events-auto">
          {/* Main Title */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-[0.9] tracking-tight">
            <span className="word inline-block">REDEFINING</span>{' '}
            <span className="word inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#E8D5A3] to-[#C9A962]">
              SPACES
            </span>
          </h1>

          {/* Subtitle / Description */}
          <p className="hero-desc text-gray-300 text-lg sm:text-xl md:text-2xl max-w-2xl mb-10 leading-relaxed font-light">
            Where art meets architecture. We craft immersive environments that define your story with precision-crafted artistry.
          </p>

          {/* CTA Buttons */}
          <div className="hero-cta flex flex-wrap gap-4 sm:gap-6">
            <a
              href="#work"
              className="px-8 py-4 rounded-full bg-white text-black font-bold text-lg hover:bg-gray-100 transition-colors duration-300 flex items-center gap-2"
            >
              Our Portfolio
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="https://wa.me/918019818999"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full border border-white/30 text-white font-medium text-lg hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm flex items-center gap-2"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Bottom Center */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-20 group pointer-events-auto"
        onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="text-gray-400 text-xs tracking-widest uppercase group-hover:text-white transition-colors">Scroll</span>
        <MousePointer2 className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors animate-bounce" />
      </div>
    </section>
  );
}
