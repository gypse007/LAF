import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: 'Tech Hub Bangalore',
    category: 'Office Branding',
    location: 'Bangalore, India',
    image: '/images/logo.png',
    size: 'large',
  },
  {
    id: 2,
    title: 'Heritage Boutique',
    category: 'Retail Design',
    location: 'Mumbai, India',
    image: '/images/logo.png',
    size: 'medium',
  },
  {
    id: 3,
    title: 'Innovation Center',
    category: 'Commercial',
    location: 'Hyderabad, India',
    image: '/images/logo.png',
    size: 'medium',
  },
  {
    id: 4,
    title: 'Cultural Museum',
    category: 'Public Art',
    location: 'Chennai, India',
    image: '/images/logo.png',
    size: 'large',
  },
  {
    id: 5,
    title: 'Startup Campus',
    category: 'Office Branding',
    location: 'Pune, India',
    image: '/images/logo.png',
    size: 'medium',
  },
  {
    id: 6,
    title: 'Luxury Hotel',
    category: 'Hospitality',
    location: 'Delhi, India',
    image: '/images/logo.png',
    size: 'large',
  },
];

export default function WorkSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

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

      // Grid items animation
      const items = gridRef.current?.querySelectorAll('.work-item');
      if (items) {
        gsap.fromTo(items,
          { y: 80, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
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
      id="work"
      className="relative min-h-screen py-20 sm:py-32 overflow-hidden bg-white"
    >
      {/* Background */}
      <div className="absolute top-0 right-0 w-48 h-48 sm:w-96 sm:h-96 bg-[#8B5CF6]/5 rounded-full blur-[80px] sm:blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Title */}
        <div ref={titleRef} className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 sm:mb-16">
          <div>
            <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-[#8B5CF6]/30 text-[#8B5CF6] text-xs sm:text-sm tracking-widest uppercase mb-4 sm:mb-6">
              Portfolio
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
              <span className="text-gray-900">Our </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA]">
                Work
              </span>
            </h2>
          </div>
          <p className="text-gray-500 text-base sm:text-lg max-w-md mt-4 sm:mt-6 md:mt-0">
            Transforming spaces across India with artistry and precision
          </p>
        </div>

        {/* Work Grid */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {projects.map((project) => {
            const isHovered = hoveredId === project.id;

            return (
              <div
                key={project.id}
                className={`work-item group relative overflow-hidden rounded-xl sm:rounded-2xl cursor-pointer ${project.size === 'large' ? 'sm:col-span-2 lg:col-span-2' : ''
                  }`}
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className={`
                      w-full h-full object-cover transition-transform duration-700
                      ${isHovered ? 'scale-110' : 'scale-100'}
                    `}
                  />

                  {/* Overlay */}
                  <div className={`
                    absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent
                    transition-opacity duration-500
                    ${isHovered ? 'opacity-80' : 'opacity-40'}
                  `} />

                  {/* Content */}
                  <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-end">
                    {/* Category Badge */}
                    <span className={`
                      inline-block self-start px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs
                      bg-white/90 text-[#8B5CF6] border border-white/50
                      mb-2 sm:mb-3 transition-all duration-500
                      ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                    `}>
                      {project.category}
                    </span>

                    {/* Title */}
                    <h3 className="text-lg sm:text-2xl font-bold text-white mb-1 sm:mb-2 group-hover:text-[#A78BFA] transition-colors">
                      {project.title}
                    </h3>

                    {/* Location */}
                    <div className={`
                      flex items-center gap-1.5 sm:gap-2 text-white/80 text-xs sm:text-sm
                      transition-all duration-500
                      ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                    `}>
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                      {project.location}
                    </div>
                  </div>

                  {/* Arrow Icon */}
                  <div className={`
                    absolute top-3 right-3 sm:top-6 sm:right-6 w-8 h-8 sm:w-12 sm:h-12 rounded-full
                    flex items-center justify-center
                    bg-white text-[#8B5CF6]
                    transition-all duration-500
                    ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}
                  `}>
                    <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>

                  {/* Border Glow */}
                  <div className={`
                    absolute inset-0 rounded-xl sm:rounded-2xl border-2 transition-all duration-500
                    ${isHovered ? 'border-white/50' : 'border-transparent'}
                  `} />
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="mt-10 sm:mt-16 text-center">
          <button className="group relative inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-full border border-[#8B5CF6]/50 text-[#8B5CF6] font-medium text-sm sm:text-base overflow-hidden transition-all duration-500 hover:text-white hover:border-[#8B5CF6]">
            <span className="absolute inset-0 bg-[#8B5CF6] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
            <span className="relative">View All Projects</span>
            <ArrowUpRight className="relative w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
