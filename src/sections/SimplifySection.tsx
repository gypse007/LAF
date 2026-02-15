import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SimplifySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(phoneRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        },
        y: 100,
        rotateX: 20,
        opacity: 0,
        duration: 1.2,
        ease: 'power2.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen bg-[#0a0a0a] flex items-center justify-center overflow-hidden py-20"
    >
      <h2 className="absolute top-20 left-0 right-0 text-center text-4xl md:text-6xl lg:text-7xl text-white font-normal" style={{ fontFamily: "'Playfair Display', serif" }}>
        Simplify your money
      </h2>

      <div ref={phoneRef} className="perspective-1000 mt-20">
        <div className="phone-mockup w-[300px] md:w-[380px] h-[600px] md:h-[760px] p-4 preserve-3d animate-float">
          <div className="w-full h-full bg-[#111] rounded-[32px] overflow-hidden relative">
            <div className="flex items-center justify-between px-6 py-3">
              <span className="text-white text-sm">9:40</span>
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 bg-white/20 rounded-full" />
                <div className="w-4 h-4 bg-white/20 rounded-full" />
                <div className="w-6 h-3 bg-white/30 rounded-sm" />
              </div>
            </div>

            <div className="px-4 py-2 flex items-center justify-between">
              <div className="w-8 h-8 bg-[#C4A35A] rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-black">LA</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">🎁</span>
                </div>
                <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">⚙️</span>
                </div>
              </div>
            </div>

            <div className="px-4 py-2 flex gap-2">
              <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white">Overview</span>
              <span className="px-3 py-1 text-xs text-white/50">Net worth</span>
            </div>

            <div className="px-4 py-4">
              <p className="text-white/50 text-xs mb-1">NET WORTH</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-semibold text-white">$325,472</span>
                <span className="text-green-400 text-sm">+5.5%</span>
              </div>
            </div>

            <div className="px-4 py-2 h-40">
              <svg viewBox="0 0 300 120" className="w-full h-full">
                <defs>
                  <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#C4A35A" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#C4A35A" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0,80 Q30,75 60,70 T120,60 T180,50 T240,40 T300,30" fill="none" stroke="#C4A35A" strokeWidth="2" />
                <path d="M0,80 Q30,75 60,70 T120,60 T180,50 T240,40 T300,30 L300,120 L0,120 Z" fill="url(#chartGradient)" />
              </svg>
            </div>

            <div className="px-4 py-2 flex justify-between">
              {['1W', '1M', '3M', '6M', '1Y', 'ALL'].map((period, i) => (
                <span key={period} className={`text-xs ${i === 1 ? 'text-white bg-white/20 px-2 py-1 rounded' : 'text-white/50'}`}>
                  {period}
                </span>
              ))}
            </div>

            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <span className="text-white/50 text-xs">SPENT LAST 30</span>
              <div className="flex gap-2">
                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs">📊</span>
                </div>
                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs">🏠</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
