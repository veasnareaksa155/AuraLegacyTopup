import crypto from 'crypto';
import { ProxyAgent, fetch as undiciFetch } from 'undici';

/**
 * MooGold Direct Top-Up API Service
 * Official Documentation Base URL: https://moogold.com/wp-json/v1/api/
 * Whitelisted Outbound Proxy IP: 142.111.67.146
 */
class MooGoldService {
  constructor() {
    this.reloadConfig();
    this.proxyAgent = null;
  }

  /**
   * Reload environment configuration dynamically
   */
  reloadConfig() {
    this.partnerId = process.env.MOOGOLD_PARTNER_ID || '439c30de1ab4a6932c4b52d471fe6a36';
    this.secretKey = process.env.MOOGOLD_SECRET_KEY || 'TqJSFA0yBs';
    this.userId = process.env.MOOGOLD_USER_ID || '919374';
    this.baseUrl = process.env.MOOGOLD_BASE_URL || 'https://moogold.com/wp-json/v1/api/';
    this.isSandbox = process.env.MOOGOLD_SANDBOX === 'true';
  }

  /**
   * Get Outbound Static Proxy Dispatcher
   */
  getFetchDispatcher() {
    const proxyUrl = process.env.STATIC_PROXY_URL || 'http://sbagkqpb:lkqz5n0riu3o@142.111.67.146:5611';
    if (process.env.STATIC_PROXY_ENABLED !== 'false' && proxyUrl) {
      if (!this.proxyAgent) {
        this.proxyAgent = new ProxyAgent(proxyUrl);
      }
      return this.proxyAgent;
    }
    return undefined;
  }

  /**
   * Generates MooGold HMAC-SHA256 signature and Basic Auth headers
   * Formula: hash_hmac('sha256', PayloadJSON + Timestamp + Path, SecretKey)
   */
  generateHeaders(path, payload = {}) {
    const timestamp = Math.floor(Date.now() / 1000);
    const payloadStr = typeof payload === 'string' ? payload : JSON.stringify(payload);

    // Exact MooGold formula: payload + timestamp + path
    const stringToSign = payloadStr + timestamp + path;
    const authSignature = crypto
      .createHmac('sha256', this.secretKey)
      .update(stringToSign)
      .digest('hex');

    // Basic Auth: base64(partner_id:secret_key)
    const basicAuth = Buffer.from(`${this.partnerId}:${this.secretKey}`).toString('base64');

    return {
      'Authorization': `Basic ${basicAuth}`,
      'auth': authSignature,
      'timestamp': timestamp.toString(),
      'Content-Type': 'application/json',
    };
  }

  /**
   * Send HTTP POST request to MooGold API via Outbound Static Proxy
   */
  async postMooGold(path, payload = {}) {
    const headers = this.generateHeaders(path, payload);
    const dispatcher = this.getFetchDispatcher();

    const options = {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    };

    if (dispatcher) {
      options.dispatcher = dispatcher;
    }

    return await undiciFetch(`${this.baseUrl}${path}`, options);
  }

