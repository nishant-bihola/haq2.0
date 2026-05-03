import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Zap, ShieldCheck, Clock, Phone, ArrowRight, CheckCircle2,
  Building2, Home, Star, Sparkles, Loader2, ArrowDown,
  Bolt, MapPin, Award, TrendingUp,
} from 'lucide-react';
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap';
import { cn } from '../lib/utils';

// ─── Contact Form ────────────────────────────────────────────────────────────
function ContactSection() {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', service: '', message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const resp = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (resp.ok) {
        setIsSuccess(true);
        setFormData({ name: '', email: '', phone: '', service: '', message: '' });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-36 px-4 md:px-8 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 md:gap-24 items-start">
          <div className="contact-left">
            <div className="inline-block px-4 py-1.5 bg-blue-50 border border-blue-100 rounded-full text-blue-600 text-[10px] font-bold tracking-[0.2em] mb-6 uppercase">
              Get Started
            </div>
            <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter uppercase italic leading-[1] max-w-xl">
              Request a <span className="text-blue-600">Fast Consultation</span> & Quote.
            </h2>
            <p className="text-lg text-slate-500 font-medium leading-relaxed mb-12 max-w-md">
              Need an electrician in Edmonton? Fill out the form and our Master Electricians will get back to you within 60 minutes.
            </p>
            <div className="space-y-6">
              {[
                { title: 'Service Area', detail: 'Edmonton, St. Albert, Sherwood Park & Area', icon: <MapPin className="w-5 h-5" /> },
                { title: 'Direct Phone', detail: '1-780-297-9252', icon: <Phone className="w-5 h-5" /> },
                { title: 'Operating Hours', detail: '24/7 Emergency Support Available', icon: <Clock className="w-5 h-5" /> },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-5 items-center group">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm border border-slate-100 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-0.5">{item.title}</h4>
                    <p className="text-base font-bold text-slate-900 tracking-tight">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="contact-right relative">
            <div className="absolute inset-0 bg-blue-600 blur-[120px] opacity-[0.04] -z-10 rounded-full" />
            <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12 rounded-[3.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.05)] border border-slate-100">
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-20 text-center"
                >
                  <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-black mb-2 uppercase italic">Request Received!</h3>
                  <p className="text-slate-500 font-medium">We'll call you back within 60 minutes.</p>
                  <button
                    type="button"
                    onClick={() => setIsSuccess(false)}
                    className="mt-8 text-blue-600 font-bold uppercase text-xs tracking-widest hover:underline"
                  >
                    Submit another request
                  </button>
                </motion.div>
              ) : (
                <div className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name *</label>
                      <input
                        required
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        type="text"
                        placeholder="John Doe"
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-sm font-medium"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Phone Number *</label>
                      <input
                        required
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        type="tel"
                        placeholder="(780) 000-0000"
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-sm font-medium"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email (Optional)</label>
                    <input
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      type="email"
                      placeholder="you@example.com"
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-sm font-medium"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Service Type</label>
                    <select
                      value={formData.service}
                      onChange={e => setFormData({ ...formData, service: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-sm font-medium appearance-none"
                    >
                      <option value="">Select a service...</option>
                      <option value="residential">Residential Lighting / Wiring</option>
                      <option value="commercial">Commercial / Industrial</option>
                      <option value="emergency">24/7 Emergency Repair</option>
                      <option value="panel">Panel Upgrade</option>
                      <option value="ev">EV Charger Installation</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Project Details</label>
                    <textarea
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe your project or issue..."
                      rows={4}
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-sm font-medium resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 text-white rounded-2xl py-5 font-black uppercase italic tracking-widest text-sm hover:bg-blue-700 active:scale-[0.98] transition-all shadow-xl shadow-blue-500/20 disabled:opacity-50 flex items-center justify-center gap-3"
                  >
                    {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Request Instant Quote'}
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <p className="text-[10px] text-slate-400 text-center font-bold tracking-wider uppercase">
                    🔒 Your information is 100% secure & never shared.
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

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
      scrollTrigger: { trigger: '.logo-cloud', start: 'top 85%' },
      opacity: 0, y: 20, stagger: 0.1, duration: 0.7, ease: 'power2.out',
    });

    // ── Services section header ──
    gsap.from('.services-header', {
      scrollTrigger: { trigger: '#services', start: 'top 75%' },
      opacity: 0, y: 40, duration: 0.8, ease: 'power3.out',
    });
    // Service cards stagger
    gsap.from('.service-card', {
      scrollTrigger: { trigger: '.services-grid', start: 'top 80%' },
      opacity: 0, y: 80, stagger: 0.15, duration: 0.9, ease: 'power3.out',
    });

    // ── About section ──
    gsap.from('.about-img-1', {
      scrollTrigger: { trigger: '#about', start: 'top 75%' },
      opacity: 0, x: -60, duration: 1, ease: 'power3.out',
    });
    gsap.from('.about-img-2', {
      scrollTrigger: { trigger: '#about', start: 'top 75%' },
      opacity: 0, x: -60, duration: 1, ease: 'power3.out', delay: 0.15,
    });
    gsap.from('.about-text', {
      scrollTrigger: { trigger: '#about', start: 'top 70%' },
      opacity: 0, x: 60, duration: 1, ease: 'power3.out',
    });
    gsap.from('.about-feature', {
      scrollTrigger: { trigger: '.about-features', start: 'top 80%' },
      opacity: 0, x: 40, stagger: 0.15, duration: 0.8, ease: 'power3.out',
    });

    // Stats counter animation
    const statsTargets = [
      { el: '#stat-years', end: 15, suffix: '+' },
      { el: '#stat-clients', end: 1200, suffix: '+' },
      { el: '#stat-projects', end: 4800, suffix: '+' },
      { el: '#stat-rating', end: 5.0, suffix: '★', decimals: 1 },
    ];
    statsTargets.forEach(({ el, end, suffix, decimals = 0 }) => {
      const element = document.querySelector(el);
      if (!element) return;
      const obj = { val: 0 };
      gsap.to(obj, {
        val: end,
        duration: 2.2,
        ease: 'power2.out',
        onUpdate() {
          element.textContent = decimals
            ? obj.val.toFixed(decimals) + suffix
            : Math.round(obj.val) + suffix;
        },
        scrollTrigger: { trigger: '.stats-grid', start: 'top 80%' },
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
      scrollTrigger: { trigger: '.cta-section', start: 'top 65%' },
      opacity: 0, y: 80, stagger: 0.12, duration: 0.9, ease: 'power4.out',
    });
    gsap.from('.cta-sub', {
      scrollTrigger: { trigger: '.cta-section', start: 'top 60%' },
      opacity: 0, y: 30, duration: 0.8, ease: 'power3.out', delay: 0.4,
    });
    gsap.from('.cta-btn', {
      scrollTrigger: { trigger: '.cta-section', start: 'top 55%' },
      opacity: 0, scale: 0.9, duration: 0.7, ease: 'back.out(1.5)', delay: 0.6,
    });

    // ── Contact section ──
    gsap.from('.contact-left', {
      scrollTrigger: { trigger: '#contact', start: 'top 75%' },
      opacity: 0, x: -50, duration: 1, ease: 'power3.out',
    });
    gsap.from('.contact-right', {
      scrollTrigger: { trigger: '#contact', start: 'top 75%' },
      opacity: 0, x: 50, duration: 1, ease: 'power3.out', delay: 0.1,
    });

    // ── Footer ──
    gsap.from('.footer-content', {
      scrollTrigger: { trigger: '#footer', start: 'top 85%' },
      opacity: 0, y: 40, duration: 0.9, ease: 'power3.out',
    });

    // Scroll indicator arrow
    gsap.to('.scroll-arrow', {
      y: 10,
      repeat: -1,
      yoyo: true,
      duration: 0.8,
      ease: 'power1.inOut',
    });

    return () => { ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, { scope: pageRef });

  const services = [
    {
      icon: <Home className="w-6 h-6 text-blue-600" />,
      title: 'Residential Electrical',
      desc: 'Expert home wiring, smart lighting, panel upgrades, and safety inspections for Edmonton homes.',
      price: 'From $149',
      img: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2669&auto=format&fit=crop',
      tag: 'Residential',
      features: ['Wiring & Outlets', 'Panel Upgrades', 'Smart Lighting', 'Safety Inspection'],
    },
    {
      icon: <Building2 className="w-6 h-6 text-blue-600" />,
      title: 'Commercial Projects',
      desc: 'Full-scale electrical solutions for offices, retail spaces, and industrial facilities in Edmonton.',
      price: 'From $299',
      img: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?q=80&w=2789&auto=format&fit=crop',
      tag: 'Commercial',
      features: ['Office Fit-outs', 'Industrial Wiring', 'Code Compliance', 'Load Analysis'],
    },
    {
      icon: <Clock className="w-6 h-6 text-blue-600" />,
      title: 'Emergency Repairs',
      desc: '24/7 fast-response electrical troubleshooting. We arrive within 60 minutes anywhere in Edmonton.',
      price: 'From $199',
      img: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?q=80&w=2669&auto=format&fit=crop',
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
      <section id="home" className="relative pt-28 pb-16 md:pt-36 md:pb-28 px-4 md:px-8 overflow-hidden">
        {/* Background gradient blobs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/4 rounded-full blur-[100px] -z-10" />

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="text-center lg:text-left">
              <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-6 border border-blue-100">
                <Zap className="w-3.5 h-3.5" />
                Licensed Master Electricians — Edmonton, AB
              </div>
              <h1 className="hero-title text-[2.6rem] sm:text-5xl md:text-[5.5rem] font-black text-slate-900 mb-6 leading-[1.05] tracking-[-0.03em]">
                Quality Electrical<br />Solutions for<br />
                <span className="text-blue-600">Edmonton Homes.</span>
              </h1>
              <p className="hero-subtitle text-base md:text-xl text-slate-500 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                Professional residential & commercial electrical services. From panel upgrades to 24/7 emergency repairs — we keep Edmonton powered safely.
              </p>
              <div className="hero-ctas flex flex-col sm:flex-row gap-4 mb-12 justify-center lg:justify-start">
                <a
                  href="tel:+17802979252"
                  className="bg-blue-600 text-white px-8 md:px-10 py-4 md:py-5 rounded-full font-bold text-base md:text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/25 text-center flex items-center justify-center gap-2 group active:scale-95"
                >
                  <Phone className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  Call Now — Free Quote
                </a>
                <button
                  onClick={() => {
                    const aiBtn = document.querySelector('.bottom-6.right-6 button') as HTMLButtonElement;
                    if (aiBtn) aiBtn.click();
                  }}
                  className="bg-slate-900 text-white px-8 md:px-10 py-4 md:py-5 rounded-full font-bold text-base md:text-lg hover:bg-slate-800 transition-all text-center flex items-center justify-center gap-2 active:scale-95"
                >
                  <Sparkles className="w-5 h-5 text-blue-400" />
                  Consult AI Expert
                </button>
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

            <div className="relative hero-img">
              <div className="relative z-10">
                <div className="rounded-[2.5rem] overflow-hidden shadow-2xl aspect-[16/10]">
                  <img
                    src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2669&auto=format&fit=crop"
                    className="w-full h-full object-cover"
                    alt="Professional Electrician in Edmonton"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent" />
                </div>
                <div className="hero-badge-float absolute -bottom-5 -left-5 bg-white p-5 rounded-[1.8rem] shadow-2xl border border-slate-50 flex items-center gap-4 z-20">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                    <ShieldCheck className="text-white w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-0.5">Avg. Response</p>
                    <p className="text-slate-900 font-black text-xl leading-none tracking-tight">Under 60 Min</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-12 -right-12 w-72 h-72 bg-blue-600/5 rounded-full blur-3xl -z-10" />
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
      <section className="py-20 bg-slate-900 stats-grid">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { id: 'stat-years', label: 'Years Experience', icon: <Award className="w-5 h-5" /> },
              { id: 'stat-clients', label: 'Happy Clients', icon: <Star className="w-5 h-5" /> },
              { id: 'stat-projects', label: 'Projects Done', icon: <Bolt className="w-5 h-5" /> },
              { id: 'stat-rating', label: 'Google Rating', icon: <TrendingUp className="w-5 h-5" /> },
            ].map(stat => (
              <div key={stat.id} className="text-center">
                <div className="w-10 h-10 bg-blue-600/20 text-blue-400 rounded-xl flex items-center justify-center mx-auto mb-4">
                  {stat.icon}
                </div>
                <div id={stat.id} className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-2">0</div>
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LOGO CLOUD ── */}
      <section className="py-16 bg-slate-50 border-b border-slate-100 logo-cloud overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-10">
            Trusted & Recognized By
          </p>
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-8 md:gap-6">
            {['YEG Home Builders', 'Alberta Safety Council', 'Master Electricians Assn.', 'Edmonton Chamber of Commerce'].map(name => (
              <div key={name} className="logo-item text-lg md:text-xl font-black text-slate-300 tracking-tighter uppercase italic hover:text-slate-600 transition-colors cursor-default">
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="py-24 md:py-36 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="services-header max-w-2xl mb-16 md:mb-24">
            <div className="inline-block px-4 py-1.5 bg-blue-50 border border-blue-100 rounded-full text-blue-600 text-[10px] font-bold tracking-[0.2em] mb-6 uppercase">
              Our Services
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-[-0.03em] leading-[1.05]">
              Certified Electrical Services<br />
              <span className="text-blue-600 underline decoration-blue-200 underline-offset-8">in Edmonton.</span>
            </h2>
            <p className="text-base md:text-lg text-slate-500 font-medium leading-relaxed">
              Every job handled with care — from small repairs to large-scale infrastructure. Fully committed to safety and local code compliance.
            </p>
          </div>

          <div className="services-grid grid md:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <a
                key={idx}
                href="tel:+17802979252"
                className="service-card group bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden transition-all duration-500 hover:shadow-[0_30px_80px_rgba(0,0,0,0.08)] hover:-translate-y-3 flex flex-col"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={service.img}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-blue-600">
                    {service.tag}
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                    <div className="flex flex-wrap gap-1.5">
                      {service.features.map(f => (
                        <span key={f} className="bg-white/90 backdrop-blur-sm text-slate-900 text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center">
                      {service.icon}
                    </div>
                    <span className="text-blue-600 font-black text-lg">{service.price}</span>
                  </div>
                  <h3 className="text-xl font-black mb-3 group-hover:text-blue-600 transition-colors uppercase italic tracking-tight">{service.title}</h3>
                  <p className="text-slate-500 font-medium leading-relaxed flex-1 text-sm">{service.desc}</p>
                  <div className="pt-6 mt-4 border-t border-slate-50 flex items-center justify-between">
                    <span className="text-slate-900 font-bold uppercase tracking-widest text-[10px]">Book Professional</span>
                    <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white transform translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-24 md:py-36 px-4 md:px-8 bg-slate-50/50">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image grid */}
          <div className="grid grid-cols-2 gap-4 md:gap-6 order-2 lg:order-1">
            <div className="space-y-4 md:space-y-6 pt-12 md:pt-20">
              <div className="about-img-1 h-[220px] md:h-[350px] rounded-[2.5rem] overflow-hidden shadow-2xl relative group">
                <img
                  src="https://images.unsplash.com/photo-1558402529-d2638a7023e9?q=80&w=2670&auto=format&fit=crop"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  alt="Smart home setup"
                />
              </div>
              <div className="about-img-1 bg-slate-900 p-8 rounded-[2rem] text-center text-white shadow-xl">
                <p className="text-4xl md:text-5xl font-black text-blue-400 mb-1">15+</p>
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">Years Experience</p>
              </div>
            </div>
            <div className="space-y-4 md:space-y-6">
              <div className="about-img-2 bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
                <p className="text-4xl md:text-5xl font-black text-blue-600 mb-1">1.2k+</p>
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">Happy Clients</p>
              </div>
              <div className="about-img-2 h-[220px] md:h-[340px] rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-100 relative group">
                <img
                  src="https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?q=80&w=2669&auto=format&fit=crop"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  alt="Electric panel"
                />
              </div>
            </div>
          </div>

          {/* Text content */}
          <div className="about-text order-1 lg:order-2 text-center lg:text-left lg:pl-6">
            <div className="inline-block px-4 py-1.5 bg-blue-50 border border-blue-100 rounded-full text-blue-600 text-[10px] font-bold tracking-[0.2em] mb-6 uppercase">
              Local Edmonton Experts
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-10 tracking-[-0.03em] uppercase italic leading-[0.95] max-w-2xl mx-auto lg:mx-0">
              Why Edmonton Residents<br /> Trust <span className="text-blue-600 non-italic">Haq Electrics.</span>
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
                  className="about-feature flex flex-col lg:flex-row gap-5 items-center lg:items-start p-6 rounded-[1.8rem] hover:bg-white hover:shadow-xl border border-transparent hover:border-slate-50 transition-all group cursor-default"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all duration-400">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-black mb-1.5 uppercase italic">{item.title}</h4>
                    <p className="text-slate-500 font-medium leading-relaxed text-sm max-w-md mx-auto lg:mx-0">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12 pt-10 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
              <a href="tel:+17802979252" className="bg-blue-600 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 active:scale-95">
                Talk to a Professional
              </a>
              <div className="flex items-center gap-3 text-slate-400 text-sm font-bold uppercase tracking-widest">
                <ShieldCheck className="w-5 h-5 text-blue-600" />
                Alberta Certified
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HORIZONTAL TESTIMONIALS ── */}
      <section className="testimonials-pin bg-white overflow-hidden">
        <div className="testimonials-viewport w-full overflow-hidden" style={{ height: '100vh' }}>
          <div className="h-full flex flex-col justify-center px-8 pt-0">
            <div className="max-w-7xl mx-auto w-full">
              <div className="mb-10 flex items-end justify-between">
                <div>
                  <div className="inline-block px-4 py-1.5 bg-blue-50 border border-blue-100 rounded-full text-blue-600 text-[10px] font-bold tracking-[0.2em] mb-4 uppercase">
                    Proven Excellence
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black tracking-[-0.03em] uppercase italic leading-tight">
                    What Edmonton Clients Say
                  </h2>
                </div>
                <div className="hidden md:flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest">
                  <span>Scroll to see more</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>

          {/* Scrolling track */}
          <div className="testimonials-track flex gap-6 px-8 pb-8 w-max" style={{ marginTop: '-3rem' }}>
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="w-[380px] md:w-[440px] shrink-0 bg-slate-50 border border-slate-100 rounded-[2.5rem] p-8 md:p-10 hover:bg-white hover:shadow-2xl transition-all group flex flex-col"
              >
                <div className="flex gap-1 mb-5">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-lg font-bold text-slate-900 leading-snug mb-8 italic flex-1">
                  "{t.quote}"
                </p>
                <div className="pt-6 border-t border-slate-200 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-black text-blue-600 text-sm">
                    {t.name[0]}
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 uppercase text-xs tracking-wider">{t.name}</h4>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <ContactSection />

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
            <a
              href="#contact"
              className="bg-white/10 backdrop-blur-sm text-white border border-white/20 px-12 md:px-16 py-5 md:py-7 rounded-full font-black text-xl md:text-2xl hover:bg-white/20 transition-all flex items-center justify-center gap-3 active:scale-95"
            >
              Request a Quote
              <ArrowRight className="w-7 h-7" />
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
