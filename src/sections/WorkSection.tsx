import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DomeGallery from '../components/DomeGallery';

gsap.registerPlugin(ScrollTrigger);

const portfolioImages = [
  { src: '/videos/portfolio/video_1.mp4', alt: 'LAF Kinetic Art 1' },
  { src: '/images/portfolio/bar.jpeg', alt: 'LAF Bar Branding' },
  { src: '/images/portfolio/Image_202602211959.jpeg', alt: 'LAF Portfolio 1' },
  { src: '/videos/portfolio/ganesh_machine.mp4', alt: 'Ganesh WallPrint Machine' },
  { src: '/videos/portfolio/video_2.mp4', alt: 'LAF Kinetic Art 2' },
  { src: '/images/portfolio/horses.jpeg', alt: 'LAF Horse Mural' },
  { src: '/images/portfolio/Nighttime_restrobar_interior_202602151942.jpeg', alt: 'LAF Portfolio 2' },
  { src: '/videos/portfolio/video_3.mp4', alt: 'LAF Kinetic Art 3' },
  { src: '/images/portfolio/krishna.jpeg', alt: 'LAF Krishna Art' },
  { src: '/images/portfolio/bull.jpeg', alt: 'LAF Portfolio 3' },
  { src: '/videos/portfolio/video_4.mp4', alt: 'LAF Kinetic Art 4' },
  { src: '/images/portfolio/elephants.jpeg', alt: 'LAF Portfolio 4' },
  { src: '/images/portfolio/monkey.jpeg', alt: 'LAF Monkey Mural' },
  { src: '/images/portfolio/ref-1.jpeg', alt: 'LAF Portfolio 5' },
  { src: '/videos/portfolio/video_5.mp4', alt: 'LAF Kinetic Art 5' },
  { src: '/images/portfolio/ref-2.jpeg', alt: 'LAF Portfolio 6' },
  { src: '/images/portfolio/trippy-boat.jpeg', alt: 'LAF Creative Mural' },
  { src: '/images/portfolio/ref-3.jpeg', alt: 'LAF Portfolio 7' },
  { src: '/images/portfolio/ref-4.jpeg', alt: 'LAF Portfolio 8' },
  { src: '/images/portfolio/ref-6.jpeg', alt: 'LAF Portfolio 9' },
  { src: '/images/portfolio/standalone%20image-tree.jpeg', alt: 'LAF Portfolio 10' },
];

export default function WorkSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

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
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative min-h-screen py-20 sm:py-32 overflow-hidden bg-[#060612]"
    >
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-48 h-48 sm:w-96 sm:h-96 bg-[#8B5CF6]/10 rounded-full blur-[80px] sm:blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 h-full flex flex-col">
        {/* Section Title */}
        <div ref={titleRef} className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 sm:mb-16">
          <div>
            <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-[#8B5CF6]/30 text-[#8B5CF6] text-xs sm:text-sm tracking-widest uppercase mb-4 sm:mb-6">
              Portfolio
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white">
              Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA]">Creations</span>
            </h2>
          </div>
          <p className="text-gray-400 text-base sm:text-lg max-w-md mt-4 sm:mt-6 md:mt-0">
            Swipe through our immersive gallery of precision-crafted spaces.
          </p>
        </div>

        {/* Dome Gallery Container */}
        <div className="w-full h-[600px] sm:h-[800px] cursor-grab active:cursor-grabbing">
          <DomeGallery
            images={portfolioImages}
            fit={0.8}
            minRadius={600}
            maxVerticalRotationDeg={0}
            segments={34}
            dragDampening={2}
            grayscale={true}
          />
        </div>

        {/* Instructions */}
        <div className="mt-8 text-center sm:hidden">
          <p className="text-[#8B5CF6]/60 text-xs tracking-widest uppercase animate-pulse">
            Swipe to explore
          </p>
        </div>
      </div>
    </section>
  );
}
