import crypto from 'crypto';
import { ProxyAgent, fetch as undiciFetch } from 'undici';

/**
 * MooGold Direct Top-Up API Service
 * Official Documentation Base URL: https://moogold.com/wp-json/v1/api/
 */
class MooGoldService {
  constructor() {
    this.partnerId = process.env.MOOGOLD_PARTNER_ID || '';
    this.secretKey = process.env.MOOGOLD_SECRET_KEY || '';
    this.baseUrl = process.env.MOOGOLD_BASE_URL || 'https://moogold.com/wp-json/v1/api/';
    this.isSandbox = process.env.MOOGOLD_SANDBOX === 'true' || !this.partnerId || !this.secretKey;
    this.proxyAgent = null;
  }

  /**
   * Reload environment configuration
   */
  reloadConfig() {
    this.partnerId = process.env.MOOGOLD_PARTNER_ID || '';
    this.secretKey = process.env.MOOGOLD_SECRET_KEY || '';
    this.baseUrl = process.env.MOOGOLD_BASE_URL || 'https://moogold.com/wp-json/v1/api/';
    this.isSandbox = process.env.MOOGOLD_SANDBOX === 'true' || !this.partnerId || !this.secretKey;
  }

  /**
   * Get Outbound Static Proxy Dispatcher
   */
  getFetchDispatcher() {
    if (process.env.STATIC_PROXY_ENABLED === 'true' && process.env.STATIC_PROXY_URL) {
      if (!this.proxyAgent) {
        this.proxyAgent = new ProxyAgent(process.env.STATIC_PROXY_URL);
      }
      return this.proxyAgent;
    }
    return undefined;
  }

  /**
   * Generates MooGold HMAC-SHA256 signature and Basic Auth headers
   * Format: hash_hmac('SHA256', Payload + Timestamp + Path, SecretKey)
   */
  generateHeaders(path, payload = {}) {
    const timestamp = Math.floor(Date.now() / 1000);
    const payloadStr = typeof payload === 'string' ? payload : JSON.stringify(payload);
    
    // Formula: Payload + Timestamp + Path
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
   * Endpoint: user/check_user_balance
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
      const path = 'user/check_user_balance';
      const payload = {};
      const response = await this.postMooGold(path, payload);
      const data = await response.json();
      return {
        success: response.ok,
        isSandbox: false,
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
   * Endpoint: order/create_order
   */
  async createOrder({ gameId, denomId, denomName, userId, zoneId, server, whatsapp }) {
    this.reloadConfig();

    // In Sandbox Mode or when credentials are not yet entered
    if (this.isSandbox) {
      const simulatedOrderId = 'MG-' + Math.floor(100000 + Math.random() * 900000);
      return {
        success: true,
        isSandbox: true,
        status: 'COMPLETED',
        order_id: simulatedOrderId,
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

      // Build MooGold payload structure
      const payload = {
        category: 1, // 1 = Direct Top-Up
        'product-id': this.mapProductToMooGoldId(gameId, denomId),
        quantity: '1',
        'User ID': userId,
      };

      if (zoneId) {
        payload['Zone ID'] = zoneId;
      }
      if (server) {
        payload['Server'] = server;
      }
      if (whatsapp) {
        payload['phone'] = whatsapp;
      }

      const response = await this.postMooGold(path, payload);
      const data = await response.json();

      return {
        success: response.ok && (data.status === 'COMPLETED' || data.status === 'PROCESSING' || data.order_id),
        isSandbox: false,
        ...data,
      };
    } catch (error) {
      console.error('[MooGold] createOrder Error:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Query Order Status
   * Endpoint: order/order_detail
   */
  async getOrderDetail(orderId) {
    this.reloadConfig();

    if (this.isSandbox || orderId.startsWith('MG-')) {
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
      const payload = { order_id: orderId };
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
   * Maps game and denomination package to MooGold catalog IDs
   */
  mapProductToMooGoldId(gameId, denomId) {
    // MooGold Product ID Mapping Catalog
    const mapping = {
      // Mobile Legends
      'ml-86': 'mlbb_86',
      'ml-172': 'mlbb_172',
      'ml-257': 'mlbb_257',
      'ml-wdp': 'mlbb_pass',
      'ml-344': 'mlbb_344',
      'ml-429': 'mlbb_429',
      'ml-514': 'mlbb_514',
      'ml-706': 'mlbb_706',
      'ml-starlight': 'mlbb_starlight',
      'ml-1050': 'mlbb_1050',
      'ml-2195': 'mlbb_2195',
      // Free Fire
      'ff-70': 'ff_70',
      'ff-140': 'ff_140',
      'ff-355': 'ff_355',
      'ff-720': 'ff_720',
      'ff-member-w': 'ff_pass_weekly',
      // Genshin Impact
      'gi-welkin': 'gi_welkin',
      'gi-60': 'gi_60',
      'gi-300': 'gi_300',
      'gi-980': 'gi_980',
      // Valorant
      'val-475': 'val_475',
      'val-1000': 'val_1000',
      'val-2050': 'val_2050',
      // Roblox
      'rbx-80': 'rbx_80',
      'rbx-400': 'rbx_400',
      'rbx-800': 'rbx_800',
    };

    return mapping[denomId] || denomId;
  }
}

export const moogold = new MooGoldService();

