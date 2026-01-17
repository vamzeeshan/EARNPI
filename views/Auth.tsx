
import React from 'react';
import { Page } from '../types';
import { Mail, Lock, User as UserIcon, ArrowLeft, Loader2 } from 'lucide-react';

interface AuthProps {
  type: 'login' | 'signup';
  onAuthSuccess: () => void;
  onNavigate: (page: Page) => void;
}

const Auth: React.FC<AuthProps> = ({ type, onAuthSuccess, onNavigate }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
    name: ''
  });

  const logoUrl = "https://raw.githubusercontent.com/pi-apps/pi-platform-docs/master/assets/pi-logo.png";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      localStorage.setItem('earnfi_session', 'active');
      onAuthSuccess();
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <button 
          onClick={() => onNavigate(Page.LANDING)}
          className="mb-8 flex items-center space-x-2 text-gray-500 hover:text-purple-500 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to home</span>
        </button>

        <div className="bg-[#121212] rounded-[2.5rem] shadow-2xl p-8 border border-white/5 neon-border-purple">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-24 h-24 mb-6 bg-purple-600 rounded-3xl p-3 shadow-2xl shadow-purple-900/40 border border-purple-500/30">
              <img src={logoUrl} alt="Logo" className="w-full h-full object-contain" />
            </div>
            <h2 className="text-3xl font-black text-white">
              {type === 'login' ? 'Sign In' : 'Join Earn Pi'}
            </h2>
            <p className="text-gray-500 mt-2 text-sm">
              {type === 'login' 
                ? 'Welcome back to your financial hub' 
                : 'Start your journey to passive income today'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {type === 'signup' && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Full Name</label>
                <div className="relative">
                  <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input
                    type="text"
                    required
                    placeholder="Muhammad Zeeshan"
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Password</label>
                {type === 'login' && (
                  <button type="button" className="text-[10px] text-purple-400 font-bold uppercase tracking-widest hover:underline">Forgot?</button>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className="w-full bg-purple-600 text-white font-black py-4 rounded-2xl hover:bg-purple-700 transition-all flex items-center justify-center space-x-2 shadow-xl shadow-purple-900/20 active:scale-[0.98]"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <span>{type === 'login' ? 'Login' : 'Create Account'}</span>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-white/5 text-center">
            <p className="text-gray-500 text-sm">
              {type === 'login' ? "Don't have an account?" : "Already have an account?"}
              <button 
                onClick={() => onNavigate(type === 'login' ? Page.SIGNUP : Page.LOGIN)}
                className="ml-2 font-bold text-purple-400 hover:underline"
              >
                {type === 'login' ? 'Sign Up' : 'Login'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
