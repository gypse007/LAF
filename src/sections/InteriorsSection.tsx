import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

export default function InteriorsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current,
        { y: 80, opacity: 0 },
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
    }, section);

    return () => ctx.revert();
  }, []);

  const features = [
    'Premium Modular Kitchens',
    'Custom Wardrobes',
    'Home Interiors',
    '4.8 Star Rating',
  ];

  return (
    <section
      ref={sectionRef}
      id="interiors"
      className="relative py-24 overflow-hidden"
    >
      {/* Background Accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#060612] via-[#0a0905] to-[#060612]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#C9A962]/5 rounded-full blur-[120px]" />

      <div ref={contentRef} className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Content */}
          <div>
            <span className="inline-block px-4 py-2 rounded-full border border-[#C9A962]/30 text-[#C9A962] text-sm tracking-widest uppercase mb-6">
              New Service
            </span>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              <span className="text-white">Lakshmi </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A962] via-[#E8D5A3] to-[#C9A962]">
                Interiors
              </span>
            </h2>

            <p className="text-lg text-white/60 mb-8 max-w-lg">
              Transform your living spaces with our premium modular kitchens, wardrobes, and complete home interior solutions in Hyderabad.
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-white/80">
                  <Star className="w-4 h-4 text-[#C9A962] fill-[#C9A962]" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>

            <Link
              to="/interiors"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#C9A962] text-black font-semibold rounded-full hover:bg-white transition-colors"
            >
              Explore Interiors
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Right - Image/Visual */}
          <div className="relative">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: 'url(/images/portfolio/Nighttime_restrobar_interior_202602151942.jpeg)',
                  filter: 'brightness(0.7)',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-black/40 backdrop-blur-md rounded-xl p-4 border border-white/10">
                  <p className="text-white font-medium mb-2">Premium Interiors in Hyderabad</p>
                  <p className="text-white/60 text-sm">200+ Happy Clients | 4.8 Stars</p>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border border-[#C9A962]/30 rounded-full" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 border border-[#C9A962]/20 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
