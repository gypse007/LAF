import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function InsightsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current?.querySelectorAll('.insight-card') || [], {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        y: 80,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-purple-900/20 to-[#0a0a0a]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="insight-card glass-card rounded-3xl p-8 lg:p-12 min-h-[500px] flex flex-col">
            <h3 className="text-3xl lg:text-4xl text-white font-normal mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              <em className="italic">See</em> instant insights
            </h3>
            <p className="text-white/50 mb-8">
              Get clear answers and tailored insights on your portfolio, spending, and goals—in seconds.
            </p>

            <div className="glass-card-dark rounded-2xl p-6 mt-auto">
              <div className="flex items-start gap-3 mb-4">
                <Sparkles className="w-5 h-5 text-blue-400" />
              </div>
              <h4 className="text-white font-medium mb-2">U.S. markets approach record territory</h4>
              <p className="text-white/60 text-sm leading-relaxed">
                The S&P 500 climbed 1.11% yesterday and is now trading less than 1% below its record high. The Nasdaq gained over 1%, while the Dow surged more than 500 points.
              </p>
            </div>
          </div>

          <div className="insight-card glass-card rounded-3xl p-8 lg:p-12 min-h-[500px] flex flex-col">
            <h3 className="text-3xl lg:text-4xl text-white font-normal mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              <em className="italic">Unlock</em> deep recaps
            </h3>
            <p className="text-white/50 mb-8">
              Your financial life, summarized daily—stay in sync with the markets, the news, and your money.
            </p>

            <div className="glass-card-dark rounded-2xl p-6 mt-auto relative">
              <button className="absolute top-4 right-4 text-white/40 hover:text-white">
                <X className="w-5 h-5" />
              </button>
              <h4 className="text-white font-medium mb-2">$1,992 in bills coming this month</h4>
              <p className="text-white/60 text-sm mb-4">
                A few recurring charges are set to post in the next week, including rent, your insurance payment, and Netflix.
              </p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Rent</span>
                  <span className="text-white">$1,875</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Netflix</span>
                  <span className="text-white">$24.99</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
