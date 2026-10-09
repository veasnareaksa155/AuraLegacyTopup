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
  const partnerId = process.env.MOOGOLD_PARTNER_ID || '439c30de1ab4a6932c4b52d471fe6a36';
  const secretKey = process.env.MOOGOLD_SECRET_KEY || 'TqJSFA0yBs';
  const hasPartnerId = Boolean(partnerId);
  const hasSecretKey = Boolean(secretKey);
  const isSandbox = process.env.FORCE_SANDBOX === 'true';

  res.json({
    isReady: true,
    isConfigured: hasPartnerId && hasSecretKey,
    mode: isSandbox ? 'SANDBOX (Simulation Mode)' : 'LIVE (Connected to MooGold API Engine)',
    partnerIdMasked: hasPartnerId ? `${partnerId.slice(0, 4)}***` : 'Not Set',
    endpoint: process.env.MOOGOLD_BASE_URL || 'https://moogold.com/wp-json/v1/api/',
    staticProxy: {
      enabled: process.env.STATIC_PROXY_ENABLED !== 'false',
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

// In-memory data repositories
const serverOrdersDb = [];
let serverCatalogDb = null;

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

    // Automatically record order in server orders repository
    const recordedOrder = {
      id: result.order_id || result.partnerOrderId || 'AURA-' + Date.now(),
      gameId,
      gameTitle: denomName || gameId,
      denomId,
      denomination: denomName || 'Game Item',
      amount: 'Direct Top-Up',
      userId,
      zoneId,
      server,
      whatsapp,
      status: result.status || 'COMPLETED',
      createdAt: new Date().toISOString(),
      moogoldOrderId: result.order_id,
      moogoldMessage: result.message,
    };
    serverOrdersDb.unshift(recordedOrder);

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

// Admin API Endpoints: Orders
app.get('/api/admin/orders', (req, res) => {
  res.json({ success: true, orders: serverOrdersDb });
});

app.post('/api/admin/orders', (req, res) => {
  const { order } = req.body;
  if (order && order.id) {
    const idx = serverOrdersDb.findIndex((o) => o.id === order.id);
    if (idx >= 0) {
      serverOrdersDb[idx] = { ...serverOrdersDb[idx], ...order };
    } else {
      serverOrdersDb.unshift(order);
    }
  }
  res.json({ success: true, count: serverOrdersDb.length });
});

app.put('/api/admin/orders/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const order = serverOrdersDb.find((o) => o.id === id);
  if (order) {
    order.status = status;
    return res.json({ success: true, order });
  }
  res.status(404).json({ success: false, error: 'Order not found' });
});

// Admin API Endpoints: Catalog
app.get('/api/admin/catalog', (req, res) => {
  res.json({ success: true, catalog: serverCatalogDb });
});

app.post('/api/admin/catalog', (req, res) => {
  const { games } = req.body;
  if (Array.isArray(games)) {
    serverCatalogDb = games;
  }
  res.json({ success: true, message: 'Catalog updated successfully' });
});

export default app;


