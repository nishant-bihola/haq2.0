import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';
import firebaseConfig from './firebase-applet-config.json' assert { type: 'json' };

dotenv.config();

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    projectId: firebaseConfig.projectId,
  });
}

const db = getFirestore(firebaseConfig.firestoreDatabaseId);

let genAI: GoogleGenerativeAI | null = null;

function getModel() {
  if (!genAI) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || apiKey === 'YOUR_API_KEY') {
      throw new Error('GEMINI_API_KEY is not configured correctly. Please set your valid Gemini API Key in the AI Studio Secrets panel.');
    }
    genAI = new GoogleGenerativeAI(apiKey);
  }
  return genAI.getGenerativeModel({ 
    model: 'gemini-1.5-flash',
    systemInstruction: `You are the AI Electrical Expert for Haq Electrics, a premier electrical service provider in Edmonton, Alberta. 
Your tone is professional, safety-oriented, and helpful.

Key Responsibilities:
1. EMERGENCY HANDLING: If a user mentions sparks, smoke, fire, active flooding near outlets, or smell of burning, IMMEDIATELY tell them to:
   - Stay away from the affected area.
   - CALL US IMMEDIATELY at 1-780-297-9252 (Emergency Line).
   - If there is active fire, call 911 first.
   - Do NOT attempt to fix it yourself.

2. SERVICE GUIDANCE: We provide:
   - Panel Upgrades & Maintenance
   - EV Charging Point Installation
   - Residential & Commercial Wiring
   - Lighting Design & Installation
   - 24/7 Emergency Support

3. LEAD GENERATION: Encourage users to book a 'Direct Consultation' or fill out our contact form. If a user asks for a quote, suggest providing their phone number or name so our team can call them.

4. SAFETY ADVICE: Provide standard safety tips (e.g., "don't overload circuits", "test GFCIs monthly") but always state that complex work requires a certified electrician like those at Haq Electrics.

Keep responses concise and direct. Focus on Edmonton and surrounding area service.`,
  });
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post('/api/contact', async (req, res) => {
    const { name, email, phone, message, service } = req.body;
    
    try {
      await db.collection('leads').add({
        name,
        email,
        phone,
        message,
        service,
        source: 'Form',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
      res.status(200).json({ success: true, message: 'Lead saved successfully' });
    } catch (error) {
      console.error('Error saving lead:', error);
      res.status(500).json({ error: 'Failed to save lead' });
    }
  });

  app.post('/api/ai/chat', async (req, res) => {
    const { message, history, sessionId } = req.body;

    try {
      const model = getModel();
      const chat = model.startChat({
        history: history || [],
        generationConfig: {
          maxOutputTokens: 500,
        },
      });

      const result = await chat.sendMessage(message);
      const response = await result.response;
      const text = response.text();

      // Persist conversation if sessionId is provided
      if (sessionId) {
        const chatRef = db.collection('chats').doc(sessionId);
        await chatRef.set({
          lastMessage: text,
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        }, { merge: true });
        
        await chatRef.collection('messages').add({
          role: 'user',
          text: message,
          timestamp: admin.firestore.FieldValue.serverTimestamp(),
        });
        
        await chatRef.collection('messages').add({
          role: 'model',
          text: text,
          timestamp: admin.firestore.FieldValue.serverTimestamp(),
        });
      }

      res.json({ text });
    } catch (error) {
      console.error('AI Chat Error:', error);
      res.status(500).json({ error: 'Failed to generate AI response' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
