import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote, Star, ChevronLeft, ChevronRight, Building2, MapPin, Calendar } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    role: 'CEO',
    company: 'TechVentures India',
    location: 'Bangalore',
    content: 'Lakshmi Art Fixes transformed our office space beyond imagination. The attention to detail and the quality of work is unmatched. Our brand identity now literally covers our walls.',
    rating: 5,
    project: 'Office Branding',
    date: 'Dec 2024',
    image: '/images/3d wall design.jpg',
  },
  {
    id: 2,
    name: 'Priya Sharma',
    role: 'Creative Director',
    company: 'DesignHub Studio',
    location: 'Mumbai',
    content: 'Working with LAF was an absolute pleasure. They understood our vision perfectly and executed it with precision. The robotic printing technology they use is truly next-level.',
    rating: 5,
    project: 'Creative Studio',
    date: 'Nov 2024',
    image: '/images/3d wall design.jpg',
  },
  {
    id: 3,
    name: 'Arun Nair',
    role: 'Founder',
    company: 'StartupX',
    location: 'Hyderabad',
    content: 'The team at Lakshmi Art Fixes delivered exceptional results. From concept to completion, every step was handled professionally. Our office now inspires creativity every day.',
    rating: 5,
    project: 'Startup Campus',
    date: 'Oct 2024',
    image: '/images/3d wall design.jpg',
  },
  {
    id: 4,
    name: 'Meera Patel',
    role: 'Hotel Manager',
    company: 'Grand Palace Hotel',
    location: 'Delhi',
    content: 'Our hotel lobby has never looked better. The mural they created has become the centerpiece of our property. Guests constantly ask about it. Truly remarkable work!',
    rating: 5,
    project: 'Hospitality Design',
    date: 'Sep 2024',
    image: '/images/3d wall design.jpg',
  },
];

