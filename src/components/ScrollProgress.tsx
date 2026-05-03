import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap';

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.to(barRef.current, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.documentElement,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
      },
    });
  });

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-[200] bg-slate-100/50">
      <div
        ref={barRef}
        className="h-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 origin-left"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  );
}
