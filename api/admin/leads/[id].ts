import type { IncomingMessage, ServerResponse } from 'http';
import { db, admin } from '../../_lib/firebase';
import { verifyToken, getTokenFromRequest, unauthorized } from '../../_lib/auth';

const ALLOWED_STATUSES = ['new', 'contacted', 'quoted', 'closed', 'lost'];

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  res.setHeader('Content-Type', 'application/json');

  const token = getTokenFromRequest(req);
  if (!token || !verifyToken(token)) return unauthorized(res);

  // Vercel passes dynamic segment via query
  const id = (req as any).query?.id as string;
  if (!id) {
    res.statusCode = 400;
    res.end(JSON.stringify({ error: 'Missing lead ID' }));
    return;
  }

  if (req.method === 'PATCH') {
    const body = await new Promise<string>(resolve => {
      let data = '';
      req.on('data', chunk => (data += chunk));
      req.on('end', () => resolve(data));
    });

    let status: string | undefined;
    let notes: string | undefined;
    try {
      ({ status, notes } = JSON.parse(body));
    } catch {
      res.statusCode = 400;
      res.end(JSON.stringify({ error: 'Invalid body' }));
      return;
    }

    if (status && !ALLOWED_STATUSES.includes(status)) {
      res.statusCode = 400;
      res.end(JSON.stringify({ error: 'Invalid status value' }));
      return;
    }

    const updates: Record<string, unknown> = {
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };
    if (status !== undefined) updates.status = status;
    if (notes !== undefined) updates.notes = notes;

    await db.collection('leads').doc(id).update(updates);
    res.statusCode = 200;
    res.end(JSON.stringify({ success: true }));
    return;
  }

  if (req.method === 'DELETE') {
    await db.collection('leads').doc(id).delete();
    res.statusCode = 200;
    res.end(JSON.stringify({ success: true }));
    return;
  }

  res.statusCode = 405;
  res.end(JSON.stringify({ error: 'Method not allowed' }));
}
