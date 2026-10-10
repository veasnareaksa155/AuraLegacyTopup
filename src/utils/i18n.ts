import type { Language } from '../types';

export interface Translations {
  // Navbar
  home: string;
  allGames: string;
  trackOrder: string;
  calculator: string;
  flashSale: string;
  searchPlaceholder: string;
  serverStatus: string;
  serverOperational: string;
  officialLegal: string;
  selectTheme: string;
  selectLanguage: string;
  themeAura: string;
  soundSfx: string;
  
  // Hero
  heroEventBadge: string;
  heroCta: string;
  exploreCatalog: string;
  statSpeedVal: string;
  statSpeedDesc: string;
  statLegalVal: string;
  statLegalDesc: string;
  statOrdersVal: string;
  statOrdersDesc: string;
  statCsVal: string;
  statCsDesc: string;

  // Live Ticker
  liveTickerBadge: string;
  success: string;
  ago: string;
  secondsAgo: string;
  minutesAgo: string;

  // Catalog
  catalogBadge: string;
  catalogTitle: string;
  catalogTitleHighlight: string;
  catalogSubtitle: string;
  allProducts: string;
  mobileGames: string;
  pcGames: string;
  vouchers: string;
  searchGamesFilter: string;
  sortPopular: string;
  sortName: string;
  sortPrice: string;
  startFrom: string;
  topUpAction: string;
  noGamesFound: string;
  resetFilter: string;

  // Flash Deals
  flashBadge: string;
  flashTitle: string;
  flashHighlight: string;
  endsIn: string;
  leftQuota: string;
  sold: string;
  claimDeal: string;

  // Top Up Terminal
  backToCatalog: string;
  instantAutomation: string;
  legalGuaranteed: string;
  autoSecondsGuarantee: string;
  csSupportGuarantee: string;
  howToTopUp: string;
  howToFindId: string;
  idGuideTitle: string;
  step1Title: string;
  step1Desc: string;
  validateIdBtn: string;
  validatingServer: string;
  verifiedNickname: string;
  selectServer: string;
  step2Title: string;
  step2Desc: string;
  tabAll: string;
  tabDiamonds: string;
  tabPass: string;
  step3Title: string;
  step3Desc: string;
  step4Title: string;
  step4Desc: string;
  whatsappLabel: string;
  whatsappPlaceholder: string;
  promoLabel: string;
  applyPromo: string;
  activeVouchers: string;
  buyNow: string;
  instantBadge: string;
  saved: string;
  itemLabel: string;
  methodLabel: string;

  // Checkout
  waitingPayment: string;
  finishWithin: string;
  scanQrisDesc: string;
  vaNumberDesc: string;
  totalBill: string;
  simulatePaymentBtn: string;
  testModeNote: string;
  orderIdLabel: string;

  // Receipt
  deliverySuccessBadge: string;
  deliverySuccessTitle: string;
  deliverySuccessDesc: string;
  printReceipt: string;
  topUpAgain: string;
  close: string;
  totalPaid: string;

  // Tracker
  trackerBadge: string;
  trackerTitle: string;
  trackerDesc: string;
  searchInvoicePlaceholder: string;
  searchAction: string;
  tryDemoId: string;
  orderReceived: string;
  paymentVerified: string;
  serverInjected: string;
  orderNotFound: string;

  // Why Us & FAQ
  whyUsBadge: string;
  whyUsTitle: string;
  whyUsTitleHighlight: string;
  whyUsSubtitle: string;
  feature1Title: string;
  feature1Desc: string;
  feature2Title: string;
  feature2Desc: string;
  feature3Title: string;
  feature3Desc: string;
  faqBadge: string;
  faqTitle: string;
  faqTitleHighlight: string;
}

