import React from 'react';
import { motion } from 'motion/react';

export default function Logo({ className = "", textClassName = "text-slate-900" }: { className?: string; textClassName?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={`flex items-center font-display font-black tracking-tight text-xl sm:text-2xl md:text-3xl ${textClassName}`}>
        <span className="uppercase italic leading-none">Ha</span>
        <div className="relative mx-1 flex items-center justify-center -mb-1">
          <svg viewBox="0 0 100 100" className="h-[1.15em] w-[1.15em] fill-current" xmlns="http://www.w3.org/2000/svg">
            {/* The Q character body */}
            <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="12" />
            
            {/* The Lightning Bolt Inside - always animated */}
            <motion.path 
              d="M55 22L32 55H48L42 78L68 45H52L55 22Z" 
              className="fill-blue-600"
              animate={{ 
                opacity: [0.9, 1, 0.9],
                scale: [0.98, 1.05, 0.98],
                filter: [
                  "drop-shadow(0 0 4px rgba(37,99,235,0.4))", 
                  "drop-shadow(0 0 12px rgba(37,99,235,0.9))", 
                  "drop-shadow(0 0 4px rgba(37,99,235,0.4))"
                ]
              }}
              transition={{ 
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* The Q Tail - angled and integrated into the circle curve */}
            <path 
              d="M72 72 Q 82 82, 92 82" 
              fill="none"
              stroke="currentColor" 
              strokeWidth="12" 
              strokeLinecap="round" 
            />
          </svg>
        </div>
        <span className="ml-1 font-display font-black tracking-[0.2em] text-[0.45em] sm:text-[0.52em] opacity-90 uppercase italic text-blue-600 leading-none self-center pb-0.5">Electric</span>
      </div>
    </div>
  );
}
