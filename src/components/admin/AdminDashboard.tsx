import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Layers, 
  Settings, 
  LogOut, 
  Store 
} from 'lucide-react';
import { AdminOrdersTab } from './AdminOrdersTab';
import { AdminCatalogTab } from './AdminCatalogTab';
import { AdminSystemTab } from './AdminSystemTab';
import { orderService, type ManagedOrder } from '../../services/orderService';
import { catalogService } from '../../services/catalogService';
import { logoutAdmin, type AdminUser } from '../../services/adminAuth';
import { sound } from '../../utils/sound';
import brandLogo from '../../assets/logo.png';
import type { Game } from '../../types';

interface AdminDashboardProps {
  adminUser: AdminUser;
  onLogout: () => void;
  onNavigateToStore: () => void;
  onCatalogChange: (games: Game[]) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  adminUser,
  onLogout,
  onNavigateToStore,
  onCatalogChange,
}) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'catalog' | 'system'>('orders');
  const [orders, setOrders] = useState<ManagedOrder[]>(() => orderService.getOrders());
  const [games, setGames] = useState<Game[]>(() => catalogService.getGames());

  useEffect(() => {
    const unsubOrders = orderService.subscribe((newOrders) => setOrders(newOrders));
    const unsubCatalog = catalogService.subscribe((newGames) => {
      setGames(newGames);
      onCatalogChange(newGames);
    });

    return () => {
      unsubOrders();
      unsubCatalog();
    };
  }, [onCatalogChange]);

  const handleRefreshOrders = () => {
    setOrders([...orderService.getOrders()]);
  };

  const handleCatalogUpdated = (updatedGames: Game[]) => {
    setGames(updatedGames);
    onCatalogChange(updatedGames);
  };

  const handleLogoutClick = () => {
    sound.playClick();
    logoutAdmin();
    onLogout();
  };

  return (
    <div className="min-h-screen bg-[#070913] text-white flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Background Ambience Layer */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-600/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[160px]" />
      </div>

      {/* Top Navbar Header */}
      <header className="sticky top-0 z-30 bg-[#070913]/90 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4 transition-all">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <img
            src={brandLogo}
            alt="Aura Logo"
            className="w-10 h-10 object-contain drop-shadow-[0_0_12px_rgba(6,182,212,0.5)]"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-black text-base sm:text-lg tracking-wider text-white">
                AURA <span className="aura-text-gradient">COMMAND CENTER</span>
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                ONLINE
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono hidden sm:block">
              Admin Session: {adminUser.username} • Super Admin
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Switch to Storefront */}
          <button
            onClick={() => {
              sound.playClick();
              onNavigateToStore();
            }}
            className="px-3 sm:px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 hover:text-white text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-xs"
            title="ត្រឡប់ទៅមើលហាងផ្ទាល់"
          >
            <Store className="w-4 h-4 text-cyan-400" />
            <span className="hidden sm:inline">មើលហាងផ្ទាល់ (Storefront)</span>
          </button>

          {/* Logout */}
          <button
            onClick={handleLogoutClick}
            className="p-2 sm:px-3 sm:py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-400 hover:text-rose-300 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
            title="ចាកចេញ (Logout)"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">ចាកចេញ</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 relative z-10 space-y-6">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-3 overflow-x-auto scrollbar-none">
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('orders');
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'orders'
                ? 'bg-cyan-500 text-black shadow-[0_0_20px_rgba(6,182,212,0.4)]'
                : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/5'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>គ្រប់គ្រងការបញ្ជាទិញ (Orders)</span>
            <span
              className={`px-1.5 py-0.2 rounded-md text-[10px] font-mono font-black ${
                activeTab === 'orders' ? 'bg-black text-cyan-400' : 'bg-white/10 text-slate-300'
              }`}
            >
              {orders.length}
            </span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('catalog');
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'catalog'
                ? 'bg-cyan-500 text-black shadow-[0_0_20px_rgba(6,182,212,0.4)]'
                : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/5'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>កែសម្រួលតម្លៃ & រូបភាព (Price & Images)</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('system');
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'system'
                ? 'bg-cyan-500 text-black shadow-[0_0_20px_rgba(6,182,212,0.4)]'
                : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/5'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>ប្រព័ន្ធ & MooGold API</span>
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'orders' && (
          <AdminOrdersTab orders={orders} onRefreshOrders={handleRefreshOrders} />
        )}

        {activeTab === 'catalog' && (
          <AdminCatalogTab games={games} onCatalogUpdated={handleCatalogUpdated} />
        )}

        {activeTab === 'system' && <AdminSystemTab />}
      </main>

      {/* Admin Footer */}
      <footer className="border-t border-white/5 py-4 px-6 text-center text-[11px] text-slate-500 font-mono relative z-10">
        AURA TOPUP COMMAND CENTER • POWERED BY MOOGOLD TOKYO PROXY ENGINE • 2026
      </footer>
    </div>
  );
};
