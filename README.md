# 💎 Aura Legacy Top-Up — Next-Gen Game Top-Up Platform

A high-performance, cyberpunk-themed game top-up e-commerce platform built with **React 19**, **Vite**, **TypeScript**, **Tailwind CSS**, and **Express.js**.

Integrated with **Bakong KHQR (0% Fee)**, **MooGold Direct Top-Up API Gateway**, **Outbound Static Proxy**, **24/7 Live Support Chat**, and multi-language support (**Khmer & English**).

---

## 🚀 Key Features

- **🎮 Comprehensive Game Catalog:** Mobile Legends: Bang Bang, Free Fire, Honor of Kings, Valorant, Genshin Impact, and more.
- **⚡ Bakong KHQR 0% Fee Integration:** Instant QR code payments compatible with ABA Bank, Wing Bank, ACLEDA, Sathapana, Canadia, and all Bakong member apps.
- **🛡️ Direct MooGold API Gateway:** Built-in Express microservice supporting official MooGold automated top-ups with outbound static proxy routing (`142.111.67.146` Tokyo, Japan).
- **🕹️ Cyberpunk & Glassmorphism UI:** Fluid dark/light theme, ambient neon glow, sound FX, and Framer Motion spring physics animations.
- **💬 24/7 Live Support Widget:** Integrated Telegram CS (`@AuraLegacyTopup`), WhatsApp hotline, order tracker, and instant FAQs.
- **📱 Mobile-First Responsive Dock:** Custom floating curved-bubble bottom navigation bar with responsive touch UX.
- **📊 Winrate Calculator & Order Tracker:** Interactive gamer tools for MLBB stars, winrates, and real-time transaction tracking.

---

## 🛠️ Tech Stack

- **Frontend:** React 19, Vite, TypeScript, Tailwind CSS, Framer Motion, Lucide Icons, Canvas Confetti
- **Backend:** Node.js, Express.js, Undici (HTTP client with static HTTP proxy agent)
- **Deployment:** Render, Railway, Google Cloud Run, Vercel, or Linux VPS (Single-port unified Express & static client)

---

## 📦 Quick Start (Local Development)

### 1. Clone the repository
```bash
git clone https://github.com/<your-username>/aura-legacy-topup.git
cd aura-legacy-topup
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

Configure your `.env`:
```env
PORT=5050
MOOGOLD_PARTNER_ID=
MOOGOLD_SECRET_KEY=
MOOGOLD_SANDBOX=true

STATIC_PROXY_ENABLED=true
STATIC_PROXY_URL=http://sbagkqpb:lkqz5n0riu3o@142.111.67.146:5611
STATIC_OUTBOUND_IP=142.111.67.146
```

### 4. Run Development Servers
In terminal 1 (API Server):
```bash
npm run server
```

In terminal 2 (Vite Frontend):
```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## 🌐 Production Deployment

The Express server (`server/index.js`) automatically serves the compiled `dist/` client application in production on a single unified port!

### Build and Start:
```bash
npm run build
npm start
```

### Deploy to Render.com (Free & Recommended):
1. Create a new **Web Service** on [Render.com](https://render.com).
2. Connect this GitHub repository.
3. Configure build & start commands:
   - **Build Command:** `npm run build`
   - **Start Command:** `npm start`
4. In the **Environment** tab, set:
   - `STATIC_PROXY_ENABLED` = `true`
   - `STATIC_PROXY_URL` = `http://sbagkqpb:lkqz5n0riu3o@142.111.67.146:5611`
   - `STATIC_OUTBOUND_IP` = `142.111.67.146`
   - `MOOGOLD_SANDBOX` = `true` (Switch to `false` once you receive your official MooGold API keys)

---

## 🔑 MooGold Live API Activation

When your MooGold Business Account is approved:
1. Paste your `MOOGOLD_PARTNER_ID` and `MOOGOLD_SECRET_KEY` into your environment variables.
2. Change `MOOGOLD_SANDBOX` to `false`.
3. Your server immediately starts fulfilling live automated top-up orders!

---

## 📄 License
MIT © Aura Legacy Top-Up
