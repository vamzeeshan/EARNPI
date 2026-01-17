
import React from 'react';
import { User } from '../types';
import { Share2, Copy, Users, TrendingUp, Award, Check, ChevronRight } from 'lucide-react';

interface ReferralStat {
  level: string;
  rate: string;
  count: number;
  earnings: number;
}

const REFERRAL_LEVELS: ReferralStat[] = [
  { level: '1st Level', rate: '6%', count: 0, earnings: 0.00 },
  { level: '2nd Level', rate: '3%', count: 0, earnings: 0.00 },
  { level: '3rd Level', rate: '1%', count: 0, earnings: 0.00 },
  { level: '4th Level', rate: '1%', count: 0, earnings: 0.00 },
  { level: '5th Level', rate: '1%', count: 0, earnings: 0.00 },
];

const Referrals: React.FC<{ user: User }> = ({ user }) => {
  const [copied, setCopied] = React.useState(false);
  
  const copyLink = () => {
    navigator.clipboard.writeText(`https://earnfi.network/ref/${user.referralCode}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid lg:grid-cols-12 gap-6">
        {/* Referral Earnings Card */}
        <div className="lg:col-span-7 bg-dark-card p-8 rounded-[2.5rem] border border-white/5 relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-8 text-purple-500/5 pointer-events-none group-hover:scale-110 transition-transform duration-1000">
              <Share2 size={160} />
           </div>
           
           <div className="relative z-10 space-y-8">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Referral Earning Wallet</p>
                  <h3 className="text-4xl font-black text-white tabular-nums">${user.referralEarning.toFixed(2)}</h3>
                  <p className="text-purple-400 text-[10px] font-bold mt-2">$1.00 more needed to claim</p>
                </div>
                <button className="bg-white/5 border border-white/10 text-white px-6 py-2 rounded-xl text-xs font-bold opacity-50 cursor-not-allowed">
                  Claim Earnings
                </button>
              </div>

              <div className="space-y-4">
                <div>
                   <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-2">Your Referral Link</p>
                   <div className="flex items-center space-x-2">
                     <div className="flex-1 bg-white/5 border border-white/10 px-5 py-3.5 rounded-xl font-mono text-xs text-gray-300 truncate">
                       earnfi.network/ref/{user.referralCode}
                     </div>
                     <button 
                       onClick={copyLink}
                       className={`p-3.5 rounded-xl transition-all ${
                         copied ? 'bg-green-600 text-white shadow-[0_0_15px_rgba(34,197,94,0.3)]' : 'bg-purple-600 text-white hover:bg-purple-700 shadow-lg shadow-purple-900/20'
                       }`}
                     >
                       {copied ? <Check size={20} /> : <Copy size={20} />}
                     </button>
                   </div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10">
                   <div>
                      <p className="text-[10px] font-bold text-gray-500 uppercase">Referral Code</p>
                      <p className="text-sm font-black text-white">{user.referralCode}</p>
                   </div>
                   <button className="bg-purple-600 text-white px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest">
                      Add Referral Code
                   </button>
                </div>
              </div>
           </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-4">
           {[
             { label: 'Total Referrals', value: user.referralsCount, icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
             { label: 'Active Network', value: '0', icon: TrendingUp, color: 'text-green-500', bg: 'bg-green-500/10' },
             { label: 'Current Rank', value: user.rank, icon: Award, color: 'text-orange-500', bg: 'bg-orange-500/10' },
             { label: 'Pending Earning', value: '$0.00', icon: Share2, color: 'text-purple-500', bg: 'bg-purple-500/10' },
           ].map((stat, i) => (
             <div key={i} className="bg-dark-card p-6 rounded-[2rem] border border-white/5 flex flex-col justify-between hover:border-white/10 transition-all">
                <div className={`w-10 h-10 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center mb-4`}>
                   <stat.icon size={20} />
                </div>
                <div>
                  <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wider">{stat.label}</p>
                  <h4 className="text-xl font-black text-white mt-1">{stat.value}</h4>
                </div>
             </div>
           ))}
        </div>
      </div>

      {/* Commission Structure - As seen in the video reference */}
      <div className="bg-dark-card rounded-[2.5rem] border border-white/5 overflow-hidden">
        <div className="p-8 border-b border-white/5">
          <h3 className="text-lg font-bold text-white">Investment Commission Structure</h3>
          <p className="text-xs text-gray-500 mt-1">Multi-level referral rewards for your team network.</p>
        </div>
        <div className="p-4 overflow-x-auto no-scrollbar">
           <div className="flex space-x-4 min-w-[800px]">
              {REFERRAL_LEVELS.map((level, i) => (
                <div key={i} className="flex-1 bg-white/5 p-6 rounded-3xl border border-white/10 space-y-3">
                   <div className="flex justify-between items-center">
                      <span className="text-[10px] font-black text-purple-400 uppercase">{level.level}</span>
                      <span className="text-xs font-black text-white">{level.rate}</span>
                   </div>
                   <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-600" style={{ width: level.rate }}></div>
                   </div>
                   <div className="flex justify-between items-end">
                      <p className="text-[10px] text-gray-500 uppercase">Earning</p>
                      <p className="text-sm font-black text-white">${level.earnings.toFixed(2)}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>

      {/* Network Members */}
      <div className="bg-dark-card rounded-[2.5rem] border border-white/5 overflow-hidden">
        <div className="p-8 border-b border-white/5 flex justify-between items-center">
          <h3 className="text-lg font-bold text-white">Your Network</h3>
          <button className="text-xs font-bold text-purple-400 uppercase tracking-widest hover:underline">View All Members</button>
        </div>
        <div className="p-12 text-center">
           <div className="bg-white/5 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-600">
              <Users size={32} />
           </div>
           <p className="text-gray-500 font-medium">No members in your network yet.</p>
           <button className="mt-4 text-purple-400 text-xs font-bold uppercase">Invite Friends Now</button>
        </div>
      </div>
    </div>
  );
};

export default Referrals;
