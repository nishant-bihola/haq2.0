import type { IncomingMessage, ServerResponse } from 'http';
import { db, admin } from '../../_lib/firebase';
import { verifyToken, getTokenFromRequest, unauthorized } from '../../_lib/auth';
import { URL } from 'url';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  res.setHeader('Content-Type', 'application/json');

  const token = getTokenFromRequest(req);
  if (!token || !verifyToken(token)) return unauthorized(res);

  if (req.method !== 'GET') {
    res.statusCode = 405;
    res.end(JSON.stringify({ error: 'Method not allowed' }));
    return;
  }

  try {
    const url = new URL(req.url || '/', `http://${req.headers.host}`);
    const limit = Math.min(100, parseInt(url.searchParams.get('limit') || '50'));
    const status = url.searchParams.get('status');
    const service = url.searchParams.get('service');

    let query: admin.firestore.Query = db.collection('leads').orderBy('createdAt', 'desc');
    if (status && status !== 'all') query = query.where('status', '==', status);
    if (service && service !== 'all') query = query.where('service', '==', service);

    const snapshot = await query.limit(limit).get();
    const leads = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate
        ? { _seconds: Math.floor(doc.data().createdAt.toDate().getTime() / 1000) }
        : null,
    }));

    res.statusCode = 200;
    res.end(JSON.stringify({ leads, count: leads.length }));
  } catch (err) {
    console.error('leads fetch error:', err);
    res.statusCode = 500;
    res.end(JSON.stringify({ error: 'Failed to fetch leads' }));
  }
}
