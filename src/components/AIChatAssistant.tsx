import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, X, Send, MessageSquare, Sparkles, User, Bot, Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';

export default function AIChatAssistant() {
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
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chat, isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

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
          history: chat.map(m => ({ role: m.role, parts: [{ text: m.text }] })),
          sessionId,
        }),
      });
      const data = await response.json();
      if (data.text) {
        setChat(prev => [...prev, { role: 'model', text: data.text }]);
      }
    } catch {
      setChat(prev => [...prev, {
        role: 'model',
        text: "Sorry, I'm having trouble connecting. Please call us at 1-780-297-9252 for immediate help.",
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestions = ['Quote for lighting upgrade', 'Emergency service needed', 'Panel upgrade cost', 'EV charger install'];

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end pointer-events-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="pointer-events-auto mb-4 w-[calc(100vw-3rem)] sm:w-[420px] h-[72vh] sm:h-[580px] max-h-[85vh] min-h-[420px] bg-white rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-slate-100/50 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-5 sm:p-6 flex justify-between items-center text-white shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-sm tracking-tight">AI Electrical Expert</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <p className="text-[10px] text-green-400 font-bold uppercase tracking-widest">Online</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/10 p-2 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Area */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-slate-50/40 scroll-smooth"
            >
              {chat.length === 0 && (
                <div className="text-center py-8 space-y-4">
                  <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto">
                    <Zap className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">How can I help you today?</h4>
                    <p className="text-xs text-slate-400 font-medium mt-1 px-6 leading-relaxed">
                      Ask about electrical services, pricing, or get a quick estimate for your Edmonton home.
                    </p>
                  </div>
                  <div className="flex flex-wrap justify-center gap-2 pt-2">
                    {suggestions.map(q => (
                      <button
                        key={q}
                        onClick={() => setMessage(q)}
                        className="text-[10px] font-bold bg-white border border-slate-200 px-3 py-1.5 rounded-full hover:border-blue-500 hover:text-blue-600 transition-all"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {chat.map((msg, i) => (
                <div key={i} className={cn("flex gap-3", msg.role === 'user' ? "flex-row-reverse" : "")}>
                  <div className={cn(
                    "w-8 h-8 shrink-0 rounded-lg flex items-center justify-center",
                    msg.role === 'user' ? "bg-slate-900 text-white" : "bg-blue-600 text-white"
                  )}>
                    {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div className={cn(
                    "p-4 rounded-2xl text-sm leading-relaxed max-w-[80%]",
                    msg.role === 'user'
                      ? "bg-slate-900 text-white rounded-tr-none"
                      : "bg-white border border-slate-100 text-slate-700 shadow-sm rounded-tl-none"
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
                  <div className="p-4 bg-white border border-slate-100 rounded-2xl rounded-tl-none flex gap-1 items-center shadow-sm">
                    <span className="w-2 h-2 bg-blue-200 rounded-full animate-bounce" />
                    <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:0.15s]" />
                    <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:0.3s]" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-slate-100 bg-white shrink-0">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSend()}
                  placeholder="Ask anything about electrical services..."
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !message.trim()}
                  className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center hover:bg-blue-700 active:scale-95 disabled:opacity-40 transition-all shadow-lg shadow-blue-500/20"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[9px] text-slate-400 text-center mt-2.5 font-bold uppercase tracking-widest">
                AI may make mistakes · Call 911 for emergencies
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="pointer-events-auto w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-[0_10px_40px_rgba(37,99,235,0.45)] relative"
      >
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-white flex items-center justify-center text-[8px] font-black">
          AI
        </span>
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="x" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }}>
              <X className="w-7 h-7" />
            </motion.div>
          ) : (
            <motion.div key="msg" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }}>
              <MessageSquare className="w-7 h-7" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
