import React, { useState } from 'react';
import { 
  Search, 
  RefreshCw, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  XCircle, 
  Copy, 
  Check, 
  DollarSign, 
  ShoppingBag, 
  Eye, 
  PhoneCall, 
  X
} from 'lucide-react';
import { orderService, type ManagedOrder } from '../../services/orderService';
import { sound } from '../../utils/sound';

interface AdminOrdersTabProps {
  orders: ManagedOrder[];
  onRefreshOrders: () => void;
}

export const AdminOrdersTab: React.FC<AdminOrdersTabProps> = ({ orders, onRefreshOrders }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'COMPLETED' | 'QUEUED' | 'PROCESSING' | 'FAILED'>('ALL');
  const [selectedOrder, setSelectedOrder] = useState<ManagedOrder | null>(null);
  const [retryingId, setRetryingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // KPIs
  const totalRevenueUsd = orders.reduce((sum, o) => sum + (o.priceUsd || 0), 0);
  const totalRevenueKhr = Math.round(totalRevenueUsd * 4100);
  const completedOrders = orders.filter((o) => o.status === 'COMPLETED').length;
  const queuedOrders = orders.filter((o) => o.status === 'QUEUED').length;

  // Filtered orders
  const filteredOrders = orders.filter((order) => {
    const matchesStatus = statusFilter === 'ALL' || order.status === statusFilter;
    const query = searchQuery.trim().toLowerCase();
    if (!query) return matchesStatus;

    const matchesQuery =
      order.id.toLowerCase().includes(query) ||
      order.gameTitle.toLowerCase().includes(query) ||
      order.userId.toLowerCase().includes(query) ||
      (order.whatsapp && order.whatsapp.toLowerCase().includes(query)) ||
      (order.zoneId && order.zoneId.toLowerCase().includes(query));

    return matchesStatus && matchesQuery;
  });

  const handleCopy = (text: string, id: string) => {
    sound.playClick();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleStatusChange = (orderId: string, newStatus: ManagedOrder['status']) => {
    sound.playClick();
    orderService.updateOrderStatus(orderId, newStatus);
    setNotification({ type: 'success', message: `បានកែសម្រួលស្ថានភាពទៅជា ${newStatus} ជោគជ័យ!` });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleRetryMooGold = async (orderId: string) => {
    sound.playClick();
    setRetryingId(orderId);
    const result = await orderService.retryMooGoldFulfillment(orderId);
    setRetryingId(null);

    if (result.success) {
      sound.playSuccess();
      setNotification({ type: 'success', message: result.message });
    } else {
      sound.playError();
      setNotification({ type: 'error', message: result.message });
    }
    setTimeout(() => setNotification(null), 4000);
  };

  const getStatusBadge = (status: ManagedOrder['status']) => {
    switch (status) {
      case 'COMPLETED':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>ជោគជ័យ (COMPLETED)</span>
          </span>
        );
      case 'QUEUED':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
            <Clock className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>រង់ចាំ (QUEUED)</span>
          </span>
        );
      case 'PROCESSING':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            <RefreshCw className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
            <span>កំពុងបញ្ចូល (PROCESSING)</span>
          </span>
        );
      case 'FAILED':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-500/10 text-rose-400 border border-rose-500/30">
            <XCircle className="w-3.5 h-3.5 text-rose-400" />
            <span>បរាជ័យ (FAILED)</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {notification && (
        <div
          className={`p-4 rounded-2xl border text-sm font-semibold flex items-center justify-between shadow-xl animate-in fade-in slide-in-from-top-3 ${
            notification.type === 'success'
              ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
              : 'bg-rose-500/20 border-rose-500/40 text-rose-300'
          }`}
        >
          <div className="flex items-center gap-2">
            {notification.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-rose-400 flex-shrink-0" />
            )}
            <span>{notification.message}</span>
          </div>
          <button onClick={() => setNotification(null)} className="p-1 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Card 1: Total Revenue */}
        <div className="admin-card rounded-2xl p-4 sm:p-5 border border-white/10 bg-[#0d1326] text-white relative overflow-hidden group shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-400 font-tech uppercase tracking-wider">ចំណូលសរុប (Revenue)</span>
            <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="font-display font-black text-xl sm:text-2xl text-white">
            ${totalRevenueUsd.toFixed(2)}
          </div>
          <div className="text-[11px] text-cyan-400 font-mono mt-0.5">
            ~{totalRevenueKhr.toLocaleString('en-US')} ៛ (KHR)
          </div>
        </div>

        {/* Card 2: Total Orders */}
        <div className="admin-card rounded-2xl p-4 sm:p-5 border border-white/10 bg-[#0d1326] text-white relative overflow-hidden shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-400 font-tech uppercase tracking-wider">ការបញ្ជាទិញសរុប</span>
            <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="font-display font-black text-xl sm:text-2xl text-white">
            {orders.length}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            ទូទាំងហាង Aura TopUp
          </div>
        </div>

        {/* Card 3: Completed Orders */}
        <div className="admin-card rounded-2xl p-4 sm:p-5 border border-white/10 bg-[#0d1326] text-white relative overflow-hidden shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-400 font-tech uppercase tracking-wider">ជោគជ័យ (Delivered)</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="font-display font-black text-xl sm:text-2xl text-emerald-400">
            {completedOrders}
          </div>
          <div className="text-[11px] text-emerald-300 font-mono mt-0.5">
            {orders.length ? Math.round((completedOrders / orders.length) * 100) : 0}% អត្រាជោគជ័យ
          </div>
        </div>

        {/* Card 4: Queued Orders */}
        <div className="admin-card rounded-2xl p-4 sm:p-5 border border-white/10 bg-[#0d1326] text-white relative overflow-hidden shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-400 font-tech uppercase tracking-wider">កំពុងរង់ចាំ (Queued)</span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="font-display font-black text-xl sm:text-2xl text-amber-400">
            {queuedOrders}
          </div>
          <div className="text-[11px] text-amber-300/80 mt-0.5">
            {queuedOrders > 0 ? 'ទាមទារបំពេញ MooGold' : 'គ្មានការកកស្ទះ'}
          </div>
        </div>
      </div>

      {/* Search & Status Filters */}
      <div className="admin-card rounded-2xl p-4 border border-white/10 bg-[#0d1326] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shadow-xl">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ស្វែងរកតាម Order ID, User ID, ឈ្មោះហ្គេម ឬលេខទូរស័ព្ទ..."
            className="w-full bg-[#080c1d] border border-white/15 pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-all font-mono"
          />
        </div>

        {/* Status Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {(['ALL', 'COMPLETED', 'QUEUED', 'FAILED'] as const).map((st) => (
            <button
              key={st}
              onClick={() => {
                sound.playClick();
                setStatusFilter(st);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                statusFilter === st
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.45)] border border-cyan-400/50'
                  : 'bg-[#121933] text-slate-300 hover:text-white border border-white/10'
              }`}
            >
              {st === 'ALL'
                ? `ទាំងអស់ (${orders.length})`
                : st === 'COMPLETED'
                ? `ជោគជ័យ (${completedOrders})`
                : st === 'QUEUED'
                ? `រង់ចាំ (${queuedOrders})`
                : `បរាជ័យ (${orders.filter((o) => o.status === 'FAILED').length})`}
            </button>
          ))}
          <button
            onClick={() => {
              sound.playClick();
              onRefreshOrders();
            }}
            className="p-2 rounded-xl bg-[#121933] hover:bg-[#1a2347] border border-white/10 text-slate-300 hover:text-white transition-all ml-1 cursor-pointer"
            title="Refresh Orders"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="admin-card rounded-2xl border border-white/10 bg-[#0d1326] overflow-hidden shadow-2xl text-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-[#121933] text-[11px] font-tech text-slate-300 uppercase tracking-wider">
                <th className="py-3 px-4">Order ID & ពេលវេលា</th>
                <th className="py-3 px-4">ហ្គេម & កញ្ចប់ពេជ្រ</th>
                <th className="py-3 px-4">គណនីអ្នកលេង (Account)</th>
                <th className="py-3 px-4">តម្លៃ (Price)</th>
                <th className="py-3 px-4">ស្ថានភាព (Status)</th>
                <th className="py-3 px-4 text-right">សកម្មភាព (Actions)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs text-slate-300">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    <ShoppingBag className="w-10 h-10 mx-auto mb-2 text-slate-600 opacity-50" />
                    <p className="font-semibold text-sm text-slate-400">មិនមានទិន្នន័យការបញ្ជាទិញឡើយ</p>
                    <p className="text-xs text-slate-500 mt-1">គ្មានការបញ្ជាទិញត្រូវនឹងការស្វែងរកនេះទេ</p>
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-white/5 transition-colors">
                    {/* ID & Date */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-cyan-400">{order.id}</span>
                        <button
                          onClick={() => handleCopy(order.id, order.id)}
                          className="text-slate-500 hover:text-white transition-colors cursor-pointer"
                          title="Copy ID"
                        >
                          {copiedId === order.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        {new Date(order.createdAt).toLocaleString('km-KH', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>
                    </td>

                    {/* Game & Item */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        {order.gameThumbnail ? (
                          <img
                            src={order.gameThumbnail}
                            alt=""
                            className="w-8 h-8 rounded-lg object-cover border border-white/10"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold text-xs">
                            🎮
                          </div>
                        )}
                        <div>
                          <div className="font-semibold text-white truncate max-w-[150px] sm:max-w-xs">
                            {order.gameTitle}
                          </div>
                          <div className="text-[11px] text-cyan-400 font-medium">
                            {order.denomination} ({order.amount})
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Account User ID / Server */}
                    <td className="py-3.5 px-4">
                      <div className="font-mono font-bold text-slate-200">
                        {order.userId} {order.zoneId ? `(${order.zoneId})` : ''}
                      </div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                        {order.server && <span className="text-purple-400">Server: {order.server}</span>}
                        {order.whatsapp && (
                          <span className="flex items-center gap-1 text-slate-500">
                            <PhoneCall className="w-3 h-3" />
                            {order.whatsapp}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Price */}
                    <td className="py-3.5 px-4">
                      <div className="font-mono font-bold text-white text-sm">
                        ${order.priceUsd.toFixed(2)}
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono">
                        ~{Math.round(order.priceUsd * 4100).toLocaleString()} ៛
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4">
                      {getStatusBadge(order.status)}
                      {order.moogoldOrderId && (
                        <div className="text-[10px] text-slate-500 font-mono mt-1">
                          MG: {order.moogoldOrderId}
                        </div>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Retry via MooGold */}
                        {order.status === 'QUEUED' && (
                          <button
                            onClick={() => handleRetryMooGold(order.id)}
                            disabled={retryingId === order.id}
                            className="px-2.5 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 text-xs font-bold flex items-center gap-1 transition-all cursor-pointer disabled:opacity-50"
                            title="ព្យាយាមផ្ញើបញ្ចូលទៅកាន់ MooGold ម្តងទៀត"
                          >
                            <RefreshCw
                              className={`w-3.5 h-3.5 ${retryingId === order.id ? 'animate-spin' : ''}`}
                            />
                            <span>Retry</span>
                          </button>
                        )}

                        {/* Status dropdown */}
                        <select
                          value={order.status}
                          onChange={(e) =>
                            handleStatusChange(order.id, e.target.value as ManagedOrder['status'])
                          }
                          className="bg-black/60 border border-white/10 rounded-lg px-2 py-1 text-[11px] text-slate-300 focus:outline-none focus:border-cyan-500 cursor-pointer"
                        >
                          <option value="COMPLETED">COMPLETED</option>
                          <option value="QUEUED">QUEUED</option>
                          <option value="PROCESSING">PROCESSING</option>
                          <option value="FAILED">FAILED</option>
                        </select>

                        {/* View Details */}
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all cursor-pointer"
                          title="មើលលម្អិត"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="admin-card bg-[#0d1326] rounded-3xl border border-cyan-500/40 p-6 sm:p-8 max-w-lg w-full relative animate-in fade-in zoom-in-95 text-white">
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-bold font-mono mb-2">
                <span>{selectedOrder.id}</span>
              </div>
              <h3 className="font-display font-black text-xl text-white">
                ព័ត៌មានលម្អិតការបញ្ជាទិញ
              </h3>
            </div>

            <div className="space-y-3.5 bg-black/40 p-4 rounded-2xl border border-white/10 text-xs">
              <div className="flex justify-between items-center py-1 border-b border-white/5">
                <span className="text-slate-400">ហ្គេម៖</span>
                <span className="font-bold text-white">{selectedOrder.gameTitle}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-white/5">
                <span className="text-slate-400">កញ្ចប់ពេជ្រ៖</span>
                <span className="font-bold text-cyan-400">
                  {selectedOrder.denomination} ({selectedOrder.amount})
                </span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-white/5">
                <span className="text-slate-400">User ID / Player ID៖</span>
                <span className="font-mono font-bold text-white">{selectedOrder.userId}</span>
              </div>
              {selectedOrder.zoneId && (
                <div className="flex justify-between items-center py-1 border-b border-white/5">
                  <span className="text-slate-400">Zone / Server ID៖</span>
                  <span className="font-mono font-bold text-purple-400">{selectedOrder.zoneId}</span>
                </div>
              )}
              {selectedOrder.server && (
                <div className="flex justify-between items-center py-1 border-b border-white/5">
                  <span className="text-slate-400">Server Region៖</span>
                  <span className="font-bold text-white">{selectedOrder.server}</span>
                </div>
              )}
              {selectedOrder.whatsapp && (
                <div className="flex justify-between items-center py-1 border-b border-white/5">
                  <span className="text-slate-400">WhatsApp / Telegram៖</span>
                  <span className="font-mono text-white">{selectedOrder.whatsapp}</span>
                </div>
              )}
              <div className="flex justify-between items-center py-1 border-b border-white/5">
                <span className="text-slate-400">វិធីសាស្ត្រទូទាត់៖</span>
                <span className="font-semibold text-white">{selectedOrder.paymentMethod}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-white/5">
                <span className="text-slate-400">តម្លៃទូទាត់៖</span>
                <span className="font-mono font-black text-cyan-400 text-sm">
                  ${selectedOrder.priceUsd.toFixed(2)} (~{Math.round(selectedOrder.priceUsd * 4100).toLocaleString()} ៛)
                </span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-white/5">
                <span className="text-slate-400">កាលបរិច្ឆេទ៖</span>
                <span className="text-slate-300 font-mono">
                  {new Date(selectedOrder.createdAt).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-slate-400">MooGold Engine Status៖</span>
                <div>{getStatusBadge(selectedOrder.status)}</div>
              </div>
              {selectedOrder.moogoldMessage && (
                <div className="pt-2 text-[11px] text-slate-400 bg-black/50 p-2.5 rounded-xl border border-white/5 font-mono">
                  Engine Log: {selectedOrder.moogoldMessage}
                </div>
              )}
            </div>

            <div className="mt-6 flex gap-3">
              {selectedOrder.status === 'QUEUED' && (
                <button
                  onClick={() => {
                    handleRetryMooGold(selectedOrder.id);
                    setSelectedOrder(null);
                  }}
                  className="flex-1 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Retry via MooGold</span>
                </button>
              )}
              <button
                onClick={() => setSelectedOrder(null)}
                className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
              >
                បិទ (Close)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
