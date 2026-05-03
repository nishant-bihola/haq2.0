import React from 'react';
import { motion } from 'motion/react';

export default function Logo({ className = "", textClassName = "text-slate-900" }: { className?: string; textClassName?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={`flex items-center font-display font-black tracking-tight text-xl sm:text-2xl md:text-3xl ${textClassName}`}>
        <span className="uppercase italic leading-none">Ha</span>

        {/* The Q glyph — typographic circle + diagonal tail */}
        <div className="relative mx-0.5 flex items-center justify-center">
          <svg
            viewBox="0 0 90 100"
            className="h-[1.15em] w-auto"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
          >
            {/* Q body: bold circle */}
            <circle
              cx="42" cy="46"
              r="32"
              stroke="currentColor"
              strokeWidth="11"
              fill="none"
            />

            {/* Q tail: diagonal stroke from bottom-right of circle outward */}
            <line
              x1="62" y1="66"
              x2="86" y2="94"
              stroke="currentColor"
              strokeWidth="11"
              strokeLinecap="round"
            />

            {/* Lightning bolt inside — blue, animated glow */}
            <motion.path
              d="M48 22L30 50H44L38 70L62 42H48L48 22Z"
              fill="#2563eb"
              animate={{
                opacity: [0.8, 1, 0.8],
                filter: [
                  "drop-shadow(0 0 3px rgba(37,99,235,0.4))",
                  "drop-shadow(0 0 10px rgba(37,99,235,0.9))",
                  "drop-shadow(0 0 3px rgba(37,99,235,0.4))"
                ]
              }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </svg>
        </div>

        <span className="ml-1.5 font-display font-black tracking-[0.2em] text-[0.45em] sm:text-[0.52em] opacity-90 uppercase italic text-blue-600 leading-none self-center pb-0.5">
          Electric
        </span>
      </div>
    </div>
  );
}
