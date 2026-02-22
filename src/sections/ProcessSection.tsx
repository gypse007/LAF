import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MessageSquare, Pencil, Paintbrush, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    icon: MessageSquare,
    title: 'Consultation',
    description: 'We begin with understanding your vision, brand identity, and space requirements. Our team listens to your ideas and provides expert guidance.',
    color: '#8B5CF6',
  },
  {
    number: '02',
    icon: Pencil,
    title: 'Design & Concept',
    description: 'Our artists create detailed mockups and concepts tailored to your space. We refine every detail until it matches your vision perfectly.',
    color: '#A78BFA',
  },
  {
    number: '03',
    icon: Paintbrush,
    title: 'Execution',
    description: 'With precision and artistry, we bring the design to life. Using premium materials and techniques for flawless results.',
    color: '#8B5CF6',
  },
  {
    number: '04',
    icon: CheckCircle,
    title: 'Final Review',
    description: 'We ensure every detail meets our perfection standards. Your satisfaction is our ultimate goal.',
    color: '#6D28D9',
  },
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

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

      // Progress line animation (desktop only)
      const isDesktop = window.innerWidth >= 1024;
      if (isDesktop) {
        gsap.fromTo(lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 2,
            ease: 'none',
            scrollTrigger: {
              trigger: stepsRef.current,
              start: 'top 60%',
              end: 'bottom 40%',
              scrub: 1,
            },
          }
        );
      }

      // Steps animation
      const stepElements = stepsRef.current?.querySelectorAll('.process-step');
      stepElements?.forEach((step, index) => {
        const isEven = index % 2 === 0;
        const isMobile = window.innerWidth < 1024;

        gsap.fromTo(step,
          {
            x: isMobile ? 0 : (isEven ? -100 : 100),
            y: isMobile ? 50 : 0,
            opacity: 0,
          },
          {
            x: 0,
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: step,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Number pulse animation
        const number = step.querySelector('.step-number');
        if (number) {
          gsap.to(number, {
            scale: 1.1,
            duration: 1,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
            delay: index * 0.2,
          });
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative min-h-screen py-20 sm:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#8B5CF6]/5 to-transparent" />
      <div className="absolute bottom-1/4 left-0 w-40 h-40 sm:w-80 sm:h-80 bg-[#8B5CF6]/5 rounded-full blur-[80px] sm:blur-[150px]" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-16 sm:mb-24">
          <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-[#8B5CF6]/30 text-[#8B5CF6] text-xs sm:text-sm tracking-widest uppercase mb-4 sm:mb-6">
            How We Work
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6">
            <span className="text-white">Our </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA]">
              Process
            </span>
          </h2>
          <p className="text-white/50 text-base sm:text-lg max-w-2xl mx-auto px-2 sm:px-0">
            A refined four-step journey from vision to reality
          </p>
        </div>

        {/* Process Steps */}
        <div ref={stepsRef} className="relative">
          {/* Center Line - Desktop Only */}
          <div className="absolute left-4 sm:left-6 lg:left-1/2 top-0 bottom-0 w-px lg:-translate-x-1/2">
            <div className="absolute inset-0 bg-white/10" />
            <div
              ref={lineRef}
              className="hidden lg:block absolute inset-x-0 top-0 bg-gradient-to-b from-[#8B5CF6] via-[#A78BFA] to-[#8B5CF6] origin-top"
              style={{ height: '100%' }}
            />
          </div>

          {/* Steps */}
          <div className="space-y-12 sm:space-y-16 lg:space-y-24">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={index}
                  className={`process-step relative flex items-start gap-6 sm:gap-8 lg:gap-0 ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                    }`}
                >
                  {/* Step Number - Mobile/Tablet */}
                  <div className="lg:hidden flex-shrink-0">
                    <div
                      className="step-number w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] text-black font-bold text-sm sm:text-lg"
                    >
                      {step.number}
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className={`flex-1 lg:${isEven ? 'lg:pr-16 lg:text-right' : 'lg:pl-16'}`}>
                    <div className={`
                      relative p-6 sm:p-8 rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm
                      hover:border-[#8B5CF6]/30 hover:bg-[#8B5CF6]/5 transition-all duration-500
                      ${isEven ? 'lg:ml-auto' : ''}
                    `} style={{ maxWidth: '500px' }}>
                      {/* Step Number - Desktop */}
                      <div className={`
                        hidden lg:flex step-number absolute -top-5 sm:-top-6 w-10 h-10 sm:w-12 sm:h-12 rounded-full items-center justify-center
                        bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] text-black font-bold text-sm sm:text-lg
                        ${isEven ? 'lg:-right-5 sm:lg:-right-6' : 'lg:-left-5 sm:lg:-left-6'}
                      `}>
                        {step.number}
                      </div>

                      {/* Icon */}
                      <div className={`
                        w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4
                        bg-[#8B5CF6]/10 text-[#8B5CF6]
                        ${isEven ? 'lg:ml-auto' : ''}
                      `}>
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">
                        {step.title}
                      </h3>
                      <p className="text-white/50 text-sm sm:text-base leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Center Point - Desktop Only */}
                  <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#8B5CF6] border-2 sm:border-4 border-[#060612] z-10">
                    <div className="absolute inset-0 rounded-full bg-[#8B5CF6] animate-ping opacity-50" />
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="flex-1 hidden lg:block" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
