import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Paintbrush, Palette, SprayCan, Brush } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function PinScrubSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const windmillRef = useRef<HTMLDivElement>(null);
  const windmillWrapRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const windmill = windmillRef.current;
    const windmillWrap = windmillWrapRef.current;
    if (!section || !windmill || !windmillWrap) return;

    const ctx = gsap.context(() => {
      // Check if mobile - disable pin on mobile for better UX
      const isMobile = window.innerWidth < 768;
      
      if (!isMobile) {
        // Pin scrub effect - 900 degree rotation (desktop only)
        const tl = gsap.timeline({
          scrollTrigger: {
            scrub: 1,
            pin: true,
            trigger: windmill,
            start: '50% 50%',
            endTrigger: windmillWrap,
            end: 'bottom 50%',
          },
        });

        tl.to(windmill, {
          rotateZ: 900,
          ease: 'none',
        });
      } else {
        // Simple rotation animation for mobile (no pin)
        gsap.to(windmill, {
          rotateZ: 360,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: 1,
          },
        });
      }

      // Content fade in
      gsap.fromTo(
        contentRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Icons stagger animation
      const icons = iconsRef.current?.querySelectorAll('.tool-icon');
      if (icons) {
        gsap.fromTo(
          icons,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: section,
              start: 'top 60%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Parallax effect for background elements
      gsap.to('.parallax-bg', {
        yPercent: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-16 sm:py-20 overflow-hidden"
    >
      {/* Parallax Background */}
      <div className="parallax-bg absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[250px] h-[250px] sm:w-[500px] sm:h-[500px] bg-[#8B5CF6]/5 rounded-full blur-[80px] sm:blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[200px] h-[200px] sm:w-[400px] sm:h-[400px] bg-[#8B5CF6]/3 rounded-full blur-[60px] sm:blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Content */}
        <div ref={contentRef} className="text-center mb-10 sm:mb-16">
          <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-[#8B5CF6]/30 text-[#8B5CF6] text-xs sm:text-sm tracking-widest uppercase mb-4 sm:mb-6">
            Our Craft
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6">
            <span className="text-white">Precision </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA]">
              In Motion
            </span>
          </h2>
          <p className="text-white/50 text-base sm:text-lg max-w-2xl mx-auto px-2 sm:px-0">
            Watch our artistry come alive. Every stroke, every rotation, every detail 
            crafted with mathematical precision and creative passion.
          </p>
        </div>

        {/* Pin Scrub Windmill Container */}
        <div ref={windmillWrapRef} className="relative h-[50vh] sm:h-[60vh] md:h-[80vh] flex items-center justify-center">
          {/* Rotating Element */}
          <div
            ref={windmillRef}
            id="pin-windmill-svg"
            className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96"
          >
            {/* Central Logo */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] flex items-center justify-center shadow-[0_0_40px_rgba(139,92,246,0.4)] sm:shadow-[0_0_60px_rgba(139,92,246,0.4)]">
                <img
                  src="/images/logo.png"
                  alt="LAF"
                  className="w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 object-contain brightness-0 invert"
                />
              </div>
            </div>

            {/* Rotating Arms */}
            <div className="absolute inset-0">
              {/* Arm 1 - Top */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-xl sm:rounded-2xl bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border border-[#8B5CF6]/30 flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
                  <Paintbrush className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-[#8B5CF6]" />
                </div>
              </div>
              {/* Arm 2 - Right */}
              <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2">
                <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-xl sm:rounded-2xl bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border border-[#8B5CF6]/30 flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
                  <Palette className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-[#8B5CF6]" />
                </div>
              </div>
              {/* Arm 3 - Bottom */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-xl sm:rounded-2xl bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border border-[#8B5CF6]/30 flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
                  <SprayCan className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-[#8B5CF6]" />
                </div>
              </div>
              {/* Arm 4 - Left */}
              <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2">
                <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-xl sm:rounded-2xl bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border border-[#8B5CF6]/30 flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
                  <Brush className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-[#8B5CF6]" />
                </div>
              </div>
            </div>

            {/* Orbiting Particles */}
            <div className="absolute inset-0">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#8B5CF6]/60"
                  style={{
                    top: `${50 + 45 * Math.sin((i * Math.PI) / 4)}%`,
                    left: `${50 + 45 * Math.cos((i * Math.PI) / 4)}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Tool Icons Around */}
          <div ref={iconsRef} className="absolute inset-0 pointer-events-none hidden sm:block">
            <div className="tool-icon absolute top-10 left-10 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#8B5CF6]/60" />
            </div>
            <div className="tool-icon absolute top-20 right-20 w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#8B5CF6]/40" />
            </div>
            <div className="tool-icon absolute bottom-32 left-20 w-10 h-10 sm:w-14 sm:h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
              <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#8B5CF6]/50" />
            </div>
            <div className="tool-icon absolute bottom-20 right-32 w-6 h-6 sm:w-8 sm:h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#8B5CF6]/30" />
            </div>
          </div>
        </div>

        {/* Scroll Hint */}
        <div className="text-center mt-6 sm:mt-8">
          <p className="text-white/40 text-xs sm:text-sm tracking-widest uppercase">
            Keep scrolling to see the magic
          </p>
        </div>
      </div>
    </section>
  );
}
