import { motion } from 'motion/react';

interface LogoProps {
  className?: string;
  textClassName?: string;
  /** show the flanking decorative lines (hide on very small viewports) */
  showLines?: boolean;
}

export default function Logo({ className = '', textClassName = 'text-slate-900', showLines = true }: LogoProps) {
  return (
    <div className={`inline-flex items-center ${className}`}>
      <div className={`flex items-center gap-1.5 font-display font-black tracking-tight ${textClassName}`}>

        {/* Left decorative rule — business-card style */}
        {showLines && (
          <span className="hidden sm:block w-5 h-px bg-current opacity-40" />
        )}

        {/* H A */}
        <span className="text-[1em] uppercase tracking-[0.08em] leading-none select-none">
          HA
        </span>

        {/* Q  — circle ring with animated lightning bolt inside */}
        <svg
          viewBox="0 0 40 40"
          className="h-[1.05em] w-[1.05em]"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Outer ring */}
          <circle
            cx="20" cy="20" r="16"
            stroke="currentColor"
            strokeWidth="2.8"
            fill="none"
          />
          {/* Lightning bolt — royal brand blue */}
          <motion.path
            d="M23 6L11 22H19L15 34L29 18H21L23 6Z"
            fill="#4f63d2"
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </svg>

        {/* Right decorative rule */}
        {showLines && (
          <span className="hidden sm:block w-5 h-px bg-current opacity-40" />
        )}

        {/* ELECTRIC label */}
        <span className="text-[0.44em] font-black tracking-[0.28em] uppercase text-blue-600 leading-none self-center pt-px select-none">
          Electric
        </span>
      </div>
    </div>
  );
}
