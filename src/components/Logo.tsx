import React from 'react';
import { Zap } from 'lucide-react';

export default function Logo({ className = "h-8", textClassName = "text-slate-900" }: { className?: string; textClassName?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={`flex items-center font-display font-black tracking-tight text-xl sm:text-2xl md:text-3xl ${textClassName}`}>
        <span className="uppercase italic">Ha</span>
        <div className="relative mx-0.5 mt-0.5 flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="h-[1em] w-[1em] fill-current" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="10" />
            <rect x="75" y="75" width="16" height="10" transform="rotate(45 82.5 80)" fill="currentColor" />
            <path d="M55 22L32 55H48L42 78L68 45H52L55 22Z" className="fill-blue-600" />
          </svg>
        </div>
        <span className="ml-2 font-display font-bold tracking-[0.1em] text-[0.55em] sm:text-[0.6em] opacity-90 uppercase italic text-blue-600">Electric</span>
      </div>
    </div>
  );
}
