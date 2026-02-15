import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MoveHorizontal, Sparkles, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const beforeAfterProjects = [
  {
    id: 1,
    title: 'Office Transformation',
    description: 'From dull white walls to vibrant brand storytelling',
    beforeImage: '/images/3d wall design.jpg',
    afterImage: '/images/3d wall design.jpg',
    improvements: ['Brand Colors', '3D Effects', 'UV Protection'],
  },
  {
    id: 2,
    title: 'Retail Space Makeover',
    description: 'Creating an immersive shopping experience',
    beforeImage: '/images/3d wall design.jpg',
    afterImage: '/images/3d wall design.jpg',
    improvements: ['Texture Finish', 'Custom Graphics', 'Easy Clean'],
  },
  {
    id: 3,
    title: 'Restaurant Ambiance',
    description: 'Setting the mood with artistic wall treatments',
    beforeImage: '/images/3d wall design.jpg',
    afterImage: '/images/3d wall design.jpg',
    improvements: ['Ambient Design', 'Food-Safe Coating', 'Durability'],
  },
];

interface ComparisonSliderProps {
  beforeImage: string;
  afterImage: string;
  title: string;
  description: string;
  improvements: string[];
}

function ComparisonSlider({ beforeImage, afterImage, title, description, improvements }: ComparisonSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) handleMove(e.clientX);
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  return (
    <div className="relative">
      {/* Comparison Container */}
      <div
        ref={containerRef}
        className="relative h-[250px] sm:h-[350px] md:h-[400px] lg:h-[500px] rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden cursor-ew-resize group"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
      >
        {/* After Image (Full) */}
        <div className="absolute inset-0">
          <img
            src={afterImage}
            alt="After"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        {/* Before Image (Clipped) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <img
            src={beforeImage}
            alt="Before"
            className="w-full h-full object-cover grayscale"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Slider Line */}
        <div
          className="absolute top-0 bottom-0 w-0.5 sm:w-1 bg-[#8B5CF6] cursor-ew-resize z-10"
          style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
        >
          {/* Slider Handle */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#8B5CF6] flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.5)] sm:shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-transform duration-200 hover:scale-110"
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
          >
            <MoveHorizontal className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
          </div>
        </div>

        {/* Labels */}
        <div
          className="absolute top-3 sm:top-6 left-3 sm:left-6 px-2 py-1 sm:px-4 sm:py-2 rounded-full bg-black/60 backdrop-blur-sm text-white text-xs sm:text-sm font-medium transition-opacity duration-300"
          style={{ opacity: sliderPosition > 15 ? 1 : 0 }}
        >
          Before
        </div>
        <div
          className="absolute top-3 sm:top-6 right-3 sm:right-6 px-2 py-1 sm:px-4 sm:py-2 rounded-full bg-[#8B5CF6] text-black text-xs sm:text-sm font-medium transition-opacity duration-300"
          style={{ opacity: sliderPosition < 85 ? 1 : 0 }}
        >
          After
        </div>
      </div>

      {/* Project Info */}
      <div className="mt-4 sm:mt-6 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
        <div className="flex items-start justify-between mb-3 sm:mb-4">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-1">{title}</h3>
            <p className="text-white/50 text-xs sm:text-sm">{description}</p>
          </div>
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#8B5CF6]/20 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#8B5CF6]" />
          </div>
        </div>

        {/* Improvements */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {improvements.map((improvement, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 sm:gap-1.5 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 text-[#8B5CF6] text-[10px] sm:text-xs"
            >
              <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              {improvement}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function BeforeAfterSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
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

      // Cards stagger animation
      const cards = cardsRef.current?.querySelectorAll('.comparison-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 100, opacity: 0, rotateX: -15 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Parallax background
      gsap.to('.ba-parallax-bg', {
        yPercent: -20,
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
      id="beforeafter"
      className="relative min-h-screen py-20 sm:py-32 overflow-hidden"
    >
      {/* Parallax Background */}
      <div className="ba-parallax-bg absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] bg-[#8B5CF6]/5 rounded-full blur-[100px] sm:blur-[180px]" />
        <div className="absolute bottom-1/4 left-1/3 w-[200px] h-[200px] sm:w-[400px] sm:h-[400px] bg-[#8B5CF6]/3 rounded-full blur-[80px] sm:blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-12 sm:mb-20">
          <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-[#8B5CF6]/30 text-[#8B5CF6] text-xs sm:text-sm tracking-widest uppercase mb-4 sm:mb-6">
            Transformations
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6">
            <span className="text-white">Before & </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA]">
              After
            </span>
          </h2>
          <p className="text-white/50 text-base sm:text-lg max-w-2xl mx-auto px-2 sm:px-0">
            Drag to reveal the stunning transformations we create. 
            See how we turn ordinary spaces into extraordinary experiences.
          </p>
        </div>

        {/* Comparison Sliders */}
        <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {beforeAfterProjects.map((project) => (
            <div key={project.id} className="comparison-card">
              <ComparisonSlider
                beforeImage={project.beforeImage}
                afterImage={project.afterImage}
                title={project.title}
                description={project.description}
                improvements={project.improvements}
              />
            </div>
          ))}
        </div>

        {/* Stats Row */}
        <div className="mt-12 sm:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {[
            { value: '500+', label: 'Walls Transformed' },
            { value: '100%', label: 'Satisfaction Rate' },
            { value: '48h', label: 'Avg. Completion' },
            { value: '5yr', label: 'Warranty' },
          ].map((stat, index) => (
            <div
              key={index}
              className="group text-center p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 hover:border-[#8B5CF6]/30 hover:bg-[#8B5CF6]/5 transition-all duration-500"
            >
              <div className="text-2xl sm:text-4xl md:text-5xl font-bold text-[#8B5CF6] mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300">
                {stat.value}
              </div>
              <div className="text-white/50 text-xs sm:text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
