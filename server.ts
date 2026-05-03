import express, { Request, Response, NextFunction } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import dotenv from 'dotenv';
import admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';
import { createHash, randomUUID } from 'crypto';
import firebaseConfig from './firebase-applet-config.json' assert { type: 'json' };

dotenv.config();

// ─── Firebase ────────────────────────────────────────────────────────────────
try {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      projectId: firebaseConfig.projectId,
    });
    console.log('✅ Firebase Admin initialized');
  }
} catch (error) {
  console.error('❌ Firebase Admin init failed:', error);
  console.log('Attempting to initialize without credentials (GCP environment)...');
  try {
    if (!admin.apps.length) {
      admin.initializeApp({ projectId: firebaseConfig.projectId });
    }
  } catch (err) {
    console.error('❌ Firebase fallback failed:', err);
  }
}
const db = getFirestore(firebaseConfig.firestoreDatabaseId);

// ─── Admin Auth ───────────────────────────────────────────────────────────────
const adminSessions = new Set<string>();
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'haq2025admin';

function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token || !adminSessions.has(token)) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  next();
}

// ─── Simple Rate Limiting ────────────────────────────────────────────────────
const rateLimitStore: Map<string, { count: number; resetAt: number }> = new Map();

function rateLimit(maxReqs: number, windowMs: number) {
  return (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip || req.socket.remoteAddress || 'unknown';
    const key = `${ip}:${req.path}`;
    const now = Date.now();
    const entry = rateLimitStore.get(key);

    if (!entry || now > entry.resetAt) {
      rateLimitStore.set(key, { count: 1, resetAt: now + windowMs });
      return next();
    }

    if (entry.count >= maxReqs) {
      res.status(429).json({ error: 'Too many requests. Please wait a moment.' });
      return;
    }

    entry.count++;
    next();
  };
}

setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (now > entry.resetAt) rateLimitStore.delete(key);
  }
}, 5 * 60 * 1000);

// ─── Server ───────────────────────────────────────────────────────────────────
async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3001;

  app.use(express.json({ limit: '1mb' }));
  app.set('trust proxy', 1);

  // ── PUBLIC API ────────────────────────────────────────────────────────────

  // ── ADMIN AUTH ────────────────────────────────────────────────────────────
  app.post('/api/admin/login', rateLimit(5, 60_000), (req, res) => {
    const { password } = req.body;
    const passwordHash = createHash('sha256').update(password || '').digest('hex');
    const adminHash = createHash('sha256').update(ADMIN_PASSWORD).digest('hex');

    if (passwordHash !== adminHash) {
      res.status(401).json({ error: 'Invalid password' });
      return;
    }

    const token = randomUUID();
    adminSessions.add(token);
    setTimeout(() => adminSessions.delete(token), 24 * 60 * 60 * 1000);

    res.json({ token, expiresIn: '24h' });
  });

  // ── ADMIN ROUTES ──────────────────────────────────────────────────────────

  app.get('/api/admin/leads', requireAdmin, async (req, res) => {
    const { limit = '50', status, service } = req.query as Record<string, string>;
    const limitNum = Math.min(100, parseInt(limit));

    try {
      let query: admin.firestore.Query = db.collection('leads').orderBy('createdAt', 'desc');
      if (status && status !== 'all') query = query.where('status', '==', status);
      if (service && service !== 'all') query = query.where('service', '==', service);

      const snapshot = await query.limit(limitNum).get();
      const leads = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate
          ? { _seconds: Math.floor(doc.data().createdAt.toDate().getTime() / 1000) }
          : null,
      }));

      res.json({ leads, count: leads.length });
    } catch (error) {
      console.error('Error fetching leads:', error);
      res.status(500).json({ error: 'Failed to fetch leads' });
    }
  });

  app.patch('/api/admin/leads/:id', requireAdmin, async (req, res) => {
    const { id } = req.params;
    const { status, notes } = req.body;

    const allowed = ['new', 'contacted', 'quoted', 'closed', 'lost'];
    if (status && !allowed.includes(status)) {
      res.status(400).json({ error: 'Invalid status value' });
      return;
    }

    try {
      const updates: Record<string, unknown> = {
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      };
      if (status !== undefined) updates.status = status;
      if (notes !== undefined) updates.notes = notes;

      await db.collection('leads').doc(id).update(updates);
      res.json({ success: true });
    } catch (error) {
      console.error('Error updating lead:', error);
      res.status(500).json({ error: 'Failed to update lead' });
    }
  });

  app.delete('/api/admin/leads/:id', requireAdmin, async (req, res) => {
    const { id } = req.params;
    try {
      await db.collection('leads').doc(id).delete();
      res.json({ success: true });
    } catch (error) {
      console.error('Error deleting lead:', error);
      res.status(500).json({ error: 'Failed to delete lead' });
    }
  });

  app.get('/api/admin/stats', requireAdmin, async (req, res) => {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const [leadsSnap, chatsCount, todaySnap] = await Promise.all([
        db.collection('leads').get(),
        db.collection('chats').count().get(),
        db.collection('leads')
          .where('createdAt', '>=', admin.firestore.Timestamp.fromDate(today))
          .get(),
      ]);

      const byService: Record<string, number> = {};
      const byStatus: Record<string, number> = {};
      let newLeads = 0;

      for (const doc of leadsSnap.docs) {
        const d = doc.data();
        const svc = d.service || 'unknown';
        byService[svc] = (byService[svc] || 0) + 1;
        const st = d.status || 'new';
        byStatus[st] = (byStatus[st] || 0) + 1;
        if (st === 'new') newLeads++;
      }

      res.json({
        totalLeads: leadsSnap.size,
        todayLeads: todaySnap.size,
        totalChats: chatsCount.data().count,
        newLeads,
        byService,
        byStatus,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
      res.status(500).json({ error: 'Failed to fetch stats' });
    }
  });

  app.get('/api/admin/chats', requireAdmin, async (req, res) => {
    const { limit = '30' } = req.query as { limit: string };
    try {
      const snapshot = await db.collection('chats')
        .orderBy('updatedAt', 'desc')
        .limit(Math.min(100, parseInt(limit)))
        .get();

      const chats = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        updatedAt: doc.data().updatedAt?.toDate
          ? { _seconds: Math.floor(doc.data().updatedAt.toDate().getTime() / 1000) }
          : null,
      }));

      res.json({ chats, count: chats.length });
    } catch (error) {
      console.error('Error fetching chats:', error);
      res.status(500).json({ error: 'Failed to fetch chats' });
    }
  });

  app.get('/api/admin/chats/:id/messages', requireAdmin, async (req, res) => {
    const { id } = req.params;
    try {
      const snapshot = await db.collection('chats').doc(id)
        .collection('messages')
        .orderBy('timestamp', 'asc')
        .get();

      const messages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate
          ? { _seconds: Math.floor(doc.data().timestamp.toDate().getTime() / 1000) }
          : null,
      }));

      res.json({ messages, chatId: id });
    } catch (error) {
      console.error('Error fetching messages:', error);
      res.status(500).json({ error: 'Failed to fetch messages' });
    }
  });

  // ── VITE / STATIC ──────────────────────────────────────────────────────────
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_, res) => res.sendFile(path.join(distPath, 'index.html')));
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`\n🔌 Haq Electrics Server  →  http://localhost:${PORT}`);
    console.log(`📊 Admin Dashboard      →  http://localhost:${PORT}/admin`);
    console.log(`🔑 Admin Password       →  ${ADMIN_PASSWORD}\n`);
  });
}

startServer();
