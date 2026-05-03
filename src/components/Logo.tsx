import { motion } from 'motion/react';

interface LogoProps {
  className?: string;
  textClassName?: string;
  showLines?: boolean;
}

export default function Logo({ className = '', textClassName = 'text-slate-900', showLines = true }: LogoProps) {
  return (
    <div className={`inline-flex items-center gap-2.5 font-display font-black text-xl sm:text-2xl ${className}`}>

      {/* HAQ — tight letter group */}
      <div className={`flex items-center gap-[0.05em] leading-none ${textClassName}`}>
        <span className="text-[1em] uppercase tracking-[0.04em] select-none">HA</span>

        {/* Q — circle with bolt inside + short tail */}
        <svg viewBox="0 0 44 44" className="h-[1.05em] w-[1.05em] flex-shrink-0" aria-hidden="true">
          <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="2.8" fill="none" />
          <line
            x1="27" y1="29" x2="34" y2="36"
            stroke="currentColor" strokeWidth="2.8" strokeLinecap="round"
          />
          <motion.path
            d="M21 7L10 22H18L15 33L28 18H20L21 7Z"
            fill="#4f63d2"
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </svg>
      </div>

      {/* Thin divider */}
      <span className={`w-px h-[0.75em] bg-current opacity-25 flex-shrink-0 ${textClassName}`} />

      {/* ELECTRIC — beside HAQ, vertically centered */}
      <span className="text-[0.38em] tracking-[0.3em] uppercase text-blue-500 leading-none select-none">
        ELECTRIC
      </span>

    </div>
  );
}
