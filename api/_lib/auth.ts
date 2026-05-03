import { createHmac, randomBytes } from 'crypto';
import type { IncomingMessage, ServerResponse } from 'http';

const getSecret = () => process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD || 'haq2025admin';

export function createToken(): string {
  const ts = Date.now().toString();
  const rand = randomBytes(16).toString('hex');
  const payload = `${ts}.${rand}`;
  const sig = createHmac('sha256', getSecret()).update(payload).digest('hex');
  return Buffer.from(`${payload}.${sig}`).toString('base64url');
}

export function verifyToken(token: string): boolean {
  try {
    const decoded = Buffer.from(token, 'base64url').toString();
    const lastDot = decoded.lastIndexOf('.');
    const payload = decoded.slice(0, lastDot);
    const sig = decoded.slice(lastDot + 1);
    const expected = createHmac('sha256', getSecret()).update(payload).digest('hex');
    const ts = parseInt(payload.split('.')[0]);
    const age = Date.now() - ts;
    return sig === expected && age >= 0 && age < 24 * 60 * 60 * 1000;
  } catch {
    return false;
  }
}

export function getTokenFromRequest(req: IncomingMessage): string | null {
  const auth = req.headers['authorization'] || '';
  return auth.startsWith('Bearer ') ? auth.slice(7) : null;
}

export function unauthorized(res: ServerResponse): void {
  res.statusCode = 401;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ error: 'Unauthorized' }));
}

export function checkPassword(password: string): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD || 'haq2025admin';
  return password === adminPassword;
}
