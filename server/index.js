import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import express from 'express';
import app from './app.js';

const PORT = process.env.PORT || 5050;

// Serve Built Frontend Assets in Production
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, '../dist');

if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  // SPA fallback for Express 5
  app.use((req, res, next) => {
    if (req.method === 'GET' && !req.path.startsWith('/api')) {
      return res.sendFile(path.join(distPath, 'index.html'));
    }
    next();
  });
}

// Start Server
const server = app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 Aura Legacy MooGold Top-Up API Server Running!`);
  console.log(`📡 URL: http://localhost:${PORT}`);
  console.log(`🔑 Mode: ${process.env.MOOGOLD_SANDBOX === 'false' ? 'LIVE PRODUCTION' : 'SANDBOX SIMULATION'}`);
  console.log(`🌐 Outbound Static IP: ${process.env.STATIC_OUTBOUND_IP || '142.111.67.146'} (Japan Tokyo)`);
  console.log(`====================================================`);
});

server.on('error', (err) => {
  console.error('[Server Error]', err);
});

// Keep event loop active
setInterval(() => {}, 60000);
