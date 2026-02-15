import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Home, Plane } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ForecastSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current?.querySelector('.forecast-card') || null, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        y: 80,
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-blue-900/30 to-[#0a0a0a]" />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl text-white font-normal mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            Forecast your future
          </h2>
          <p className="text-white/50 max-w-lg mx-auto mb-8">
            Model scenarios—from market shifts to life goals—and see how your money could grow over time.
          </p>
          <button className="btn-secondary text-sm">MORE ABOUT FORECASTING</button>
        </div>

        <div className="forecast-card glass-card rounded-3xl p-8">
          <div className="flex items-start justify-between mb-8">
            <div>
              <p className="text-white/40 text-xs mb-1">Current net worth</p>
              <p className="text-2xl text-white font-semibold">$325,472</p>
            </div>
            <div className="text-right">
              <p className="text-white/40 text-xs mb-1">Future net worth at 90</p>
              <p className="text-2xl text-white font-semibold">$1,240,056</p>
              <p className="text-green-400 text-sm">+$914,584 (281%)</p>
            </div>
          </div>

          <div className="relative h-64">
            <svg viewBox="0 0 800 200" className="w-full h-full">
              <defs>
                <linearGradient id="forecastGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                </linearGradient>
              </defs>
              
              {[0, 50, 100, 150, 200].map((y) => (
                <line key={y} x1="0" y1={y} x2="800" y2={y} stroke="rgba(255,255,255,0.1)" strokeDasharray="4,4" />
              ))}

              <path d="M0,180 Q100,170 200,150 T400,100 T600,80 T800,60 L800,200 L0,200 Z" fill="url(#forecastGradient)" />
              <path d="M0,180 Q100,170 200,150 T400,100 T600,80 T800,60" fill="none" stroke="#3b82f6" strokeWidth="2" />
              <circle cx="200" cy="150" r="6" fill="white" />
              <circle cx="400" cy="100" r="6" fill="white" />
            </svg>

            <div className="absolute top-1/3 left-1/4 -translate-x-1/2">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <Home className="w-5 h-5 text-black" />
              </div>
            </div>
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <Plane className="w-5 h-5 text-black" />
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-4 text-white/40 text-sm">
            <span>TODAY</span>
            <span>AGE 40</span>
            <span>AGE 50</span>
            <span>AGE 60</span>
            <span>AGE 70</span>
            <span>AGE 80</span>
          </div>
        </div>
      </div>
    </section>
  );
}
