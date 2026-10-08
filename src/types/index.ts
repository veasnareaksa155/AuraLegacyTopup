export type GameCategory = 'all' | 'mobile' | 'pc' | 'voucher' | 'entertainment';

export interface GameDenomination {
  id: string;
  name: string;
  amount: string;
  price: number; // in base currency (IDR)
  originalPrice?: number;
  bonus?: string;
  icon?: string;
  popular?: boolean;
  category?: 'diamonds' | 'membership' | 'special';
}

export interface Game {
  id: string;
  title: string;
  publisher: string;
  category: 'mobile' | 'pc' | 'voucher' | 'entertainment';
  banner: string;
  thumbnail: string;
  popular: boolean;
  trending: boolean;
  hasZoneId?: boolean;
  zoneIdLabel?: string;
  userIdLabel?: string;
  userIdPlaceholder?: string;
  zoneIdPlaceholder?: string;
  servers?: string[];
  denominations: GameDenomination[];
  description: string;
  instructions: string[];
}

export type PaymentCategory = 'khqr' | 'qris' | 'ewallet' | 'va' | 'retail' | 'crypto';

export interface PaymentMethod {
  id: string;
  name: string;
  category: PaymentCategory;
  logo: string;
  feePercentage: number;
  feeFlat: number;
  badge?: string;
  instruction: string;
  instant: boolean;
}

export interface Order {
  id: string;
  gameId: string;
  gameTitle: string;
  gameThumbnail: string;
  userId: string;
  zoneId?: string;
  server?: string;
  nickname?: string;
  denomination: GameDenomination;
  paymentMethod: PaymentMethod;
  whatsapp?: string;
  email?: string;
  basePrice: number;
  discount: number;
  paymentFee: number;
  totalPrice: number;
  promoCode?: string;
  status: 'PENDING_PAYMENT' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
  createdAt: string;
  paidAt?: string;
}

export interface PromoCode {
  code: string;
  type: 'percent' | 'flat';
  value: number;
  minPurchase: number;
  description: string;
}

export type Currency = 'IDR' | 'USD' | 'MYR' | 'PHP' | 'THB' | 'KHR';

export type Language = 'km' | 'en' | 'id';

export type AuraTheme = 'cyan' | 'purple' | 'gold' | 'emerald' | 'crimson';

export type ThemeMode = 'dark' | 'light';
