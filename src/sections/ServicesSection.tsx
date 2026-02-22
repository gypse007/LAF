import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: 'Brand Domination',
    description: 'Stop being invisible. We turn your walls into high-performance assets.',
    image: '/icons/wall-branding.png',
    gridArea: 'wall',
    size: 'tall' as const,
  },
  {
    title: 'Texture Alpha',
    description: 'Advanced gradients and textures. Not just paint—depth.',
    image: '/icons/diamond.png',
    gridArea: 'comm',
    size: 'wide' as const,
  },
  {
    title: 'Scale Up',
    description: 'High-speed execution for retail and offices. Zero downtime.',
    image: '/icons/commercial-store.png',
    gridArea: 'texture',
    size: 'normal' as const,
  },
  {
    title: 'Precision Only',
    description: 'Millimeter accuracy. No mistakes. Only perfection.',
    image: '/icons/precision-work.png',
    gridArea: 'prec',
    size: 'normal' as const,
  },
  {
    title: 'Legacy Murals',
    description: 'Art that outlasts your building. Permanent authority.',
    image: '/icons/protective-coating.png',
    gridArea: 'coat',
    size: 'wide' as const,
  },
  {
    title: 'Elite Homes',
    description: 'Custom character for high-end residential spaces.',
    image: '/images/residential.png',
    gridArea: 'resi',
    size: 'normal' as const,
  },
];

function BentoCard({ service }: { service: (typeof services)[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useLayoutEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        img,
        { scale: 0.7 },
        {
          scale: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 90%',
            end: 'top 30%',
            scrub: 1,
          },
        }
      );

      // Continuous float animation
      gsap.to(img, {
        y: -15,
        duration: 2 + Math.random(),
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: Math.random() * 0.5,
      });
    });

    return () => ctx.revert();
  }, []);

  const isTall = service.size === 'tall';
  const isWide = service.size === 'wide';

  return (
    <div
      ref={cardRef}
      className="bento-card group relative overflow-hidden rounded-[20px] sm:rounded-[28px] cursor-pointer"
      style={{ '--grid-area': service.gridArea } as React.CSSProperties}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Light card background */}
      <div className="absolute inset-0 rounded-[20px] sm:rounded-[28px] bg-[#f0eff4] group-hover:bg-[#e8e6f0] transition-colors duration-400" />

      <div
        className={`
          relative z-10 h-full flex
          ${isTall ? 'flex-col justify-between p-6 sm:p-8' : ''}
          ${isWide ? 'flex-row items-center p-6 sm:p-8 gap-4 sm:gap-6' : ''}
          ${service.size === 'normal' ? 'flex-col p-5 sm:p-7' : ''}
        `}
      >
        {/* TALL — image top, text bottom */}
        {isTall && (
          <>
            <div className="flex-1 relative flex items-center justify-center py-6 min-h-[300px]">
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  ref={imgRef}
                  src={service.image}
                  alt={service.title}
                  className="w-[180%] h-[180%] max-w-none object-contain transition-transform duration-500 ease-out z-10 drop-shadow-2xl"
                  style={{ transform: isHovered ? 'scale(1.1) translateY(-10px)' : 'translateY(0)' }}
                  loading="lazy"
                />
              </div>
            </div>
            <div className="relative z-20 mt-auto">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{service.title}</h3>
              <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-xs">{service.description}</p>
            </div>
          </>
        )}

        {/* WIDE — text left, image right */}
        {isWide && (
          <>
            <div className="flex-1 min-w-0 relative z-20">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{service.title}</h3>
              <p className="text-gray-500 text-xs sm:text-sm leading-relaxed max-w-[240px]">{service.description}</p>
            </div>
            <div className="relative w-1/2 h-full flex items-center justify-center">
              <img
                ref={imgRef}
                src={service.image}
                alt={service.title}
                className="absolute right-[-20%] w-[160%] h-[160%] max-w-none object-contain transition-transform duration-500 ease-out z-10 drop-shadow-xl"
                style={{ transform: isHovered ? 'scale(1.1) rotate(-5deg)' : 'rotate(0)' }}
                loading="lazy"
              />
            </div>
          </>
        )}

        {/* NORMAL — text top, image bottom */}
        {service.size === 'normal' && (
          <>
            <div className="mb-4 relative z-20">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1.5">{service.title}</h3>
              <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">{service.description}</p>
            </div>
            <div className="flex-1 relative flex items-center justify-center min-h-[160px]">
              <img
                ref={imgRef}
                src={service.image}
                alt={service.title}
                className={`absolute max-w-none object-contain transition-transform duration-500 ease-out z-10 drop-shadow-lg 
                  ${service.gridArea === 'prec' ? 'translate-x-8 bottom-[-10%] w-[150%] h-[150%]' : ''}
                  ${service.gridArea === 'resi' ? 'bottom-[-15%] w-[115%] h-[115%]' : ''}
                  ${service.gridArea !== 'prec' && service.gridArea !== 'resi' ? 'bottom-[-10%] w-[150%] h-[150%]' : ''}
                `}
                style={{ transform: isHovered ? 'scale(1.1) translateY(-10px)' : 'translateY(0)' }}
                loading="lazy"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      const cards = gridRef.current?.querySelectorAll('.bento-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="relative py-20 sm:py-32 overflow-hidden bg-gray-50">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div ref={titleRef} className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 lg:gap-16 mb-12 sm:mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.95] max-w-xl">
            <span className="text-gray-900">Our Services.</span><br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-600">
              Built for Impact.
            </span>
          </h2>
          <p className="text-gray-500 text-base sm:text-lg max-w-sm lg:pt-3 leading-relaxed">
            We build visual leverage. Direct-to-wall branding that forces attention. Scale your space. Dominate your niche.
          </p>
        </div>

        {/* 5-card Asymmetric Bento Grid */}
        <style>{`
          @media (min-width: 768px) {
            .bento-grid {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              grid-template-rows: auto auto auto;
              grid-template-areas:
                "wall comm   comm"
                "wall texture prec"
                "coat coat   resi";
            }
            .bento-card {
              grid-area: var(--grid-area);
            }
          }
        `}</style>
        <div
          ref={gridRef}
          className="bento-grid grid grid-cols-1 gap-4 sm:gap-5"
        >
          {services.map((service, i) => (
            <BentoCard key={i} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
