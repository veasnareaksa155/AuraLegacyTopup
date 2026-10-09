/**
 * Aura Legacy Orders Management Service
 */

export interface ManagedOrder {
  id: string;
  gameId: string;
  gameTitle: string;
  gameThumbnail?: string;
  denomId: string;
  denomination: string;
  amount: string;
  userId: string;
  zoneId?: string;
  server?: string;
  whatsapp?: string;
  priceIdr: number;
  priceUsd: number;
  paymentMethod: string;
  status: 'COMPLETED' | 'QUEUED' | 'PROCESSING' | 'FAILED';
  createdAt: string;
  moogoldOrderId?: string;
  moogoldMessage?: string;
}

const ORDERS_STORAGE_KEY = 'aura_orders_db';

const SEED_ORDERS: ManagedOrder[] = [
  {
    id: 'AURA-982104',
    gameId: 'mobile-legends',
    gameTitle: 'Mobile Legends: Bang Bang',
    gameThumbnail: 'https://play-lh.googleusercontent.com/MztmLpB1-_eFbHnqNzzvzl5zjiOH2BEb0D71uBxZYf_4BEmW3QEPWODhRtyqY7Qz4wRLwQ--Rg1RAjOFqtHSs-o=w600-h600',
    denomId: 'ml-wdp',
    denomination: 'Weekly Diamond Pass',
    amount: 'Pass 🎫',
    userId: '81923481',
    zoneId: '2104',
    server: 'Asia',
    whatsapp: '012984521',
    priceIdr: 26400,
    priceUsd: 1.65,
    paymentMethod: 'KHQR (Bakong / គ្រប់ធនាគារ)',
    status: 'COMPLETED',
    createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 mins ago
    moogoldOrderId: 'MG-782194',
    moogoldMessage: 'Top-up completed successfully via MooGold API Engine',
  },
  {
    id: 'AURA-982089',
    gameId: 'mobile-legends',
    gameTitle: 'Mobile Legends: Bang Bang',
    gameThumbnail: 'https://play-lh.googleusercontent.com/MztmLpB1-_eFbHnqNzzvzl5zjiOH2BEb0D71uBxZYf_4BEmW3QEPWODhRtyqY7Qz4wRLwQ--Rg1RAjOFqtHSs-o=w600-h600',
    denomId: 'ml-86',
    denomination: '86 Diamonds',
    amount: '86 💎',
    userId: '65412980',
    zoneId: '8012',
    server: 'Asia',
    whatsapp: '098765432',
    priceIdr: 20800,
    priceUsd: 1.30,
    paymentMethod: 'KHQR (Bakong / គ្រប់ធនាគារ)',
    status: 'COMPLETED',
    createdAt: new Date(Date.now() - 1000 * 60 * 18).toISOString(), // 18 mins ago
    moogoldOrderId: 'MG-782165',
    moogoldMessage: 'Instant injection completed in 1.1s',
  },
  {
    id: 'AURA-981977',
    gameId: 'free-fire',
    gameTitle: 'Free Fire MAX',
    gameThumbnail: 'https://play-lh.googleusercontent.com/cK-U0_B9GrnSy26SNISDuvU_hL4VggyqJ1J5V2oiuyVEfiGo7fzegdBjk0ejXPg3PKK5sPwumdLBbWv8KkBKLQ=w600-h600',
    denomId: 'ff-355',
    denomination: '341 Diamonds',
    amount: '341 💎',
    userId: '189284018',
    whatsapp: '088712345',
    priceIdr: 49600,
    priceUsd: 3.10,
    paymentMethod: 'KHQR (Bakong / គ្រប់ធនាគារ)',
    status: 'QUEUED',
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45 mins ago
    moogoldOrderId: 'AURA-981977',
    moogoldMessage: 'Order queued: MooGold balance reload pending',
  },
  {
    id: 'AURA-981850',
    gameId: 'genshin-impact',
    gameTitle: 'Genshin Impact',
    gameThumbnail: 'https://play-lh.googleusercontent.com/PQEqjOxr-3uZaNHmWoQinLVQQ9fbSegMKXmqgFm5nGgagqC2REH-1er3BguYStWbH3YStijj5WH1DDlwPh2ehw=w600-h600',
    denomId: 'gi-welkin',
    denomination: 'Blessing of the Welkin Moon',
    amount: 'Welkin 🌙',
    userId: '812934892',
    server: 'Asia',
    whatsapp: '010293847',
    priceIdr: 82400,
    priceUsd: 5.15,
    paymentMethod: 'KHQR (Bakong / គ្រប់ធនាគារ)',
    status: 'COMPLETED',
    createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(), // 2 hours ago
    moogoldOrderId: 'MG-781902',
    moogoldMessage: 'Delivered successfully via UID 812934892',
  },
  {
    id: 'AURA-981720',
    gameId: 'mobile-legends',
    gameTitle: 'Mobile Legends: Bang Bang',
    gameThumbnail: 'https://play-lh.googleusercontent.com/MztmLpB1-_eFbHnqNzzvzl5zjiOH2BEb0D71uBxZYf_4BEmW3QEPWODhRtyqY7Qz4wRLwQ--Rg1RAjOFqtHSs-o=w600-h600',
    denomId: 'ml-172',
    denomination: '172 Diamonds',
    amount: '172 💎',
    userId: '99281744',
    zoneId: '2001',
    server: 'Asia',
    whatsapp: '077889900',
    priceIdr: 40800,
    priceUsd: 2.55,
    paymentMethod: 'KHQR (Bakong / គ្រប់ធនាគារ)',
    status: 'COMPLETED',
    createdAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(), // 3 hours ago
    moogoldOrderId: 'MG-781750',
    moogoldMessage: 'Instant transaction completed',
  },
];

