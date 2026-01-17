
import React from 'react';
import { ArrowRight, ShieldCheck, Zap, Globe, DollarSign } from 'lucide-react';
import { Page } from '../types';

interface LandingProps {
  onNavigate: (page: Page) => void;
}

const Landing: React.FC<LandingProps> = ({ onNavigate }) => {
  const logoUrl = "https://raw.githubusercontent.com/pi-apps/pi-platform-docs/master/assets/pi-logo.png";

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
      {/* Navbar */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 p-1 bg-purple-600 rounded-xl flex items-center justify-center neon-border-purple shadow-[0_0_20px_rgba(168,85,247,0.4)]">
            <img src={logoUrl} alt="Earn Pi Logo" className="w-full h-full object-contain" />
          </div>
          <span className="text-2xl font-bold text-white tracking-tight">Earn Pi</span>
        </div>
        <div className="hidden md:flex items-center space-x-8 text-gray-400 font-medium">
          <a href="#" className="hover:text-purple-400 transition-colors">Features</a>
          <a href="#" className="hover:text-purple-400 transition-colors">About</a>
          <a href="#" className="hover:text-purple-400 transition-colors">Success Stories</a>
        </div>
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => onNavigate(Page.LOGIN)}
            className="text-gray-400 font-semibold px-4 py-2 hover:text-purple-400 transition-colors"
          >
            Login
          </button>
          <button 
            onClick={() => onNavigate(Page.SIGNUP)}
            className="bg-purple-600 text-white font-semibold px-6 py-2.5 rounded-full hover:bg-purple-700 transition-all shadow-lg shadow-purple-900/20"
          >
            Sign Up
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-32 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center space-x-2 bg-purple-500/10 text-purple-400 px-4 py-1.5 rounded-full text-sm font-semibold border border-purple-500/20">
            <Zap size={16} />
            <span>Join 50,000+ active earners worldwide</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-extrabold text-white leading-tight">
            The Future of <br />
            <span className="text-purple-500">Passive Income</span> <br />
            is Here.
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed max-w-lg">
            Earn Pi provides a secure, decentralized ecosystem to grow your wealth through automated tasks, smart referrals, and AI-driven insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => onNavigate(Page.SIGNUP)}
              className="bg-white text-black font-bold px-8 py-4 rounded-2xl hover:bg-gray-200 transition-all flex items-center justify-center space-x-3 group"
            >
              <span>Get Started Now</span>
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="flex items-center space-x-4 px-4">
               <div className="flex -space-x-2">
                 {[1, 2, 3].map(i => (
                   <img key={i} src={`https://picsum.photos/seed/${i+10}/40`} className="w-10 h-10 rounded-full border-2 border-[#0d0d0d]" alt="user" />
                 ))}
               </div>
               <div className="text-sm">
                 <p className="font-bold text-white">4.9/5 Rating</p>
                 <p className="text-gray-500">by verified users</p>
               </div>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-4 bg-purple-600/10 blur-3xl rounded-full"></div>
          <div className="relative bg-dark-card p-4 rounded-3xl shadow-2xl overflow-hidden border border-white/10">
             <img 
               src="https://picsum.photos/seed/dashboard-dark/800/600" 
               className="rounded-2xl opacity-80 w-full h-auto" 
               alt="Dashboard Preview" 
             />
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#1a1a1a]/90 backdrop-blur p-6 rounded-2xl shadow-xl border border-purple-500/30 max-w-xs animate-bounce cursor-pointer">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="bg-purple-600 p-2 rounded-lg shadow-inner">
                    <img src={logoUrl} alt="Coin" className="w-5 h-5 object-contain" />
                  </div>
                  <span className="font-bold text-white">Daily Payout Received</span>
                </div>
                <p className="text-2xl font-black text-white">+$124.50</p>
                <p className="text-xs text-gray-500 mt-1">Today at 9:41 AM</p>
             </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="bg-black/40 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl font-bold text-white">Why choose Earn Pi?</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">We've built a robust platform designed for both beginners and pro-earners, ensuring safety and efficiency.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Secure Wallet', icon: ShieldCheck, color: 'text-purple-500', bg: 'bg-purple-500/10', desc: 'Enterprise-grade encryption keeps your funds and data safe 24/7.' },
              { title: 'Instant Withdrawals', icon: Zap, color: 'text-orange-500', bg: 'bg-orange-500/10', desc: 'No more waiting weeks. Get your earnings directly to your bank or crypto wallet.' },
              { title: 'Global Access', icon: Globe, color: 'text-green-500', bg: 'bg-green-500/10', desc: 'Join from anywhere in the world. Our platform is borders-free and fully responsive.' }
            ].map((feature, i) => (
              <div key={i} className="bg-dark-card p-8 rounded-3xl border border-white/5 hover:border-purple-500/30 transition-all group">
                <div className={`${feature.bg} ${feature.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-500">&copy; 2024 Earn Pi. All rights reserved. <br className="md:hidden" /> Made with ❤️ for earners.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
