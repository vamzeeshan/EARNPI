
import React from 'react';
import { User } from '../types';
import { Zap, X, Calculator, Info, TrendingUp, Cpu } from 'lucide-react';

interface Plan {
  id: string;
  name: string;
  description: string;
  minRange: number;
  maxRange: number;
  roiDaily: string;
  roiHourly: string;
  icon: React.ReactNode;
  color: string;
}

const PLANS: Plan[] = [
  {
    id: 'lithium',
    name: 'Lithium',
    description: 'Earn through lithium mining',
    minRange: 2,
    maxRange: 100000,
    roiDaily: '3/3.5%',
    roiHourly: '0.127%',
    icon: <Cpu className="text-cyan-400" size={32} />,
    color: 'cyan'
  }
];

const InvestmentPlans: React.FC<{ user: User }> = ({ user }) => {
  const [showCalculator, setShowCalculator] = React.useState(false);
  const [calcAmount, setCalcAmount] = React.useState<string>('10');

  const dailyProfit = (parseFloat(calcAmount) || 0) * 0.03;
  const hourlyProfit = dailyProfit / 24;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-2">
        <h2 className="text-3xl font-black text-white tracking-tight">Investment Plans</h2>
        <p className="text-gray-500 font-medium">Choose your AI trading bot and start earning</p>
      </div>

      <div className="grid gap-6">
        {PLANS.map((plan) => (
          <div key={plan.id} className="bg-[#121212] rounded-[2rem] p-8 border border-white/5 relative overflow-hidden group">
            <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
              {/* Icon Section */}
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center border border-white/10 shrink-0">
                {plan.icon}
              </div>

              {/* Content Section */}
              <div className="flex-1 space-y-2">
                <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                <p className="text-gray-500 text-sm font-medium">{plan.description}</p>
                <p className="text-emerald-400 text-xs font-bold tracking-tight">Principal Return Policy Will Be Returned</p>
              </div>

              {/* Range & ROI Divider Section */}
              <div className="w-full md:w-auto flex items-center gap-12 py-4 border-y md:border-y-0 md:border-x border-white/5 md:px-12">
                <div className="space-y-1">
                  <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Range</p>
                  <p className="text-white font-bold">${plan.minRange} - ${plan.maxRange} <span className="text-gray-500 text-xs ml-1">Min</span></p>
                </div>
                <div className="space-y-1 text-right md:text-left">
                  <p className="text-white font-bold">ROI {plan.roiDaily} Daily</p>
                  <p className="text-gray-500 text-xs font-bold">{plan.roiHourly} / Hourly</p>
                </div>
              </div>

              {/* Actions Section */}
              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                <button className="flex-1 md:flex-none px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#a855f7] to-[#ec4899] text-white font-bold text-sm shadow-lg shadow-purple-900/20 hover:scale-105 transition-all">
                  Start Investing
                </button>
                <button 
                  onClick={() => setShowCalculator(true)}
                  className="flex-1 md:flex-none px-8 py-3.5 rounded-2xl border-2 border-[#0ea5e9] text-white font-bold text-sm hover:bg-[#0ea5e9]/10 transition-all flex items-center justify-center gap-2"
                >
                  Investment Calculator
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Calculator Modal */}
      {showCalculator && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowCalculator(false)} />
          <div className="bg-[#1a1a1a] w-full max-w-md rounded-[2.5rem] border border-white/10 p-8 relative animate-in zoom-in-95 duration-200">
             <button onClick={() => setShowCalculator(false)} className="absolute top-6 right-6 text-gray-500 hover:text-white">
                <X size={24} />
             </button>
             
             <div className="flex items-center gap-3 mb-8">
                <div className="bg-blue-500/20 p-2 rounded-xl text-blue-400">
                   <Calculator size={24} />
                </div>
                <h3 className="text-xl font-bold text-white">Profit Calculator</h3>
             </div>

             <div className="space-y-6">
                <div className="space-y-2">
                   <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Investment Amount ($)</label>
                   <input 
                     type="number"
                     value={calcAmount}
                     onChange={(e) => setCalcAmount(e.target.value)}
                     className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-blue-500 transition-all"
                     placeholder="Enter amount"
                   />
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                      <p className="text-[10px] font-bold text-gray-500 uppercase mb-1">Daily Profit</p>
                      <p className="text-lg font-black text-green-400 tabular-nums">${dailyProfit.toFixed(2)}</p>
                   </div>
                   <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                      <p className="text-[10px] font-bold text-gray-500 uppercase mb-1">Hourly Profit</p>
                      <p className="text-lg font-black text-blue-400 tabular-nums">${hourlyProfit.toFixed(4)}</p>
                   </div>
                </div>

                <div className="bg-blue-500/5 p-6 rounded-2xl border border-blue-500/10 flex items-start gap-3">
                   <Info size={18} className="text-blue-400 shrink-0 mt-0.5" />
                   <p className="text-[11px] text-gray-400 leading-relaxed">
                      Calculations are based on the standard 3% daily ROI for the Lithium plan. Actual returns may vary slightly.
                   </p>
                </div>

                <button 
                  onClick={() => setShowCalculator(false)}
                  className="w-full bg-blue-600 text-white font-black py-4 rounded-2xl shadow-xl shadow-blue-900/20 hover:bg-blue-700 transition-all"
                >
                  Got it
                </button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvestmentPlans;