class OrderService {
  private orders: ManagedOrder[] = [];
  private listeners: Array<(orders: ManagedOrder[]) => void> = [];

  constructor() {
    this.orders = this.loadOrders();
    this.syncFromBackend();
  }

  private loadOrders(): ManagedOrder[] {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('[OrderService] Could not parse stored orders:', e);
    }
    return SEED_ORDERS;
  }

  public getOrders(): ManagedOrder[] {
    return this.orders;
  }

  public addOrder(orderData: Partial<ManagedOrder>): ManagedOrder {
    const newOrder: ManagedOrder = {
      id: orderData.id || 'AURA-' + Math.floor(100000 + Math.random() * 900000),
      gameId: orderData.gameId || 'general',
      gameTitle: orderData.gameTitle || 'Game Top-Up',
      gameThumbnail: orderData.gameThumbnail,
      denomId: orderData.denomId || 'denom-1',
      denomination: orderData.denomination || 'Game Item',
      amount: orderData.amount || 'Pack',
      userId: orderData.userId || 'Unknown',
      zoneId: orderData.zoneId,
      server: orderData.server,
      whatsapp: orderData.whatsapp,
      priceIdr: orderData.priceIdr || 20800,
      priceUsd: orderData.priceUsd || (orderData.priceIdr ? orderData.priceIdr / 16000 : 1.30),
      paymentMethod: orderData.paymentMethod || 'KHQR (Bakong)',
      status: orderData.status || 'COMPLETED',
      createdAt: orderData.createdAt || new Date().toISOString(),
      moogoldOrderId: orderData.moogoldOrderId,
      moogoldMessage: orderData.moogoldMessage,
    };

    this.orders = [newOrder, ...this.orders];
    this.persist();
    this.notify();
    this.syncToBackend(newOrder);

    return newOrder;
  }

  public updateOrderStatus(orderId: string, status: ManagedOrder['status']): void {
    this.orders = this.orders.map((o) => (o.id === orderId ? { ...o, status } : o));
    this.persist();
    this.notify();
  }

  public async retryMooGoldFulfillment(orderId: string): Promise<{ success: boolean; message: string; raw?: any }> {
    const order = this.orders.find((o) => o.id === orderId);
    if (!order) {
      return { success: false, message: 'Order not found' };
    }

    try {
      this.updateOrderStatus(orderId, 'PROCESSING');

      const response = await fetch('/api/moogold/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gameId: order.gameId,
          denomId: order.denomId,
          denomName: order.denomination,
          userId: order.userId,
          zoneId: order.zoneId,
          server: order.server,
          whatsapp: order.whatsapp,
        }),
      });

      const data = await response.json();

      if (data.status === 'COMPLETED' || data.success) {
        this.orders = this.orders.map((o) =>
          o.id === orderId
            ? {
                ...o,
                status: data.status === 'QUEUED' ? 'QUEUED' : 'COMPLETED',
                moogoldOrderId: data.order_id || o.moogoldOrderId,
                moogoldMessage: data.message || 'MooGold fulfillment processed',
              }
            : o
        );
        this.persist();
        this.notify();
        return {
          success: true,
          message: data.status === 'QUEUED' ? 'Order re-queued (Balance reload needed)' : 'MooGold top-up completed successfully!',
          raw: data,
        };
      } else {
        this.updateOrderStatus(orderId, 'FAILED');
        return {
          success: false,
          message: data.error || 'Failed to fulfill via MooGold',
          raw: data,
        };
      }
    } catch (err: any) {
      this.updateOrderStatus(orderId, 'QUEUED');
      return { success: false, message: err.message || 'Network error during fulfillment' };
    }
  }

  public deleteOrder(orderId: string): void {
    this.orders = this.orders.filter((o) => o.id !== orderId);
    this.persist();
    this.notify();
  }

  public clearAllOrders(): void {
    this.orders = [];
    this.persist();
    this.notify();
  }

  public subscribe(listener: (orders: ManagedOrder[]) => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notify(): void {
    this.listeners.forEach((l) => {
      try {
        l(this.orders);
      } catch (err) {
        console.error('[OrderService] Listener error:', err);
      }
    });
  }

  private persist(): void {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(this.orders));
    } catch (e) {
      console.error('[OrderService] Failed to persist orders:', e);
    }
  }

  private async syncToBackend(order: ManagedOrder): Promise<void> {
    try {
      await fetch('/api/admin/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order }),
      });
    } catch {
      // offline fallback
    }
  }

  private async syncFromBackend(): Promise<void> {
    try {
      const res = await fetch('/api/admin/orders');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.orders) && data.orders.length > 0) {
          // Merge unique orders
          const existingIds = new Set(this.orders.map((o) => o.id));
          const newOrders = data.orders.filter((o: ManagedOrder) => !existingIds.has(o.id));
          if (newOrders.length > 0) {
            this.orders = [...newOrders, ...this.orders];
            this.persist();
            this.notify();
          }
        }
      }
    } catch {
      // fallback to local
    }
  }
}

export const orderService = new OrderService();

