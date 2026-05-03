import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, 
  ShieldCheck, 
  Clock, 
  Phone, 
  ArrowRight, 
  CheckCircle2, 
  Building2, 
  Home,
  Menu,
  X,
  Star,
  ChevronRight,
  Send,
  MessageSquare,
  Sparkles,
  User,
  Bot,
  Loader2
} from 'lucide-react';
import Logo from './components/Logo';
import { cn } from './lib/utils';

// --- Components ---

const Navbar = () => {
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
  ];

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300 px-4 md:px-8 py-4 sm:py-6",
      isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm py-4 border-b border-slate-100" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <a href="#home" className="transition-transform active:scale-95">
          <Logo className="h-8 sm:h-10 shrink-0" />
        </a>
        
        {/* Desktop Nav */}
        <div className="hidden lg:flex gap-10 items-center">
          <div className="flex gap-8 items-center">
            {navLinks.map(link => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-slate-600 hover:text-blue-600 text-[13px] font-bold transition-colors uppercase tracking-wider"
              >
                {link.name}
              </a>
            ))}
          </div>
          
          <div className="flex items-center gap-6 border-l border-slate-200 pl-10">
            <a href="tel:+17802979252" className="bg-blue-600 text-white px-7 py-3 rounded-full text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 active:scale-95 flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Call 1-780-297-9252
            </a>
          </div>
        </div>

      {/* Mobile Toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <a 
            href="tel:+17802979252" 
            className="p-3 bg-blue-600 text-white rounded-full shadow-lg shadow-blue-500/20 active:scale-90 transition-transform"
          >
            <Phone className="w-5 h-5" />
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
                    <motion.div
                      whileHover={{ x: 3 }}
                    >
                      <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-600 transition-colors" />
                    </motion.div>
                  </motion.a>
                ))}
              </div>
              
              <motion.div 
                variants={{
                  open: { opacity: 1, y: 0 },
                  closed: { opacity: 0, y: 10 }
                }}
                className="pt-6 border-t border-slate-100 flex flex-col gap-4"
              >
                <a 
                  href="tel:+17802979252" 
                  className="w-full py-4 text-center bg-slate-900 text-white font-bold rounded-2xl active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-xl shadow-slate-900/10"
                >
                  <Phone className="w-5 h-5" />
                  Call Now
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const AIChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState<{ role: 'user' | 'model'; text: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => {
    const saved = localStorage.getItem('haq_chat_session');
    if (saved) return saved;
    const newId = `chat_${Math.random().toString(36).substring(2, 11)}_${Date.now()}`;
    localStorage.setItem('haq_chat_session', newId);
    return newId;
  });
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chat, isOpen]);

  const handleSend = async () => {
    if (!message.trim() || isLoading) return;

    const userMessage = message;
    setMessage('');
    setChat(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: userMessage, 
          history: chat.map(m => ({
            role: m.role,
            parts: [{ text: m.text }]
          })),
          sessionId
        }),
      });
      const data = await response.json();
      if (data.text) {
        setChat(prev => [...prev, { role: 'model', text: data.text }]);
      }
    } catch (err) {
      console.error(err);
      setChat(prev => [...prev, { role: 'model', text: "Sorry, I'm having trouble connecting right now. Please call us at 1-780-297-9252 for immediate help." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end pointer-events-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="pointer-events-auto mb-4 w-[calc(100vw-3rem)] sm:w-[400px] h-[70vh] sm:h-[550px] max-h-[80vh] min-h-[400px] bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-100 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-slate-900 p-5 sm:p-6 flex justify-between items-center text-white shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-sm tracking-tight">AI Assistant</p>
                  <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest">Haq Electrics YEG</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/10 p-2 rounded-full transition-colors"
                id="close-chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Area */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/50 scroll-smooth"
            >
              {chat.length === 0 && (
                <div className="text-center py-10 space-y-4">
                  <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto">
                    <Zap className="w-8 h-8" />
                  </div>
                  <h4 className="font-bold text-slate-900">How can I help you today?</h4>
                  <p className="text-xs text-slate-400 font-medium px-10 leading-relaxed">
                    Ask me about our electrical services, pricing, or safety tips for your Edmonton home.
                  </p>
                  <div className="flex flex-wrap justify-center gap-2 pt-4">
                    {['Quote for lighting', 'Emergency service', 'Panel upgrade'].map(q => (
                      <button 
                        key={q}
                        onClick={() => setMessage(q)}
                        className="text-[10px] font-bold bg-white border border-slate-200 px-3 py-1.5 rounded-full hover:border-blue-600 transition-colors"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {chat.map((msg, i) => (
                <div key={i} className={cn(
                  "flex gap-3",
                  msg.role === 'user' ? "flex-row-reverse" : ""
                )}>
                  <div className={cn(
                    "w-8 h-8 shrink-0 rounded-lg flex items-center justify-center",
                    msg.role === 'user' ? "bg-slate-900 text-white" : "bg-blue-600 text-white"
                  )}>
                    {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div className={cn(
                    "p-4 rounded-2xl text-sm leading-relaxed max-w-[80%]",
                    msg.role === 'user' ? "bg-slate-900 text-white rounded-tr-none" : "bg-white border border-slate-100 text-slate-700 shadow-sm rounded-tl-none"
                  )}>
                    {msg.text}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 shrink-0 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                    <Loader2 className="w-4 h-4 animate-spin" />
                  </div>
                  <div className="p-4 bg-white border border-slate-100 rounded-2xl rounded-tl-none flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 bg-blue-200 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-slate-100 bg-white">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type your message..."
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 transition-all"
                />
                <button 
                  onClick={handleSend}
                  disabled={isLoading || !message.trim()}
                  className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center hover:bg-blue-700 active:scale-95 disabled:opacity-50 disabled:active:scale-100 transition-all shadow-lg shadow-blue-500/20"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              <p className="text-[9px] text-slate-400 text-center mt-3 font-bold uppercase tracking-widest">
                AI can make mistakes. Always call for emergencies.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="pointer-events-auto w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(37,99,235,0.4)] relative group"
      >
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="x" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }}>
              <X className="w-7 h-7" />
            </motion.div>
          ) : (
            <motion.div key="msg" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }}>
              <MessageSquare className="w-7 h-7 group-hover:scale-110 transition-transform" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', service: '', message: '' });
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
    <section id="contact" className="py-24 md:py-32 px-4 md:px-8 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 md:gap-24 items-start">
          <div>
            <div className="inline-block px-4 py-1.5 bg-blue-50 border border-blue-100 rounded-full text-blue-600 text-[10px] font-bold tracking-[0.2em] mb-6 uppercase">
              Get Started
            </div>
            <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter uppercase italic leading-[1] max-w-xl">
              Request a <span className="text-blue-600 italic">Fast Consultation</span> & Quote.
            </h2>
            <p className="text-lg text-slate-500 font-medium leading-relaxed mb-12 max-w-md">
              Need an electrician in Edmonton? Fill out the form and our Master Electricians will get back to you within 60 minutes.
            </p>
            
            <div className="space-y-8">
              {[
                { title: "Service Area", detail: "Edmonton, St. Albert, Sherwood Park & Area", icon: <Building2 className="w-6 h-6" /> },
                { title: "Direct Phone", detail: "1-780-297-9252", icon: <Phone className="w-6 h-6" /> },
                { title: "Operating Hours", detail: "24/7 Emergency Support Available", icon: <Clock className="w-6 h-6" /> }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-6 items-center">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm border border-slate-100">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">{item.title}</h4>
                    <p className="text-lg font-bold text-slate-900 tracking-tight">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-blue-600 blur-[100px] opacity-[0.03] -z-10"></div>
            <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12 rounded-[3.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.04)] border border-slate-100">
              {isSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-20 text-center"
                >
                  <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-black mb-2 uppercase italic">Success!</h3>
                  <p className="text-slate-500 font-medium">We've received your request and will call you shortly.</p>
                  <button 
                    type="button"
                    onClick={() => setIsSuccess(false)}
                    className="mt-8 text-blue-600 font-bold uppercase text-xs tracking-widest hover:underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                      <input 
                        required
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        type="text" 
                        placeholder="John Doe" 
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 transition-all text-sm font-medium"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
                      <input 
                        required
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        type="tel" 
                        placeholder="(780) 000-0000" 
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 transition-all text-sm font-medium"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Service Type</label>
                    <select 
                      value={formData.service}
                      onChange={e => setFormData({ ...formData, service: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 transition-all text-sm font-medium appearance-none"
                    >
                      <option value="">Select a service</option>
                      <option value="residential">Residential Lighting/Wiring</option>
                      <option value="commercial">Commercial/Industrial</option>
                      <option value="emergency">24/7 Emergency Repair</option>
                      <option value="panel">Panel Upgrade</option>
                      <option value="ev">EV Charger Installation</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Message Details</label>
                    <textarea 
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your project..." 
                      rows={4}
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 transition-all text-sm font-medium resize-none"
                    />
                  </div>
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 text-white rounded-2xl py-5 font-black uppercase italic tracking-widest text-sm hover:bg-blue-700 active:scale-[0.98] transition-all shadow-xl shadow-blue-500/20 disabled:opacity-50 flex items-center justify-center gap-3"
                  >
                    {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Request Instant Quote"}
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <p className="text-[10px] text-slate-400 text-center font-bold tracking-wider uppercase">
                    🔒 Your information is secure & never shared.
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-[#FDFDFF] font-sans text-slate-900 selection:bg-blue-600/10">
      <Navbar />
      <AIChatAssistant />

      {/* Hero Section */}
      <section id="home" className="pt-24 pb-16 md:pt-32 md:pb-32 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-6 border border-blue-100">
                <Zap className="w-3.5 h-3.5" />
                Licensed Master Electricians in Edmonton
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-slate-900 mb-6 leading-[1.1] tracking-tight">
                Quality Electrical <br /> Solutions for <span className="text-blue-600">Edmonton Homes.</span>
              </h1>
              <p className="text-base md:text-xl text-slate-500 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                Professional residential and commercial electrical services. From panel upgrades to 24/7 emergency repairs, we keep Edmonton powered safely.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-12 justify-center lg:justify-start">
                <a href="tel:+17802979252" className="bg-blue-600 text-white px-8 md:px-10 py-4 md:py-5 rounded-full font-bold text-base md:text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 text-center flex items-center justify-center gap-2 group active:scale-95">
                  <Phone className="w-5 h-5 transition-transform group-hover:rotate-12" />
                  Direct Consultation
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

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-6 sm:gap-8 items-center justify-center lg:justify-start pt-8 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="text-yellow-400 flex gap-0.5">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3.5 md:w-4 h-3.5 md:h-4 fill-current" />)}
                  </div>
                  <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">Top Rated YEG</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 md:w-5 h-4 md:h-5 text-blue-600" />
                  <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">Licensed & Insured</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10 grid grid-cols-12 gap-4">
                <div className="col-span-12 rounded-[2.5rem] overflow-hidden shadow-2xl aspect-[16/10]">
                  <img 
                    src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2669&auto=format&fit=crop" 
                    className="w-full h-full object-cover"
                    alt="Professional Electrician in Edmonton"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-[2rem] shadow-xl border border-slate-50 flex items-center gap-4 z-20">
                  <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                    <ShieldCheck className="text-white w-7 h-7" />
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Response Time</p>
                    <p className="text-slate-900 font-bold text-xl leading-none">Under 60 Mins</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-12 -right-12 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl z-0"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats/Logo Cloud Section */}
      <section className="py-20 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-8 md:gap-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
             {['YEG Home Builders', 'Alberta Safety Council', 'Master Electricians Assn', 'Edmonton Chamber'].map(name => (
               <div key={name} className="text-xl md:text-2xl font-black text-slate-400 tracking-tighter uppercase italic">{name}</div>
             ))}
          </div>
        </div>
      </section>

      {/* Services List (SEO Content) */}
      <section id="services" className="py-20 md:py-32 px-4 md:px-8 bg-white border-y border-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-12 md:mb-20 text-center md:text-left mx-auto md:mx-0">
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight leading-tight">Best Certified Electrical <br /><span className="text-blue-600 underline decoration-blue-200 underline-offset-8">Services in Edmonton.</span></h2>
              <p className="text-base md:text-lg text-slate-500 font-medium leading-relaxed">
                We handle every electrical job with care, from small repairs to large-scale infrastructure projects. Our team is fully committed to safety and local code compliance.
              </p>
            </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[ 
              { 
                icon: <Home className="w-6 h-6 text-blue-600" />, 
                title: "Residential Electrical", 
                desc: "Expert home wiring, smart lighting, and safety upgrades for Edmonton homes.",
                price: "Starts from $149",
                img: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2669&auto=format&fit=crop",
                tags: ["Residential", "Licensed"]
              },
              { 
                icon: <Building2 className="w-6 h-6 text-blue-600" />, 
                title: "Commercial Projects", 
                desc: "Full-scale electrical solutions for Edmonton's offices and retail spaces.",
                price: "Starts from $299",
                img: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?q=80&w=2789&auto=format&fit=crop",
                tags: ["Commercial", "Expert"]
              },
              { 
                icon: <Clock className="w-6 h-6 text-blue-600" />, 
                title: "Emergency Repairs", 
                desc: "24/7 fast-response electrical troubleshooting for urgent outages.",
                price: "Starting at $199",
                img: "https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?q=80&w=2669&auto=format&fit=crop",
                tags: ["Emergency", "24/7"]
              }
            ].map((service, idx) => (
              <motion.a 
                key={idx}
                href="tel:+17802979252"
                whileHover={{ y: -10 }}
                className="group bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden transition-all hover:shadow-[0_30px_60px_rgba(0,0,0,0.06)] flex flex-col"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={service.img} alt={service.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-blue-600 shadow-sm">
                    {service.tags[0]}
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                      {service.icon}
                    </div>
                    <span className="text-blue-600 font-bold text-lg">{service.price}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-600 transition-colors uppercase italic">{service.title}</h3>
                  <p className="text-slate-500 font-medium leading-relaxed mb-6 flex-1">{service.desc}</p>
                  
                  <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                    <span className="text-slate-900 font-bold uppercase tracking-widest text-[10px] md:text-xs">Call Professional</span>
                    <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white transform translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all">
                      <Phone className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* SEO/Why Choose Us Section */}
      <section id="about" className="py-20 md:py-32 px-4 md:px-8 bg-slate-50/30">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="grid grid-cols-2 gap-4 md:gap-6 order-2 lg:order-1">
            <div className="space-y-4 md:space-y-6 pt-12 md:pt-20">
              <div className="bg-blue-600 h-[220px] md:h-[350px] rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-2xl relative group">
                 <img 
                  src="https://images.unsplash.com/photo-1558402529-d2638a7023e9?q=80&w=2670&auto=format&fit=crop" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 hover:scale-110" 
                  alt="Smart home setup" 
                />
              </div>
              <div className="bg-slate-900 p-6 md:p-10 rounded-[2rem] text-center text-white shadow-xl">
                <p className="text-3xl md:text-5xl font-bold text-blue-400 mb-2">15+</p>
                <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-white/40">Years Experience</p>
              </div>
            </div>
            <div className="space-y-4 md:space-y-6">
              <div className="bg-white p-6 md:p-10 rounded-[2rem] border border-slate-100 shadow-sm">
                <p className="text-3xl md:text-5xl font-bold text-blue-600 mb-2">1.2k</p>
                <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-slate-400">Happy Clients</p>
              </div>
              <div className="bg-white h-[220px] md:h-[350px] rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-2xl border border-slate-100 relative group">
                 <img 
                  src="https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?q=80&w=2669&auto=format&fit=crop" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  alt="Electric panel" 
                />
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 text-center lg:text-left lg:pl-10">
             <div className="inline-block px-4 py-1.5 bg-blue-50 border border-blue-100 rounded-full text-blue-600 text-[10px] font-bold tracking-[0.2em] mb-6 uppercase">
              LOCAL EDMONTON EXPERTS
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-black mb-8 tracking-tighter uppercase italic leading-[0.95] max-w-2xl mx-auto lg:mx-0">Why Edmonton Residents Trust <span className="text-blue-600 non-italic">Haq Electrics.</span></h2>
            <div className="space-y-4 md:space-y-6">
              {[
                { title: "Licensed Master Electricians", desc: "Our team consists of Master Electricians fully licensed to operate in Alberta, ensuring high-standard safety.", icon: <Star className="w-5 h-5" /> },
                { title: "Clear & Honest Pricing", desc: "No hidden fees. We provide clear, itemized quotes before any work begins on your Edmonton home or office.", icon: <CheckCircle2 className="w-5 h-5" /> },
                { title: "24/7 Availability", desc: "Electrical issues don't wait. We provide round-the-clock emergency services for the entire Edmonton metropolitan area.", icon: <Clock className="w-5 h-5" /> }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col lg:flex-row gap-6 items-center lg:items-start p-6 md:p-8 rounded-[2rem] hover:bg-white hover:shadow-xl border border-transparent hover:border-slate-50 transition-all group">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2 uppercase italic">{item.title}</h4>
                    <p className="text-slate-500 font-medium leading-relaxed max-w-md mx-auto lg:mx-0">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12 pt-10 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-8 justify-center lg:justify-start">
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

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 md:py-32 px-4 md:px-8 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 max-w-2xl mx-auto">
            <div className="inline-block px-4 py-1.5 bg-blue-50 border border-blue-100 rounded-full text-blue-600 text-[10px] font-bold tracking-[0.2em] mb-6 uppercase">
              Proven Excellence
            </div>
            <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter uppercase italic leading-[1.1]">
              What Edmonton <br /><span className="text-blue-600 non-italic">Property Owners Say.</span>
            </h2>
            <p className="text-slate-500 font-medium leading-relaxed">
              Serving the YEG community means everything to us. Here's why our clients recommend us for all their electrical needs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Jenkins",
                role: "Edmonton Homeowner",
                quote: "The best electricians in Edmonton! They were fast, clean, and very professional with our panel upgrade. I finally feel safe in my older bungalow.",
                rating: 5
              },
              {
                name: "Michael Ross",
                role: "Local Business Owner",
                quote: "Highly recommended for commercial work. Haq Electrics handled our office fit-out perfectly. Their attention to local building codes was impressive.",
                rating: 5
              },
              {
                name: "David Lawson",
                role: "Residential Client",
                quote: "24/7 service actually means 24/7. They came out at 2 AM for an emergency repair when a storm knocked our power out. Lifesavers!",
                rating: 5
              }
            ].map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-slate-50 p-8 md:p-10 rounded-[2.5rem] border border-slate-100 hover:bg-white hover:shadow-2xl hover:border-blue-50 transition-all group flex flex-col h-full"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <div className="flex-1">
                  <p className="text-lg md:text-xl font-bold text-slate-900 leading-tight mb-8 italic">
                    "{testimonial.quote}"
                  </p>
                </div>
                <div className="pt-8 border-t border-slate-200 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center font-black text-blue-600">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 uppercase text-xs tracking-wider">{testimonial.name}</h4>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <div className="inline-flex items-center gap-4 p-2 pl-6 bg-slate-50 rounded-full border border-slate-100">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">See more verified reviews on</span>
              <div className="bg-white px-4 py-1 rounded-full shadow-sm font-black text-blue-600 italic">
                Google Reviews
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection />

      {/* Call to Action Grid Section */}
      <section className="py-24 md:py-40 px-4 md:px-8 bg-slate-900 relative overflow-hidden flex items-center">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10 w-full px-4">
          <h2 className="text-4xl sm:text-5xl md:text-8xl font-black text-white mb-10 tracking-tighter uppercase italic leading-[0.95]">
            Ready to get <br /><span className="text-blue-500 non-italic">the best help </span> <br /> in the city?
          </h2>
          <p className="text-lg md:text-2xl text-white/50 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
            Join thousands of Edmonton property owners who choose Haq Electrics for reliability and safety. No project is too big or too small.
          </p>
          <div className="flex justify-center">
            <a href="tel:+17802979252" className="bg-blue-600 text-white px-10 md:px-16 py-5 md:py-7 rounded-full font-bold text-xl md:text-2xl hover:bg-blue-700 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-blue-500/40 active:scale-95 group">
              Call us Now
              <Phone className="w-6 md:w-8 h-6 md:h-8 group-hover:rotate-12 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="footer" className="bg-white pt-20 md:pt-32 pb-12 px-4 md:px-8 border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-20 mb-20 text-center md:text-left">
            <div className="md:col-span-2 flex flex-col items-center md:items-start">
              <a href="#home" className="inline-block mb-8 transition-transform active:scale-95">
                <Logo />
              </a>
              <p className="text-black max-w-sm mb-10 leading-relaxed font-bold uppercase text-[11px] tracking-[0.2em]">
                Premium electrical services provider in Edmonton, Alberta. Dedicated to high-quality craftsmanship and community safety since inception.
              </p>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <h4 className="font-bold mb-8 text-blue-600 uppercase tracking-widest text-[10px]">Navigation</h4>
              <ul className="space-y-4 text-slate-900 font-black transition-all uppercase text-[13px] tracking-wider italic">
                <li><a href="#home" className="hover:text-blue-600">Home</a></li>
                <li><a href="#services" className="hover:text-blue-600">Services</a></li>
                <li><a href="#about" className="hover:text-blue-600">About Us</a></li>
              </ul>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <h4 className="font-bold mb-8 text-blue-600 uppercase tracking-widest text-[10px]">Direct Support</h4>
              <p className="text-slate-400 font-bold mb-4 text-[10px] uppercase tracking-widest">Edmonton & Area, AB</p>
              <a href="tel:+17802979252" className="text-2xl md:text-3xl font-black text-slate-900 tracking-tighter italic uppercase">1-780-297-9252</a>
            </div>
          </div>
          <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8 text-slate-400 text-[10px] font-bold uppercase tracking-[0.3em] text-center">
            <p>© 2024 Haq Electrics Ltd. • Edmonton Certified Master Electrician</p>
            <div className="flex flex-wrap justify-center gap-6 md:gap-8">
              <span className="hover:text-blue-600 cursor-default transition-colors">Residential</span>
              <span className="hover:text-blue-600 cursor-default transition-colors">Commercial</span>
              <span className="hover:text-blue-600 cursor-default transition-colors">24/7 Support</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
