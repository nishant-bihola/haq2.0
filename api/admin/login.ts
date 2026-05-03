import type { IncomingMessage, ServerResponse } from 'http';
import { createToken, checkPassword } from '../_lib/auth';

const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.end(JSON.stringify({ error: 'Method not allowed' }));
    return;
  }

  // Rate limit: 5 per minute per IP
  const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0] || 'unknown';
  const now = Date.now();
  const entry = rateLimitStore.get(ip);
  if (entry && now < entry.resetAt) {
    if (entry.count >= 5) {
      res.statusCode = 429;
      res.end(JSON.stringify({ error: 'Too many attempts. Try again in a minute.' }));
      return;
    }
    entry.count++;
  } else {
    rateLimitStore.set(ip, { count: 1, resetAt: now + 60_000 });
  }

  const body = await new Promise<string>(resolve => {
    let data = '';
    req.on('data', chunk => (data += chunk));
    req.on('end', () => resolve(data));
  });

  let password = '';
  try {
    password = JSON.parse(body).password || '';
  } catch {
    res.statusCode = 400;
    res.end(JSON.stringify({ error: 'Invalid request body' }));
    return;
  }

  if (!checkPassword(password)) {
    res.statusCode = 401;
    res.end(JSON.stringify({ error: 'Invalid password' }));
    return;
  }

  const token = createToken();
  res.statusCode = 200;
  res.end(JSON.stringify({ token, expiresIn: '24h' }));
}
