import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUp, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const chatExamples = [
  {
    question: 'Where am I overspending this month?',
    answer: `Looking at your spending for the first 21 days of October, your top overspending category is in Dining compared to the past few months.

Spending hotspots in Oct vs. Trend

Dining $436 (up 21%)
Shopping $210 (up 18%)
Personal car $139 (up 11%)`,
  },
  {
    question: 'Can I retire by 60?',
    answer: `Your plan is still on track, but the buffer is smaller. If you stopped working at 60 instead of 67, you'll have around $1.2M less saved by retirement.

Key Forecast Changes

Net Worth: $3.6M → $2.4M
% Success: 82% → 79%
Cash Flow: $8,500/yr → $7,200/yr`,
  },
];

export default function AskSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeChat, setActiveChat] = useState(0);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-[#0a0a0a] py-32">
      <div className="max-w-3xl mx-auto px-6">
        <div className="flex justify-center mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-blue-400 rounded-xl flex items-center justify-center rotate-12">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
        </div>

        <h2 className="text-5xl md:text-7xl text-white font-normal text-center mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
          Ask anything
        </h2>

        <p className="text-white/50 text-center max-w-xl mx-auto mb-16">
          Origin AI turns your questions into answers you can trust—with personalized advice, grounded in your data, and delivered instantly.
        </p>

        <div className="space-y-4">
          <div className="glass-card rounded-2xl p-4 flex items-center gap-4">
            <input 
              type="text" 
              value={chatExamples[activeChat].question}
              readOnly
              className="flex-1 bg-transparent text-white outline-none"
            />
            <button className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
              <ArrowUp className="w-5 h-5 text-white" />
            </button>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <p className="text-white/80 whitespace-pre-line text-sm leading-relaxed">
              {chatExamples[activeChat].answer}
            </p>
          </div>

          <div className="flex gap-3 justify-center pt-4">
            {chatExamples.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveChat(index)}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  activeChat === index ? 'bg-white text-black' : 'bg-white/10 text-white/60 hover:bg-white/20'
                }`}
              >
                Example {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
