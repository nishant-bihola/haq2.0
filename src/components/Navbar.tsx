import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Menu, X, ChevronRight } from 'lucide-react';
import Logo from './Logo';
import { cn } from '../lib/utils';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'About Us', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-500 px-4 md:px-8",
      isScrolled
        ? "bg-white/97 backdrop-blur-xl shadow-sm py-3 border-b border-slate-100"
        : "bg-transparent py-5 sm:py-6"
    )}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <a href="#home" className="transition-transform active:scale-95">
          <Logo
            className="shrink-0"
            textClassName={isScrolled ? 'text-slate-900' : 'text-white'}
          />
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex gap-10 items-center">
          <div className="flex gap-8 items-center">
            {navLinks.map(link => (
              <a
                key={link.name}
                href={link.href}
                className={cn(
                  "text-[13px] font-bold transition-colors uppercase tracking-wider",
                  isScrolled ? "text-slate-600 hover:text-blue-600" : "text-white/70 hover:text-white"
                )}
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-6 border-l border-slate-200 pl-10">
            <a
              href="tel:+17802979252"
              className="bg-blue-600 text-white px-7 py-3 rounded-full text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 active:scale-95 flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              Call 1-780-297-9252
            </a>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <a
            href="tel:+17802979252"
            aria-label="Call (780) 297-9252"
            className="p-3 bg-blue-600 text-white rounded-full shadow-lg shadow-blue-500/20 active:scale-90 transition-transform"
          >
            <Phone className="w-5 h-5" aria-hidden="true" />
          </a>
          <motion.button
            className="p-2 text-slate-900 hover:bg-slate-100 rounded-lg transition-colors relative h-10 w-10 flex items-center justify-center"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={mobileMenuOpen ? 'close' : 'open'}
                initial={{ rotate: mobileMenuOpen ? -90 : 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: mobileMenuOpen ? 90 : -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
            className="absolute top-full left-0 w-full bg-white/98 backdrop-blur-xl shadow-2xl border-t border-slate-100 overflow-hidden lg:hidden"
          >
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
                closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
              }}
              className="p-6 flex flex-col gap-6"
            >
              <div className="flex flex-col gap-1">
                {navLinks.map(link => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    variants={{
                      open: { opacity: 1, x: 0 },
                      closed: { opacity: 0, x: -10 }
                    }}
                    whileTap={{ x: 5, backgroundColor: 'rgba(59, 130, 246, 0.05)' }}
                    className="text-slate-900 text-lg font-bold flex justify-between items-center p-4 rounded-xl group transition-colors"
                  >
                    {link.name}
                    <motion.div whileHover={{ x: 3 }}>
                      <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-600 transition-colors" />
                    </motion.div>
                  </motion.a>
                ))}
              </div>
              <motion.div
                variants={{ open: { opacity: 1, y: 0 }, closed: { opacity: 0, y: 10 } }}
                className="pt-6 border-t border-slate-100 flex flex-col gap-4"
              >
                <a
                  href="tel:+17802979252"
                  className="w-full py-4 text-center bg-slate-900 text-white font-bold rounded-2xl active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-xl shadow-slate-900/10"
                >
                  <Phone className="w-5 h-5" />
                  Call Now — 1-780-297-9252
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
