import admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';

function initFirebase() {
  if (admin.apps.length) return admin.apps[0]!;

  const raw = process.env.FIREBASE_SERVICE_ACCOUNT;
  const credential = raw
    ? admin.credential.cert(JSON.parse(raw))
    : admin.credential.applicationDefault();

  return admin.initializeApp({
    credential,
    projectId: process.env.FIREBASE_PROJECT_ID || 'gen-lang-client-0522430066',
  });
}

initFirebase();

export { admin };
export const db = getFirestore(
  process.env.FIREBASE_DATABASE_ID || 'ai-studio-273e6fa1-0e86-48d5-bdb3-ca213ed9cb45'
);
