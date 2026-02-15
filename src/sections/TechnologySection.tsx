import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Cpu, Droplets, Zap, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Cpu,
    title: 'Precision Robotics',
    description: 'Computer-controlled robotic arms ensure millimeter-perfect accuracy for complex designs.',
    stat: '0.1mm',
    statLabel: 'Accuracy',
  },
  {
    icon: Droplets,
    title: 'Eco-Friendly Inks',
    description: 'Water-based, non-toxic pigments that are safe for indoor environments and the planet.',
    stat: '100%',
    statLabel: 'Eco-Safe',
  },
  {
    icon: Zap,
    title: 'Rapid Execution',
    description: 'Advanced technology allows us to complete large-scale projects in record time.',
    stat: '10x',
    statLabel: 'Faster',
  },
  {
    icon: Award,
    title: 'Premium Quality',
    description: 'Museum-grade materials and techniques ensure your art lasts for decades.',
    stat: '25+',
    statLabel: 'Years Life',
  },
];

export default function TechnologySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(titleRef.current,
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

      // Content animation
      gsap.fromTo(contentRef.current,
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Features stagger
      const featureCards = featuresRef.current?.querySelectorAll('.tech-feature');
      if (featureCards) {
        gsap.fromTo(featureCards,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: featuresRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="technology"
      className="relative min-h-screen py-20 sm:py-32 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#8B5CF6]/5 to-transparent" />
      <div className="absolute top-1/2 left-0 w-48 h-48 sm:w-96 sm:h-96 bg-[#8B5CF6]/5 rounded-full blur-[80px] sm:blur-[150px] -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-40 h-40 sm:w-80 sm:h-80 bg-[#8B5CF6]/5 rounded-full blur-[60px] sm:blur-[120px]" />

      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-12 sm:mb-20">
          <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-[#8B5CF6]/30 text-[#8B5CF6] text-xs sm:text-sm tracking-widest uppercase mb-4 sm:mb-6">
            Innovation
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6">
            <span className="text-white">Wall </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA]">
              Technology
            </span>
          </h2>
          <p className="text-white/50 text-base sm:text-lg max-w-2xl mx-auto px-2 sm:px-0">
            Pioneering the future of wall art with cutting-edge robotic printing technology
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-16 items-center mb-12 sm:mb-20">
          {/* Left - Description */}
          <div ref={contentRef}>
            <div className="space-y-4 sm:space-y-6">
              <p className="text-lg sm:text-xl text-white/80 leading-relaxed">
                Our state-of-the-art <span className="text-[#8B5CF6]">vertical printing robots</span> bring unprecedented precision and scale to wall artistry. This isn't just painting—it's engineering meets art.
              </p>
              <p className="text-white/50 text-sm sm:text-base leading-relaxed">
                Using advanced computer vision and precision robotics, we can reproduce any design with photographic accuracy on walls up to 20 feet high. From intricate patterns to photorealistic murals, our technology makes the impossible possible.
              </p>
              <p className="text-white/50 text-sm sm:text-base leading-relaxed">
                The result? Flawless execution, consistent quality, and the ability to scale your vision across any space—whether it's a single accent wall or an entire building facade.
              </p>
            </div>

            {/* Tech Specs */}
            <div className="mt-8 sm:mt-10 grid grid-cols-2 gap-3 sm:gap-4">
              <div className="p-3 sm:p-4 rounded-xl border border-[#8B5CF6]/20 bg-[#8B5CF6]/5">
                <div className="text-2xl sm:text-3xl font-bold text-[#8B5CF6] mb-1">20ft</div>
                <div className="text-xs sm:text-sm text-white/50">Max Height</div>
              </div>
              <div className="p-3 sm:p-4 rounded-xl border border-[#8B5CF6]/20 bg-[#8B5CF6]/5">
                <div className="text-2xl sm:text-3xl font-bold text-[#8B5CF6] mb-1">1440</div>
                <div className="text-xs sm:text-sm text-white/50">DPI Resolution</div>
              </div>
            </div>
          </div>

          {/* Right - Visual */}
          <div className="relative">
            <div className="relative aspect-square rounded-xl sm:rounded-2xl overflow-hidden border border-[#8B5CF6]/20">
              <img
                src="/images/logo.png"
                alt="Wall Printing Technology"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              {/* Floating Badge */}
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 p-3 sm:p-4 rounded-xl border border-[#8B5CF6]/30 bg-black/60 backdrop-blur-xl">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#8B5CF6] flex items-center justify-center flex-shrink-0">
                    <Cpu className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
                  </div>
                  <div>
                    <div className="text-white font-medium text-sm sm:text-base">Robotic Precision</div>
                    <div className="text-white/50 text-xs sm:text-sm">Computer-controlled execution</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 w-16 sm:w-24 h-16 sm:h-24 border border-[#8B5CF6]/30 rounded-lg sm:rounded-xl" />
            <div className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 w-20 sm:w-32 h-20 sm:h-32 border border-[#8B5CF6]/20 rounded-lg sm:rounded-xl" />
          </div>
        </div>

        {/* Features Grid */}
        <div ref={featuresRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="tech-feature group p-5 sm:p-6 rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-[#8B5CF6]/30 hover:bg-[#8B5CF6]/5 transition-all duration-500"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-[#8B5CF6]/10 flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-[#8B5CF6] group-hover:text-black transition-all duration-500 text-[#8B5CF6]">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                
                <div className="text-2xl sm:text-3xl font-bold text-[#8B5CF6] mb-1">
                  {feature.stat}
                </div>
                <div className="text-xs sm:text-sm text-white/40 mb-2 sm:mb-3">
                  {feature.statLabel}
                </div>
                
                <h3 className="text-base sm:text-lg font-bold text-white mb-1 sm:mb-2 group-hover:text-[#8B5CF6] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-white/50 text-xs sm:text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
