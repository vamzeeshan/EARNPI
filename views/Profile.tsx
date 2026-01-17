
import React from 'react';
import { User } from '../types';
// Added missing icon imports from lucide-react
import { 
  Camera, 
  Mail, 
  Shield, 
  Bell, 
  Key, 
  Smartphone, 
  ChevronRight, 
  LogOut, 
  Info, 
  UserCircle, 
  TrendingUp, 
  HelpCircle 
} from 'lucide-react';

const Profile: React.FC<{ user: User }> = ({ user }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Profile */}
      <div className="bg-dark-card p-10 lg:p-14 rounded-[3rem] border border-white/5 shadow-2xl flex flex-col items-center text-center relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-purple-600/20 to-transparent"></div>
         <div className="relative mb-8 mt-4">
            <div className="w-32 h-32 rounded-full border-4 border-white/5 shadow-2xl overflow-hidden neon-border-purple p-1">
               <img 
                 src={user.avatar} 
                 className="w-full h-full rounded-full object-cover" 
                 alt="Profile" 
               />
            </div>
            <button className="absolute bottom-1 right-1 bg-purple-600 text-white p-2.5 rounded-full shadow-lg hover:scale-110 transition-transform">
               <Camera size={18} />
            </button>
         </div>
         <h2 className="text-3xl font-black text-white tracking-tight">{user.name}</h2>
         <p className="text-gray-500 font-medium mt-1">{user.email}</p>
         <div className="mt-8 grid grid-cols-2 gap-4 w-full max-w-sm">
            <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
               <p className="text-[10px] font-bold text-gray-500 uppercase mb-1">Total Earnings</p>
               <p className="text-lg font-black text-white">$0.00</p>
            </div>
            <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
               <p className="text-[10px] font-bold text-gray-500 uppercase mb-1">Referral Rank</p>
               <p className="text-lg font-black text-purple-400">{user.rank}</p>
            </div>
         </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
         {/* Settings Sections */}
         <div className="space-y-4">
            <h3 className="text-xs font-black text-gray-500 uppercase tracking-[0.2em] ml-2">App Settings</h3>
            <div className="bg-dark-card rounded-[2rem] border border-white/5 overflow-hidden">
               {[
                 { label: 'Profile Information', icon: UserCircleIcon, color: 'text-blue-400' },
                 { label: 'Investment Plans', icon: TrendingUpIcon, color: 'text-green-400' },
                 { label: 'Withdrawal Security', icon: Shield, color: 'text-purple-400' },
                 { label: 'Notifications', icon: Bell, color: 'text-orange-400' },
               ].map((setting, i) => (
                 <button key={i} className="w-full flex items-center justify-between p-6 hover:bg-white/[0.02] transition-colors group">
                    <div className="flex items-center space-x-4">
                       <div className={`p-2 rounded-xl bg-white/5 ${setting.color}`}>
                          {React.createElement(setting.icon as any, { size: 18 })}
                       </div>
                       <span className="font-bold text-sm text-gray-300 group-hover:text-white transition-colors">{setting.label}</span>
                    </div>
                    <ChevronRight size={16} className="text-gray-600 group-hover:text-purple-400 transition-colors" />
                 </button>
               ))}
            </div>
         </div>

         <div className="space-y-4">
            <h3 className="text-xs font-black text-gray-500 uppercase tracking-[0.2em] ml-2">Security & Support</h3>
            <div className="bg-dark-card rounded-[2rem] border border-white/5 overflow-hidden">
               <button className="w-full flex items-center justify-between p-6 hover:bg-white/[0.02] transition-colors group">
                  <div className="flex items-center space-x-4">
                     <div className="p-2 rounded-xl bg-white/5 text-purple-400">
                        <Key size={18} />
                     </div>
                     <span className="font-bold text-sm text-gray-300 group-hover:text-white transition-colors">Change Password</span>
                  </div>
                  <ChevronRight size={16} className="text-gray-600 group-hover:text-purple-400 transition-colors" />
               </button>
               <button className="w-full flex items-center justify-between p-6 hover:bg-white/[0.02] transition-colors group">
                  <div className="flex items-center space-x-4">
                     <div className="p-2 rounded-xl bg-white/5 text-blue-400">
                        <Smartphone size={18} />
                     </div>
                     <span className="font-bold text-sm text-gray-300 group-hover:text-white transition-colors">Session Manager</span>
                  </div>
                  <ChevronRight size={16} className="text-gray-600 group-hover:text-purple-400 transition-colors" />
               </button>
               <button className="w-full flex items-center justify-between p-6 hover:bg-white/[0.02] transition-colors group">
                  <div className="flex items-center space-x-4">
                     <div className="p-2 rounded-xl bg-white/5 text-green-400">
                        <HelpCircleIcon size={18} />
                     </div>
                     <span className="font-bold text-sm text-gray-300 group-hover:text-white transition-colors">Help & Support</span>
                  </div>
                  <ChevronRight size={16} className="text-gray-600 group-hover:text-purple-400 transition-colors" />
               </button>
            </div>
            
            <div className="bg-red-500/5 p-6 rounded-[2rem] border border-red-500/10 flex items-center justify-between">
               <div className="flex items-center space-x-4">
                  <div className="p-2 rounded-xl bg-red-500/10 text-red-500">
                     <LogOut size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-black text-red-500 uppercase">Sign Out</p>
                    <p className="text-[10px] text-gray-500 mt-0.5 tracking-tight">Disconnect session</p>
                  </div>
               </div>
               <button className="text-[10px] font-black text-gray-500 uppercase tracking-widest hover:text-red-500 transition-colors">Confirm</button>
            </div>
         </div>
      </div>
      
      <div className="bg-dark-card p-6 rounded-3xl border border-white/5 flex items-start space-x-4">
         <Info size={20} className="text-purple-400 shrink-0 mt-1" />
         <div className="space-y-1">
            <p className="text-xs font-bold text-white">ID Verification</p>
            <p className="text-[11px] text-gray-500 leading-relaxed">Your account is currently verified. For any changes to your registered email or phone number, please contact support.</p>
         </div>
      </div>
    </div>
  );
};

// Internal icon helpers for Profile view
// These helper components now find the required icons after updating the imports
const UserCircleIcon = (props: any) => <UserCircle size={props.size} className={props.className} />;
const TrendingUpIcon = (props: any) => <TrendingUp size={props.size} className={props.className} />;
const HelpCircleIcon = (props: any) => <HelpCircle size={props.size} className={props.className} />;

export default Profile;
