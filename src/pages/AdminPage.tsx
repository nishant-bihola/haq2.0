import React, { useState, useEffect, useCallback, FormEvent } from 'react';
import {
  LayoutDashboard, Users, MessageSquare, LogOut, RefreshCw,
  TrendingUp, Phone, Mail, Calendar, ChevronDown, Search,
  Trash2, Eye, CheckCircle, Clock, XCircle, AlertCircle,
  Zap, ArrowUpRight, Filter,
} from 'lucide-react';
import { cn } from '../lib/utils';

// ─── Types ───────────────────────────────────────────────────────────────────
interface Lead {
  id: string;
  name: string;
  email?: string;
  phone: string;
  service?: string;
  message?: string;
  source: string;
  status: 'new' | 'contacted' | 'quoted' | 'closed' | 'lost';
  notes?: string;
  createdAt: { _seconds: number } | null;
}

interface Stats {
  totalLeads: number;
  todayLeads: number;
  totalChats: number;
  newLeads: number;
  byService: Record<string, number>;
  byStatus: Record<string, number>;
}

interface ChatSession {
  id: string;
  lastMessage: string;
  updatedAt: { _seconds: number } | null;
  messageCount?: number;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: { _seconds: number } | null;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
const STATUS_CONFIG = {
  new: { label: 'New', color: 'bg-blue-50 text-blue-700 border-blue-200', icon: <AlertCircle className="w-3 h-3" /> },
  contacted: { label: 'Contacted', color: 'bg-yellow-50 text-yellow-700 border-yellow-200', icon: <Clock className="w-3 h-3" /> },
  quoted: { label: 'Quoted', color: 'bg-purple-50 text-purple-700 border-purple-200', icon: <TrendingUp className="w-3 h-3" /> },
  closed: { label: 'Closed ✓', color: 'bg-green-50 text-green-700 border-green-200', icon: <CheckCircle className="w-3 h-3" /> },
  lost: { label: 'Lost', color: 'bg-red-50 text-red-700 border-red-200', icon: <XCircle className="w-3 h-3" /> },
};

const SERVICE_LABELS: Record<string, string> = {
  residential: 'Residential',
  commercial: 'Commercial',
  emergency: 'Emergency',
  panel: 'Panel Upgrade',
  ev: 'EV Charger',
  other: 'Other',
  Chat: 'Chat Lead',
  Form: 'Form Lead',
};

function formatDate(ts: { _seconds: number } | null): string {
  if (!ts) return '—';
  return new Date(ts._seconds * 1000).toLocaleString('en-CA', {
    month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
  });
}

// ─── Login Screen ─────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }: { onLogin: (token: string) => void }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        setError('Invalid password. Please try again.');
        return;
      }
      const { token } = await res.json();
      sessionStorage.setItem('haq_admin_token', token);
      onLogin(token);
    } catch {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-2xl shadow-blue-500/30">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight italic uppercase">Haq Electrics</h1>
          <p className="text-slate-400 text-sm font-medium mt-2">Admin Dashboard</p>
        </div>
        <form onSubmit={handleLogin} className="bg-slate-900 rounded-3xl p-8 border border-slate-800">
          <div className="space-y-5">
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-2">Admin Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-5 py-4 text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                autoFocus
              />
            </div>
            {error && (
              <p className="text-red-400 text-xs font-medium bg-red-500/10 border border-red-500/20 rounded-xl p-3">{error}</p>
            )}
            <button
              type="submit"
              disabled={loading || !password}
              className="w-full bg-blue-600 text-white rounded-xl py-4 font-black uppercase italic tracking-widest text-sm hover:bg-blue-500 transition-all disabled:opacity-50 shadow-xl shadow-blue-500/20"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </div>
        </form>
        <p className="text-center text-slate-600 text-xs mt-6">
          <a href="/" className="hover:text-slate-400 transition-colors">← Back to website</a>
        </p>
      </div>
    </div>
  );
}

