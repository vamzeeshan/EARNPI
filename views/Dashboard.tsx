
import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { 
  DollarSign, Wallet, Users, ArrowDown, ArrowUp, Zap, ChevronRight, MessageCircle, Facebook, Info, TrendingUp, Target
} from 'lucide-react';
import { User, Transaction } from '../types';

const chartData = [
  { name: 'Jan', value: 0 },
  { name: 'Feb', value: 100 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 150 },
  { name: 'May', value: 300 },
  { name: 'Jun', value: 250 },
  { name: 'Jul', value: 400 },
  { name: 'Aug', value: 350 },
  { name: 'Sep', value: 500 },
];

interface DashboardProps {
  user: User;
  transactions: Transaction[];
}

const Dashboard: React.FC<DashboardProps> = ({ user, transactions }) => {
  const [liveCounter, setLiveCounter] = React.useState(user.liveEarning);
  const logoUrl = "https://raw.githubusercontent.com/pi-apps/pi-platform-docs/master/assets/pi-logo.png";

  React.useEffect(() => {
    const interval = setInterval(() => {
      setLiveCounter(prev => prev + 0.00001);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Top Section: Main Wallet & Social */}
      <div className="grid lg:grid-cols-12 gap-6">
        {/* Total Balance Card */}
        <div className="lg:col-span-8 bg-dark-card rounded-[2rem] p-8 relative overflow-hidden group border border-white/5 hover:border-white/10 transition-all">
          <div className="absolute top-0 right-0 p-8 text-white/5 pointer-events-none group-hover:scale-110 transition-transform duration-1000">
             <Wallet size={160} />
          </div>
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <p className="text-gray-400 text-sm font-medium mb-1">Total Balance</p>
              <h2 className="text-5xl font-black text-white tracking-tight">${user.balance.toFixed(2)}</h2>
              <p className="text-gray-500 text-xs mt-2 flex items-center">
                Deposit Wallet: <span className="ml-1 text-gray-300">${user.depositWallet.toFixed(2)}</span>
              </p>
              
              <div className="flex items-center space-x-3 mt-8">
                <button className="flex items-center space-x-2 bg-white text-black px-6 py-2.5 rounded-full font-bold text-sm hover:bg-gray-200 transition-all">
                   <ArrowDown size={16} /> <span>Deposit</span>
                </button>
                <button className="flex items-center space-x-2 bg-white/5 border border-white/10 text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-white/10 transition-all">
                   <ArrowUp size={16} /> <span>Withdraw</span>
                </button>
                <button className="flex items-center space-x-2 bg-white/5 border border-white/10 text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-white/10 transition-all">
                   <Users size={16} /> <span>Refer to</span>
                </button>
              </div>
            </div>

            <div className="flex flex-col space-y-3">
               <button className="flex items-center justify-center space-x-2 bg-[#25D366]/10 text-[#25D366] px-6 py-3 rounded-2xl border border-[#25D366]/20 font-bold hover:bg-[#25D366]/20 transition-all">
                  <MessageCircle size={20} /> <span>Join WhatsApp</span>
               </button>
               <button className="flex items-center justify-center space-x-2 bg-[#1877F2]/10 text-[#1877F2] px-6 py-3 rounded-2xl border border-[#1877F2]/20 font-bold hover:bg-[#1877F2]/20 transition-all">
                  <Facebook size={20} /> <span>Join Facebook</span>
               </button>
            </div>
          </div>
        </div>

        {/* Mini Stats Column */}
        <div className="lg:col-span-4 grid grid-cols-2 gap-4">
           {[
             { label: 'Total Invested', value: `$${user.totalInvested.toFixed(2)}`, icon: TrendingUp, color: 'text-orange-500', bg: 'bg-orange-500/10' },
             { label: 'Referral Earning', value: `$${user.referralEarning.toFixed(2)}`, icon: Users, color: 'text-purple-500', bg: 'bg-purple-500/10' },
             { label: 'Total Deposit', value: `$${user.totalDeposit.toFixed(2)}`, icon: ArrowDown, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
             { label: 'Total Withdrawn', value: `$${user.totalWithdrawn.toFixed(2)}`, icon: ArrowUp, color: 'text-red-500', bg: 'bg-red-500/10' },
           ].map((stat, i) => (
             <div key={i} className="bg-dark-card rounded-2xl p-4 border border-white/5 flex flex-col justify-between hover:border-white/10 transition-all">
                <div className={`${stat.bg} ${stat.color} w-8 h-8 rounded-lg flex items-center justify-center mb-2`}>
                   <stat.icon size={16} />
                </div>
                <div>
                   <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wider">{stat.label}</p>
                   <p className="text-lg font-black text-white mt-1">{stat.value}</p>
                </div>
             </div>
           ))}
        </div>
      </div>

      {/* Live Earning Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-dark-card rounded-[2rem] p-8 border border-white/5 flex items-center justify-between">
           <div className="space-y-4">
              <div className="flex items-center space-x-2">
                 <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
                 <p className="text-green-500 text-xs font-bold uppercase tracking-widest">Live Earning</p>
              </div>
              <div className="space-y-1">
                 <p className="text-gray-500 text-xs">Real-time updates</p>
                 <h3 className="text-4xl font-black text-white tabular-nums">${liveCounter.toFixed(6)}</h3>
              </div>
              <div className="flex items-center space-x-3 pt-4">
                 <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-[0_0_20px_rgba(234,88,12,0.3)]">
                    Activate Now
                 </button>
                 <button className="bg-white/5 border border-white/10 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-white/10 transition-all">
                    + Add Funds
                 </button>
              </div>
           </div>
           <div className="hidden sm:block">
              <div className="w-32 h-32 bg-purple-600/20 rounded-3xl flex items-center justify-center neon-border-purple animate-pulse-neon shadow-[0_0_30px_rgba(168,85,247,0.3)]">
                 <img src={logoUrl} alt="Pi Coin" className="w-20 h-20 object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
              </div>
           </div>
        </div>

        <div className="bg-dark-card rounded-[2rem] p-8 border border-white/5 flex flex-col justify-center text-center">
           <p className="text-gray-400 font-medium mb-4">Ready to earn? Activate a plan now and start enjoying daily returns!</p>
           <button className="mx-auto flex items-center space-x-2 bg-white/5 border border-white/10 text-white px-8 py-3 rounded-full font-bold hover:bg-purple-600 transition-all group">
              <span>Start Investment</span>
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
           </button>
        </div>
      </div>

      {/* Rank & Goals */}
      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 bg-dark-card rounded-[2rem] p-8 border border-white/5">
           <h3 className="text-lg font-bold text-white mb-6">My Rank</h3>
           <div className="flex items-center space-x-6">
              <div className="w-24 h-24 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-2xl flex items-center justify-center border border-yellow-500/30">
                 <Target size={48} className="text-yellow-500" />
              </div>
              <div className="flex-1 space-y-4">
                 <div>
                    <div className="flex justify-between items-center mb-1">
                       <p className="text-gray-400 text-xs font-bold">Progress to next goal</p>
                       <p className="text-white text-xs font-bold">{user.rankProgress}%</p>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                       <div className="h-full bg-purple-600 rounded-full" style={{ width: `${user.rankProgress}%` }}></div>
                    </div>
                 </div>
                 <p className="text-purple-400 text-xs font-bold uppercase tracking-tighter italic">Almost there!</p>
              </div>
           </div>
        </div>

        <div className="lg:col-span-7 bg-dark-card rounded-[2rem] p-8 border border-white/5">
           <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-white">Next Goal: Team Builder</h3>
              <div className="text-right">
                 <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">Team Progress</p>
                 <p className="text-lg font-black text-white">$0.00</p>
              </div>
           </div>
           <div className="h-2 bg-white/5 rounded-full overflow-hidden mb-4">
              <div className="h-full bg-green-500 rounded-full" style={{ width: '10%' }}></div>
           </div>
           <p className="text-green-500 text-xs font-bold">$10 more needed</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-dark-card rounded-[2rem] p-8 border border-white/5">
          <h3 className="text-lg font-bold text-white mb-8">Investment Overview</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#4b5563', fontSize: 10}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#4b5563', fontSize: 10}} />
                <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: 'none', borderRadius: '12px' }} />
                <Area type="monotone" dataKey="value" stroke="#a855f7" strokeWidth={3} fillOpacity={1} fill="url(#colorProfit)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-dark-card rounded-[2rem] p-8 border border-white/5">
          <h3 className="text-lg font-bold text-white mb-8">Profit Analysis</h3>
          <div className="h-[250px]">
             {/* Simple Placeholder for Profit Analysis as seen in video */}
             <div className="flex items-center justify-center h-full text-gray-600 text-sm font-bold uppercase tracking-widest">
                Analytics Processing...
             </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-dark-card rounded-[2rem] p-8 border border-white/5">
         <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-white">Recent Activity</h3>
            <div className="flex items-center space-x-2">
               <button className="bg-white/5 px-4 py-1.5 rounded-full text-xs text-gray-400 hover:text-white transition-all">Search</button>
               <button className="bg-white/5 px-4 py-1.5 rounded-full text-xs text-gray-400 hover:text-white transition-all">3 Days</button>
            </div>
         </div>
         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                  <tr className="text-gray-500 text-[10px] font-bold uppercase tracking-widest border-b border-white/5">
                     <th className="pb-4">Type</th>
                     <th className="pb-4">Amount</th>
                     <th className="pb-4 text-right">Status</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-white/5">
                  {transactions.slice(0, 3).map((t, i) => (
                    <tr key={i} className="group">
                       <td className="py-5">
                          <div className="flex items-center space-x-3">
                             <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                             <div>
                                <p className="text-white text-sm font-bold">{t.description}</p>
                                <p className="text-gray-500 text-[10px]">{new Date(t.date).toLocaleString()}</p>
                             </div>
                          </div>
                       </td>
                       <td className="py-5 text-white font-black text-sm">${Math.abs(t.amount).toFixed(2)}</td>
                       <td className="py-5 text-right">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                             t.status === 'completed' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                          }`}>
                             {t.status}
                          </span>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>

    </div>
  );
};

export default Dashboard;