export const TRANSLATIONS: Record<Language, Translations> = {
  km: {
    home: 'ទំព័រដើម',
    allGames: 'ហ្គេម',
    trackOrder: 'តាមដានការកុម្ម៉ង់',
    calculator: 'Win Rate',
    flashSale: 'Flash Sale',
    searchPlaceholder: 'ស្វែងរកហ្គេម...',
    serverStatus: 'ប្រព័ន្ធបញ្ចូលស្វ័យប្រវត្តិ៖',
    serverOperational: 'ដំណើរការ ១០០% & ភ្លាមៗ ១-៣ វិនាទី',
    officialLegal: 'ផ្លូវការ ១០០% & សុវត្ថិភាព ធានាមិនដកពេជ្រ',
    selectTheme: 'ជ្រើសរើសស្ទីល Aura',
    selectLanguage: 'ជ្រើសរើសភាសា',
    themeAura: 'ស្ទីល Aura',
    soundSfx: 'សំឡេង SFX',

    heroEventBadge: 'ព្រឹត្តិការណ៍ពិសេស ២០២៦',
    heroCta: 'បញ្ចូលលុយឥឡូវនេះ',
    exploreCatalog: 'មើលហ្គេមទាំងអស់',
    statSpeedVal: '០.៥ វិនាទី',
    statSpeedDesc: 'បញ្ចូលស្វ័យប្រវត្តិ ២៤ ម៉ោង',
    statLegalVal: 'ស្របច្បាប់ ១០០%',
    statLegalDesc: 'ធានាសុវត្ថិភាពគណនី',
    statOrdersVal: '១.៨ លាន+ ជោគជ័យ',
    statOrdersDesc: 'ប្រតិបត្តិការដែលបានផ្ទៀងផ្ទាត់',
    statCsVal: 'សេវាបម្រើអតិថិជន ២៤/៧',
    statCsDesc: 'រង់ចាំជួយជានិច្ច',

    liveTickerBadge: 'ប្រតិបត្តិការផ្ទាល់',
    success: 'ជោគជ័យ',
    ago: 'មុន',
    secondsAgo: 'វិនាទីមុន',
    minutesAgo: 'នាទីមុន',

    catalogBadge: 'កាតាឡុកហ្គេម',
    catalogTitle: 'ជ្រើសរើស',
    catalogTitleHighlight: 'ហ្គេម',
    catalogSubtitle: 'បញ្ចូលរហ័ស & សុវត្ថិភាព ១០០%',
    allProducts: 'ផលិតផលទាំងអស់',
    mobileGames: 'ហ្គេមទូរស័ព្ទ',
    pcGames: 'ហ្គេមកុំព្យូទ័រ',
    vouchers: 'ប័ណ្ណទូទាត់ & គន្លឹះ',
    searchGamesFilter: 'ស្វែងរកហ្គេមនៅទីនេះ...',
    sortPopular: 'ពេញនិយមបំផុត',
    sortName: 'ឈ្មោះ (A-Z)',
    sortPrice: 'តម្លៃទាបបំផុត',
    startFrom: 'ចាប់ពី',
    topUpAction: 'បញ្ចូលលុយ',
    noGamesFound: 'រកមិនឃើញហ្គេមទេ',
    resetFilter: 'កំណត់តម្រងឡើងវិញ',

    flashBadge: 'FLASH SALE',
    flashTitle: 'ប្រូម៉ូសិន',
    flashHighlight: 'ថ្ងៃនេះ',
    endsIn: 'នៅសល់',
    leftQuota: 'នៅសល់',
    sold: 'បានលក់',
    claimDeal: 'ទទួលបានការបញ្ចុះតម្លៃ',

    backToCatalog: 'ត្រឡប់ទៅកាតាឡុកហ្គេម',
    instantAutomation: 'ស្វ័យប្រវត្តិកម្មភ្លាមៗ',
    legalGuaranteed: 'ស្របច្បាប់ ១០០% & ធានាពេជ្រផ្លូវការ',
    autoSecondsGuarantee: 'បញ្ចូលស្វ័យប្រវត្តិក្នុង ១-៣ វិនាទី ២៤ ម៉ោង',
    csSupportGuarantee: 'សេវាបម្រើអតិថិជន ២៤/៧ តាម WhatsApp',
    howToTopUp: 'របៀបបញ្ចូលលុយ',
    howToFindId: 'របៀបមើល ID / Server',
    idGuideTitle: 'របៀបស្វែងរក User ID & Server',
    step1Title: 'បញ្ចូលព័ត៌មានគណនី',
    step1Desc: 'សូមប្រាកដថា ID របស់អ្នកត្រឹមត្រូវ',
    validateIdBtn: 'ផ្ទៀងផ្ទាត់ ID គណនី',
    validatingServer: 'កំពុងត្រួតពិនិត្យ Server...',
    verifiedNickname: 'ឈ្មោះហ្គេមត្រូវបានផ្ទៀងផ្ទាត់៖',
    selectServer: 'ជ្រើសរើស Server',
    step2Title: 'ជ្រើសរើសចំនួនទឹកប្រាក់',
    step2Desc: 'ជ្រើសរើសពេជ្រ ឬកញ្ចប់សមាជិកភាព',
    tabAll: 'ទាំងអស់',
    tabDiamonds: 'ពេជ្រ/កាក់',
    tabPass: 'Pass / ព្រឹត្តិការណ៍',
    step3Title: 'វិធីសាស្ត្រទូទាត់ KHQR',
    step3Desc: 'ស្កេនទូទាត់រហ័ស 0% Fee ជាមួយ ABA, Wing, ACLEDA, Bakong & គ្រប់ធនាគារ',
    step4Title: '',
    step4Desc: '',
    whatsappLabel: '',
    whatsappPlaceholder: '',
    promoLabel: '',
    applyPromo: '',
    activeVouchers: '',
    buyNow: 'ទិញឥឡូវនេះ',
    instantBadge: '⚡ ភ្លាមៗ',
    saved: 'ចំណេញ',
    itemLabel: 'ទំនិញ',
    methodLabel: 'វិធីសាស្ត្រ',

    waitingPayment: 'កំពុងរង់ចាំការទូទាត់',
    finishWithin: 'សូមបង់ប្រាក់ក្នុងរយៈពេល',
    scanQrisDesc: 'ស្កេនកូដ QR ខាងលើជាមួយ ABA Mobile, Wing, ACLEDA, Bakong ឬកម្មវិធីធនាគារណាមួយនៅកម្ពុជា។',
    vaNumberDesc: 'ផ្ទេរប្រាក់ទៅកាន់គណនី Virtual Account នេះ៖',
    totalBill: 'ចំនួនទឹកប្រាក់សរុប៖',
    simulatePaymentBtn: 'សាកល្បងការទូទាត់ជោគជ័យ (របៀបសាកល្បង)',
    testModeNote: 'ចុចប៊ូតុងខាងលើដើម្បីសាកល្បងការទូទាត់ភ្លាមៗ និងមើលវិក្កយបត្រ។',
    orderIdLabel: 'លេខបញ្ជាទិញ (Order ID)៖',

    deliverySuccessBadge: 'ការទូទាត់ & ការបញ្ជូនជោគជ័យ',
    deliverySuccessTitle: 'ការបញ្ចូលលុយទទួលបានជោគជ័យ!',
    deliverySuccessDesc: 'ពេជ្រ/កាក់របស់អ្នកត្រូវបានបញ្ចូលទៅក្នុងគណនីរួចរាល់។',
    printReceipt: 'បោះពុម្ពវិក្កយបត្រ',
    topUpAgain: 'បញ្ចូលលុយម្តងទៀត',
    close: 'បិទ',
    totalPaid: 'សរុបបានទូទាត់៖',

    trackerBadge: 'ស្ថានភាពជាក់ស្តែង',
    trackerTitle: 'តាមដានការបញ្ជាទិញ',
    trackerDesc: 'បញ្ចូលលេខវិក្កយបត្រ ឬ Order ID ដើម្បីពិនិត្យមើលស្ថានភាពនៃការបញ្ជូន។',
    searchInvoicePlaceholder: 'ឧទាហរណ៍៖ AURA-849201',
    searchAction: 'ស្វែងរក',
    tryDemoId: 'សាកល្បង Demo ID៖',
    orderReceived: 'ការបញ្ជាទិញត្រូវបានទទួល',
    paymentVerified: 'ការទូទាត់ត្រូវបានផ្ទៀងផ្ទាត់ (រួចរាល់)',
    serverInjected: 'ការបញ្ចូលទៅកាន់ Server ជោគជ័យ (១០០%)',
    orderNotFound: 'រកមិនឃើញការបញ្ជាទិញទេ',

    whyUsBadge: 'ភាពលេចធ្លោនៃ Aura Legacy',
    whyUsTitle: 'ហេតុអ្វីត្រូវជ្រើសរើស',
    whyUsTitleHighlight: 'AURA LEGACY?',
    whyUsSubtitle: 'ស្តង់ដារថ្មីនៃសេវាកម្មបញ្ចូលលុយហ្គេម ជាមួយល្បឿនលឿន និងសុវត្ថិភាពខ្ពស់បំផុត។',
    feature1Title: 'បញ្ចូលស្វ័យប្រវត្តិក្នង ០.៥ វិនាទី',
    feature1Desc: 'ប្រព័ន្ធភ្ជាប់ដោយផ្ទាល់ជាមួយ API ផ្លូវការ។ មិនចាំបាច់រង់ចាំយូរ ពេជ្រចូលគណនីភ្លាមៗបន្ទាប់ពីទូទាត់។',
    feature2Title: 'ស្របច្បាប់ ១០០% & មានការធានា',
    feature2Desc: 'ពេជ្រមានប្រភពផ្ទាល់ពីអ្នកបង្កើតហ្គេមផ្លូវការ។ ធានាសុវត្ថិភាពគណនីមិនឱ្យជាប់គាំង ឬដកពេជ្រ។',
    feature3Title: 'សេវាបម្រើអតិថិជន ២៤/៧',
    feature3Desc: 'ក្រុមការងារជំនាញរង់ចាំជួយ និងដោះស្រាយបញ្ហារបស់អ្នកគ្រប់ពេលវេលាតាម WhatsApp។',
    faqBadge: 'សំណួរដែលសួរញឹកញាប់',
    faqTitle: 'សំណួរដែលសួរ',
    faqTitleHighlight: 'ញឹកញាប់ (FAQ)',
  },
  en: {
    home: 'Home',
    allGames: 'Games',
    trackOrder: 'Track Order',
    calculator: 'Win Rate',
    flashSale: 'Flash Sale',
    searchPlaceholder: 'Search games...',
    serverStatus: 'Server Auto-Injection API:',
    serverOperational: '100% OPERATIONAL & INSTANT 1-3s',
    officialLegal: '100% Official & Safe Guarantee',
    selectTheme: 'Select Aura Theme',
    selectLanguage: 'Select Language',
    themeAura: 'Aura Theme',
    soundSfx: 'Sound SFX',

    heroEventBadge: 'SPECIAL EVENT 2026',
    heroCta: 'TOP UP NOW',
    exploreCatalog: 'Explore Catalog',
    statSpeedVal: '0.5s Speed',
    statSpeedDesc: '24/7 Automated Delivery',
    statLegalVal: '100% Legal',
    statLegalDesc: 'Account Safety Guaranteed',
    statOrdersVal: '1.8M+ Done',
    statOrdersDesc: 'Verified Gamer Orders',
    statCsVal: '24/7 Support',
    statCsDesc: 'Ready to Assist Anytime',

    liveTickerBadge: 'LIVE ORDERS',
    success: 'Success',
    ago: 'ago',
    secondsAgo: 's ago',
    minutesAgo: 'm ago',

    catalogBadge: 'GAME CATALOG',
    catalogTitle: 'CHOOSE',
    catalogTitleHighlight: 'GAMES',
    catalogSubtitle: 'Instant 1-3s delivery • 100% official',
    allProducts: 'All Products',
    mobileGames: 'Mobile Games',
    pcGames: 'PC & Console',
    vouchers: 'Vouchers & Keys',
    searchGamesFilter: 'Filter games here...',
    sortPopular: 'Most Popular',
    sortName: 'Name (A-Z)',
    sortPrice: 'Lowest Price',
    startFrom: 'Starting from',
    topUpAction: 'Top Up',
    noGamesFound: 'No Games Found',
    resetFilter: 'Reset Filters',

    flashBadge: 'FLASH SALE',
    flashTitle: "TODAY'S",
    flashHighlight: 'DEALS',
    endsIn: 'Ends in',
    leftQuota: 'Left',
    sold: 'Sold',
    claimDeal: 'Claim Deal',

    backToCatalog: 'Back to Game Catalog',
    instantAutomation: 'INSTANT AUTOMATION',
    legalGuaranteed: '100% Legal & Official Diamond Guarantee',
    autoSecondsGuarantee: 'Auto Injected in 1-3 Seconds 24/7',
    csSupportGuarantee: '24/7 WhatsApp CS Support Ready',
    howToTopUp: 'How to Top Up',
    howToFindId: 'How to find ID / Server',
    idGuideTitle: 'How to Find User ID & Server',
    step1Title: 'Enter Account Information',
    step1Desc: 'Make sure your Player ID is correct',
    validateIdBtn: 'Validate Account ID',
    validatingServer: 'Checking Game Server...',
    verifiedNickname: 'Verified Nickname:',
    selectServer: 'Select Server',
    step2Title: 'Select Denomination',
    step2Desc: 'Choose diamonds or subscription passes',
    tabAll: 'All',
    tabDiamonds: 'Diamonds/Coins',
    tabPass: 'Pass / Event',
    step3Title: 'Select Payment Method',
    step3Desc: 'Choose an instant payment channel with lowest fees',
    step4Title: 'WhatsApp & Promo Voucher',
    step4Desc: 'Official invoice receipt is sent to your WhatsApp',
    whatsappLabel: 'WhatsApp Number',
    whatsappPlaceholder: '81234567890',
    promoLabel: 'Promo Discount Code (Optional)',
    applyPromo: 'Apply',
    activeVouchers: 'Active Vouchers:',
    buyNow: 'BUY NOW',
    instantBadge: '⚡ Instant',
    saved: 'Save',
    itemLabel: 'Item',
    methodLabel: 'Method',

    waitingPayment: 'WAITING FOR PAYMENT',
    finishWithin: 'Complete payment within',
    scanQrisDesc: 'Scan the QR code with your mobile banking or e-wallet app.',
    vaNumberDesc: 'Virtual Account Number:',
    totalBill: 'Total Amount:',
    simulatePaymentBtn: 'SIMULATE PAYMENT SUCCESS',
    testModeNote: 'Click the button above to simulate verified payment and inspect your digital receipt.',
    orderIdLabel: 'Order ID:',

    deliverySuccessBadge: 'PAYMENT & DELIVERY SUCCESSFUL',
    deliverySuccessTitle: 'TOP UP SUCCESSFULLY DELIVERED!',
    deliverySuccessDesc: 'Your game items have been automatically injected into the server.',
    printReceipt: 'Print Receipt',
    topUpAgain: 'Top Up Again',
    close: 'Close',
    totalPaid: 'Total Paid:',

    trackerBadge: 'REAL-TIME TRACKER',
    trackerTitle: 'TRACK ORDER STATUS',
    trackerDesc: 'Enter your Invoice Number or Order ID to inspect delivery progress.',
    searchInvoicePlaceholder: 'Example: AURA-849201',
    searchAction: 'Search',
    tryDemoId: 'Try Demo ID:',
    orderReceived: 'Order Received & Verified',
    paymentVerified: 'Payment Confirmed (Paid)',
    serverInjected: 'Server Injection Successful (100%)',
    orderNotFound: 'Order Not Found',

    whyUsBadge: 'The Aura Legacy Edge',
    whyUsTitle: 'WHY CHOOSE',
    whyUsTitleHighlight: 'AURA LEGACY?',
    whyUsSubtitle: 'The new standard in game top-up with high performance and absolute safety guarantees.',
    feature1Title: '0.5s API Auto Injection',
    feature1Desc: 'Directly linked via official publisher APIs. Instant delivery upon payment verification.',
    feature2Title: '100% Legal & Safe',
    feature2Desc: 'Official distributor source. Guaranteed account security against bans or negative balances.',
    feature3Title: '24/7 Customer Support',
    feature3Desc: 'Our dedicated customer care team is online around the clock on WhatsApp.',
    faqBadge: 'Common Questions',
    faqTitle: 'FREQUENTLY ASKED',
    faqTitleHighlight: 'QUESTIONS',
  },
  id: {
    home: 'Beranda',
    allGames: 'Game',
    trackOrder: 'Lacak Pesanan',
    calculator: 'Win Rate',
    flashSale: 'Flash Sale',
    searchPlaceholder: 'Cari Game...',
    serverStatus: 'Server Auto-Injection API:',
    serverOperational: '100% OPERASIONAL & INSTAN 1-3 DETIK',
    officialLegal: '100% Resmi & Legal Anti-Minus',
    selectTheme: 'Pilih Tema Aura',
    selectLanguage: 'Pilih Bahasa',
    themeAura: 'Tema Aura',
    soundSfx: 'Suara SFX',

    heroEventBadge: 'EVENT SPECIAL 2026',
    heroCta: 'TOP UP SEKARANG',
    exploreCatalog: 'Jelajahi Katalog',
    statSpeedVal: '0.5 Detik',
    statSpeedDesc: 'Injeksi Otomatis 24 Jam',
    statLegalVal: '100% Legal',
    statLegalDesc: 'Garansi Akun Aman Anti-Ban',
    statOrdersVal: '1.8M+ Sukses',
    statOrdersDesc: 'Transaksi Gamer Terverifikasi',
    statCsVal: '24/7 CS Support',
    statCsDesc: 'Siap Melayani Tiap Saat',

    liveTickerBadge: 'LIVE TRANSAKSI',
    success: 'Sukses',
    ago: 'lalu',
    secondsAgo: 'd lalu',
    minutesAgo: 'm lalu',

    catalogBadge: 'KATALOG GAME',
    catalogTitle: 'PILIH',
    catalogTitleHighlight: 'GAME',
    catalogSubtitle: 'Proses instan • Garansi 100% resmi',
    allProducts: 'Semua Produk',
    mobileGames: 'Mobile Games',
    pcGames: 'PC & Console',
    vouchers: 'Voucher & Lisensi',
    searchGamesFilter: 'Filter game disini...',
    sortPopular: 'Terpopuler',
    sortName: 'Nama (A-Z)',
    sortPrice: 'Harga Termurah',
    startFrom: 'Mulai dari',
    topUpAction: 'Top Up',
    noGamesFound: 'Game Tidak Ditemukan',
    resetFilter: 'Reset Semua Filter',

    flashBadge: 'FLASH SALE',
    flashTitle: 'PROMO',
    flashHighlight: 'HARI INI',
    endsIn: 'Sisa waktu',
    leftQuota: 'Tersisa',
    sold: 'Terjual',
    claimDeal: 'Klaim Promo',

    backToCatalog: 'Kembali ke Katalog Game',
    instantAutomation: 'INSTANT AUTOMATION',
    legalGuaranteed: '100% Legal & Diamond Resmi Garansi',
    autoSecondsGuarantee: 'Otomatis Masuk Akun 1-3 Detik 24 Jam',
    csSupportGuarantee: 'Bantuan CS Siaga WhatsApp 24/7',
    howToTopUp: 'Cara Top Up',
    howToFindId: 'Cara Cari ID / Server',
    idGuideTitle: 'Panduan Menemukan User ID & Server',
    step1Title: 'Masukkan Informasi Akun',
    step1Desc: 'Pastikan ID yang dimasukkan sudah benar',
    validateIdBtn: 'Validasi ID Akun',
    validatingServer: 'Mengecek Server Game...',
    verifiedNickname: 'Nickname Terverifikasi:',
    selectServer: 'Pilih Server',
    step2Title: 'Pilih Nominal Top Up',
    step2Desc: 'Pilih nominal diamond atau paket langganan',
    tabAll: 'Semua',
    tabDiamonds: 'Diamond/Koin',
    tabPass: 'Pass / Event',
    step3Title: 'Pilih Metode Pembayaran',
    step3Desc: 'Pilih channel pembayaran instan dengan biaya terendah',
    step4Title: 'Nomor WhatsApp & Voucher Promo',
    step4Desc: 'Bukti struk resmi dikirim otomatis ke WhatsApp kamu',
    whatsappLabel: 'Nomor WhatsApp',
    whatsappPlaceholder: '81234567890',
    promoLabel: 'Kode Promo Diskon (Opsional)',
    applyPromo: 'Terapkan',
    activeVouchers: 'Voucher Aktif:',
    buyNow: 'BELI SEKARANG',
    instantBadge: '⚡ Instan',
    saved: 'Hemat',
    itemLabel: 'Item',
    methodLabel: 'Metode',

    waitingPayment: 'MENUNGGU PEMBAYARAN',
    finishWithin: 'Selesaikan dalam',
    scanQrisDesc: 'Scan kode QRIS di atas dengan aplikasi BCA Mobile, GoPay, OVO, Dana, ShopeePay, atau Bank apa saja.',
    vaNumberDesc: 'Nomor Rekening Virtual Account:',
    totalBill: 'Total Tagihan:',
    simulatePaymentBtn: 'SIMULASI PEMBAYARAN SUKSES',
    testModeNote: 'Klik tombol di atas untuk mensimulasikan pembayaran terverifikasi secara instan dan melihat struk pengiriman.',
    orderIdLabel: 'Order ID:',

    deliverySuccessBadge: 'PEMBAYARAN & PENGIRIMAN SUKSES',
    deliverySuccessTitle: 'TOP UP BERHASIL DIKIRIM!',
    deliverySuccessDesc: 'Item game kamu telah otomatis diinjeksi ke dalam server dan akun telah terisi.',
    printReceipt: 'Cetak Struk',
    topUpAgain: 'Top Up Lagi',
    close: 'Tutup',
    totalPaid: 'Total Dibayar:',

    trackerBadge: 'REAL-TIME STATUS TRACKER',
    trackerTitle: 'LACAK PESANAN (CEK TRANSAKSI)',
    trackerDesc: 'Masukkan Nomor Invoice atau Order ID untuk mengecek progres pengiriman item game kamu.',
    searchInvoicePlaceholder: 'Contoh: AURA-849201',
    searchAction: 'Cari',
    tryDemoId: 'Coba Demo ID:',
    orderReceived: 'Pesanan Diterima & Terverifikasi',
    paymentVerified: 'Pembayaran Diterima (Lunas)',
    serverInjected: 'Injeksi Server Game Berhasil (100%)',
    orderNotFound: 'Pesanan Tidak Ditemukan',

    whyUsBadge: 'Keunggulan Aura Legacy',
    whyUsTitle: 'KENAPA HARUS',
    whyUsTitleHighlight: 'AURA LEGACY?',
    whyUsSubtitle: 'Standar baru layanan top up gaming Indonesia dengan performa tinggi dan jaminan keamanan absolut.',
    feature1Title: 'Injeksi API 0.5 Detik',
    feature1Desc: 'Sistem terintegrasi secara otomatis via API resmi. Tanpa menunggu verifikasi manual, pesanan langsung masuk setelah pembayaran terdeteksi.',
    feature2Title: '100% Legal & Bergaransi',
    feature2Desc: 'Sumber diamond murni dari jalur resmi developer. Akun dijamin aman dari risiko banned atau minus diamond selamanya.',
    feature3Title: 'Customer Service 24/7',
    feature3Desc: 'Layanan aduan dan konsultasi selalu aktif setiap saat. Tim customer care profesional siap merespon pertanyaan kamu dalam 1 menit.',
    faqBadge: 'Pertanyaan Umum',
    faqTitle: 'FREQUENTLY ASKED',
    faqTitleHighlight: 'QUESTIONS',
  }
};
