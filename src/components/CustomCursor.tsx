import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run on non-touch, non-mobile
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const dot = dotRef.current;
    const outline = outlineRef.current;
    if (!dot || !outline) return;

    let rafId: number;

    const moveCursor = (e: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        gsap.to(dot, {
          x: e.clientX - 4,
          y: e.clientY - 4,
          duration: 0.08,
          ease: 'power2.out',
          overwrite: true,
        });
        gsap.to(outline, {
          x: e.clientX - 20,
          y: e.clientY - 20,
          duration: 0.18,
          ease: 'power2.out',
          overwrite: true,
        });
      });
    };

    const handleMouseEnter = () => {
      gsap.to(outline, { scale: 1.6, opacity: 0.8, duration: 0.25, ease: 'power2.out' });
    };

    const handleMouseLeave = () => {
      gsap.to(outline, { scale: 1, opacity: 1, duration: 0.25, ease: 'power2.out' });
    };

    const handleMouseDown = () => {
      gsap.to([dot, outline], { scale: 0.75, duration: 0.1 });
    };

    const handleMouseUp = () => {
      gsap.to([dot, outline], { scale: 1, duration: 0.15 });
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    const interactiveElements = document.querySelectorAll('a, button, [role="button"]');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      cancelAnimationFrame(rafId);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      <div ref={dotRef} className="cursor-dot hidden md:block" />
      <div ref={outlineRef} className="cursor-outline hidden md:block" />
    </>
  );
}
