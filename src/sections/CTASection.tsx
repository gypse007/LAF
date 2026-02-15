import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Phone, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Content animation
      gsap.fromTo(contentRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Glow pulse animation
      gsap.to(glowRef.current, {
        scale: 1.2,
        opacity: 0.3,
        duration: 3,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative min-h-[70vh] sm:min-h-[80vh] py-20 sm:py-32 overflow-hidden"
    >
      {/* Background Glow */}
      <div
        ref={glowRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] bg-[#8B5CF6]/20 rounded-full blur-[80px] sm:blur-[150px]"
      />

      {/* Radial Lines */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 w-px h-[200%] bg-gradient-to-b from-[#8B5CF6] to-transparent origin-top"
            style={{ transform: `translateX(-50%) rotate(${i * 30}deg)` }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
        <div ref={contentRef} className="text-center">
          {/* Badge */}
          <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-[#8B5CF6]/30 text-[#8B5CF6] text-xs sm:text-sm tracking-widest uppercase mb-6 sm:mb-8">
            Start Your Project
          </span>

          {/* Headline */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6 leading-tight">
            <span className="text-white">Ready to </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#A78BFA] to-[#8B5CF6]">
              Transform
            </span>
            <br />
            <span className="text-white">Your Space?</span>
          </h2>

          {/* Subtext */}
          <p className="text-base sm:text-xl text-white/60 max-w-2xl mx-auto mb-8 sm:mb-12 px-2 sm:px-0">
            Let's create something extraordinary together. Your walls are waiting to tell your story.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-10 sm:mb-16">
            <a
              href="https://wa.me/918019818999?text=Hi%20Laksmi%20Art%20Fixes%20Team%2C%0AI%E2%80%99m%20interested%20in%20commercial%20wall%20branding%20for%20my%20space.%0A%0A%F0%9F%93%8D%20Location%3A%0A%F0%9F%8F%A2%20Business%20Type%3A%0A%F0%9F%93%90%20Approx%20Wall%20Area%3A%0A%F0%9F%93%85%20Expected%20Completion%20Date%3A"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2 sm:gap-3 px-8 sm:px-10 py-4 sm:py-5 rounded-full bg-[#8B5CF6] text-black font-bold text-base sm:text-lg overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(139,92,246,0.5)]"
            >
              <span className="relative">Get Free Consultation</span>
              <ArrowRight className="relative w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="#work"
              className="group inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-4 sm:py-5 rounded-full border border-white/20 text-white font-medium hover:border-[#8B5CF6]/50 hover:text-[#8B5CF6] transition-all duration-300"
            >
              <span>View Our Work</span>
            </a>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            <a
              href="tel:8019818999"
              className="flex items-center gap-2 sm:gap-3 text-white/60 hover:text-[#8B5CF6] transition-colors"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#8B5CF6]">
                <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
              <span className="text-sm sm:text-base">80198 18999</span>
            </a>

            <a
              href="mailto:hello@lakshmiartfixes.com"
              className="flex items-center gap-2 sm:gap-3 text-white/60 hover:text-[#8B5CF6] transition-colors"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-white/20 flex items-center justify-center">
                <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
              <span className="text-sm sm:text-base">hello@lakshmiartfixes.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#8B5CF6]/30 to-transparent" />
    </section>
  );
}
