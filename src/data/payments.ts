import type { PaymentMethod } from '../types';
import abaLogo from '../assets/banks/aba.png';
import wingLogo from '../assets/banks/wing.png';
import acledaLogo from '../assets/banks/acleda.png';
import bakongLogo from '../assets/banks/bakong.png';
import canadiaLogo from '../assets/banks/canadia.png';
import sathapanaLogo from '../assets/banks/sathapana.png';
import truemoneyLogo from '../assets/banks/truemoney.png';

export interface SupportedBank {
  id: string;
  name: string;
  logo: string;
}

export const SUPPORTED_CAMBODIAN_BANKS: SupportedBank[] = [
  { id: 'aba', name: 'ABA Mobile', logo: abaLogo },
  { id: 'wing', name: 'Wing Bank', logo: wingLogo },
  { id: 'acleda', name: 'ACLEDA', logo: acledaLogo },
  { id: 'bakong', name: 'Bakong', logo: bakongLogo },
  { id: 'canadia', name: 'Canadia', logo: canadiaLogo },
  { id: 'sathapana', name: 'Sathapana', logo: sathapanaLogo },
  { id: 'truemoney', name: 'TrueMoney', logo: truemoneyLogo },
];

export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: 'khqr',
    name: 'KHQR (Bakong / គ្រប់ធនាគារ)',
    category: 'khqr',
    logo: bakongLogo,
    feePercentage: 0,
    feeFlat: 0,
    badge: '0% FEE • INSTANT',
    instruction: 'Scan KHQR with ABA Mobile, Wing Bank, ACLEDA mobile, Bakong, or any Cambodian Banking App.',
    instant: true,
  },
];

export const MOCK_ORDERS = [
  {
    id: 'AURA-849201',
    gameTitle: 'Mobile Legends: Bang Bang',
    denomination: '86 Diamonds',
    status: 'COMPLETED',
    time: '1 នាទីមុន',
    user: 'Alex***91',
    total: '$1.40'
  },
  {
    id: 'AURA-849200',
    gameTitle: 'Genshin Impact',
    denomination: 'Blessing of the Welkin Moon',
    status: 'COMPLETED',
    time: '2 menit yang lalu',
    user: 'Kaveh***02',
    total: '$3.89'
  },
  {
    id: 'AURA-849199',
    gameTitle: 'Valorant',
    denomination: '1000 Valorant Points',
    status: 'COMPLETED',
    time: '3 menit yang lalu',
    user: 'Viper***ID',
    total: '$6.85'
  },
  {
    id: 'AURA-849198',
    gameTitle: 'Mobile Legends: Bang Bang',
    denomination: 'Weekly Diamond Pass',
    status: 'COMPLETED',
    time: '5 menit yang lalu',
    user: 'Slayer***77',
    total: '$1.79'
  },
  {
    id: 'AURA-849197',
    gameTitle: 'Roblox (Robux)',
    denomination: '400 Robux',
    status: 'COMPLETED',
    time: '7 menit yang lalu',
    user: 'Noob***Pro',
    total: '$4.59'
  },
  {
    id: 'AURA-849196',
    gameTitle: 'Honor of Kings',
    denomination: 'Weekly Pass Privilege',
    status: 'COMPLETED',
    time: '8 menit yang lalu',
    user: 'SunWuk***08',
    total: '$0.94'
  }
];