const clientLogos = [
  { name: 'TechVentures', initials: 'TV' },
  { name: 'DesignHub', initials: 'DH' },
  { name: 'StartupX', initials: 'SX' },
  { name: 'Grand Palace', initials: 'GP' },
  { name: 'RetailMax', initials: 'RM' },
  { name: 'Foodies', initials: 'FD' },
];

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const logosRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

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

      // Slider animation
      gsap.fromTo(
        sliderRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
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

      // Client logos animation
      const logos = logosRef.current?.querySelectorAll('.client-logo');
      if (logos) {
        gsap.fromTo(
          logos,
          { y: 40, opacity: 0, scale: 0.8 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: logosRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Parallax background
      gsap.to('.testimonials-parallax', {
        yPercent: -15,
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

  // Auto-play slider
  useLayoutEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative min-h-screen py-20 sm:py-32 overflow-hidden"
    >
      {/* Parallax Background */}
      <div className="testimonials-parallax absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] sm:w-[800px] sm:h-[800px] bg-[#8B5CF6]/5 rounded-full blur-[100px] sm:blur-[200px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-12 sm:mb-16">
          <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-[#8B5CF6]/30 text-[#8B5CF6] text-xs sm:text-sm tracking-widest uppercase mb-4 sm:mb-6">
            Client Stories
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6">
            <span className="text-white">What They </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA]">
              Say
            </span>
          </h2>
          <p className="text-white/50 text-base sm:text-lg max-w-2xl mx-auto px-2 sm:px-0">
            Real stories from real clients. See how we have helped businesses transform their spaces.
          </p>
        </div>

        {/* Testimonial Slider */}
        <div ref={sliderRef} className="relative">
          {/* Main Card */}
          <div className="relative">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8 items-center">
              {/* Image Side */}
              <div className="lg:col-span-2 relative">
                <div className="relative aspect-square rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden">
                  <img
                    src={currentTestimonial.image}
                    alt={currentTestimonial.project}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Project Badge */}
                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 px-3 py-1 sm:px-4 sm:py-2 rounded-full bg-[#8B5CF6] text-black text-xs sm:text-sm font-medium">
                    {currentTestimonial.project}
                  </div>
                </div>

                {/* Floating Stats */}
                <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 p-2 sm:p-4 rounded-xl border border-[#8B5CF6]/30 bg-[#060612]/90 backdrop-blur-xl">
                  <div className="flex items-center gap-1 sm:gap-2">
                    {[...Array(currentTestimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-[#8B5CF6] text-[#8B5CF6]" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Content Side */}
              <div className="lg:col-span-3">
                <div className="relative p-6 sm:p-8 lg:p-12 rounded-xl sm:rounded-2xl lg:rounded-3xl border border-[#8B5CF6]/20 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl">
                  {/* Quote Icon */}
                  <div className="absolute -top-4 sm:-top-6 left-4 sm:left-8 w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-[#8B5CF6] flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.4)] sm:shadow-[0_0_30px_rgba(139,92,246,0.4)]">
                    <Quote className="w-4 h-4 sm:w-6 sm:h-6 text-black" />
                  </div>

                  {/* Content */}
                  <p className="text-base sm:text-xl lg:text-2xl text-white/90 leading-relaxed mb-6 sm:mb-8 mt-2 sm:mt-4">
                    "{currentTestimonial.content}"
                  </p>

                  {/* Author Info */}
                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] flex items-center justify-center text-black font-bold text-sm sm:text-base">
                        {currentTestimonial.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="text-base sm:text-lg font-bold text-white">
                          {currentTestimonial.name}
                        </div>
                        <div className="text-white/50 text-xs sm:text-sm">
                          {currentTestimonial.role}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Meta Info */}
                  <div className="flex flex-wrap gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-white/10">
                    <div className="flex items-center gap-1.5 sm:gap-2 text-white/40 text-xs sm:text-sm">
                      <Building2 className="w-3 h-3 sm:w-4 sm:h-4" />
                      {currentTestimonial.company}
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2 text-white/40 text-xs sm:text-sm">
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                      {currentTestimonial.location}
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2 text-white/40 text-xs sm:text-sm">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                      {currentTestimonial.date}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 mt-8 sm:mt-10">
            <button
              onClick={prevSlide}
              className="group w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-[#8B5CF6]/30 flex items-center justify-center text-[#8B5CF6] hover:bg-[#8B5CF6] hover:text-black transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-0.5 transition-transform" />
            </button>

            {/* Dots */}
            <div className="flex gap-1.5 sm:gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setCurrentIndex(index);
                  }}
                  className={`
                    h-1.5 sm:h-2 rounded-full transition-all duration-300
                    ${index === currentIndex
                      ? 'w-6 sm:w-8 bg-[#8B5CF6]' 
                      : 'w-1.5 sm:w-2 bg-white/20 hover:bg-white/40'
                    }
                  `}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="group w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-[#8B5CF6]/30 flex items-center justify-center text-[#8B5CF6] hover:bg-[#8B5CF6] hover:text-black transition-all duration-300 hover:scale-110"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Client Logos */}
        <div ref={logosRef} className="mt-12 sm:mt-20">
          <p className="text-center text-white/40 text-xs sm:text-sm mb-6 sm:mb-8 tracking-widest uppercase">
            Trusted by Industry Leaders
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6">
            {clientLogos.map((logo, index) => (
              <div
                key={index}
                className="client-logo group w-14 h-14 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center hover:border-[#8B5CF6]/30 hover:bg-[#8B5CF6]/10 transition-all duration-500 cursor-pointer"
              >
                <span className="text-base sm:text-xl font-bold text-white/40 group-hover:text-[#8B5CF6] transition-colors">
                  {logo.initials}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-12 sm:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {[
            { value: '500+', label: 'Projects Completed' },
            { value: '98%', label: 'Client Satisfaction' },
            { value: '50+', label: 'Cities Covered' },
            { value: '10+', label: 'Years Experience' },
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
