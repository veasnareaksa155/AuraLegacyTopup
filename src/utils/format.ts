import type { Currency } from '../types';

const EXCHANGE_RATES: Record<Currency, number> = {
  IDR: 1,
  USD: 16000,
  MYR: 3600,
  PHP: 280,
  THB: 460,
  KHR: 3.9,
};

const CURRENCY_SYMBOLS: Record<Currency, string> = {
  IDR: 'Rp ',
  USD: '$',
  MYR: 'RM ',
  PHP: '₱',
  THB: '฿',
  KHR: '៛',
};

export function formatPrice(amountIdr: number, currency: Currency = 'USD'): string {
  const rate = EXCHANGE_RATES[currency];
  const converted = amountIdr / rate;

  if (currency === 'IDR') {
    return 'Rp ' + Math.round(converted).toLocaleString('id-ID');
  }

  if (currency === 'KHR') {
    return '៛ ' + Math.round(converted).toLocaleString('en-US');
  }

  if (currency === 'USD') {
    return '$' + converted.toFixed(2);
  }

  return CURRENCY_SYMBOLS[currency] + converted.toFixed(1);
}

export function generateOrderId(): string {
  const prefix = 'AURA';
  const timestamp = Math.floor(Date.now() / 1000).toString().slice(-4);
  const randomChars = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}${randomChars}`;
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
