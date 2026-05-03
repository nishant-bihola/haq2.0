import type { IncomingMessage, ServerResponse } from 'http';
import { db } from '../../../_lib/firebase';
import { verifyToken, getTokenFromRequest, unauthorized } from '../../../_lib/auth';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  res.setHeader('Content-Type', 'application/json');

  const token = getTokenFromRequest(req);
  if (!token || !verifyToken(token)) return unauthorized(res);

  if (req.method !== 'GET') {
    res.statusCode = 405;
    res.end(JSON.stringify({ error: 'Method not allowed' }));
    return;
  }

  const id = (req as any).query?.id as string;
  if (!id) {
    res.statusCode = 400;
    res.end(JSON.stringify({ error: 'Missing chat ID' }));
    return;
  }

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

    res.statusCode = 200;
    res.end(JSON.stringify({ messages, chatId: id }));
  } catch (err) {
    console.error('messages fetch error:', err);
    res.statusCode = 500;
    res.end(JSON.stringify({ error: 'Failed to fetch messages' }));
  }
}
