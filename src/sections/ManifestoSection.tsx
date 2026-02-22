import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ManifestoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Line 1 - DESIGN
      gsap.fromTo(line1Ref.current,
        { x: -200, opacity: 0 },
        {
          x: 0,
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

      // Line 2 - DETAIL
      gsap.fromTo(line2Ref.current,
        { x: 200, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Line 3 - PERFECTION
      gsap.fromTo(line3Ref.current,
        { scale: 0.5, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: 'elastic.out(1, 0.5)',
          scrollTrigger: {
            trigger: section,
            start: 'top 50%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Description
      gsap.fromTo(descRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 40%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Continuous floating animation for words
      gsap.to('.manifesto-word', {
        y: -10,
        duration: 2,
        ease: 'sine.inOut',
        stagger: {
          each: 0.3,
          yoyo: true,
          repeat: -1,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="manifesto"
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 sm:py-32"
    >
      {/* Background gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-96 sm:h-96 bg-[#8B5CF6]/10 rounded-full blur-[80px] sm:blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-40 h-40 sm:w-80 sm:h-80 bg-[#8B5CF6]/5 rounded-full blur-[60px] sm:blur-[100px]" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center">
        {/* Manifesto Words */}
        <div className="space-y-2 sm:space-y-4 mb-10 sm:mb-16">
          <div ref={line1Ref} className="manifesto-word">
            <span className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#A78BFA] to-[#8B5CF6]">
              WE HATE
            </span>
          </div>

          <div ref={line2Ref} className="manifesto-word">
            <span className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-white/90">
              AVERAGE.
            </span>
          </div>

          <div ref={line3Ref} className="manifesto-word">
            <span className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#A78BFA] via-[#8B5CF6] to-[#6D28D9]">
              FIX YOUR WALLS.
            </span>
          </div>
        </div>

        {/* Description */}
        <p
          ref={descRef}
          className="text-base sm:text-xl md:text-2xl text-white/60 max-w-3xl mx-auto leading-relaxed px-2 sm:px-0"
        >
          Most walls are wasted space. We fix that. We build
          <span className="text-[#8B5CF6]"> visual leverage</span>. Every stroke is calculated.
          Every color has purpose. Perfection by default.
        </p>

        {/* Decorative line */}
        <div className="mt-10 sm:mt-16 flex items-center justify-center gap-4">
          <div className="w-16 sm:w-24 h-px bg-gradient-to-r from-transparent to-[#8B5CF6]/50" />
          <div className="w-2 h-2 sm:w-3 sm:h-3 rotate-45 border border-[#8B5CF6]/50" />
          <div className="w-16 sm:w-24 h-px bg-gradient-to-l from-transparent to-[#8B5CF6]/50" />
        </div>
      </div>
    </section>
  );
}
