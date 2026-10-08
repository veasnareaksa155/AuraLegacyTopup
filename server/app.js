import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { moogold } from './moogoldService.js';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Logger
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next();
});

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'Aura Legacy Top-Up Gateway',
    timestamp: new Date().toISOString(),
  });
});

// MooGold Status Endpoint
app.get('/api/moogold/status', (req, res) => {
  const hasPartnerId = Boolean(process.env.MOOGOLD_PARTNER_ID);
  const hasSecretKey = Boolean(process.env.MOOGOLD_SECRET_KEY);
  const isSandbox = process.env.MOOGOLD_SANDBOX === 'true' || !hasPartnerId || !hasSecretKey;

  res.json({
    isReady: true,
    isConfigured: hasPartnerId && hasSecretKey,
    mode: isSandbox ? 'SANDBOX (Simulation Ready)' : 'LIVE (Connected to MooGold)',
    partnerIdMasked: hasPartnerId ? `${process.env.MOOGOLD_PARTNER_ID.slice(0, 3)}***` : 'Not Set',
    endpoint: process.env.MOOGOLD_BASE_URL || 'https://moogold.com/wp-json/v1/api/',
    staticProxy: {
      enabled: process.env.STATIC_PROXY_ENABLED === 'true',
      staticIp: process.env.STATIC_OUTBOUND_IP || '142.111.67.146',
      country: 'Japan (Tokyo)',
    },
  });
});

// Check MooGold Balance
app.get('/api/moogold/balance', async (req, res) => {
  try {
    const result = await moogold.checkBalance();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create Top-up Order
app.post('/api/moogold/create-order', async (req, res) => {
  try {
    const { gameId, denomId, denomName, userId, zoneId, server, whatsapp } = req.body;

    if (!gameId || !denomId || !userId) {
      return res.status(400).json({
        success: false,
        error: 'Missing required parameters: gameId, denomId, and userId are required.',
      });
    }

    console.log(`[Top-Up Order] Processing for Game: ${gameId}, User: ${userId}, Item: ${denomName || denomId}`);

    const result = await moogold.createOrder({
      gameId,
      denomId,
      denomName,
      userId,
      zoneId,
      server,
      whatsapp,
    });

    res.json(result);
  } catch (error) {
    console.error('[Create Order Error]', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get Order Details
app.get('/api/moogold/order/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    const result = await moogold.getOrderDetail(orderId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default app;

