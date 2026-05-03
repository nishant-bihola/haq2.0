import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Zap, ShieldCheck, Clock, Phone, ArrowRight, CheckCircle2,
  Building2, Home, Star,
  Bolt, MapPin, Award, TrendingUp,
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

    // ── About section ──
    gsap.from('.about-img-1', {
      scrollTrigger: { trigger: '#about', start: 'top 95%', once: true },
      opacity: 0, x: -40, duration: 0.9, ease: 'power3.out',
    });
    gsap.from('.about-img-2', {
      scrollTrigger: { trigger: '#about', start: 'top 95%', once: true },
      opacity: 0, x: -40, duration: 0.9, ease: 'power3.out', delay: 0.12,
    });
    gsap.from('.about-text', {
      scrollTrigger: { trigger: '#about', start: 'top 95%', once: true },
      opacity: 0, x: 40, duration: 0.9, ease: 'power3.out',
    });
    gsap.from('.about-feature', {
      scrollTrigger: { trigger: '.about-features', start: 'top 95%', once: true },
      opacity: 0, y: 30, stagger: 0.12, duration: 0.7, ease: 'power3.out',
    });

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

    // ── Horizontal testimonial scroll ──
    const track = document.querySelector('.testimonials-track') as HTMLElement;
    const viewport = document.querySelector('.testimonials-viewport') as HTMLElement;
    if (track && viewport) {
      const getTravel = () => track.scrollWidth - viewport.clientWidth;
      gsap.to(track, {
        x: () => -getTravel(),
        ease: 'none',
        scrollTrigger: {
          trigger: '.testimonials-pin',
          pin: true,
          scrub: 1.2,
          invalidateOnRefresh: true,
          end: () => `+=${getTravel()}`,
        },
      });
    }

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
      <section id="home" className="relative min-h-[95vh] pt-32 pb-20 md:pt-40 md:pb-32 px-4 md:px-8 flex items-center justify-center overflow-hidden">
        {/* Background ambient gradients */}
        <div className="absolute top-0 right-0 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-blue-500/10 rounded-full blur-[140px] -z-10 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] bg-indigo-500/10 rounded-full blur-[120px] -z-10 -translate-x-1/4 translate-y-1/4 pointer-events-none" />
        
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] -z-10 mix-blend-overlay" />

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            <div className="lg:col-span-7 text-center lg:text-left flex flex-col items-center lg:items-start">
              <div className="hero-badge inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/60 backdrop-blur-md text-blue-700 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] mb-8 border border-white/40 shadow-[0_8px_30px_rgba(37,99,235,0.08)]">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-600"></span>
                </span>
                Edmonton's Premier Electricians
              </div>
              <h1 className="hero-title text-[3rem] sm:text-6xl lg:text-[6.5rem] font-black text-slate-900 mb-8 leading-[0.95] tracking-[-0.04em] uppercase">
                <span className="block italic text-transparent bg-clip-text bg-gradient-to-br from-slate-900 to-slate-600">Master</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Electrical</span>
                <span className="block italic text-transparent bg-clip-text bg-gradient-to-br from-slate-900 to-slate-600">Solutions.</span>
              </h1>
              <p className="hero-subtitle text-base sm:text-lg lg:text-xl text-slate-500 mb-12 max-w-xl leading-[1.8] font-medium">
                Premium residential and commercial electrical services. From modern lighting design to 24/7 emergency troubleshooting — precision and safety guaranteed.
              </p>
              <div className="hero-ctas flex flex-col sm:flex-row gap-5 w-full sm:w-auto justify-center lg:justify-start">
                <a
                  href="tel:+17802979252"
                  className="bg-slate-900 text-white px-8 py-5 sm:py-6 rounded-[2rem] font-bold text-base sm:text-lg hover:bg-slate-800 transition-all shadow-[0_20px_40px_rgba(15,23,42,0.15)] text-center flex items-center justify-center gap-3 group active:scale-95 w-full sm:w-auto"
                >
                  <Phone className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  Call Now — Free Quote
                </a>
              </div>
              <div className="hero-trust flex flex-wrap gap-6 sm:gap-8 items-center justify-center lg:justify-start pt-8 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="text-yellow-400 flex gap-0.5">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                  <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">5.0 · Top Rated YEG</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-blue-600" />
                  <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">Licensed & Insured</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-blue-600" />
                  <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">15+ Years Experience</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative hero-img hidden sm:block">
              <div className="relative z-10 w-full max-w-[500px] mx-auto lg:mx-0">
                <div className="rounded-[3rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.12)] aspect-[4/5] border-8 border-white">
                  <img
                    src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2669&auto=format&fit=crop"
                    className="w-full h-full object-cover scale-105"
                    alt="Professional Electrician in Edmonton"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                </div>
                
                {/* Floating UI Elements */}
                <div className="hero-badge-float absolute -bottom-8 -left-8 md:-left-12 bg-white/90 backdrop-blur-xl p-6 rounded-[2rem] shadow-2xl border border-white flex items-center gap-5 z-20">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                    <ShieldCheck className="text-white w-7 h-7" />
                  </div>
                  <div>
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">Response Time</p>
                    <p className="text-slate-900 font-black text-2xl leading-none tracking-tight italic">&lt; 60 Min</p>
                  </div>
                </div>

                <div className="absolute top-12 -right-8 bg-white/90 backdrop-blur-xl px-5 py-4 rounded-[1.5rem] shadow-2xl border border-white flex items-center gap-3 z-20">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="Client" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col">
                    <div className="flex text-yellow-400">
                      {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 fill-current" />)}
                    </div>
                    <span className="text-[9px] font-bold text-slate-500 uppercase">1.2k+ Reviews</span>
                  </div>
                </div>
              </div>
              
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-600/10 rounded-full blur-[80px] -z-10 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hidden lg:flex flex-col items-center gap-2 absolute bottom-10 left-1/2 -translate-x-1/2">
          <span className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.3em]">Scroll</span>
          <div className="scroll-arrow text-slate-300">
            <ArrowDown className="w-5 h-5" />
          </div>
        </div>
      </section>

      {/* ── STATS GRID ── */}
      <section className="py-24 bg-slate-900 relative overflow-hidden stats-grid">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(37,99,235,0.15),_transparent_70%)]" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay" />
        
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { id: 'stat-years', label: 'Years Experience', icon: <Award className="w-6 h-6" /> },
              { id: 'stat-clients', label: 'Happy Clients', icon: <Star className="w-6 h-6" /> },
              { id: 'stat-projects', label: 'Projects Done', icon: <Bolt className="w-6 h-6" /> },
              { id: 'stat-rating', label: 'Google Rating', icon: <TrendingUp className="w-6 h-6" /> },
            ].map((stat, i) => (
              <div key={stat.id} className="relative group text-center p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-all duration-500 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="w-14 h-14 bg-blue-500/10 text-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500 border border-blue-500/20 shadow-[0_0_30px_rgba(37,99,235,0.2)]">
                  {stat.icon}
                </div>
                <div id={stat.id} className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-3 drop-shadow-lg">0</div>
                <p className="text-blue-200/70 text-[10px] md:text-xs font-bold uppercase tracking-[0.25em]">{stat.label}</p>
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
      <section id="services" className="py-24 md:py-36 px-4 md:px-8 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="services-header max-w-3xl mb-16 md:mb-24 mx-auto text-center">
            <div className="inline-flex items-center justify-center px-4 py-1.5 bg-blue-100/50 border border-blue-200/50 rounded-full text-blue-700 text-[10px] font-black tracking-[0.2em] mb-6 uppercase">
              Our Services
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-[-0.03em] leading-[1.05] uppercase italic">
              Electrical Expertise <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">You Can Trust.</span>
            </h2>
            <p className="text-base md:text-lg text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto">
              Every job handled with precision and care. Fully committed to safety, aesthetic integration, and uncompromising local code compliance.
            </p>
          </div>

          <div className="services-grid grid md:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service, idx) => (
              <a
                key={idx}
                href="tel:+17802979252"
                className="service-card group bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden transition-all duration-500 hover:shadow-[0_40px_100px_rgba(0,0,0,0.08)] hover:-translate-y-2 flex flex-col"
              >
                <div className="relative aspect-[4/3] overflow-hidden m-3 rounded-[2rem]">
                  <img
                    src={service.img}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-900 shadow-sm">
                    {service.tag}
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-1 bg-white">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500">
                      {service.icon}
                    </div>
                    <span className="text-blue-600 font-black text-lg">{service.price}</span>
                  </div>
                  <h3 className="text-2xl font-black mb-3 text-slate-900 uppercase italic tracking-tight">{service.title}</h3>
                  <p className="text-slate-500 font-medium leading-relaxed flex-1 text-sm mb-8">{service.desc}</p>
                  
                  <div className="pt-6 border-t border-slate-100 flex items-center justify-between mt-auto group-hover:border-blue-100 transition-colors">
                    <span className="text-slate-900 font-bold uppercase tracking-widest text-[10px]">Book Professional</span>
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-50 text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-24 md:py-40 px-4 md:px-8 bg-[#FDFDFF] relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-100/50 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 -z-10" />
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
          {/* Image grid */}
          <div className="grid grid-cols-2 gap-4 md:gap-6 order-2 lg:order-1 relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 to-transparent rounded-[3rem] -m-6 -z-10 blur-2xl" />
            <div className="space-y-4 md:space-y-6 pt-12 md:pt-20">
              <div className="about-img-1 h-[240px] md:h-[380px] rounded-[2.5rem] overflow-hidden shadow-xl relative border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1558402529-d2638a7023e9?q=80&w=2670&auto=format&fit=crop"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  alt="Smart home setup"
                />
              </div>
              <div className="about-img-1 bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-[2rem] text-center text-white shadow-2xl border border-slate-700">
                <p className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 mb-2">15+</p>
                <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-slate-400">Years Mastery</p>
              </div>
            </div>
            <div className="space-y-4 md:space-y-6">
              <div className="about-img-2 bg-white/80 backdrop-blur-xl p-8 rounded-[2rem] border border-white shadow-xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <p className="text-4xl md:text-6xl font-black text-blue-600 mb-2 relative z-10">1.2k+</p>
                <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-slate-500 relative z-10">Local Clients</p>
              </div>
              <div className="about-img-2 h-[240px] md:h-[360px] rounded-[2.5rem] overflow-hidden shadow-xl border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?q=80&w=2669&auto=format&fit=crop"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  alt="Electric panel"
                />
              </div>
            </div>
          </div>

          {/* Text content */}
          <div className="about-text order-1 lg:order-2 text-center lg:text-left lg:pl-10">
            <div className="inline-flex items-center justify-center px-4 py-1.5 bg-blue-50 border border-blue-100 rounded-full text-blue-600 text-[10px] font-bold tracking-[0.2em] mb-6 uppercase shadow-sm">
              Local Edmonton Experts
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-10 tracking-[-0.03em] uppercase italic leading-[1] max-w-2xl mx-auto lg:mx-0">
              The Standard for <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 non-italic">Electrical Safety.</span>
            </h2>
            <div className="about-features space-y-4">
              {[
                {
                  title: 'Licensed Master Electricians',
                  desc: 'Our team consists of Master Electricians fully licensed in Alberta, ensuring high-standard safety on every job.',
                  icon: <Star className="w-5 h-5" />,
                },
                {
                  title: 'Clear & Honest Pricing',
                  desc: 'No hidden fees. We provide itemized quotes before any work begins on your Edmonton home or office.',
                  icon: <CheckCircle2 className="w-5 h-5" />,
                },
                {
                  title: '24/7 Availability',
                  desc: 'Electrical issues don\'t wait. Round-the-clock emergency services across the entire Edmonton metro area.',
                  icon: <Clock className="w-5 h-5" />,
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="about-feature flex flex-col lg:flex-row gap-5 items-center lg:items-start p-6 rounded-[2rem] bg-white border border-slate-100 hover:border-blue-100 hover:shadow-[0_20px_40px_rgba(37,99,235,0.06)] transition-all duration-300 group cursor-default"
                >
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-blue-500/30 transition-all duration-500">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-black mb-2 uppercase italic text-slate-900 group-hover:text-blue-600 transition-colors">{item.title}</h4>
                    <p className="text-slate-500 font-medium leading-relaxed text-sm max-w-md mx-auto lg:mx-0">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12 pt-10 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
              <a href="tel:+17802979252" className="bg-slate-900 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-slate-800 transition-all shadow-[0_20px_40px_rgba(15,23,42,0.15)] active:scale-95 group flex items-center gap-3">
                Talk to a Professional
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <div className="flex items-center gap-3 text-slate-400 text-xs font-bold uppercase tracking-widest bg-slate-50 px-5 py-3 rounded-full border border-slate-100">
                <ShieldCheck className="w-5 h-5 text-blue-600" />
                Alberta Certified
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HORIZONTAL TESTIMONIALS ── */}
      <section className="testimonials-pin bg-white overflow-hidden">
        <div className="testimonials-viewport w-full h-[100vh] flex flex-col justify-center overflow-hidden py-16">
          <div className="px-4 md:px-8 max-w-7xl mx-auto w-full mb-10 md:mb-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <div className="inline-flex items-center justify-center px-4 py-1.5 bg-blue-50 border border-blue-100 rounded-full text-blue-600 text-[10px] font-bold tracking-[0.2em] mb-4 uppercase">
                  Proven Excellence
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-[-0.03em] uppercase italic leading-[1] text-slate-900">
                  What Edmonton<br />
                  <span className="text-blue-600 non-italic">Clients Say.</span>
                </h2>
              </div>
              <div className="hidden md:flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest bg-slate-50 px-5 py-3 rounded-full border border-slate-100 shrink-0">
                <span>Scroll to see more</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Scrolling track */}
          <div className="testimonials-track flex gap-6 px-4 md:px-8 pb-8 w-max">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="w-[340px] sm:w-[380px] md:w-[460px] shrink-0 bg-white border border-slate-100 rounded-[2.5rem] p-8 md:p-10 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:-translate-y-2 transition-all duration-500 group flex flex-col shadow-sm"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400 drop-shadow-sm" />
                  ))}
                </div>
                <p className="text-lg md:text-xl font-bold text-slate-900 leading-snug mb-8 italic flex-1">
                  "{t.quote}"
                </p>
                <div className="pt-6 border-t border-slate-100 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center font-black text-blue-600 text-lg group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                    {t.name[0]}
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 uppercase text-xs tracking-wider">{t.name}</h4>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section py-32 md:py-48 px-4 md:px-8 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(37,99,235,0.15),_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(37,99,235,0.1),_transparent_60%)]" />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="overflow-hidden">
            <div className="cta-line text-4xl sm:text-6xl md:text-[7rem] font-black text-white tracking-[-0.04em] uppercase italic leading-[0.92]">
              Ready to get
            </div>
          </div>
          <div className="overflow-hidden">
            <div className="cta-line text-4xl sm:text-6xl md:text-[7rem] font-black text-blue-500 tracking-[-0.04em] uppercase italic leading-[0.92]">
              the best help
            </div>
          </div>
          <div className="overflow-hidden">
            <div className="cta-line text-4xl sm:text-6xl md:text-[7rem] font-black text-white tracking-[-0.04em] uppercase italic leading-[0.92] mb-12">
              in the city?
            </div>
          </div>
          <p className="cta-sub text-lg md:text-2xl text-white/50 mb-14 max-w-2xl mx-auto font-medium leading-relaxed">
            Join thousands of Edmonton property owners who trust Haq Electrics for reliability, safety, and expert service.
          </p>
          <div className="cta-btn flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+17802979252"
              className="bg-blue-600 text-white px-12 md:px-16 py-5 md:py-7 rounded-full font-black text-xl md:text-2xl hover:bg-blue-500 transition-all flex items-center justify-center gap-3 shadow-[0_20px_50px_rgba(37,99,235,0.4)] active:scale-95 group"
            >
              Call Us Now
              <Phone className="w-7 h-7 group-hover:rotate-12 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer id="footer" className="bg-white pt-20 md:pt-28 pb-12 px-4 md:px-8 border-t border-slate-100">
        <div className="max-w-7xl mx-auto footer-content">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-14 md:gap-20 mb-16 text-center md:text-left">
            <div className="md:col-span-2 flex flex-col items-center md:items-start">
              <a href="#home" className="inline-block mb-6">
                <div className="text-2xl font-black tracking-tighter italic text-slate-900">HAQ<span className="text-blue-600">.</span></div>
              </a>
              <p className="text-slate-400 max-w-sm mb-8 leading-relaxed font-medium text-sm">
                Premium electrical services in Edmonton, Alberta. Dedicated to quality craftsmanship and community safety since 2009.
              </p>
              <a href="tel:+17802979252" className="flex items-center gap-3 text-slate-900 font-black text-2xl italic hover:text-blue-600 transition-colors">
                <Phone className="w-6 h-6 text-blue-600" />
                1-780-297-9252
              </a>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <h4 className="font-bold mb-6 text-blue-600 uppercase tracking-widest text-[10px]">Navigation</h4>
              <ul className="space-y-3 text-slate-700 font-bold text-sm">
                {[
                  { name: 'Home', href: '#home' },
                  { name: 'Services', href: '#services' },
                  { name: 'About Us', href: '#about' },
                  { name: 'Contact', href: '#contact' },
                  { name: 'Admin', href: '/admin' },
                ].map(l => (
                  <li key={l.name}>
                    <a href={l.href} className="hover:text-blue-600 transition-colors">{l.name}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <h4 className="font-bold mb-6 text-blue-600 uppercase tracking-widest text-[10px]">Services</h4>
              <ul className="space-y-3 text-slate-700 font-medium text-sm">
                {['Residential Electrical', 'Commercial Electrical', '24/7 Emergency', 'Panel Upgrades', 'EV Charger Install', 'Safety Inspections'].map(s => (
                  <li key={s} className="hover:text-blue-600 transition-colors cursor-default">{s}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-400 text-[10px] font-bold uppercase tracking-[0.25em] text-center">
            <p>© 2025 Haq Electrics Ltd. · Edmonton Certified Master Electrician</p>
            <div className="flex flex-wrap justify-center gap-6">
              <span className="hover:text-blue-600 transition-colors cursor-default">Residential</span>
              <span className="hover:text-blue-600 transition-colors cursor-default">Commercial</span>
              <span className="hover:text-blue-600 transition-colors cursor-default">24/7 Support</span>
              <span className="hover:text-blue-600 transition-colors cursor-default">EV Charging</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
