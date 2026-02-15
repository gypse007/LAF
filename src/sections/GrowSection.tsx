import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function GrowSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current?.querySelectorAll('.grow-card') || [], {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        y: 80,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-[#0a0a0a] py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl text-white font-normal mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            Grow your money
          </h2>
          <p className="text-white font-medium mb-2">Invest with intention.</p>
          <p className="text-white/50 max-w-lg mx-auto">
            Monitor your portfolio in real time and dive deeper into every position with your AI advisor.
          </p>
          <button className="btn-secondary mt-8 text-sm">MORE ABOUT INVESTING</button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="grow-card glass-card rounded-3xl p-8">
            <h3 className="text-2xl lg:text-3xl text-white font-normal mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              <em className="italic">Monitor</em> investment performance
            </h3>
            <p className="text-white/50 text-sm mb-8">
              From 401(k)s to crypto, track the latest activity across your entire portfolio.
            </p>

            <div className="glass-card-dark rounded-2xl p-6">
              <p className="text-white/40 text-xs mb-2">PORTFOLIO</p>
              <p className="text-white/60 text-xs mb-1">Total balance</p>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-2xl text-white font-semibold">$325,321</span>
                <span className="text-green-400 text-sm">+$12,124 (3.9%)</span>
              </div>
              
              <div className="h-24 mb-4">
                <svg viewBox="0 0 300 80" className="w-full h-full">
                  <path d="M0,60 Q20,55 40,58 T80,45 T120,50 T160,35 T200,40 T240,25 T280,30 T300,20" fill="none" stroke="#10b981" strokeWidth="2" />
                </svg>
              </div>

              <div className="flex justify-between">
                {['1W', '1M', '3M', '6M', '1Y', '2Y'].map((period, i) => (
                  <span key={period} className={`text-xs ${i === 1 ? 'text-white bg-white/20 px-2 py-1 rounded' : 'text-white/50'}`}>
                    {period}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="grow-card glass-card rounded-3xl p-8">
            <h3 className="text-2xl lg:text-3xl text-white font-normal mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              <em className="italic">Visualize</em> your entire allocation
            </h3>
            <p className="text-white/50 text-sm mb-8">
              Know where your money is and whether it matches your goals.
            </p>

            <div className="glass-card-dark rounded-2xl p-6">
              <p className="text-white/40 text-xs mb-4">ASSET & RISK</p>
              
              <div className="space-y-4">
                {[
                  { name: 'U.S. stocks', current: 40.2, model: 56, color: 'bg-blue-400' },
                  { name: 'Intl. stocks', current: 14.2, model: 24, color: 'bg-yellow-400' },
                  { name: 'Crypto', current: 25, model: 31, color: 'bg-orange-400' },
                  { name: 'Cash', current: 37.6, model: 18.3, color: 'bg-cyan-400' },
                ].map((asset) => (
                  <div key={asset.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-white">{asset.name}</span>
                      <span className="text-white/60">Current ({asset.current}%)</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-1">
                      <div className={`h-full ${asset.color} rounded-full`} style={{ width: `${asset.current}%` }} />
                    </div>
                    <p className="text-white/40 text-xs mt-1">Model ({asset.model}%)</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
