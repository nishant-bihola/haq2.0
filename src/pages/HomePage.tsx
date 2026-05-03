import { useRef } from 'react';
import { motion } from 'motion/react';
import {
  Zap, ShieldCheck, Clock, Phone, ArrowRight, CheckCircle2,
  Building2, Home, Star, Award, TrendingUp, Bolt, MapPin,
} from 'lucide-react';
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap';
import Logo from '../components/Logo';

// Shared easing for all Framer animations
const EASE = [0.22, 1, 0.36, 1] as const;
// Fast duration for scroll-triggered reveals
const DUR = 0.38;

export default function HomePage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // ── Hero reveal — snappy, sequential ──
    gsap.from('.hero-badge',       { opacity: 0, y: 12, duration: 0.36, ease: 'power3.out', delay: 0.05 });
    gsap.from('.hero-title',       { opacity: 0, y: 32, duration: 0.48, ease: 'power3.out', delay: 0.15 });
    gsap.from('.hero-subtitle',    { opacity: 0, y: 16, duration: 0.36, ease: 'power3.out', delay: 0.26 });
    gsap.from('.hero-ctas',        { opacity: 0, y: 14, duration: 0.34, ease: 'power3.out', delay: 0.34 });
    gsap.from('.hero-trust',       { opacity: 0, y: 10, duration: 0.3,  ease: 'power3.out', delay: 0.42 });
    gsap.from('.hero-img',         { opacity: 0, scale: 1.03, duration: 0.55, ease: 'power3.out', delay: 0.16 });
    gsap.from('.hero-badge-float', { opacity: 0, x: -18, duration: 0.4, ease: 'back.out(1.5)', delay: 0.44 });

    // Subtle parallax on the hero photo
    gsap.to('.hero-img', {
      yPercent: -10, ease: 'none',
      scrollTrigger: { trigger: '#home', start: 'top top', end: 'bottom top', scrub: 1.5 },
    });

    // ── Services header (plain div, safe for GSAP; cards use Framer whileInView) ──
    gsap.from('.services-header', {
      scrollTrigger: { trigger: '#services', start: 'top 88%', once: true },
      opacity: 0, y: 16, duration: DUR, ease: 'power3.out',
    });

    // ── Stats counters ──
    const statsTargets = [
      { el: '#stat-years',    end: 15,   suffix: '+' },
      { el: '#stat-clients',  end: 1200, suffix: '+' },
      { el: '#stat-projects', end: 4800, suffix: '+' },
      { el: '#stat-rating',   end: 5.0,  suffix: '★', decimals: 1 },
    ];
    statsTargets.forEach(({ el, end, suffix, decimals = 0 }) => {
      const element = document.querySelector(el);
      if (!element) return;
      const obj = { val: 0 };
      gsap.to(obj, {
        val: end, duration: 1.2, ease: 'power2.out',
        onUpdate() {
          element.textContent = decimals
            ? obj.val.toFixed(decimals) + suffix
            : Math.round(obj.val) + suffix;
        },
        scrollTrigger: { trigger: '.stats-grid', start: 'top 88%', once: true },
      });
    });

    // ── Footer ──
    gsap.from('.footer-content', {
      scrollTrigger: { trigger: '#footer', start: 'top 98%', once: true },
      opacity: 0, y: 16, duration: DUR, ease: 'power3.out',
    });

    // Scroll indicator bounce
    gsap.to('.scroll-arrow', { y: 6, repeat: -1, yoyo: true, duration: 0.6, ease: 'power1.inOut' });

    return () => { ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, { scope: pageRef });

  // ── Data ──
  const services = [
    {
      icon: <Home className="w-5 h-5" />,
      title: 'Residential Electrical',
      desc: 'Expert home wiring, smart lighting, panel upgrades, and safety inspections for Edmonton homes.',
      price: 'From $149',
      img: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800&auto=format&fit=crop',
      tag: 'Residential',
      features: ['Wiring & Outlets', 'Panel Upgrades', 'Smart Lighting', 'Safety Inspection'],
    },
    {
      icon: <Building2 className="w-5 h-5" />,
      title: 'Commercial Projects',
      desc: 'Full-scale electrical solutions for offices, retail spaces, and industrial facilities in Edmonton.',
      price: 'From $299',
      img: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=800&auto=format&fit=crop',
      tag: 'Commercial',
      features: ['Office Fit-outs', 'Industrial Wiring', 'Code Compliance', 'Load Analysis'],
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: 'Emergency Repairs',
      desc: '24/7 fast-response electrical troubleshooting. We arrive within 60 minutes anywhere in Edmonton.',
      price: 'From $199',
      img: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?q=80&w=800&auto=format&fit=crop',
      tag: '24/7',
      features: ['60-Min Response', 'Power Outages', 'Hazard Repairs', 'Storm Damage'],
    },
  ];

  const testimonials = [
    { name: 'Sarah Jenkins', role: 'Edmonton Homeowner', quote: 'The best electricians in Edmonton! Fast, clean, and very professional with our panel upgrade. I finally feel safe in my older bungalow.', rating: 5 },
    { name: 'Michael Ross', role: 'Local Business Owner', quote: 'Highly recommended for commercial work. Haq Electrics handled our office fit-out perfectly. Their attention to local code was impressive.', rating: 5 },
    { name: 'David Lawson', role: 'Residential Client', quote: '24/7 service actually means 24/7. They came out at 2 AM for an emergency repair after a storm knocked our power out. Absolute lifesavers!', rating: 5 },
    { name: 'Priya Sharma', role: 'Condo Owner, Glenora', quote: 'Had my EV charger installed last week. The team was on time, explained everything clearly, and the work was spotless. Highly recommend!', rating: 5 },
    { name: 'Tom & Linda Barrett', role: 'New Home Buyers', quote: 'Haq Electrics did our full pre-purchase electrical inspection. Found issues the home inspector missed! Saved us thousands.', rating: 5 },
    { name: 'Raj Patel', role: 'Restaurant Owner', quote: 'Trusted them with our commercial kitchen electrical upgrade. Minimal downtime, code-compliant, and the price was exactly as quoted. Five stars.', rating: 5 },
  ];

  return (
    <div ref={pageRef} className="min-h-screen bg-[#FDFDFF] font-sans text-slate-900 overflow-x-hidden">

      {/* ──────────────────────── HERO ──────────────────────── */}
      <section id="home" className="relative min-h-screen pt-28 pb-16 md:pt-36 md:pb-24 px-4 md:px-8 flex items-center justify-center overflow-hidden bg-[#06101c]">

        {/* Background video + overlays */}
        <div className="absolute inset-0 z-0">
          <video
            className="w-full h-full object-cover object-center opacity-90 scale-105"
            src="/hero.mp4"
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#06101c]/70 via-[#06101c]/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#06101c]/40 via-transparent to-[#06101c]/20" />
        </div>

        {/* Glow blobs */}
        <div className="absolute top-0 right-0 w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] bg-blue-600/18 rounded-full blur-[150px] z-0 translate-x-1/3 -translate-y-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[45vw] h-[45vw] max-w-[450px] max-h-[450px] bg-blue-800/12 rounded-full blur-[120px] z-0 -translate-x-1/4 translate-y-1/4 pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">

            {/* Copy */}
            <div className="lg:col-span-7 text-center lg:text-left flex flex-col items-center lg:items-start">
              <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] backdrop-blur-sm text-blue-300 text-[10px] md:text-xs font-black uppercase tracking-[0.22em] mb-6 border border-white/10">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inset-0 rounded-full bg-blue-400 opacity-75" />
                  <span className="relative rounded-full h-1.5 w-1.5 bg-blue-500" />
                </span>
                Edmonton's Premier Electricians
              </div>

              <h1 className="hero-title text-[3rem] sm:text-[4.5rem] lg:text-[6rem] xl:text-[7rem] font-black text-white mb-6 leading-[0.88] tracking-[-0.04em] uppercase">
                <span className="block italic text-white/90">Master</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-300">Electrical</span>
                <span className="block italic text-white/90">Solutions.</span>
              </h1>

              <p className="hero-subtitle text-sm sm:text-base lg:text-lg text-white/50 mb-8 max-w-lg leading-relaxed font-medium">
                Edmonton's most trusted electrical team — smart home wiring to full commercial builds. Done right, done safely, done on time.
              </p>

              <div className="hero-ctas flex flex-col sm:flex-row gap-3 w-full sm:w-auto justify-center lg:justify-start">
                <a
                  href="tel:+17802979252"
                  className="bg-blue-600 text-white px-7 py-4 rounded-xl font-black text-sm sm:text-base hover:bg-blue-500 transition-colors shadow-[0_12px_32px_rgba(79,99,210,0.5)] text-center flex items-center justify-center gap-2.5 group active:scale-[0.98] w-full sm:w-auto"
                >
                  <Phone className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                  Call Now — Free Quote
                </a>
                <a
                  href="#services"
                  className="border border-white/15 text-white/70 px-7 py-4 rounded-xl font-semibold text-sm sm:text-base hover:bg-white/[0.06] hover:text-white transition-all text-center flex items-center justify-center gap-2.5 group active:scale-[0.98] w-full sm:w-auto"
                >
                  View Services
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              <div className="hero-trust flex flex-wrap gap-5 sm:gap-6 items-center justify-center lg:justify-start pt-7 mt-1 border-t border-white/[0.07]">
                {[
                  { icon: <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />, label: '5.0 · Top Rated YEG' },
                  { icon: <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />, label: 'Licensed & Insured' },
                  { icon: <Award className="w-3.5 h-3.5 text-blue-400" />, label: '15+ Years' },
                ].map(({ icon, label }) => (
                  <div key={label} className="flex items-center gap-1.5">
                    {icon}
                    <span className="text-[10px] font-bold text-white/35 uppercase tracking-widest">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Photo */}
            <div className="lg:col-span-5 relative hero-img hidden sm:block">
              <div className="relative z-10 w-full max-w-[460px] mx-auto lg:mx-0">
                <div className="rounded-3xl overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.55)] aspect-[4/5] border border-white/8">
                  <img
                    src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2669&auto=format&fit=crop"
                    className="w-full h-full object-cover scale-105"
                    alt="Professional Electrician in Edmonton"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                </div>

                {/* Response time badge */}
                <div className="hero-badge-float absolute -bottom-5 -left-5 md:-left-8 bg-white/[0.07] backdrop-blur-xl p-4 rounded-2xl border border-white/10 flex items-center gap-3 z-20">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/40 shrink-0">
                    <ShieldCheck className="text-white w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-white/40 text-[8px] font-bold uppercase tracking-[0.2em]">Response Time</p>
                    <p className="text-white font-black text-lg leading-none italic">&lt; 60 Min</p>
                  </div>
                </div>

                {/* Reviews badge */}
                <div className="absolute top-8 -right-4 md:-right-6 bg-white/[0.07] backdrop-blur-xl px-3.5 py-2.5 rounded-xl border border-white/10 flex items-center gap-2.5 z-20">
                  <div className="flex -space-x-1.5">
                    {['S','M','R'].map((initial, i) => (
                      <div key={i} className="w-6 h-6 rounded-full border border-white/20 bg-blue-700 flex items-center justify-center text-white font-black text-[8px]">
                        {initial}
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="flex gap-0.5">
                      {[1,2,3,4,5].map(i => <Star key={i} className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" />)}
                    </div>
                    <span className="text-[8px] font-bold text-white/40 uppercase">1.2k+ Reviews</span>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-blue-600/10 rounded-full blur-[100px] -z-10 scale-125 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hidden lg:flex flex-col items-center gap-1.5 absolute bottom-7 left-1/2 -translate-x-1/2 z-10">
          <span className="text-[9px] font-bold text-white/20 uppercase tracking-[0.35em]">Scroll</span>
          <div className="scroll-arrow text-white/20">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
          </div>
        </div>
      </section>

      {/* ──────────────────────── STATS ──────────────────────── */}
      <section className="py-16 md:py-20 bg-slate-900 relative overflow-hidden stats-grid">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(79,99,210,0.16),_transparent_65%)]" />
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
            {[
              { id: 'stat-years',    label: 'Years in Edmonton', icon: <Award className="w-4 h-4" /> },
              { id: 'stat-clients',  label: 'Happy Clients',     icon: <Star className="w-4 h-4" /> },
              { id: 'stat-projects', label: 'Projects Complete', icon: <Bolt className="w-4 h-4" /> },
              { id: 'stat-rating',   label: 'Google Rating',     icon: <TrendingUp className="w-4 h-4" /> },
            ].map(stat => (
              <div key={stat.id} className="text-center p-5 md:p-7 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] transition-colors">
                <div className="w-9 h-9 bg-blue-500/10 text-blue-400 rounded-xl flex items-center justify-center mx-auto mb-4 border border-blue-500/15">
                  {stat.icon}
                </div>
                <div id={stat.id} className="text-3xl md:text-4xl font-black text-white tracking-tight mb-1">0</div>
                <p className="text-blue-200/50 text-[9px] font-bold uppercase tracking-[0.18em]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────── LOGO CLOUD ──────────────────────── */}
      <section className="py-14 bg-white border-y border-slate-100 overflow-hidden relative">
        <div className="absolute left-0 inset-y-0 w-20 md:w-36 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 inset-y-0 w-20 md:w-36 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 md:px-8 mb-8 text-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">Certified Excellence & Trusted Partners</p>
        </div>
        <div className="animate-marquee gap-10 md:gap-20 px-8">
          {[
            'YEG Home Builders', 'Alberta Safety Council', 'Master Electricians Assn.', 'Edmonton Chamber of Commerce', 'Better Business Bureau',
            'YEG Home Builders', 'Alberta Safety Council', 'Master Electricians Assn.', 'Edmonton Chamber of Commerce', 'Better Business Bureau',
          ].map((name, i) => (
            <div key={i} className="flex items-center gap-2.5 group cursor-default shrink-0">
              <ShieldCheck className="w-4 h-4 text-slate-300 group-hover:text-blue-500 transition-colors" />
              <span className="text-base md:text-lg font-black text-slate-300 tracking-tight uppercase italic group-hover:text-slate-700 transition-colors whitespace-nowrap">
                {name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ──────────────────────── SERVICES ──────────────────────── */}
      <section id="services" className="py-20 md:py-32 px-4 md:px-8 bg-slate-50 relative overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[480px] h-[480px] bg-blue-100/50 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-[380px] h-[380px] bg-blue-50/60 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className="services-header max-w-2xl mb-12 md:mb-16 mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 border border-blue-100 rounded-full text-blue-700 text-[10px] font-black tracking-[0.2em] mb-5 uppercase">
              <Zap className="w-3 h-3" /> Our Services
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 mb-4 tracking-[-0.03em] leading-[1] uppercase italic">
              Built for Edmonton.<br />
              <span className="text-blue-600">Built to Last.</span>
            </h2>
            <p className="text-sm md:text-base text-slate-500 font-medium leading-relaxed max-w-lg mx-auto">
              Every job delivered on time, to code, with the pride of a locally owned team.
            </p>
          </div>

          {/* Cards — Framer Motion only, no GSAP conflict */}
          <div className="services-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {services.map((service, idx) => (
              <motion.a
                key={idx}
                href="tel:+17802979252"
                className="service-card group flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: DUR, ease: EASE, delay: idx * 0.08 }}
                whileHover={{ y: -6, boxShadow: '0 24px 60px rgba(61,80,191,0.14), 0 4px 16px rgba(0,0,0,0.06)' }}
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={service.img}
                    alt={service.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/65 via-slate-900/15 to-transparent" />

                  {/* Tag */}
                  <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                    <span className="text-[9px] font-black uppercase tracking-[0.18em] text-slate-800">{service.tag}</span>
                  </div>

                  {/* Price */}
                  <div className="absolute top-3.5 right-3.5 bg-blue-600 px-3.5 py-1 rounded-full shadow-lg shadow-blue-600/25">
                    <span className="text-white font-black text-[11px] tracking-tight">{service.price}</span>
                  </div>

                  {/* Icon */}
                  <div className="absolute bottom-3.5 left-3.5 w-10 h-10 rounded-xl bg-white flex items-center justify-center text-blue-600 shadow-md transition-colors duration-200 group-hover:bg-blue-600 group-hover:text-white">
                    {service.icon}
                  </div>
                </div>

                {/* Body */}
                <div className="flex flex-col flex-1 p-5 md:p-6">
                  <h3 className="text-lg font-black mb-2 text-slate-900 uppercase italic tracking-tight leading-tight">
                    {service.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed font-medium mb-4 flex-1">
                    {service.desc}
                  </p>

                  {/* Feature chips */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {service.features.map(feat => (
                      <span
                        key={feat}
                        className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-slate-50 border border-slate-100 rounded-full text-[9px] font-bold text-slate-600 uppercase tracking-wide group-hover:bg-blue-50 group-hover:border-blue-100 group-hover:text-blue-700 transition-colors duration-200"
                      >
                        <CheckCircle2 className="w-2.5 h-2.5 text-blue-500 shrink-0" />
                        {feat}
                      </span>
                    ))}
                  </div>

                  {/* Call CTA */}
                  <div className="pt-4 border-t border-slate-100 group-hover:border-blue-100 transition-colors duration-200 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center transition-colors duration-200 group-hover:bg-blue-600">
                        <Phone className="w-3.5 h-3.5 text-blue-600 group-hover:text-white transition-colors duration-200" />
                      </div>
                      <div>
                        <p className="text-[8px] font-black uppercase tracking-[0.18em] text-slate-400">Call to Book</p>
                        <p className="text-[11px] font-black text-slate-800">(780) 297-9252</p>
                      </div>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-slate-50 flex items-center justify-center transition-colors duration-200 group-hover:bg-blue-600">
                      <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-white transition-colors duration-200" />
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────── ABOUT ──────────────────────── */}
      <section id="about" className="py-20 md:py-32 px-4 md:px-8 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50/70 rounded-full blur-[130px] pointer-events-none -z-0" />

        <div className="max-w-7xl mx-auto relative z-10">

          {/* Header */}
          <motion.div
            className="text-center mb-12 md:mb-18"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: DUR, ease: EASE }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 border border-blue-100 rounded-full text-blue-700 text-[10px] font-black tracking-[0.2em] mb-5 uppercase">
              <ShieldCheck className="w-3 h-3" /> Local Edmonton Experts
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-[-0.03em] uppercase italic leading-[0.93] mb-4">
              Built on Trust.<br />
              <span className="text-blue-600">Wired for Safety.</span>
            </h2>
            <p className="text-sm md:text-base text-slate-500 font-medium leading-relaxed max-w-xl mx-auto">
              Edmonton families and businesses trust Haq Electrics because we treat every job like it's in our own home.
            </p>
          </motion.div>

          {/* Stats bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-14 md:mb-20">
            {[
              { value: '15+', label: 'Years in Business', icon: <Award className="w-4 h-4" /> },
              { value: '1,200+', label: 'Happy Clients', icon: <Star className="w-4 h-4" /> },
              { value: '4,800+', label: 'Jobs Completed', icon: <Bolt className="w-4 h-4" /> },
              { value: '5.0★', label: 'Google Rating', icon: <TrendingUp className="w-4 h-4" /> },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                className="flex flex-col items-center gap-2 p-4 md:p-5 rounded-xl bg-slate-50 border border-slate-100 hover:border-blue-200 hover:bg-blue-50/30 transition-colors group"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: DUR, delay: i * 0.06, ease: EASE }}
              >
                <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-colors shadow-sm">
                  {stat.icon}
                </div>
                <span className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">{stat.value}</span>
                <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400 text-center">{stat.label}</span>
              </motion.div>
            ))}
          </div>

          {/* Two-column */}
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Image collage */}
            <motion.div
              className="grid grid-cols-2 gap-3 order-2 lg:order-1"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <div className="flex flex-col gap-3 pt-8 md:pt-12">
                <div className="rounded-2xl overflow-hidden shadow-lg border-4 border-white aspect-[3/4]">
                  <img src="https://images.unsplash.com/photo-1558402529-d2638a7023e9?q=80&w=600&auto=format&fit=crop" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" alt="Smart home electrical" loading="lazy" />
                </div>
                <div className="bg-slate-900 p-4 md:p-6 rounded-2xl text-center border border-slate-800">
                  <p className="text-2xl md:text-3xl font-black text-blue-400 mb-0.5">15+</p>
                  <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-slate-400">Years Mastery</p>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="bg-blue-600 p-4 md:p-6 rounded-2xl text-center shadow-lg shadow-blue-600/20">
                  <p className="text-2xl md:text-3xl font-black text-white mb-0.5">1.2k+</p>
                  <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-blue-200">Local Clients</p>
                </div>
                <div className="rounded-2xl overflow-hidden shadow-lg border-4 border-white flex-1 min-h-[180px]">
                  <img src="https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?q=80&w=600&auto=format&fit=crop" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" alt="Electric panel" loading="lazy" />
                </div>
              </div>
            </motion.div>

            {/* Text */}
            <motion.div
              className="order-1 lg:order-2 flex flex-col gap-5"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.08 }}
            >
              <p className="text-slate-600 text-sm md:text-base font-medium leading-relaxed">
                Since 2009, Haq Electrics has been the go-to electrical team for Edmonton homeowners and commercial clients. Our master-licensed electricians show up on time, work clean, and leave every site safer than they found it.
              </p>

              <div className="flex flex-col gap-3">
                {[
                  { title: 'Master-Licensed Team', desc: 'Every technician is Alberta-certified — no shortcuts, no subcontractors, ever.', icon: <Award className="w-4 h-4" /> },
                  { title: 'Upfront, Honest Pricing', desc: 'Detailed quote before we lift a tool. No surprise fees. No inflated invoices.', icon: <CheckCircle2 className="w-4 h-4" /> },
                  { title: '60-Min Emergency Response', desc: "Power out at midnight? We're there. 24/7 dispatch across all of Edmonton.", icon: <Clock className="w-4 h-4" /> },
                ].map((item, i) => (
                  <motion.div
                    key={item.title}
                    className="flex items-start gap-3 p-4 md:p-5 rounded-xl bg-slate-50 border border-slate-100 hover:border-blue-200 hover:bg-blue-50/20 transition-colors group cursor-default"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: DUR, delay: 0.12 + i * 0.08, ease: EASE }}
                  >
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-colors">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-sm md:text-base font-black mb-0.5 uppercase italic text-slate-900 group-hover:text-blue-700 transition-colors">{item.title}</h4>
                      <p className="text-slate-500 font-medium text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: DUR, delay: 0.38, ease: EASE }}
              >
                <a
                  href="tel:+17802979252"
                  className="flex-1 sm:flex-none bg-slate-900 text-white px-7 py-4 rounded-xl font-black text-sm hover:bg-blue-600 transition-colors shadow-[0_10px_24px_rgba(15,23,42,0.15)] active:scale-[0.98] flex items-center justify-center gap-2.5 group"
                >
                  <Phone className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                  Talk to a Professional
                </a>
                <div className="flex items-center justify-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-widest bg-slate-50 px-5 py-4 rounded-xl border border-slate-200">
                  <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                  Alberta Certified
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ──────────────────────── TESTIMONIALS ──────────────────────── */}
      <section className="py-20 md:py-32 px-4 md:px-8 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-100/40 rounded-full blur-[110px] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">

          <motion.div
            className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-10 md:mb-14"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: DUR, ease: EASE }}
          >
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 border border-blue-100 rounded-full text-blue-700 text-[10px] font-black tracking-[0.2em] mb-4 uppercase">
                <Star className="w-3 h-3 fill-blue-600" /> Proven Excellence
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-[-0.03em] uppercase italic leading-[0.93] text-slate-900">
                What Edmonton<br />
                <span className="text-blue-600">Clients Say.</span>
              </h2>
            </div>
            <a
              href="tel:+17802979252"
              className="self-start md:self-auto flex items-center gap-2 bg-blue-600 text-white px-5 py-3.5 rounded-xl font-black text-sm hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20 active:scale-[0.98] shrink-0 group"
            >
              <Phone className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
              Get a Free Quote
            </a>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {testimonials.map((t, idx) => (
              <motion.div
                key={idx}
                className="bg-white border border-slate-100 rounded-2xl p-5 md:p-6 flex flex-col shadow-sm hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-200 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: DUR, delay: (idx % 3) * 0.07, ease: EASE }}
              >
                <div className="flex gap-0.5 mb-3">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm font-medium text-slate-700 leading-relaxed mb-5 italic flex-1">"{t.quote}"</p>
                <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center font-black text-blue-600 text-sm shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200">
                    {t.name[0]}
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-[11px] uppercase tracking-wide">{t.name}</h4>
                    <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest mt-0.5">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-8"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: DUR, delay: 0.2, ease: EASE }}
          >
            {[
              { icon: <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />, text: '5.0 Google Rating' },
              { icon: <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />, text: 'Licensed & Insured' },
              { icon: <Award className="w-3.5 h-3.5 text-blue-600" />, text: '1,200+ Local Reviews' },
            ].map(item => (
              <div key={item.text} className="flex items-center gap-2 text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                {item.icon}{item.text}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ──────────────────────── CTA / CONTACT ──────────────────────── */}
      <section id="contact" className="cta-section py-24 md:py-36 px-4 md:px-8 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(61,80,191,0.25),_transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(61,80,191,0.12),_transparent_55%)]" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <p className="text-5xl sm:text-6xl md:text-7xl lg:text-[7.5rem] font-black text-white tracking-[-0.04em] uppercase italic leading-[0.88]">Stop</p>
            <p className="text-5xl sm:text-6xl md:text-7xl lg:text-[7.5rem] font-black text-blue-500 tracking-[-0.04em] uppercase italic leading-[0.88]">Worrying</p>
            <p className="text-5xl sm:text-6xl md:text-7xl lg:text-[7.5rem] font-black text-white tracking-[-0.04em] uppercase italic leading-[0.88] mb-8">About It.</p>
          </motion.div>
          <motion.p
            className="text-sm md:text-lg text-white/45 mb-8 max-w-lg mx-auto font-medium leading-relaxed"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: DUR, delay: 0.14, ease: EASE }}
          >
            One call. One team. One standard — the best in Edmonton. Get your free quote in 60 seconds.
          </motion.p>
          {/* Contact quick-links */}
          <motion.div
            className="flex flex-col sm:flex-row gap-5 justify-center mb-10"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: DUR, delay: 0.18, ease: EASE }}
          >
            {[
              { icon: <Phone className="w-4 h-4 text-blue-400" />, text: '1-780-297-9252', href: 'tel:+17802979252' },
              { icon: <MapPin className="w-4 h-4 text-blue-400" />, text: 'Edmonton, AB — All Areas', href: '#home' },
              { icon: <Clock className="w-4 h-4 text-blue-400" />, text: '24/7 Emergency Response', href: 'tel:+17802979252' },
            ].map(item => (
              <a key={item.text} href={item.href} className="flex items-center gap-2 text-white/50 text-sm font-medium hover:text-white/80 transition-colors justify-center">
                {item.icon}
                <span>{item.text}</span>
              </a>
            ))}
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-3 justify-center items-center"
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: DUR, delay: 0.28, ease: EASE }}
          >
            <a
              href="tel:+17802979252"
              className="w-full sm:w-auto bg-blue-600 text-white px-10 py-5 rounded-xl font-black text-lg hover:bg-blue-500 transition-colors flex items-center justify-center gap-3 shadow-[0_16px_40px_rgba(61,80,191,0.45)] active:scale-[0.98] group"
            >
              <Phone className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              Call (780) 297-9252
            </a>
            <div className="flex items-center gap-2 text-white/35 text-xs font-bold uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4 text-blue-500" />
              Free Quote · No Obligation
            </div>
          </motion.div>
        </div>
      </section>

      {/* ──────────────────────── FOOTER ──────────────────────── */}
      <footer id="footer" className="bg-[#060d1a] pt-16 md:pt-24 pb-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto footer-content">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-14 mb-12">
            <div className="sm:col-span-2 flex flex-col items-start">
              <a href="#home" aria-label="HAQ Electric — back to top" className="mb-5">
                <Logo textClassName="text-white" showLines={false} className="scale-90 origin-left" />
              </a>
              <p className="text-slate-500 max-w-xs mb-6 leading-relaxed font-medium text-sm">
                Edmonton's trusted master electricians since 2009. Licensed, insured, and locally proud.
              </p>
              <a href="tel:+17802979252" className="flex items-center gap-2.5 text-white font-black text-lg hover:text-blue-400 transition-colors">
                <Phone className="w-4 h-4 text-blue-500 shrink-0" />
                1-780-297-9252
              </a>
            </div>
            <div>
              <h4 className="font-black mb-4 text-blue-500 uppercase tracking-widest text-[9px]">Navigation</h4>
              <ul className="space-y-2.5">
                {[
                  {name:'Home',href:'#home'},
                  {name:'Services',href:'#services'},
                  {name:'About Us',href:'#about'},
                  {name:'Contact',href:'#contact'},
                ].map(l => (
                  <li key={l.name}><a href={l.href} className="text-slate-400 hover:text-white transition-colors font-medium text-sm">{l.name}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-black mb-4 text-blue-500 uppercase tracking-widest text-[9px]">Services</h4>
              <ul className="space-y-2.5">
                {[
                  { name: 'Residential Wiring', href: '#services' },
                  { name: 'Commercial Fit-outs', href: '#services' },
                  { name: '24/7 Emergency', href: 'tel:+17802979252' },
                  { name: 'Panel Upgrades', href: '#services' },
                  { name: 'EV Charger Install', href: '#services' },
                  { name: 'Safety Inspections', href: '#contact' },
                ].map(s => (
                  <li key={s.name}>
                    <a href={s.href} className="text-slate-400 text-sm font-medium hover:text-white transition-colors">
                      {s.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="pt-7 border-t border-white/[0.05] flex flex-col md:flex-row justify-between items-center gap-3 text-slate-600 text-[10px] font-bold uppercase tracking-[0.18em] text-center">
            <p>&copy; 2026 Haq Electrics Ltd. &middot; Edmonton, Alberta</p>
            <p>Master Electricians &middot; Licensed &middot; Insured &middot; Alberta Safety Codes</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