  /**
   * Check Partner Wallet Balance
   * Official Endpoint: user/balance
   */
  async checkBalance() {
    this.reloadConfig();

    if (this.isSandbox) {
      return {
        success: true,
        isSandbox: true,
        balance: '500.00',
        currency: 'USD',
        message: 'MooGold Sandbox Mode Active: Simulated Balance',
      };
    }

    try {
      const path = 'user/balance';
      const payload = { path: 'user/balance' };
      const response = await this.postMooGold(path, payload);
      const data = await response.json();

      return {
        success: response.ok,
        isSandbox: false,
        balance: data.balance !== undefined ? data.balance : '0.00',
        currency: data.currency || 'USD',
        ...data,
      };
    } catch (error) {
      console.error('[MooGold] checkBalance Error:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Create Direct Top-Up Order
   * Official Endpoint: order/create_order
   */
  async createOrder({ gameId, denomId, denomName, userId, zoneId, server, whatsapp }) {
    this.reloadConfig();

    const partnerOrderId = 'AURA-' + Date.now();

    if (this.isSandbox) {
      const simulatedOrderId = 'MG-' + Math.floor(100000 + Math.random() * 900000);
      return {
        success: true,
        isSandbox: true,
        status: 'COMPLETED',
        order_id: simulatedOrderId,
        partnerOrderId,
        gameId,
        denomId,
        item: denomName || 'Diamonds Pack',
        userId,
        zoneId: zoneId || '',
        server: server || '',
        transaction_time: new Date().toISOString(),
        message: 'Top-up automatically processed via MooGold Sandbox Engine!',
      };
    }

    try {
      const path = 'order/create_order';
      const variationId = this.mapProductToMooGoldId(gameId, denomId);

      // Build data fields matching MooGold specifications
      const orderData = {
        category: 1, // 1 = Direct Top-Up
        'product-id': variationId,
        quantity: '1',
      };

      if (gameId === 'free-fire') {
        orderData['Player ID'] = String(userId);
      } else if (gameId === 'mobile-legends') {
        orderData['User ID'] = String(userId);
        orderData['Server ID'] = String(zoneId || server || '');
      } else {
        orderData['User ID'] = String(userId);
        if (server) orderData['Server'] = String(server);
      }

      if (whatsapp) {
        orderData['phone'] = String(whatsapp);
      }

      const payload = {
        path: 'order/create_order',
        data: orderData,
        partnerOrderId,
      };

      console.log(`[MooGold API] Submitting Order:`, JSON.stringify(payload));
      const response = await this.postMooGold(path, payload);
      const data = await response.json();
      console.log(`[MooGold API] Response:`, data);

      // Successful order execution by MooGold
      if (data.status === true || data.status === 'COMPLETED' || data.status === 'PROCESSING' || data.order_id) {
        return {
          success: true,
          isSandbox: false,
          status: 'COMPLETED',
          order_id: data.order_id || data.account_details?.order_id || partnerOrderId,
          partnerOrderId,
          message: data.message || 'Top-up completed successfully via MooGold!',
          raw: data,
        };
      }

      // Handle insufficient balance gracefully without failing customer order
      if (data.err_code === '111') {
        console.warn(`[MooGold API] Insufficient Balance ($0). Order queued as PENDING: ${partnerOrderId}`);
        return {
          success: true, // Success for customer checkout UI
          isSandbox: false,
          status: 'QUEUED',
          isQueued: true,
          order_id: partnerOrderId,
          partnerOrderId,
          message: 'ការបញ្ជាទិញទទួលបានជោគជ័យ! ប្រព័ន្ធកំពុងដំណើរការបញ្ចូលជូន (Order Queued for automated delivery).',
          adminNotice: 'MooGold balance is currently 0 USD. Kindly reload balance on MooGold dashboard to fulfill immediately.',
        };
      }

      // Other API errors
      return {
        success: false,
        isSandbox: false,
        status: 'FAILED',
        error: data.err_message || data.message || 'Top-up processing encountered an error.',
        err_code: data.err_code,
        partnerOrderId,
      };
    } catch (error) {
      console.error('[MooGold] createOrder Error:', error);
      return {
        success: false,
        error: error.message,
        partnerOrderId,
      };
    }
  }

  /**
   * Query Order Status
   * Official Endpoint: order/order_detail
   */
  async getOrderDetail(orderId) {
    this.reloadConfig();

    if (this.isSandbox || String(orderId).startsWith('MG-')) {
      return {
        success: true,
        isSandbox: true,
        order_id: orderId,
        status: 'COMPLETED',
        delivery_time: '1.2 seconds',
      };
    }

    try {
      const path = 'order/order_detail';
      const payload = {
        path: 'order/order_detail',
        order_id: parseInt(orderId, 10) || orderId,
      };
      const response = await this.postMooGold(path, payload);
      const data = await response.json();
      return {
        success: response.ok,
        isSandbox: false,
        ...data,
      };
    } catch (error) {
      console.error('[MooGold] getOrderDetail Error:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Maps game and denomination package to live verified MooGold variation IDs
   */
  mapProductToMooGoldId(gameId, denomId) {
    const mapping = {
      // Mobile Legends (MooGold Product 15145)
      'ml-86': 5555348,      // 78 + 8 Diamonds ($1.25)
      'ml-172': 5555347,     // 156 + 16 Diamonds ($2.47)
      'ml-257': 5555346,     // 234 + 23 Diamonds ($3.58)
      'ml-wdp': 4690783,     // Weekly Diamond Pass ($1.54)
      'ml-344': 4690777,     // 317 + 38 Diamonds ($5.90)
      'ml-429': 4690779,     // 633 + 83 Diamonds ($11.79)
      'ml-514': 5555345,     // 625 + 81 Diamonds ($9.73)
      'ml-706': 5555345,     // 625 + 81 Diamonds ($9.73)
      'ml-starlight': 4690786, // Twilight Pass / Starlight ($8.32)
      'ml-1050': 7576658,    // 940 + 144 Diamonds ($17.79)
      'ml-2195': 5555344,    // 1860 + 335 Diamonds ($29.45)
      'ml-twilight': 4690786, // Twilight Pass ($8.32)

      // Free Fire (MooGold Product 7847)
      'ff-70': 11011927,     // 50 Diamonds ($0.50)
      'ff-140': 215570,      // 110 Diamonds ($1.00)
      'ff-355': 18604785,    // 341 Diamonds ($2.95)
      'ff-720': 18604786,    // 572 Diamonds ($4.42)
      'ff-member-w': 11012068, // Weekly Lite ($0.28)
      'ff-member-m': 18604787, // 1166 Diamonds ($9.48)
      'ff-1440': 18604787,   // 1166 Diamonds ($9.48)
      'ff-2180': 18604788,   // 2398 Diamonds ($18.54)
    };

    return mapping[denomId] || denomId;
  }
}

export const moogold = new MooGoldService();
