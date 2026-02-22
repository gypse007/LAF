import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface LoadingScreenProps {
  onLoadComplete: () => void;
}

export default function LoadingScreen({ onLoadComplete }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: onLoadComplete,
      });

      // Logo entrance
      tl.to(logoRef.current, {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
      })
        .to({}, { duration: 0.6 }) // Shorter hold
        .to(logoRef.current, {
          scale: 0.9,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.in',
        }, 'exit')
        .to(containerRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: 'power2.inOut',
        }, 'exit-=0.4');
    }, containerRef);

    return () => ctx.revert();
  }, [onLoadComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-white overflow-hidden"
    >
      <div className="relative z-10 w-full px-4">
        <div ref={logoRef} className="opacity-0 translate-y-10 scale-50">
          {/* Logo */}
          <div className="relative mb-0 text-center">
            <img
              src="/images/logo-no-bg.png"
              alt="LAF"
              className="w-32 h-32 sm:w-48 sm:h-48 object-contain mx-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
