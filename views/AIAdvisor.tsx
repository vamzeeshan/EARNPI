
import React from 'react';
import { User } from '../types';
// Added missing Bell icon import from lucide-react
import { Sparkles, Loader2, RefreshCcw, TrendingUp, Bell } from 'lucide-react';
import { getFinancialAdvice } from '../services/gemini';

const AIAdvisor: React.FC<{ user: User }> = ({ user }) => {
  const [advice, setAdvice] = React.useState<string>('');
  const [loading, setLoading] = React.useState(false);

  const fetchAdvice = async () => {
    setLoading(true);
    const result = await getFinancialAdvice(user.balance, user.totalInvested);
    setAdvice(result);
    setLoading(false);
  };

  React.useEffect(() => {
    fetchAdvice();
  }, []);

  return (
    <div className="max-w-3xl mx-auto space-y-10 animate-in fade-in zoom-in duration-700">
      <div className="text-center space-y-4">
         <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-800 rounded-[32px] shadow-2xl shadow-purple-900/40 mb-4 animate-pulse-neon neon-border-purple">
            <Sparkles className="text-white" size={40} />
         </div>
         <h2 className="text-4xl font-black text-white tracking-tight">Your AI Strategy Hub</h2>
         <p className="text-gray-500 max-w-lg mx-auto text-sm">
            Gemini-powered insights tailored to your specific performance and investment portfolio.
         </p>
      </div>

      <div className="bg-dark-card p-10 lg:p-14 rounded-[3.5rem] border border-white/5 shadow-2xl relative overflow-hidden group">
         <div className="absolute top-0 right-0 p-12 text-purple-500/5 group-hover:scale-110 transition-transform duration-1000">
            <TrendingUp size={240} />
         </div>

         <div className="relative z-10 min-h-[220px] flex flex-col justify-center">
            {loading ? (
              <div className="flex flex-col items-center justify-center space-y-6 py-12">
                 <div className="relative">
                    <div className="absolute inset-0 bg-purple-500 blur-xl opacity-20 animate-pulse"></div>
                    <Loader2 className="animate-spin text-purple-500 relative z-10" size={64} />
                 </div>
                 <p className="text-gray-500 font-black animate-pulse tracking-widest uppercase text-[10px]">Generating Smart Strategy...</p>
              </div>
            ) : (
              <div className="space-y-10">
                 <div className="prose prose-invert max-w-none">
                    <div className="text-lg leading-relaxed text-gray-200 font-medium bg-white/[0.03] p-10 rounded-[2.5rem] border border-white/5 shadow-inner italic relative">
                      <div className="absolute -top-4 -left-4 bg-purple-600 text-white p-2 rounded-xl">
                        <Sparkles size={16} />
                      </div>
                      "{advice}"
                    </div>
                 </div>
                 <div className="flex justify-center">
                   <button 
                     onClick={fetchAdvice}
                     className="flex items-center space-x-3 bg-purple-600 text-white px-10 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-purple-700 transition-all shadow-xl shadow-purple-900/20 active:scale-95 group"
                   >
                     <RefreshCcw size={18} className="group-hover:rotate-180 transition-transform duration-500" />
                     <span>Refresh Analysis</span>
                   </button>
                 </div>
              </div>
            )}
         </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
         <div className="bg-[#1a1a1a] p-10 rounded-[2.5rem] border border-white/5 group hover:border-purple-500/30 transition-all">
            <div className="bg-purple-500/10 text-purple-400 w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
               <Bell size={24} />
            </div>
            <h4 className="text-xl font-black text-white mb-2 tracking-tight">Smart Alerts</h4>
            <p className="text-gray-500 text-xs leading-relaxed">Our AI monitors referral spikes. You'll get notified when a campaign is performing exceptionally well.</p>
            <div className="pt-6">
               <span className="text-[9px] font-black uppercase tracking-widest bg-white/5 text-gray-400 px-4 py-1.5 rounded-full border border-white/10">Coming Soon</span>
            </div>
         </div>
         <div className="bg-[#1a1a1a] p-10 rounded-[2.5rem] border border-white/5 group hover:border-green-500/30 transition-all">
            <div className="bg-green-500/10 text-green-400 w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
               <TrendingUp size={24} />
            </div>
            <h4 className="text-xl font-black text-white mb-2 tracking-tight">Goal Tracker</h4>
            <p className="text-gray-500 text-xs leading-relaxed">Set personalized earning targets. Gemini will suggest shifts in strategy to help you reach them faster.</p>
            <div className="pt-6">
               <span className="text-[9px] font-black uppercase tracking-widest bg-white/5 text-gray-400 px-4 py-1.5 rounded-full border border-white/10">Coming Soon</span>
            </div>
         </div>
      </div>
    </div>
  );
};

export default AIAdvisor;