// ─── Lead Detail Modal ────────────────────────────────────────────────────────
function LeadModal({
  lead,
  token,
  onClose,
  onUpdate,
}: {
  lead: Lead;
  token: string;
  onClose: () => void;
  onUpdate: (id: string, updates: Partial<Lead>) => void;
}) {
  const [status, setStatus] = useState(lead.status);
  const [notes, setNotes] = useState(lead.notes || '');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/leads/${lead.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status, notes }),
      });
      if (res.ok) {
        onUpdate(lead.id, { status, notes });
        onClose();
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="bg-slate-900 p-6 text-white flex justify-between items-center">
          <div>
            <h3 className="font-black text-lg italic uppercase">{lead.name}</h3>
            <p className="text-slate-400 text-xs mt-0.5 font-medium">{formatDate(lead.createdAt)}</p>
          </div>
          <button onClick={onClose} className="hover:bg-white/10 p-2 rounded-full transition-colors">
            <XCircle className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 rounded-2xl p-4">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Phone</p>
              <a href={`tel:${lead.phone}`} className="font-bold text-slate-900 text-sm hover:text-blue-600 transition-colors flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-blue-600" />
                {lead.phone}
              </a>
            </div>
            <div className="bg-slate-50 rounded-2xl p-4">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Email</p>
              <p className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-blue-600" />
                {lead.email || 'Not provided'}
              </p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-4">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Service</p>
              <p className="font-bold text-slate-900 text-sm">{SERVICE_LABELS[lead.service || ''] || lead.service || '—'}</p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-4">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Source</p>
              <p className="font-bold text-slate-900 text-sm">{lead.source}</p>
            </div>
          </div>

          {lead.message && (
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
              <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-2">Message</p>
              <p className="text-sm text-slate-700 leading-relaxed">{lead.message}</p>
            </div>
          )}

          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Status</label>
            <select
              value={status}
              onChange={e => setStatus(e.target.value as Lead['status'])}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-blue-500 transition-all"
            >
              {Object.entries(STATUS_CONFIG).map(([val, cfg]) => (
                <option key={val} value={val}>{cfg.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Internal Notes</label>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              rows={3}
              placeholder="Add notes about this lead..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-blue-500 transition-all resize-none"
            />
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full bg-blue-600 text-white rounded-xl py-4 font-black uppercase italic tracking-widest text-sm hover:bg-blue-700 active:scale-[0.98] transition-all disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}

function ChatModal({
  chatId,
  token,
  onClose,
}: {
  chatId: string;
  token: string;
  onClose: () => void;
}) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch(`/api/admin/chats/${chatId}/messages`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setMessages(data.messages);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, [chatId, token]);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-3xl w-full max-w-2xl h-[80vh] shadow-2xl overflow-hidden flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <div className="bg-slate-900 p-6 text-white flex justify-between items-center shrink-0">
          <div>
            <h3 className="font-black text-lg italic uppercase tracking-tight">Chat History</h3>
            <p className="text-slate-400 text-xs mt-0.5 font-mono">{chatId}</p>
          </div>
          <button onClick={onClose} className="hover:bg-white/10 p-2 rounded-full transition-colors">
            <XCircle className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <RefreshCw className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
          ) : messages.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-400 font-bold">No messages found for this session.</p>
            </div>
          ) : (
            messages.map((msg, i) => (
              <div key={i} className={cn("flex flex-col", msg.role === 'user' ? "items-end" : "items-start")}>
                <div className={cn(
                  "p-4 rounded-2xl text-sm max-w-[85%] shadow-sm",
                  msg.role === 'user'
                    ? "bg-slate-900 text-white rounded-tr-none"
                    : "bg-white border border-slate-100 text-slate-700 rounded-tl-none"
                )}>
                  {msg.text}
                </div>
                <span className="text-[9px] text-slate-400 font-bold mt-1 px-1">
                  {formatDate(msg.timestamp)}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main Admin Dashboard ─────────────────────────────────────────────────────
export default function AdminPage() {
  const [token, setToken] = useState<string>(() => sessionStorage.getItem('haq_admin_token') || '');
  const [activeTab, setActiveTab] = useState<'overview' | 'leads' | 'chats'>('overview');
  const [stats, setStats] = useState<Stats | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [chats, setChats] = useState<ChatSession[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [serviceFilter, setServiceFilter] = useState('all');

  const authHeaders = { Authorization: `Bearer ${token}` };

  const fetchStats = useCallback(async () => {
    const res = await fetch('/api/admin/stats', { headers: authHeaders });
    if (res.ok) setStats(await res.json());
  }, [token]);

  const fetchLeads = useCallback(async () => {
    const res = await fetch('/api/admin/leads?limit=100', { headers: authHeaders });
    if (res.ok) {
      const data = await res.json();
      setLeads(data.leads);
    }
  }, [token]);

  const fetchChats = useCallback(async () => {
    const res = await fetch('/api/admin/chats?limit=50', { headers: authHeaders });
    if (res.ok) {
      const data = await res.json();
      setChats(data.chats);
    }
  }, [token]);

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    Promise.all([fetchStats(), fetchLeads(), fetchChats()]).finally(() => setLoading(false));
  }, [token]);

  const handleDeleteLead = async (id: string) => {
    if (!confirm('Delete this lead? This cannot be undone.')) return;
    const res = await fetch(`/api/admin/leads/${id}`, {
      method: 'DELETE',
      headers: authHeaders,
    });
    if (res.ok) {
      setLeads(prev => prev.filter(l => l.id !== id));
      fetchStats();
    }
  };

  const handleUpdateLead = (id: string, updates: Partial<Lead>) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, ...updates } : l));
    fetchStats();
  };

  const handleLogout = () => {
    sessionStorage.removeItem('haq_admin_token');
    setToken('');
  };

  const filteredLeads = leads.filter(lead => {
    const matchSearch = search === '' ||
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.phone.includes(search) ||
      (lead.email?.toLowerCase().includes(search.toLowerCase()));
    const matchStatus = statusFilter === 'all' || lead.status === statusFilter;
    const matchService = serviceFilter === 'all' || lead.service === serviceFilter;
    return matchSearch && matchStatus && matchService;
  });

  if (!token) return <LoginScreen onLogin={setToken} />;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'leads', label: 'Leads', icon: <Users className="w-4 h-4" />, count: leads.filter(l => l.status === 'new').length },
    { id: 'chats', label: 'AI Chats', icon: <MessageSquare className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 flex flex-col shrink-0 hidden md:flex">
        <div className="p-6 border-b border-slate-800">
          <a href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="font-black text-white text-sm italic uppercase">Haq Electrics</p>
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Admin</p>
            </div>
          </a>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all",
                activeTab === tab.id
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              )}
            >
              {tab.icon}
              {tab.label}
              {tab.count !== undefined && tab.count > 0 && (
                <span className={cn("ml-auto text-[10px] font-black px-2 py-0.5 rounded-full",
                  activeTab === tab.id ? "bg-white/20 text-white" : "bg-blue-600/20 text-blue-400"
                )}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-800 space-y-2">
          <a
            href="/"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
          >
            <ArrowUpRight className="w-4 h-4" />
            View Website
          </a>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white border-b border-slate-100 px-6 md:px-8 py-5 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h1 className="text-xl font-black text-slate-900 italic uppercase tracking-tight">
              {activeTab === 'overview' && 'Dashboard Overview'}
              {activeTab === 'leads' && 'Lead Management'}
              {activeTab === 'chats' && 'AI Chat Sessions'}
            </h1>
            <p className="text-slate-400 text-xs font-medium mt-0.5">
              {new Date().toLocaleDateString('en-CA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <button
            onClick={() => { fetchStats(); fetchLeads(); fetchChats(); }}
            disabled={loading}
            className="flex items-center gap-2 text-slate-500 hover:text-blue-600 text-sm font-bold transition-colors"
          >
            <RefreshCw className={cn("w-4 h-4", loading && "animate-spin")} />
            Refresh
          </button>
        </div>

        {/* Mobile tabs */}
        <div className="md:hidden flex border-b border-slate-100 bg-white overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={cn(
                "flex-1 min-w-0 flex items-center justify-center gap-2 px-4 py-4 text-xs font-bold transition-all border-b-2",
                activeTab === tab.id
                  ? "text-blue-600 border-blue-600"
                  : "text-slate-400 border-transparent"
              )}
            >
              {tab.icon}
              {tab.label}
              {tab.count !== undefined && tab.count > 0 && (
                <span className="bg-blue-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full">{tab.count}</span>
              )}
            </button>
          ))}
        </div>

        <div className="p-6 md:p-8">
          {/* ── OVERVIEW TAB ── */}
          {activeTab === 'overview' && stats && (
            <div className="space-y-8">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                {[
                  { label: 'Total Leads', value: stats.totalLeads, icon: <Users className="w-5 h-5" />, color: 'blue', sub: 'All time' },
                  { label: 'New Today', value: stats.todayLeads, icon: <TrendingUp className="w-5 h-5" />, color: 'green', sub: 'Needs attention' },
                  { label: 'New Unread', value: stats.newLeads, icon: <AlertCircle className="w-5 h-5" />, color: 'yellow', sub: 'Open leads' },
                  { label: 'AI Chats', value: stats.totalChats, icon: <MessageSquare className="w-5 h-5" />, color: 'purple', sub: 'Sessions' },
                ].map(card => (
                  <div key={card.label} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center mb-4",
                      card.color === 'blue' && "bg-blue-50 text-blue-600",
                      card.color === 'green' && "bg-green-50 text-green-600",
                      card.color === 'yellow' && "bg-yellow-50 text-yellow-600",
                      card.color === 'purple' && "bg-purple-50 text-purple-600",
                    )}>
                      {card.icon}
                    </div>
                    <p className="text-3xl font-black text-slate-900 tracking-tight">{card.value}</p>
                    <p className="text-slate-900 text-sm font-bold mt-1">{card.label}</p>
                    <p className="text-slate-400 text-xs mt-0.5">{card.sub}</p>
                  </div>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* By Service */}
                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                  <h3 className="font-black text-slate-900 uppercase italic text-sm mb-6 flex items-center gap-2">
                    <Filter className="w-4 h-4 text-blue-600" />
                    Leads by Service
                  </h3>
                  <div className="space-y-3">
                    {Object.entries(stats.byService).sort((a, b) => (b[1] as number) - (a[1] as number)).map(([service, count]) => {
                      const max = Math.max(...Object.values(stats.byService).map(v => v as number));
                      const pct = max > 0 ? ((count as number) / max) * 100 : 0;
                      return (
                        <div key={service} className="flex items-center gap-3">
                          <span className="text-xs font-bold text-slate-500 w-28 shrink-0">{SERVICE_LABELS[service] || service}</span>
                          <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-600 rounded-full transition-all duration-700" style={{ width: `${pct}%` }} />
                          </div>
                          <span className="text-xs font-black text-slate-700 w-6 text-right">{count as number}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* By Status */}
                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                  <h3 className="font-black text-slate-900 uppercase italic text-sm mb-6 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600" />
                    Leads by Status
                  </h3>
                  <div className="space-y-3">
                    {Object.entries(stats.byStatus).map(([status, count]) => {
                      const cfg = STATUS_CONFIG[status as keyof typeof STATUS_CONFIG];
                      if (!cfg || count === 0) return null;
                      return (
                        <div key={status} className="flex items-center justify-between">
                          <span className={cn("inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full border", cfg.color)}>
                            {cfg.icon} {cfg.label}
                          </span>
                          <span className="text-lg font-black text-slate-700">{count}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Recent Leads */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="font-black text-slate-900 uppercase italic text-sm">Recent Leads</h3>
                  <button onClick={() => setActiveTab('leads')} className="text-blue-600 text-xs font-bold hover:underline flex items-center gap-1">
                    View All <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
                <div className="divide-y divide-slate-50">
                  {leads.slice(0, 5).map(lead => (
                    <div key={lead.id} className="px-6 py-4 flex items-center gap-4 hover:bg-slate-50/50 transition-colors">
                      <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center font-black text-blue-600 text-sm shrink-0">
                        {lead.name[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-slate-900 text-sm">{lead.name}</p>
                        <p className="text-slate-400 text-xs">{lead.phone} · {formatDate(lead.createdAt)}</p>
                      </div>
                      <span className={cn("inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full border shrink-0", STATUS_CONFIG[lead.status]?.color)}>
                        {STATUS_CONFIG[lead.status]?.icon}
                        {STATUS_CONFIG[lead.status]?.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── LEADS TAB ── */}
          {activeTab === 'leads' && (
            <div className="space-y-5">
              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search by name, phone, or email..."
                    className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm font-medium focus:outline-none focus:border-blue-500 transition-all"
                  />
                </div>
                <div className="relative">
                  <select
                    value={statusFilter}
                    onChange={e => setStatusFilter(e.target.value)}
                    className="appearance-none bg-white border border-slate-200 rounded-xl px-4 py-3 pr-8 text-sm font-medium focus:outline-none focus:border-blue-500 transition-all"
                  >
                    <option value="all">All Statuses</option>
                    {Object.entries(STATUS_CONFIG).map(([val, cfg]) => (
                      <option key={val} value={val}>{cfg.label}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
                <div className="relative">
                  <select
                    value={serviceFilter}
                    onChange={e => setServiceFilter(e.target.value)}
                    className="appearance-none bg-white border border-slate-200 rounded-xl px-4 py-3 pr-8 text-sm font-medium focus:outline-none focus:border-blue-500 transition-all"
                  >
                    <option value="all">All Services</option>
                    {Object.entries(SERVICE_LABELS).map(([val, label]) => (
                      <option key={val} value={val}>{label}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <p className="text-xs text-slate-400 font-medium">
                Showing {filteredLeads.length} of {leads.length} leads
              </p>

              {/* Leads List */}
              <div className="space-y-3">
                {filteredLeads.map(lead => (
                  <div
                    key={lead.id}
                    className="bg-white rounded-2xl border border-slate-100 p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 hover:shadow-md transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center font-black text-blue-600 text-sm shrink-0">
                      {lead.name[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h4 className="font-black text-slate-900 text-sm">{lead.name}</h4>
                        <span className={cn("inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full border", STATUS_CONFIG[lead.status]?.color)}>
                          {STATUS_CONFIG[lead.status]?.icon}
                          {STATUS_CONFIG[lead.status]?.label}
                        </span>
                        {lead.service && (
                          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                            {SERVICE_LABELS[lead.service] || lead.service}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-4 text-xs text-slate-400 font-medium">
                        <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{lead.phone}</span>
                        {lead.email && <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{lead.email}</span>}
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{formatDate(lead.createdAt)}</span>
                      </div>
                      {lead.message && (
                        <p className="text-xs text-slate-500 mt-2 line-clamp-1 italic">"{lead.message}"</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <a
                        href={`tel:${lead.phone}`}
                        className="p-2 bg-green-50 text-green-600 rounded-xl hover:bg-green-100 transition-colors"
                        title="Call"
                      >
                        <Phone className="w-4 h-4" />
                      </a>
                      <button
                        onClick={() => setSelectedLead(lead)}
                        className="p-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors"
                        title="View & Edit"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteLead(lead.id)}
                        className="p-2 bg-red-50 text-red-400 rounded-xl hover:bg-red-100 transition-colors opacity-0 group-hover:opacity-100"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}

                {filteredLeads.length === 0 && (
                  <div className="text-center py-16 bg-white rounded-2xl border border-slate-100">
                    <Users className="w-10 h-10 text-slate-200 mx-auto mb-3" />
                    <p className="text-slate-400 font-bold text-sm">No leads found</p>
                    <p className="text-slate-300 text-xs mt-1">Try adjusting your filters</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── CHATS TAB ── */}
          {activeTab === 'chats' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-400 font-medium">{chats.length} AI chat sessions</p>
              <div className="space-y-3">
                {chats.map(chat => (
                  <button
                    key={chat.id}
                    onClick={() => setSelectedChatId(chat.id)}
                    className="w-full text-left bg-white rounded-2xl border border-slate-100 p-5 flex items-center gap-4 hover:shadow-md hover:border-blue-200 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-slate-900 text-sm font-mono truncate">{chat.id}</p>
                      <p className="text-slate-400 text-xs mt-1 line-clamp-1 italic">"{chat.lastMessage}"</p>
                      <p className="text-slate-300 text-[10px] mt-1">{formatDate(chat.updatedAt)}</p>
                    </div>
                    <Eye className="w-4 h-4 text-slate-300 group-hover:text-blue-600 transition-colors" />
                  </button>
                ))}
                {chats.length === 0 && (
                  <div className="text-center py-16 bg-white rounded-2xl border border-slate-100">
                    <MessageSquare className="w-10 h-10 text-slate-200 mx-auto mb-3" />
                    <p className="text-slate-400 font-bold text-sm">No chat sessions yet</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Lead Modal */}
      {selectedLead && (
        <LeadModal
          lead={selectedLead}
          token={token}
          onClose={() => setSelectedLead(null)}
          onUpdate={handleUpdateLead}
        />
      )}

      {/* Chat Modal */}
      {selectedChatId && (
        <ChatModal
          chatId={selectedChatId}
          token={token}
          onClose={() => setSelectedChatId(null)}
        />
      )}
    </div>
  );
}
