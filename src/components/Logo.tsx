import { motion } from 'motion/react';

export default function Logo({ className = "", textClassName = "text-slate-900" }: { className?: string; textClassName?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={`flex items-center font-display font-black tracking-tight text-xl sm:text-2xl md:text-3xl ${textClassName}`}>
        <span className="uppercase italic leading-none">Ha</span>

        {/* Q glyph — bold ring with short crossbar tail (letter Q, not magnifying glass) */}
        <div className="relative mx-0.5 flex items-center justify-center">
          <svg
            viewBox="0 0 80 88"
            className="h-[1.15em] w-auto"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
          >
            {/* Q body: bold circle ring */}
            <circle
              cx="38" cy="40"
              r="26"
              stroke="currentColor"
              strokeWidth="12"
              fill="none"
            />

            {/*
              Q tail: starts inside the circle at 5-o'clock (lower-right interior),
              exits the ring by only ~10px — classic letter-Q proportions, not a handle.
            */}
            <line
              x1="50" y1="58"
              x2="62" y2="70"
              stroke="currentColor"
              strokeWidth="12"
              strokeLinecap="round"
            />

            {/* Lightning bolt inside — blue glow pulse */}
            <motion.path
              d="M43 16L26 44H41L35 64L58 36H43L43 16Z"
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
