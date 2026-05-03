import type { IncomingMessage, ServerResponse } from 'http';
import { db, admin } from '../_lib/firebase';
import { verifyToken, getTokenFromRequest, unauthorized } from '../_lib/auth';

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

    res.statusCode = 200;
    res.end(JSON.stringify({
      totalLeads: leadsSnap.size,
      todayLeads: todaySnap.size,
      totalChats: chatsCount.data().count,
      newLeads,
      byService,
      byStatus,
    }));
  } catch (err) {
    console.error('stats error:', err);
    res.statusCode = 500;
    res.end(JSON.stringify({ error: 'Failed to fetch stats' }));
  }
}
