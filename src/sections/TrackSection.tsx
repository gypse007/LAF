import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: 'Monitor your spending',
    description: 'See every transaction, automatically categorized.',
    type: 'spending',
  },
  {
    title: 'Build a budget',
    description: 'AI sets up your budget and helps you track progress all month long.',
    type: 'budget',
  },
  {
    title: 'Cancel unwanted subscriptions',
    description: 'Find, manage, and cancel subscriptions in seconds.',
    type: 'subscriptions',
  },
];

export default function TrackSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardsRef.current?.children || [], {
        scrollTrigger: {
          trigger: cardsRef.current,
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
            Track everything
          </h2>
          <div>
            <p className="text-white font-medium mb-2">Sync all your finances.</p>
            <p className="text-white/50 max-w-lg mx-auto">
              Connect all your accounts to see your finances in one place—easy to find, easy to understand.
            </p>
          </div>
          <button className="btn-secondary mt-8 text-sm">MORE ABOUT SPENDING</button>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="glass-card rounded-3xl overflow-hidden card-hover">
              <div className="h-64 md:h-80 relative overflow-hidden">
                {feature.type === 'spending' && (
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-purple-900/50">
                    <div className="absolute inset-4 glass-card-dark rounded-2xl p-4">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-white/60 text-xs">SPEND THIS MONTH</span>
                        <div className="flex gap-2">
                          <span className="text-white/40 text-xs">📊</span>
                          <span className="text-white/40 text-xs">📅</span>
                          <span className="text-white/40 text-xs">✨</span>
                        </div>
                      </div>
                      <p className="text-2xl text-white font-semibold mb-4">$1,586</p>
                      <div className="grid grid-cols-7 gap-1">
                        {Array.from({ length: 31 }, (_, i) => (
                          <div key={i} className={`h-8 rounded flex items-center justify-center text-xs ${[2, 4, 6, 11, 13].includes(i + 1) ? 'bg-white/20 text-white' : 'bg-white/5 text-white/40'}`}>
                            {i + 1}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                {feature.type === 'budget' && (
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-900/50 to-amber-900/50">
                    <div className="absolute inset-4 glass-card-dark rounded-2xl p-4">
                      <p className="text-white/60 text-xs mb-4">BUDGET</p>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-white">Total Budget</span>
                            <span className="text-white">$2,234 of $5,000</span>
                          </div>
                          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full w-[44%] bg-gradient-to-r from-orange-400 to-amber-400 rounded-full" />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-white">Food</span>
                            <span className="text-white/60">41.1%</span>
                          </div>
                          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full w-[41%] bg-white/30 rounded-full" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {feature.type === 'subscriptions' && (
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/50 to-blue-900/50">
                    <div className="absolute inset-4 glass-card-dark rounded-2xl p-4">
                      <p className="text-white/60 text-xs mb-4">UPCOMING TRANSACTIONS</p>
                      <div className="grid grid-cols-7 gap-1 mb-4">
                        {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day) => (
                          <div key={day} className="text-center text-white/40 text-xs">{day}</div>
                        ))}
                        {Array.from({ length: 14 }, (_, i) => (
                          <div key={i} className={`h-10 rounded-lg flex items-center justify-center text-xs ${[3, 5, 7].includes(i) ? 'bg-white/20' : 'bg-white/5 text-white/40'}`}>
                            {i + 27 > 31 ? i - 4 : i + 27}
                          </div>
                        ))}
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-white/60">Netflix</span>
                          <span className="text-white">$21.98</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-white/60">Spotify</span>
                          <span className="text-white">$82.99</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl text-white font-medium mb-2">{feature.title}</h3>
                <p className="text-white/50 text-sm">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
