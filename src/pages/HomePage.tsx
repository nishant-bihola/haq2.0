import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Zap, ShieldCheck, Clock, Phone, ArrowRight, CheckCircle2,
  Building2, Home, Star, Award, TrendingUp, Bolt, MapPin,
} from 'lucide-react';
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap';
import { cn } from '../lib/utils';

// ─── Contact Section Removed ──────────────────────────────────────────────────

// ─── Main HomePage ────────────────────────────────────────────────────────────
export default function HomePage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // ── Hero text reveal ──
    gsap.from('.hero-badge', {
      opacity: 0, y: 20, duration: 0.8, ease: 'power3.out', delay: 0.1,
    });
    gsap.from('.hero-title', {
      opacity: 0, y: 60, duration: 1, ease: 'power3.out', delay: 0.25,
    });
    gsap.from('.hero-subtitle', {
      opacity: 0, y: 30, duration: 0.8, ease: 'power3.out', delay: 0.45,
    });
    gsap.from('.hero-ctas', {
      opacity: 0, y: 30, duration: 0.8, ease: 'power3.out', delay: 0.6,
    });
    gsap.from('.hero-trust', {
      opacity: 0, y: 20, duration: 0.8, ease: 'power3.out', delay: 0.75,
    });
    gsap.from('.hero-img', {
      opacity: 0, scale: 1.06, duration: 1.2, ease: 'power3.out', delay: 0.3,
    });
    gsap.from('.hero-badge-float', {
      opacity: 0, x: -40, duration: 0.9, ease: 'back.out(2)', delay: 0.8,
    });

    // Parallax on hero image while scrolling
    gsap.to('.hero-img', {
      yPercent: -18,
      ease: 'none',
      scrollTrigger: {
        trigger: '#home',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    // ── Logo cloud ──
    gsap.from('.logo-item', {
      scrollTrigger: { trigger: '.logo-cloud', start: 'top 95%', once: true },
      opacity: 0, y: 20, stagger: 0.08, duration: 0.6, ease: 'power2.out',
    });

    // ── Services section header ──
    gsap.from('.services-header', {
      scrollTrigger: { trigger: '#services', start: 'top 95%', once: true },
      opacity: 0, y: 30, duration: 0.7, ease: 'power3.out',
    });
    // Service cards stagger
    gsap.from('.service-card', {
      scrollTrigger: { trigger: '.services-grid', start: 'top 95%', once: true },
      opacity: 0, y: 50, stagger: 0.12, duration: 0.8, ease: 'power3.out',
    });

    // About section handled by Framer Motion whileInView

    // Stats counter animation
    const statsTargets = [
      { el: '#stat-years', end: 15, suffix: '+' },
      { el: '#stat-clients', end: 1200, suffix: '+' },
      { el: '#stat-projects', end: 4800, suffix: '+' },
      { el: '#stat-rating', end: 5.0, suffix: '\u2605', decimals: 1 },
    ];
    statsTargets.forEach(({ el, end, suffix, decimals = 0 }) => {
      const element = document.querySelector(el);
      if (!element) return;
      const obj = { val: 0 };
      gsap.to(obj, {
        val: end,
        duration: 2,
        ease: 'power2.out',
        onUpdate() {
          element.textContent = decimals
            ? obj.val.toFixed(decimals) + suffix
            : Math.round(obj.val) + suffix;
        },
        scrollTrigger: { trigger: '.stats-grid', start: 'top 95%', once: true },
      });
    });

    // ── CTA section text reveal ──
    gsap.from('.cta-line', {
      scrollTrigger: { trigger: '.cta-section', start: 'top 95%', once: true },
      opacity: 0, y: 60, stagger: 0.1, duration: 0.8, ease: 'power4.out',
    });
    gsap.from('.cta-sub', {
      scrollTrigger: { trigger: '.cta-section', start: 'top 90%', once: true },
      opacity: 0, y: 20, duration: 0.7, ease: 'power3.out', delay: 0.3,
    });
    gsap.from('.cta-btn', {
      scrollTrigger: { trigger: '.cta-section', start: 'top 85%', once: true },
      opacity: 0, scale: 0.95, duration: 0.6, ease: 'back.out(1.5)', delay: 0.5,
    });

    // ── Footer ──
    gsap.from('.footer-content', {
      scrollTrigger: { trigger: '#footer', start: 'top 98%', once: true },
      opacity: 0, y: 30, duration: 0.8, ease: 'power3.out',
    });

    // ── Section snap — snaps to nearest major section when scroll stops ──
    const snapTargets = gsap.utils.toArray<HTMLElement>('#home, #services, #about');
    ScrollTrigger.create({
      snap: {
        snapTo: (progress: number) => {
          const max = ScrollTrigger.maxScroll(window);
          if (max === 0) return progress;
          const positions = snapTargets.map(el => el.offsetTop / max);
          return gsap.utils.snap(positions, progress);
        },
        duration: { min: 0.3, max: 0.7 },
        delay: 0.08,
        ease: 'power2.inOut',
      },
    });

    // Scroll indicator arrow
    gsap.to('.scroll-arrow', {
      y: 10, repeat: -1, yoyo: true, duration: 0.8, ease: 'power1.inOut',
    });

    return () => { ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, { scope: pageRef });

  const services = [
    {
      icon: <Home className="w-6 h-6 text-blue-600" />,
      title: 'Residential Electrical',
      desc: 'Expert home wiring, smart lighting, panel upgrades, and safety inspections for Edmonton homes.',
      price: 'From $149',
      img: '/residential_electrical.png',
      tag: 'Residential',
      features: ['Wiring & Outlets', 'Panel Upgrades', 'Smart Lighting', 'Safety Inspection'],
    },
    {
      icon: <Building2 className="w-6 h-6 text-blue-600" />,
      title: 'Commercial Projects',
      desc: 'Full-scale electrical solutions for offices, retail spaces, and industrial facilities in Edmonton.',
      price: 'From $299',
      img: '/commercial_electrical.png',
      tag: 'Commercial',
      features: ['Office Fit-outs', 'Industrial Wiring', 'Code Compliance', 'Load Analysis'],
    },
    {
      icon: <Clock className="w-6 h-6 text-blue-600" />,
      title: 'Emergency Repairs',
      desc: '24/7 fast-response electrical troubleshooting. We arrive within 60 minutes anywhere in Edmonton.',
      price: 'From $199',
      img: '/emergency_electrical.png',
      tag: '24/7',
      features: ['60-Min Response', 'Power Outages', 'Hazard Repairs', 'Storm Damage'],
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Jenkins',
      role: 'Edmonton Homeowner',
      quote: 'The best electricians in Edmonton! Fast, clean, and very professional with our panel upgrade. I finally feel safe in my older bungalow.',
      rating: 5,
    },
    {
      name: 'Michael Ross',
      role: 'Local Business Owner',
      quote: 'Highly recommended for commercial work. Haq Electrics handled our office fit-out perfectly. Their attention to local code was impressive.',
      rating: 5,
    },
    {
      name: 'David Lawson',
      role: 'Residential Client',
      quote: '24/7 service actually means 24/7. They came out at 2 AM for an emergency repair after a storm knocked our power out. Absolute lifesavers!',
      rating: 5,
    },
    {
      name: 'Priya Sharma',
      role: 'Condo Owner, Glenora',
      quote: 'Had my EV charger installed last week. The team was on time, explained everything clearly, and the work was spotless. Highly recommend!',
      rating: 5,
    },
    {
      name: 'Tom & Linda Barrett',
      role: 'New Home Buyers',
      quote: 'Haq Electrics did our full pre-purchase electrical inspection. Found issues the home inspector missed! Saved us thousands in potential repairs.',
      rating: 5,
    },
    {
      name: 'Raj Patel',
      role: 'Restaurant Owner',
      quote: 'Trusted them with our commercial kitchen electrical upgrade. Minimal downtime, code-compliant, and the price was exactly as quoted. Five stars.',
      rating: 5,
    },
  ];

  return (
    <div ref={pageRef} className="min-h-screen bg-[#FDFDFF] font-sans text-slate-900 overflow-x-hidden">

      {/* ── HERO ── */}
      <section id="home" className="relative min-h-screen pt-28 pb-16 md:pt-36 md:pb-24 px-4 md:px-8 flex items-center justify-center overflow-hidden bg-[#07101f]">

        {/* ── Background image layer ── */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=2670&auto=format&fit=crop"
            alt=""
            className="w-full h-full object-cover object-center opacity-25 scale-105"
            aria-hidden="true"
          />
          {/* Left gradient for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#07101f] via-[#07101f]/90 to-transparent" />
          {/* Vignette all edges */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#07101f]/80 via-transparent to-[#07101f]/60" />
        </div>

        {/* ── Atmospheric glow blobs ── */}
        <div className="absolute top-0 right-0 w-[70vw] h-[70vw] max-w-[700px] max-h-[700px] bg-blue-600/20 rounded-full blur-[160px] z-0 translate-x-1/3 -translate-y-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] max-w-[500px] max-h-[500px] bg-indigo-700/15 rounded-full blur-[130px] z-0 -translate-x-1/4 translate-y-1/4 pointer-events-none" />

        {/* ── Grid texture ── */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.04] z-0 pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">

            {/* ── LEFT — copy ── */}
            <div className="lg:col-span-7 text-center lg:text-left flex flex-col items-center lg:items-start">

              {/* Live badge */}
              <div className="hero-badge inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/[0.07] backdrop-blur-md text-blue-300 text-[10px] md:text-xs font-black uppercase tracking-[0.22em] mb-7 border border-white/[0.12] shadow-[0_8px_30px_rgba(37,99,235,0.15)]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
                </span>
                Edmonton's Premier Electricians
              </div>

              {/* Headline */}
              <h1 className="hero-title text-[3rem] sm:text-[4.5rem] lg:text-[6.5rem] xl:text-[7.5rem] font-black text-white mb-7 leading-[0.9] tracking-[-0.04em] uppercase">
                <span className="block italic text-transparent bg-clip-text bg-gradient-to-br from-white to-white/70">Master</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Electrical</span>
                <span className="block italic text-transparent bg-clip-text bg-gradient-to-br from-white to-white/70">Solutions.</span>
              </h1>

              {/* Subtext */}
              <p className="hero-subtitle text-sm sm:text-base lg:text-lg text-white/55 mb-10 max-w-lg leading-[1.85] font-medium">
                Edmonton's most trusted electrical team. Smart home wiring to full commercial builds — done right, done safely, done on time.
              </p>

              {/* CTAs */}
              <div className="hero-ctas flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center lg:justify-start">
                <a
                  href="tel:+17802979252"
                  className="bg-blue-600 text-white px-8 py-4 sm:py-5 rounded-2xl font-black text-sm sm:text-base hover:bg-blue-500 transition-all shadow-[0_16px_40px_rgba(37,99,235,0.45)] hover:shadow-[0_20px_50px_rgba(37,99,235,0.6)] text-center flex items-center justify-center gap-3 group active:scale-[0.98] w-full sm:w-auto"
                >
                  <Phone className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                  Call Now — Free Quote
                </a>
                <a
                  href="#services"
                  className="border border-white/20 text-white/80 px-8 py-4 sm:py-5 rounded-2xl font-bold text-sm sm:text-base hover:bg-white/[0.08] hover:border-white/30 transition-all text-center flex items-center justify-center gap-3 group active:scale-[0.98] w-full sm:w-auto backdrop-blur-sm"
                >
                  View Services
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Trust bar */}
              <div className="hero-trust flex flex-wrap gap-5 sm:gap-7 items-center justify-center lg:justify-start pt-8 mt-2 border-t border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <div className="text-yellow-400 flex gap-0.5">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
                  </div>
                  <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">5.0 · Top Rated YEG</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-400" />
                  <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Licensed & Insured</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-blue-400" />
                  <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">15+ Years Experience</span>
                </div>
              </div>
            </div>

            {/* ── RIGHT — photo ── */}
            <div className="lg:col-span-5 relative hero-img hidden sm:block">
              <div className="relative z-10 w-full max-w-[480px] mx-auto lg:mx-0">
                <div className="rounded-[2.5rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.5)] aspect-[4/5] border border-white/10">
                  <img
                    src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2669&auto=format&fit=crop"
                    className="w-full h-full object-cover scale-105"
                    alt="Professional Electrician in Edmonton"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />
                </div>

                {/* Floating badge — response time */}
                <div className="hero-badge-float absolute -bottom-6 -left-6 md:-left-10 bg-white/[0.08] backdrop-blur-2xl p-5 rounded-2xl shadow-2xl border border-white/10 flex items-center gap-4 z-20">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/40">
                    <ShieldCheck className="text-white w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-white/50 text-[9px] font-bold uppercase tracking-[0.2em] mb-0.5">Response Time</p>
                    <p className="text-white font-black text-xl leading-none tracking-tight italic">&lt; 60 Min</p>
                  </div>
                </div>

                {/* Floating badge — reviews */}
                <div className="absolute top-10 -right-5 md:-right-8 bg-white/[0.08] backdrop-blur-2xl px-4 py-3 rounded-xl shadow-2xl border border-white/10 flex items-center gap-3 z-20">
                  <div className="flex -space-x-1.5">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-7 h-7 rounded-full border-2 border-white/20 bg-slate-700 overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="Client" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col">
                    <div className="flex text-yellow-400">
                      {[1,2,3,4,5].map(i => <Star key={i} className="w-2.5 h-2.5 fill-current" />)}
                    </div>
                    <span className="text-[8px] font-bold text-white/50 uppercase mt-0.5">1.2k+ Reviews</span>
                  </div>
                </div>
              </div>

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[130%] bg-blue-600/15 rounded-full blur-[90px] -z-10 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hidden lg:flex flex-col items-center gap-2 absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <span className="text-[9px] font-bold text-white/25 uppercase tracking-[0.35em]">Scroll</span>
          <div className="scroll-arrow text-white/25">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-20 bg-slate-900 relative overflow-hidden stats-grid">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(37,99,235,0.18),_transparent_65%)]" />
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { id: 'stat-years',    label: 'Years in Edmonton', icon: <Award className="w-5 h-5" /> },
              { id: 'stat-clients',  label: 'Happy Clients',     icon: <Star className="w-5 h-5" /> },
              { id: 'stat-projects', label: 'Projects Complete', icon: <Bolt className="w-5 h-5" /> },
              { id: 'stat-rating',   label: 'Google Rating',     icon: <TrendingUp className="w-5 h-5" /> },
            ].map((stat) => (
              <div key={stat.id} className="group text-center p-6 md:p-8 rounded-[2rem] bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.07] transition-all duration-300">
                <div className="w-11 h-11 bg-blue-500/10 text-blue-400 rounded-xl flex items-center justify-center mx-auto mb-5 border border-blue-500/20">
                  {stat.icon}
                </div>
                <div id={stat.id} className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-2">0</div>
                <p className="text-blue-200/60 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LOGO CLOUD ── */}
      <section className="py-16 bg-white border-y border-slate-100 overflow-hidden relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 md:px-8 mb-10">
          <div className="flex items-center justify-center gap-4">
            <div className="h-px bg-slate-200 flex-1 max-w-[100px]" />
            <p className="text-center text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-[0.3em]">
              Certified Excellence & Trusted Partners
            </p>
            <div className="h-px bg-slate-200 flex-1 max-w-[100px]" />
          </div>
        </div>

        <div className="animate-marquee gap-12 md:gap-24 px-8">
          {[
            'YEG Home Builders', 'Alberta Safety Council', 'Master Electricians Assn.', 'Edmonton Chamber of Commerce', 'Better Business Bureau',
            'YEG Home Builders', 'Alberta Safety Council', 'Master Electricians Assn.', 'Edmonton Chamber of Commerce', 'Better Business Bureau'
          ].map((name, idx) => (
            <div key={idx} className="flex items-center gap-3 group cursor-default">
              <ShieldCheck className="w-5 h-5 text-slate-300 group-hover:text-blue-500 transition-colors" />
              <div className="text-lg md:text-xl font-black text-slate-300 tracking-tighter uppercase italic group-hover:text-slate-700 transition-colors whitespace-nowrap">
                {name}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="py-24 md:py-36 px-4 md:px-8 bg-slate-50 relative overflow-hidden">
        {/* Ambient background blobs */}
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-blue-100/60 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] bg-indigo-100/40 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="services-header max-w-3xl mb-16 md:mb-20 mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 border border-blue-100 rounded-full text-blue-700 text-[10px] font-black tracking-[0.2em] mb-6 uppercase">
              <Zap className="w-3 h-3" /> Our Services
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 mb-6 tracking-[-0.03em] leading-[1.02] uppercase italic">
              Built for Edmonton.
              <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Built to Last.</span>
            </h2>
            <p className="text-base md:text-lg text-slate-500 font-medium leading-relaxed max-w-xl mx-auto">
              Every job delivered on time, to code, and with the pride of a locally owned team that genuinely cares.
            </p>
          </div>

          <div className="services-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service, idx) => (
              <motion.a
                key={idx}
                href="tel:+17802979252"
                className="service-card group flex flex-col bg-white rounded-[2rem] overflow-hidden border border-slate-100/80 shadow-[0_2px_20px_rgba(0,0,0,0.04)] will-change-transform"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: idx * 0.1 }}
                whileHover={{ y: -8, boxShadow: '0 32px 80px rgba(37,99,235,0.13), 0 8px 24px rgba(0,0,0,0.07)' }}
              >
                {/* ── Image ── */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={service.img}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent" />

                  {/* Tag badge */}
                  <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-800">{service.tag}</span>
                  </div>

                  {/* Price badge */}
                  <div className="absolute top-4 right-4 bg-blue-600 px-4 py-1.5 rounded-full shadow-lg shadow-blue-600/30">
                    <span className="text-white font-black text-xs tracking-tight">{service.price}</span>
                  </div>

                  {/* Icon on image bottom-left */}
                  <div className="absolute bottom-4 left-4 w-11 h-11 rounded-xl bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-md transition-colors duration-300 group-hover:bg-blue-600 [&>svg]:group-hover:text-white [&>svg]:transition-colors [&>svg]:duration-300">
                    {service.icon}
                  </div>
                </div>

                {/* ── Body ── */}
                <div className="flex flex-col flex-1 p-7">
                  <h3 className="text-xl font-black mb-2.5 text-slate-900 uppercase italic tracking-tight leading-tight">
                    {service.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed font-medium mb-5 flex-1">
                    {service.desc}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {service.features.map((feat) => (
                      <span
                        key={feat}
                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-50 border border-slate-100 rounded-full text-[10px] font-bold text-slate-600 uppercase tracking-wide group-hover:border-blue-100 group-hover:bg-blue-50 group-hover:text-blue-700 transition-colors duration-300"
                      >
                        <CheckCircle2 className="w-3 h-3 text-blue-500 shrink-0" />
                        {feat}
                      </span>
                    ))}
                  </div>

                  {/* Call CTA */}
                  <div className="mt-auto pt-5 border-t border-slate-100 group-hover:border-blue-100 transition-colors duration-300">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center transition-colors duration-300 group-hover:bg-blue-600">
                          <Phone className="w-4 h-4 text-blue-600 group-hover:text-white transition-colors duration-300" />
                        </div>
                        <div>
                          <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Call to Book</p>
                          <p className="text-xs font-black text-slate-800 tracking-tight">(780) 297-9252</p>
                        </div>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center transition-all duration-300 group-hover:bg-blue-600">
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-white group-hover:translate-x-0.5 transition-all duration-300" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-20 md:py-32 px-4 md:px-8 bg-white relative overflow-hidden">
        {/* Ambient blobs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50 rounded-full blur-[140px] opacity-70 pointer-events-none -z-0" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-50 rounded-full blur-[120px] opacity-60 pointer-events-none -z-0" />

        <div className="max-w-7xl mx-auto relative z-10">

          {/* ── Section header ── */}
          <motion.div
            className="text-center mb-14 md:mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 border border-blue-100 rounded-full text-blue-700 text-[10px] font-black tracking-[0.2em] mb-6 uppercase">
              <ShieldCheck className="w-3 h-3" /> Local Edmonton Experts
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-[-0.03em] uppercase italic leading-[0.95] mb-6">
              Built on Trust.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Wired for Safety.</span>
            </h2>
            <p className="text-base md:text-lg text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto">
              Edmonton families and businesses trust Haq Electrics because we treat every job like it's in our own home — done right, done safely, done on time.
            </p>
          </motion.div>

          {/* ── Stats bar ── */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-16 md:mb-24"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            {[
              { value: '15+', label: 'Years in Business', icon: <Award className="w-5 h-5" /> },
              { value: '1,200+', label: 'Happy Clients', icon: <Star className="w-5 h-5" /> },
              { value: '4,800+', label: 'Jobs Completed', icon: <Bolt className="w-5 h-5" /> },
              { value: '5.0★', label: 'Google Rating', icon: <TrendingUp className="w-5 h-5" /> },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                className="flex flex-col items-center justify-center gap-2 p-5 md:p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 hover:bg-blue-50/40 transition-all duration-300 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-300 shadow-sm">
                  {stat.icon}
                </div>
                <span className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">{stat.value}</span>
                <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400 text-center">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* ── Two-column body ── */}
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 xl:gap-24 items-center">

            {/* Left — image collage */}
            <motion.div
              className="grid grid-cols-2 gap-3 md:gap-4 order-2 lg:order-1"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Left column — tall image + dark stat card */}
              <div className="flex flex-col gap-3 md:gap-4 pt-8 md:pt-14">
                <div className="rounded-2xl md:rounded-3xl overflow-hidden shadow-xl border-4 border-white aspect-[3/4]">
                  <img
                    src="https://images.unsplash.com/photo-1558402529-d2638a7023e9?q=80&w=2670&auto=format&fit=crop"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    alt="Smart home electrical"
                  />
                </div>
                <div className="bg-slate-900 p-5 md:p-7 rounded-2xl md:rounded-3xl text-center border border-slate-800 shadow-xl">
                  <p className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 mb-1">15+</p>
                  <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400">Years Mastery</p>
                </div>
              </div>

              {/* Right column — stat card + tall image */}
              <div className="flex flex-col gap-3 md:gap-4">
                <div className="bg-blue-600 p-5 md:p-7 rounded-2xl md:rounded-3xl text-center shadow-xl shadow-blue-600/20 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <p className="text-3xl md:text-4xl font-black text-white mb-1 relative z-10">1.2k+</p>
                  <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.25em] text-blue-200 relative z-10">Local Clients</p>
                </div>
                <div className="rounded-2xl md:rounded-3xl overflow-hidden shadow-xl border-4 border-white flex-1 min-h-[200px] md:min-h-[280px]">
                  <img
                    src="https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?q=80&w=2669&auto=format&fit=crop"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    alt="Electric panel installation"
                  />
                </div>
              </div>
            </motion.div>

            {/* Right — text + features + CTA */}
            <motion.div
              className="order-1 lg:order-2 flex flex-col gap-6"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            >
              <p className="text-slate-600 text-base md:text-lg font-medium leading-relaxed">
                Since 2009, Haq Electrics has been the go-to electrical team for Edmonton homeowners and commercial clients. Our master-licensed electricians show up on time, work clean, and leave every site safer than they found it.
              </p>

              {/* Feature rows */}
              <div className="flex flex-col gap-3 md:gap-4">
                {[
                  {
                    title: 'Master-Licensed Team',
                    desc: 'Every technician is Alberta-certified — no shortcuts, no subcontractors, ever.',
                    icon: <Award className="w-5 h-5" />,
                  },
                  {
                    title: 'Upfront, Honest Pricing',
                    desc: 'Detailed quote before we lift a tool. No surprise fees. No inflated invoices.',
                    icon: <CheckCircle2 className="w-5 h-5" />,
                  },
                  {
                    title: '60-Min Emergency Response',
                    desc: 'Power out at midnight? We\'re there. 24/7 dispatch across all of Edmonton.',
                    icon: <Clock className="w-5 h-5" />,
                  },
                ].map((item, idx) => (
                  <motion.div
                    key={item.title}
                    className="flex items-start gap-4 p-5 md:p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 hover:bg-blue-50/30 hover:shadow-[0_12px_32px_rgba(37,99,235,0.07)] transition-all duration-300 group cursor-default"
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 + idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-white border border-slate-200 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 group-hover:shadow-lg group-hover:shadow-blue-500/30 transition-all duration-400">
                      {item.icon}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-base md:text-lg font-black mb-1 uppercase italic text-slate-900 group-hover:text-blue-700 transition-colors">{item.title}</h4>
                      <p className="text-slate-500 font-medium leading-relaxed text-sm">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* CTA row */}
              <motion.div
                className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <a
                  href="tel:+17802979252"
                  className="flex-1 sm:flex-none bg-slate-900 text-white px-8 py-4 md:py-5 rounded-2xl font-black text-sm md:text-base hover:bg-blue-600 transition-all duration-300 shadow-[0_12px_30px_rgba(15,23,42,0.15)] hover:shadow-[0_12px_30px_rgba(37,99,235,0.3)] active:scale-[0.98] flex items-center justify-center gap-3 group"
                >
                  <Phone className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                  Talk to a Professional
                </a>
                <div className="flex items-center justify-center gap-2.5 text-slate-500 text-xs font-bold uppercase tracking-widest bg-slate-50 px-5 py-4 md:py-5 rounded-2xl border border-slate-200">
                  <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                  Alberta Certified
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-20 md:py-32 px-4 md:px-8 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">

          {/* Header */}
          <motion.div
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 border border-blue-100 rounded-full text-blue-700 text-[10px] font-black tracking-[0.2em] mb-5 uppercase">
                <Star className="w-3 h-3 fill-blue-600" /> Proven Excellence
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-[-0.03em] uppercase italic leading-[0.95] text-slate-900">
                What Edmonton<br />
                <span className="text-blue-600">Clients Say.</span>
              </h2>
            </div>
            <a
              href="tel:+17802979252"
              className="self-start md:self-auto flex items-center gap-2.5 bg-blue-600 text-white px-6 py-3.5 rounded-2xl font-black text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 active:scale-[0.98] shrink-0 group"
            >
              <Phone className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              Get a Free Quote
            </a>
          </motion.div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {testimonials.map((t, idx) => (
              <motion.div
                key={idx}
                className="bg-white border border-slate-100 rounded-2xl md:rounded-3xl p-6 md:p-8 flex flex-col shadow-sm hover:shadow-[0_16px_40px_rgba(0,0,0,0.07)] hover:-translate-y-1 transition-all duration-400 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: (idx % 3) * 0.09, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm md:text-base font-semibold text-slate-800 leading-relaxed mb-6 italic flex-1">
                  "{t.quote}"
                </p>
                <div className="pt-5 border-t border-slate-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center font-black text-blue-600 text-sm shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                    {t.name[0]}
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-xs uppercase tracking-wide">{t.name}</h4>
                    <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mt-0.5">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Trust bar */}
          <motion.div
            className="mt-10 md:mt-14 flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-8 text-center"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {[
              { icon: <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />, text: '5.0 Google Rating' },
              { icon: <ShieldCheck className="w-4 h-4 text-blue-600" />, text: 'Licensed & Insured' },
              { icon: <Award className="w-4 h-4 text-blue-600" />, text: '1,200+ Local Reviews' },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
                {item.icon}
                {item.text}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section py-24 md:py-36 px-4 md:px-8 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(37,99,235,0.22),_transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(99,102,241,0.12),_transparent_55%)]" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="cta-line text-5xl sm:text-6xl md:text-7xl lg:text-[8rem] font-black text-white tracking-[-0.04em] uppercase italic leading-[0.88] mb-2">Stop</div>
            <div className="cta-line text-5xl sm:text-6xl md:text-7xl lg:text-[8rem] font-black text-blue-500 tracking-[-0.04em] uppercase italic leading-[0.88] mb-2">Worrying</div>
            <div className="cta-line text-5xl sm:text-6xl md:text-7xl lg:text-[8rem] font-black text-white tracking-[-0.04em] uppercase italic leading-[0.88] mb-10">About It.</div>
          </motion.div>

          <motion.p
            className="cta-sub text-base md:text-xl text-white/50 mb-10 max-w-xl mx-auto font-medium leading-relaxed"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            One call. One team. One standard — the best in Edmonton. Get your free quote in 60 seconds.
          </motion.p>

          <motion.div
            className="cta-btn flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <a
              href="tel:+17802979252"
              className="w-full sm:w-auto bg-blue-600 text-white px-10 md:px-14 py-5 md:py-6 rounded-2xl font-black text-lg md:text-xl hover:bg-blue-500 transition-all flex items-center justify-center gap-3 shadow-[0_20px_50px_rgba(37,99,235,0.45)] hover:shadow-[0_24px_60px_rgba(37,99,235,0.55)] active:scale-[0.98] group"
            >
              <Phone className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              Call (780) 297-9252
            </a>
            <div className="flex items-center gap-2 text-white/40 text-xs font-bold uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4 text-blue-500" />
              Free Quote · No Obligation
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer id="footer" className="bg-[#0a0f1e] pt-20 md:pt-28 pb-10 px-4 md:px-8">
        <div className="max-w-7xl mx-auto footer-content">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 md:gap-16 mb-16">
            <div className="sm:col-span-2 flex flex-col items-start">
              <a href="#home" className="inline-block mb-5">
                <div className="text-2xl font-black tracking-tighter italic text-white">HAQ<span className="text-blue-500">.</span></div>
              </a>
              <p className="text-slate-500 max-w-xs mb-8 leading-relaxed font-medium text-sm">
                Edmonton's trusted master electricians since 2009. Licensed, insured, and locally proud.
              </p>
              <a href="tel:+17802979252" className="flex items-center gap-3 text-white font-black text-xl italic hover:text-blue-400 transition-colors">
                <Phone className="w-5 h-5 text-blue-500 shrink-0" />
                1-780-297-9252
              </a>
            </div>
            <div className="flex flex-col items-start">
              <h4 className="font-black mb-5 text-blue-500 uppercase tracking-widest text-[10px]">Navigation</h4>
              <ul className="space-y-3">
                {[{name:'Home',href:'#home'},{name:'Services',href:'#services'},{name:'About',href:'#about'},{name:'Admin',href:'/admin'}].map(l => (
                  <li key={l.name}><a href={l.href} className="text-slate-400 hover:text-white transition-colors font-medium text-sm">{l.name}</a></li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col items-start">
              <h4 className="font-black mb-5 text-blue-500 uppercase tracking-widest text-[10px]">Services</h4>
              <ul className="space-y-3">
                {['Residential Wiring','Commercial Fit-outs','24/7 Emergency','Panel Upgrades','EV Charger Install','Safety Inspections'].map(s => (
                  <li key={s} className="text-slate-400 text-sm font-medium hover:text-white transition-colors cursor-default">{s}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/[0.06] flex flex-col md:flex-row justify-between items-center gap-4 text-slate-600 text-[10px] font-bold uppercase tracking-[0.2em] text-center">
            <p>© 2025 Haq Electrics Ltd. · Edmonton, Alberta</p>
            <p>Master Electricians · Licensed · Insured · Alberta Safety Codes</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
