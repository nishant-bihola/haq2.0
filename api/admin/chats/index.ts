import type { IncomingMessage, ServerResponse } from 'http';
import { db } from '../../_lib/firebase';
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
    const limit = Math.min(100, parseInt(url.searchParams.get('limit') || '30'));

    const snapshot = await db.collection('chats')
      .orderBy('updatedAt', 'desc')
      .limit(limit)
      .get();

    const chats = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      updatedAt: doc.data().updatedAt?.toDate
        ? { _seconds: Math.floor(doc.data().updatedAt.toDate().getTime() / 1000) }
        : null,
    }));

    res.statusCode = 200;
    res.end(JSON.stringify({ chats, count: chats.length }));
  } catch (err) {
    console.error('chats fetch error:', err);
    res.statusCode = 500;
    res.end(JSON.stringify({ error: 'Failed to fetch chats' }));
  }
}
