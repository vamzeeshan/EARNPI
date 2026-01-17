
import React from 'react';
import { User, Transaction } from '../types';
import { 
  CreditCard, 
  Plus, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Search,
  History,
  Info,
  ChevronRight,
  TrendingUp,
  ArrowRightLeft,
  ArrowUp
} from 'lucide-react';

interface WalletProps {
  user: User;
  transactions: Transaction[];
  onDeposit: (amount: number) => void;
  onWithdraw: (amount: number) => void;
}

const Wallet: React.FC<WalletProps> = ({ user, transactions, onDeposit, onWithdraw }) => {
  const [activeTab, setActiveTab] = React.useState<'all' | 'deposits' | 'withdrawals'>('all');

  const filtered = transactions.filter(t => {
    if (activeTab === 'deposits') return t.type === 'deposit' || t.type === 'earning' || t.type === 'referral';
    if (activeTab === 'withdrawals') return t.type === 'withdrawal';
    return true;
  });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tight">My Wallet</h2>
          <p className="text-gray-500 text-sm font-medium">Manage your funds and track your earnings</p>
        </div>
        <div className="flex items-center space-x-2">
           <div className="bg-green-500/10 text-green-500 px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 border border-green-500/20">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping"></div>
              <span>Live Updates Enabled</span>
           </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Balance and Actions Section */}
        <div className="lg:col-span-4 space-y-6">
          {/* Main Balance Card */}
          <div className="relative overflow-hidden bg-gradient-to-br from-[#a855f7] to-[#6366f1] p-8 rounded-[2.5rem] text-white shadow-2xl shadow-purple-900/40 group">
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-1000"></div>
            <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-purple-900/20 rounded-full blur-2xl group-hover:translate-x-4 transition-transform duration-1000"></div>
            
            <div className="relative z-10 flex flex-col h-full justify-between space-y-8">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <p className="text-purple-100 text-[10px] font-black uppercase tracking-[0.2em] opacity-80">Total Balance</p>
                  <h3 className="text-4xl font-black tracking-tight tabular-nums">${user.balance.toFixed(2)}</h3>
                </div>
                <div className="bg-white/20 p-2.5 rounded-2xl backdrop-blur-sm">
                  <CreditCard size={24} />
                </div>
              </div>
              
              <div className="flex items-end justify-between">
                <div>
                   <p className="text-[9px] uppercase tracking-[0.2em] text-purple-200 font-bold mb-1">Deposit Wallet</p>
                   <p className="text-lg font-bold">${user.depositWallet.toFixed(2)}</p>
                </div>
                <div className="text-right">
                   <p className="text-[9px] uppercase tracking-[0.2em] text-purple-200 font-bold mb-1">Referral Wallet</p>
                   <p className="text-lg font-bold">${user.referralEarning.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Action Grid */}
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => onDeposit(100)}
              className="group flex flex-col items-center justify-center p-6 rounded-[2rem] bg-dark-card border border-white/5 hover:border-green-500/30 transition-all hover:bg-green-500/5"
            >
              <div className="bg-green-500/10 text-green-500 p-4 rounded-2xl mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                <Plus size={24} />
              </div>
              <span className="font-black text-white text-xs uppercase tracking-widest">Deposit</span>
            </button>
            <button 
              onClick={() => onWithdraw(50)}
              className="group flex flex-col items-center justify-center p-6 rounded-[2rem] bg-dark-card border border-white/5 hover:border-orange-500/30 transition-all hover:bg-orange-500/5"
            >
              <div className="bg-orange-500/10 text-orange-400 p-4 rounded-2xl mb-4 group-hover:scale-110 group-hover:-rotate-3 transition-transform">
                <ArrowUpRight size={24} />
              </div>
              <span className="font-black text-white text-xs uppercase tracking-widest">Withdraw</span>
            </button>
            <button 
              className="group flex flex-col items-center justify-center p-6 rounded-[2rem] bg-dark-card border border-white/5 hover:border-blue-500/30 transition-all hover:bg-blue-500/5"
            >
              <div className="bg-blue-500/10 text-blue-400 p-4 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                <ArrowRightLeft size={24} />
              </div>
              <span className="font-black text-white text-xs uppercase tracking-widest">Transfer</span>
            </button>
            <button 
              className="group flex flex-col items-center justify-center p-6 rounded-[2rem] bg-dark-card border border-white/5 hover:border-purple-500/30 transition-all hover:bg-purple-500/5"
            >
              <div className="bg-purple-500/10 text-purple-400 p-4 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                <TrendingUp size={24} />
              </div>
              <span className="font-black text-white text-xs uppercase tracking-widest">Re-invest</span>
            </button>
          </div>

          {/* Security Alert */}
          <div className="bg-orange-500/5 p-6 rounded-3xl border border-orange-500/10 flex items-start space-x-4">
            <Info className="text-orange-500 flex-shrink-0 mt-0.5" size={18} />
            <div className="space-y-1">
               <p className="text-[11px] font-bold text-white uppercase tracking-wider">Security Notice</p>
               <p className="text-[10px] text-gray-500 leading-relaxed">
                 Ensure your 2FA is active before making large withdrawals. Withdrawals typically take 2-24 hours to clear.
               </p>
            </div>
          </div>
        </div>

        {/* Full Transaction History Section */}
        <div className="lg:col-span-8 flex flex-col">
          <div className="bg-dark-card rounded-[2.5rem] border border-white/5 overflow-hidden flex flex-col h-full shadow-2xl">
            {/* Table Header / Filters */}
            <div className="p-8 border-b border-white/5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-3">
                  <div className="p-2 bg-purple-500/10 text-purple-400 rounded-lg">
                    <History size={18} />
                  </div>
                  Transaction History
                </h3>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                  <input 
                    type="text" 
                    placeholder="Search by amount, ID..." 
                    className="pl-12 pr-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-xs outline-none focus:ring-2 focus:ring-purple-500/20 text-white w-full sm:w-72 transition-all"
                  />
                </div>
              </div>
              
              <div className="flex space-x-2 mt-8">
                {['all', 'deposits', 'withdrawals'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                      activeTab === tab 
                        ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.3)]' 
                        : 'text-gray-500 hover:text-gray-300 bg-white/5 border border-white/5'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Table Content */}
            <div className="flex-1 overflow-x-auto no-scrollbar">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/5 bg-white/[0.01]">
                    <th className="px-8 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Activity</th>
                    <th className="px-8 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest text-center">Date & Time</th>
                    <th className="px-8 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest text-right">Amount</th>
                    <th className="px-8 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filtered.map((t) => (
                    <tr key={t.id} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="px-8 py-6">
                        <div className="flex items-center space-x-4">
                          <div className={`p-3 rounded-2xl ${
                            t.type === 'withdrawal' ? 'bg-orange-500/10 text-orange-500' : 
                            t.type === 'deposit' ? 'bg-green-500/10 text-green-500' : 
                            'bg-purple-500/10 text-purple-400'
                          }`}>
                            {t.type === 'withdrawal' ? <ArrowUp size={18} /> : 
                             t.type === 'deposit' ? <Plus size={18} /> : 
                             <TrendingUp size={18} />}
                          </div>
                          <div className="space-y-1">
                             <p className="font-bold text-white text-sm">{t.description}</p>
                             <p className="text-[10px] text-gray-500 font-medium">ID: #{t.id.toUpperCase()}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-center">
                        <p className="text-gray-300 text-xs font-medium">
                          {new Date(t.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </p>
                        <p className="text-[10px] text-gray-500 mt-0.5">
                          {new Date(t.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <span className={`font-black text-sm tabular-nums ${t.amount < 0 ? 'text-orange-500' : 'text-green-500'}`}>
                          {t.amount < 0 ? '-' : '+'}${Math.abs(t.amount).toFixed(2)}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex justify-center">
                          <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                            t.status === 'completed' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 
                            t.status === 'pending' ? 'bg-purple-500/10 text-purple-500 border-purple-500/20' : 
                            'bg-red-500/10 text-red-500 border-red-500/20'
                          }`}>
                            {t.status}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {filtered.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-gray-600">
                  <div className="bg-white/5 p-6 rounded-full mb-6 text-gray-700">
                    <History size={48} strokeWidth={1} />
                  </div>
                  <p className="font-black text-sm uppercase tracking-widest">No matching records found</p>
                  <p className="text-xs mt-1">Try adjusting your filters or search terms</p>
                </div>
              )}
            </div>
            
            <div className="p-6 bg-white/[0.02] border-t border-white/5 flex items-center justify-between">
               <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Showing {filtered.length} entries</p>
               <button className="text-[10px] text-purple-400 font-black uppercase tracking-widest hover:text-purple-300 transition-colors flex items-center gap-2">
                  Export PDF <ChevronRight size={14} />
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
