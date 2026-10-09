import type { Game, PromoCode } from '../types';

export const POPULAR_GAMES: Game[] = [
  {
    id: 'mobile-legends',
    title: 'Mobile Legends: Bang Bang',
    publisher: 'Moonton',
    category: 'mobile',
    trending: true,
    popular: true,
    banner: 'https://play-lh.googleusercontent.com/YrkR-GP7OKghBTATCoO_jJrchSVrh-NSUBb5DnbRZC1DbLK_cgV9FC2e_iI4GzLsKXuZjuFZajnGCiA8qA=w1200-h600',
    thumbnail: 'https://play-lh.googleusercontent.com/MztmLpB1-_eFbHnqNzzvzl5zjiOH2BEb0D71uBxZYf_4BEmW3QEPWODhRtyqY7Qz4wRLwQ--Rg1RAjOFqtHSs-o=w600-h600',
    hasZoneId: true,
    userIdLabel: 'User ID',
    zoneIdLabel: 'Zone ID',
    userIdPlaceholder: 'Contoh: 12345678',
    zoneIdPlaceholder: 'Contoh: (1234)',
    description: 'Top up Diamond Mobile Legends termurah, terpercaya & proses instan 1-3 detik langsung masuk ke akun kamu 24 jam.',
    instructions: [
      'Masukkan User ID dan Zone ID akun MLBB kamu',
      'Pilih nominal Diamond atau Pass yang diinginkan',
      'Pilih metode pembayaran (QRIS, E-Wallet, VA)',
      'Masukkan nomor WhatsApp untuk bukti invoice',
      'Klik Beli Sekarang dan selesaikan pembayaran',
      'Diamond otomatis masuk dalam hitungan detik!'
    ],
    denominations: [
      { id: 'ml-86', name: '86 Diamonds', amount: '86 💎', price: 20800, originalPrice: 24000, bonus: '+8 Bonus', popular: true, category: 'diamonds' }, // $1.30 (Wholesale: $1.25, Profit: +$0.05)
      { id: 'ml-172', name: '172 Diamonds', amount: '172 💎', price: 40800, originalPrice: 48000, bonus: '+16 Bonus', category: 'diamonds' }, // $2.55 (Wholesale: $2.47, Profit: +$0.08)
      { id: 'ml-257', name: '257 Diamonds', amount: '257 💎', price: 59200, originalPrice: 72000, bonus: '+23 Bonus', category: 'diamonds' }, // $3.70 (Wholesale: $3.58, Profit: +$0.12)
      { id: 'ml-wdp', name: 'Weekly Diamond Pass', amount: 'Pass 🎫', price: 26400, originalPrice: 35000, bonus: '210 💎 Total + Items', popular: true, category: 'membership' }, // $1.65 (Wholesale: $1.54, Profit: +$0.11)
      { id: 'ml-344', name: '344 Diamonds', amount: '344 💎', price: 97600, originalPrice: 115000, bonus: '+32 Bonus', category: 'diamonds' }, // $6.10 (Wholesale: $5.90, Profit: +$0.20)
      { id: 'ml-429', name: '429 Diamonds', amount: '429 💎', price: 117600, originalPrice: 138000, bonus: '+40 Bonus', category: 'diamonds' }, // $7.35 (Wholesale: $7.07, Profit: +$0.28)
      { id: 'ml-514', name: '514 Diamonds', amount: '514 💎', price: 132000, originalPrice: 158000, bonus: '+52 Bonus', category: 'diamonds' }, // $8.25 (Wholesale: $7.96, Profit: +$0.29)
      { id: 'ml-706', name: '706 Diamonds', amount: '706 💎', price: 161600, originalPrice: 192000, bonus: '+65 Bonus', popular: true, category: 'diamonds' }, // $10.10 (Wholesale: $9.73, Profit: +$0.37)
      { id: 'ml-starlight', name: 'Starlight Member Pass', amount: 'Starlight ✨', price: 138400, originalPrice: 165000, bonus: 'Skin Eksklusif + 30 Hari', popular: true, category: 'membership' }, // $8.65 (Wholesale: $8.32, Profit: +$0.33)
      { id: 'ml-1050', name: '1050 Diamonds', amount: '1050 💎', price: 293600, originalPrice: 345000, bonus: '+100 Bonus', category: 'diamonds' }, // $18.35 (Wholesale: $17.79, Profit: +$0.56)
      { id: 'ml-2195', name: '2195 Diamonds', amount: '2195 💎', price: 485600, originalPrice: 576000, bonus: '+220 Bonus', category: 'diamonds' }, // $30.35 (Wholesale: $29.45, Profit: +$0.90)
      { id: 'ml-twilight', name: 'Twilight Pass', amount: 'Twilight 👑', price: 138400, originalPrice: 165000, bonus: 'Suzuhime Skin + Tickets', category: 'membership' }, // $8.65 (Wholesale: $8.32, Profit: +$0.33)
    ]
  },
  {
    id: 'genshin-impact',
    title: 'Genshin Impact',
    publisher: 'HoYoverse / COGNOSPHERE',
    category: 'mobile',
    trending: true,
    popular: true,
    banner: 'https://play-lh.googleusercontent.com/ZHLmkdTW2Q_T_DVxu9piEOwkJtcXEkmeIGiJXhwcdYSS6-L51bHuEvlVqpt3dPM_McPJ1enEo6FwnbrxOak=w1200-h600',
    thumbnail: 'https://play-lh.googleusercontent.com/PQEqjOxr-3uZaNHmWoQinLVQQ9fbSegMKXmqgFm5nGgagqC2REH-1er3BguYStWbH3YStijj5WH1DDlwPh2ehw=w600-h600',
    hasZoneId: false,
    userIdLabel: 'UID (User ID)',
    userIdPlaceholder: 'Contoh: 812345678',
    servers: ['Asia', 'America', 'Europe', 'TW/HK/MO'],
    description: 'Top up Genesis Crystals & Blessing of the Welkin Moon resmi termurah via UID 100% aman anti minus.',
    instructions: [
      'Masukkan UID akun Genshin Impact kamu',
      'Pilih Server yang sesuai dengan akun kamu',
      'Pilih paket Genesis Crystals atau Blessing',
      'Selesaikan pembayaran via QRIS atau VA',
      'Kristal akan langsung bertambah di dalam game!'
    ],
    denominations: [
      { id: 'gi-welkin', name: 'Blessing of the Welkin Moon', amount: 'Welkin 🌙', price: 82400, originalPrice: 95000, bonus: '3000 Primogems Total', popular: true, category: 'membership' }, // $5.15 (Wholesale: $4.99, Profit: +$0.16)
      { id: 'gi-60', name: '60 Genesis Crystals', amount: '60 💠', price: 16800, originalPrice: 20000, bonus: 'First Topup 2x', category: 'diamonds' }, // $1.05 (Wholesale: $0.99, Profit: +$0.06)
      { id: 'gi-300', name: '300 + 30 Genesis Crystals', amount: '330 💠', price: 82400, originalPrice: 95000, bonus: '+30 Bonus', category: 'diamonds' }, // $5.15 (Wholesale: $4.99, Profit: +$0.16)
      { id: 'gi-980', name: '980 + 110 Genesis Crystals', amount: '1090 💠', price: 247200, originalPrice: 280000, bonus: '+110 Bonus', popular: true, category: 'diamonds' }, // $15.45 (Wholesale: $14.99, Profit: +$0.46)
      { id: 'gi-1980', name: '1980 + 260 Genesis Crystals', amount: '2240 💠', price: 493600, originalPrice: 560000, bonus: '+260 Bonus', category: 'diamonds' }, // $30.85 (Wholesale: $29.99, Profit: +$0.86)
      { id: 'gi-3280', name: '3280 + 600 Genesis Crystals', amount: '3880 💠', price: 822400, originalPrice: 920000, bonus: '+600 Bonus', category: 'diamonds' }, // $51.40 (Wholesale: $49.99, Profit: +$1.41)
      { id: 'gi-6480', name: '6480 + 1600 Genesis Crystals', amount: '8080 💠', price: 1640000, originalPrice: 1850000, popular: true, category: 'diamonds' }, // $102.50 (Wholesale: $99.99, Profit: +$2.51)
    ]
  },
  {
    id: 'valorant',
    title: 'Valorant',
    publisher: 'Riot Games',
    category: 'pc',
    trending: true,
    popular: true,
    banner: 'https://media.rawg.io/media/games/b11/b11127b9ee3c3701bd15b9af3286d20e.jpg',
    thumbnail: 'https://media.rawg.io/media/crop/600/400/games/b11/b11127b9ee3c3701bd15b9af3286d20e.jpg',
    hasZoneId: false,
    userIdLabel: 'Riot ID',
    userIdPlaceholder: 'Contoh: TenZ#NA1 atau Jett#APAC',
    description: 'Top up Valorant Points (VP) resmi Riot Games Indonesia. Beli Battlepass & Skin Knife impianmu sekarang!',
    instructions: [
      'Masukkan Riot ID lengkap dengan Tagline (#)',
      'Pilih nominal Valorant Points (VP)',
      'Pilih metode pembayaran instant',
      'VP akan langsung masuk ke akun Riot kamu dalam 1 menit!'
    ],
    denominations: [
      { id: 'val-475', name: '475 Valorant Points', amount: '475 VP 🎯', price: 54000, originalPrice: 60000, category: 'diamonds' },
      { id: 'val-1000', name: '1000 Valorant Points', amount: '1000 VP 🎯', price: 108000, originalPrice: 120000, popular: true, bonus: 'Battlepass Ready', category: 'diamonds' },
      { id: 'val-2050', name: '2050 Valorant Points', amount: '2050 VP 🎯', price: 215000, originalPrice: 240000, bonus: '+125 VP Bonus', category: 'diamonds' },
      { id: 'val-3650', name: '3650 Valorant Points', amount: '3650 VP 🎯', price: 375000, originalPrice: 420000, bonus: '+275 VP Bonus', popular: true, category: 'diamonds' },
      { id: 'val-5350', name: '5350 Valorant Points', amount: '5350 VP 🎯', price: 535000, originalPrice: 600000, bonus: '+450 VP Bonus', category: 'diamonds' },
      { id: 'val-11000', name: '11000 Valorant Points', amount: '11000 VP 🎯', price: 1070000, originalPrice: 1200000, bonus: '+1100 VP Bonus', category: 'diamonds' },
    ]
  },
  {
    id: 'free-fire',
    title: 'Free Fire MAX',
    publisher: 'Garena',
    category: 'mobile',
    trending: false,
    popular: true,
    banner: 'https://play-lh.googleusercontent.com/LsawRbqk_iyOjjY_NkmKv62sTH9U4WqaF9juPzT0nhN4u9v52SHAfQliNaKpYZgo4KPN2j-cLVI44PhKpuAGJQ=w1200-h600',
    thumbnail: 'https://play-lh.googleusercontent.com/cK-U0_B9GrnSy26SNISDuvU_hL4VggyqJ1J5V2oiuyVEfiGo7fzegdBjk0ejXPg3PKK5sPwumdLBbWv8KkBKLQ=w600-h600',
    hasZoneId: false,
    userIdLabel: 'Player ID',
    userIdPlaceholder: 'Contoh: 182749021',
    description: 'Top up Diamond Free Fire & Membership Mingguan / Bulanan termurah se-Indonesia. Instan langsung masuk.',
    instructions: [
      'Masukkan Player ID akun Free Fire kamu',
      'Pilih jumlah Diamond atau Membership',
      'Pilih metode pembayaran favorit kamu',
      'Konfirmasi pesanan dan Diamond masuk kilat!'
    ],
    denominations: [
      { id: 'ff-70', name: '50 Diamonds', amount: '50 💎', price: 8800, originalPrice: 12000, category: 'diamonds' }, // $0.55 (Wholesale: $0.50, Profit: +$0.05)
      { id: 'ff-140', name: '110 Diamonds', amount: '110 💎', price: 17280, originalPrice: 22000, category: 'diamonds' }, // $1.08 (Wholesale: $1.00, Profit: +$0.08)
      { id: 'ff-355', name: '341 Diamonds', amount: '341 💎', price: 49600, originalPrice: 60000, bonus: '+35 Bonus', popular: true, category: 'diamonds' }, // $3.10 (Wholesale: $2.95, Profit: +$0.15)
      { id: 'ff-720', name: '572 Diamonds', amount: '572 💎', price: 74400, originalPrice: 90000, bonus: '+80 Bonus', popular: true, category: 'diamonds' }, // $4.65 (Wholesale: $4.42, Profit: +$0.23)
      { id: 'ff-member-w', name: 'Weekly Membership', amount: 'Weekly 🎫', price: 28800, originalPrice: 38000, bonus: '450 💎 Total', popular: true, category: 'membership' }, // $1.80 (Wholesale: $1.70, Profit: +$0.10)
      { id: 'ff-member-m', name: 'Monthly Membership', amount: 'Monthly 👑', price: 133600, originalPrice: 165000, bonus: '2600 💎 Total', category: 'membership' }, // $8.35 (Wholesale: $7.98, Profit: +$0.37)
      { id: 'ff-1440', name: '1166 Diamonds', amount: '1166 💎', price: 158400, originalPrice: 190000, bonus: '+160 Bonus', category: 'diamonds' }, // $9.90 (Wholesale: $9.48, Profit: +$0.42)
      { id: 'ff-2180', name: '2398 Diamonds', amount: '2398 💎', price: 307200, originalPrice: 365000, bonus: '+250 Bonus', category: 'diamonds' }, // $19.20 (Wholesale: $18.54, Profit: +$0.66)
    ]
  },
  {
    id: 'honor-of-kings',
    title: 'Honor of Kings',
    publisher: 'Level Infinite / TiMi Studio',
    category: 'mobile',
    trending: true,
    popular: true,
    banner: 'https://play-lh.googleusercontent.com/m7qsYcurlr6a2PrgrgzWq1RO4mbs9miB7X9gb0oTTcYUI-Tbe8eELvvh3uO8VNy8-3UQchKw9W7P5iAgLRUe=w1200-h600',
    thumbnail: 'https://play-lh.googleusercontent.com/hEm5NVeEv7UfFJaK8GZdfWe7p3DB_VvYx57qIEHbR0tMV_NToziH0Vbgd6CxLiWF-iURpAe-jsC_UGUDt0diPQ=w600-h600',
    hasZoneId: false,
    userIdLabel: 'Player ID (UID)',
    userIdPlaceholder: 'Contoh: 10982348571',
    description: 'Top up Tokens Honor of Kings Global resmi termurah. Dapatkan skin eksklusif hero favoritmu!',
    instructions: [
      'Buka profil HOK dan copy Player ID kamu',
      'Pilih paket Tokens yang kamu inginkan',
      'Bayar dengan QRIS atau E-wallet',
      'Tokens langsung terisi dalam 2 detik!'
    ],
    denominations: [
      { id: 'hok-80', name: '80 + 8 Tokens', amount: '88 🪙', price: 14500, originalPrice: 16000, bonus: '+8 Bonus', category: 'diamonds' },
      { id: 'hok-240', name: '240 + 24 Tokens', amount: '264 🪙', price: 43500, originalPrice: 48000, bonus: '+24 Bonus', category: 'diamonds' },
      { id: 'hok-400', name: '400 + 40 Tokens', amount: '440 🪙', price: 72000, originalPrice: 80000, bonus: '+40 Bonus', popular: true, category: 'diamonds' },
      { id: 'hok-pass', name: 'Weekly Pass Privilege', amount: 'Weekly Pass 🎫', price: 15000, originalPrice: 18000, popular: true, category: 'membership' },
      { id: 'hok-800', name: '800 + 95 Tokens', amount: '895 🪙', price: 144000, originalPrice: 160000, bonus: '+95 Bonus', popular: true, category: 'diamonds' },
      { id: 'hok-1200', name: '1200 + 150 Tokens', amount: '1350 🪙', price: 215000, originalPrice: 240000, bonus: '+150 Bonus', category: 'diamonds' },
    ]
  },
  {
    id: 'roblox',
    title: 'Roblox',
    publisher: 'Roblox Corporation',
    category: 'mobile',
    trending: true,
    popular: true,
    banner: 'https://play-lh.googleusercontent.com/bHynJCCjTZyc9Lqqx45O5GLX3sWAupY9mSqYn7wndPkwuB4A28txE7NKIpteQ_4t1kGvsRWKRuYiToYTYLtVSg=w1200-h600',
    thumbnail: 'https://play-lh.googleusercontent.com/bHynJCCjTZyc9Lqqx45O5GLX3sWAupY9mSqYn7wndPkwuB4A28txE7NKIpteQ_4t1kGvsRWKRuYiToYTYLtVSg=w600-h600',
    hasZoneId: false,
    userIdLabel: 'Roblox Username',
    userIdPlaceholder: 'Contoh: Builderman99',
    description: 'Beli Robux & Digital Voucher Gift Card resmi instant tanpa login password. 100% legal dan garansi anti-ban.',
    instructions: [
      'Masukkan username akun Roblox kamu',
      'Pilih jumlah Robux atau nilai Gift Card',
      'Pilih metode pembayaran',
      'Kode voucher / Robux terisi langsung ke inventori!'
    ],
    denominations: [
      { id: 'rbx-80', name: '80 Robux', amount: '80 R$', price: 15000, originalPrice: 18000, category: 'diamonds' },
      { id: 'rbx-400', name: '400 Robux', amount: '400 R$', price: 73000, originalPrice: 85000, popular: true, category: 'diamonds' },
      { id: 'rbx-800', name: '800 Robux', amount: '800 R$', price: 145000, originalPrice: 165000, bonus: '+Premium Perks', popular: true, category: 'diamonds' },
      { id: 'rbx-1700', name: '1,700 Robux', amount: '1,700 R$', price: 298000, originalPrice: 340000, bonus: 'Bonus Exclusive Virtual Item', category: 'diamonds' },
      { id: 'rbx-4500', name: '4,500 Robux', amount: '4,500 R$', price: 749000, originalPrice: 850000, category: 'diamonds' },
      { id: 'rbx-10000', name: '10,000 Robux', amount: '10,000 R$', price: 1499000, originalPrice: 1700000, bonus: '+VIP Aura Avatar', popular: true, category: 'diamonds' },
    ]
  },
  {
    id: 'honkai-star-rail',
    title: 'Honkai: Star Rail',
    publisher: 'HoYoverse',
    category: 'mobile',
    trending: true,
    popular: false,
    banner: 'https://play-lh.googleusercontent.com/j9VHfSlwJ5Z2d_OxKsvrJdVFC9w9JSvysv42iXN3eiCO6zZ70zGbjTQ0aJcNWXKh5Iyv8fXVp8p3z9fZRRwnCQ=w1200-h600',
    thumbnail: 'https://play-lh.googleusercontent.com/aWrGocSA7hEuk1qAPe7L4T57LvLKrwwH26cK2_LOqxRQMQX7j3uHYojC-EKWgYEV2PdrmE0ahqvvhLhXrAGk6Q=w600-h600',
    hasZoneId: false,
    userIdLabel: 'UID',
    userIdPlaceholder: 'Contoh: 801928374',
    servers: ['Asia', 'America', 'Europe', 'TW/HK/MO'],
    description: 'Top up Oneiric Shards & Express Supply Pass via UID instant 24 jam.',
    instructions: [
      'Masukkan UID dan Server Honkai Star Rail kamu',
      'Pilih nominal Oneiric Shards atau Express Pass',
      'Selesaikan pembayaran instan',
      'Shards langsung masuk ke Astral Express kamu!'
    ],
    denominations: [
      { id: 'hsr-pass', name: 'Express Supply Pass', amount: 'Pass 🚂', price: 62000, originalPrice: 79000, bonus: '3000 Stellar Jades Total', popular: true, category: 'membership' },
      { id: 'hsr-60', name: '60 Oneiric Shards', amount: '60 💎', price: 14500, originalPrice: 16500, category: 'diamonds' },
      { id: 'hsr-300', name: '300 + 30 Oneiric Shards', amount: '330 💎', price: 69000, originalPrice: 79000, bonus: '+30 Bonus', category: 'diamonds' },
      { id: 'hsr-980', name: '980 + 110 Oneiric Shards', amount: '1090 💎', price: 219000, originalPrice: 249000, bonus: '+110 Bonus', popular: true, category: 'diamonds' },
      { id: 'hsr-1980', name: '1980 + 260 Oneiric Shards', amount: '2240 💎', price: 439000, originalPrice: 499000, category: 'diamonds' },
      { id: 'hsr-3280', name: '3280 + 600 Oneiric Shards', amount: '3880 💎', price: 729000, originalPrice: 829000, category: 'diamonds' },
      { id: 'hsr-6480', name: '6480 + 1600 Oneiric Shards', amount: '8080 💎', price: 1429000, originalPrice: 1599000, popular: true, category: 'diamonds' },
    ]
  },
  {
    id: 'steam-wallet',
    title: 'Steam Wallet Code',
    publisher: 'Valve Corporation',
    category: 'voucher',
    trending: true,
    popular: true,
    banner: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/753/header.jpg',
    thumbnail: 'https://store.steampowered.com/public/images/gift/steamcards_cards_02.png',
    hasZoneId: false,
    userIdLabel: 'Nomor WhatsApp / Email',
    userIdPlaceholder: 'Contoh: 081234567890',
    description: 'Beli Steam Wallet IDR resmi tercepat. Kode digital langsung dikirim ke WhatsApp dan layar dalam 5 detik!',
    instructions: [
      'Pilih nominal voucher Steam yang diinginkan',
      'Pilih metode pembayaran favoritmu',
      'Kode reedem 15 digit akan langsung muncul di invoice dan dikirim ke WhatsApp',
      'Redeem kode langsung di client Steam kamu!'
    ],
    denominations: [
      { id: 'stm-12k', name: 'Steam Wallet IDR 12.000', amount: 'Rp 12.000', price: 13500, originalPrice: 15000, category: 'special' },
      { id: 'stm-45k', name: 'Steam Wallet IDR 45.000', amount: 'Rp 45.000', price: 49500, originalPrice: 55000, popular: true, category: 'special' },
      { id: 'stm-60k', name: 'Steam Wallet IDR 60.000', amount: 'Rp 60.000', price: 65000, originalPrice: 72000, category: 'special' },
      { id: 'stm-90k', name: 'Steam Wallet IDR 90.000', amount: 'Rp 90.000', price: 98000, originalPrice: 108000, popular: true, category: 'special' },
      { id: 'stm-120k', name: 'Steam Wallet IDR 120.000', amount: 'Rp 120.000', price: 130000, originalPrice: 145000, category: 'special' },
      { id: 'stm-250k', name: 'Steam Wallet IDR 250.000', amount: 'Rp 250.000', price: 270000, originalPrice: 300000, popular: true, category: 'special' },
      { id: 'stm-400k', name: 'Steam Wallet IDR 400.000', amount: 'Rp 400.000', price: 430000, originalPrice: 475000, category: 'special' },
      { id: 'stm-600k', name: 'Steam Wallet IDR 600.000', amount: 'Rp 600.000', price: 645000, originalPrice: 710000, category: 'special' },
    ]
  },
  {
    id: 'pubg-mobile',
    title: 'PUBG Mobile',
    publisher: 'Krafton / Tencent Games',
    category: 'mobile',
    trending: false,
    popular: true,
    banner: 'https://play-lh.googleusercontent.com/xRj26dOD5JhpfQ54rOXl8WNwij9p5dOYoaKGbyEjsEhRu35ogBp08qYS7HFHfHjlahSWEPs8VJRmqbjw8Q4SsQ=w1200-h600',
    thumbnail: 'https://play-lh.googleusercontent.com/Se7jR6A5R0Mk9ClaIguf46yi2K3k32JsqKb3gAtrktIh3JwnFfxrQRmG9GLvdMpbxbMrReUOxzDkStxGxNo-5Q=w600-h600',
    hasZoneId: false,
    userIdLabel: 'Player ID',
    userIdPlaceholder: 'Contoh: 512398231',
    description: 'Top up UC PUBG Mobile resmi termurah. Dapatkan Royale Pass & Upgrade Weapon Skin favoritmu!',
    instructions: [
      'Masukkan Player ID PUBG Mobile kamu',
      'Pilih nominal Unknown Cash (UC)',
      'Selesaikan pembayaran via QRIS/E-Wallet',
      'UC otomatis masuk kilat dalam 5 detik!'
    ],
    denominations: [
      { id: 'pubg-60', name: '60 UC', amount: '60 UC 🪖', price: 14500, originalPrice: 16000, category: 'diamonds' },
      { id: 'pubg-325', name: '300 + 25 UC', amount: '325 UC 🪖', price: 69000, originalPrice: 78000, bonus: '+25 Bonus', popular: true, category: 'diamonds' },
      { id: 'pubg-660', name: '600 + 60 UC (Royale Pass)', amount: '660 UC 🪖', price: 139000, originalPrice: 159000, bonus: 'Royale Pass Unlocked', popular: true, category: 'membership' },
      { id: 'pubg-1800', name: '1500 + 300 UC', amount: '1800 UC 🪖', price: 345000, originalPrice: 390000, bonus: '+300 Bonus', category: 'diamonds' },
      { id: 'pubg-3850', name: '3000 + 850 UC', amount: '3850 UC 🪖', price: 695000, originalPrice: 790000, bonus: '+850 Bonus', popular: true, category: 'diamonds' },
    ]
  },
  {
    id: 'black-myth-wukong',
    title: 'Black Myth: Wukong',
    publisher: 'Game Science',
    category: 'pc',
    trending: true,
    popular: true,
    banner: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2358720/header.jpg',
    thumbnail: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2358720/library_600x900.jpg',
    hasZoneId: false,
    userIdLabel: 'Email / WhatsApp',
    userIdPlaceholder: 'Contoh: gamer@example.com',
    description: 'Aktivasi Lisensi Steam Original Black Myth: Wukong Standard & Deluxe Edition. Garansi Seumur Hidup.',
    instructions: [
      'Pilih edisi game Black Myth: Wukong',
      'Pilih metode pembayaran instan',
      'Steam Key langsung dikirimkan ke invoice & email kamu',
      'Aktivasi langsung di menu Activate a Product on Steam!'
    ],
    denominations: [
      { id: 'bmw-std', name: 'Standard Edition (Steam Global Key)', amount: 'Base Game 🐒', price: 685000, originalPrice: 720000, popular: true, category: 'special' },
      { id: 'bmw-dlx', name: 'Deluxe Edition (Steam Global Key)', amount: 'Deluxe + OST 👑', price: 819000, originalPrice: 860000, bonus: 'Bronze Cloud Staff + Armor Set', popular: true, category: 'special' },
      { id: 'bmw-upgrade', name: 'Deluxe Upgrade DLC', amount: 'Upgrade Only ⭐', price: 145000, originalPrice: 160000, category: 'special' },
    ]
  }
];

export const PROMO_CODES: PromoCode[] = [
  { code: 'AURA2026', type: 'percent', value: 10, minPurchase: 20000, description: 'Diskon 10% Spesial Aura Member' },
  { code: 'VIPLEGACY', type: 'flat', value: 15000, minPurchase: 50000, description: 'Potongan Rp 15.000 untuk pembelian diatas Rp 50.000' },
  { code: 'FLASHDEAL', type: 'percent', value: 15, minPurchase: 30000, description: 'Diskon 15% Terbatas Flash Sale Hari Ini' },
  { code: 'AURAKILAT', type: 'flat', value: 5000, minPurchase: 10000, description: 'Potongan Rp 5.000 Instan Pengguna Baru' },
];
