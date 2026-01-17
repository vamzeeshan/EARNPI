
import React from 'react';
import { 
  LayoutDashboard, 
  Wallet, 
  TrendingUp, 
  Target, 
  Users, 
  History, 
  UserCircle, 
  LogOut, 
  Menu, 
  X,
  ChevronDown,
  CircleDollarSign,
  ShieldCheck,
  HelpCircle,
  Bell
} from 'lucide-react';
import { Page, User } from '../types';

interface LayoutProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  user: User;
  children: React.ReactNode;
  onLogout: () => void;
}

const navItems = [
  { id: Page.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
  { 
    id: Page.FINANCE, 
    label: 'Finance', 
    icon: Wallet,
    subItems: [
      { id: Page.FINANCE, label: 'My Wallet' },
      { id: Page.WALLET, label: 'Add Funds' }
    ]
  },
  { id: Page.INVESTMENT_PLANS, label: 'Investment Plans', icon: TrendingUp },
  { id: Page.GOALS, label: 'Goals', icon: Target },
  { id: Page.TARGETS, label: 'Targets', icon: ShieldCheck },
  { id: Page.REFERRALS, label: 'My Referrals', icon: Users },
  { id: Page.TRANSACTIONS, label: 'Transactions', icon: History },
  { 
    id: Page.PROFILE, 
    label: 'Account', 
    icon: UserCircle,
    subItems: [
      { id: Page.PROFILE, label: 'My Profile' },
      { id: Page.HELP, label: 'Help & Support' },
      { id: Page.AI_ADVISOR, label: 'AI Advisor' }
    ]
  },
];

const mobileNavItems = [
  { id: Page.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
  { id: Page.FINANCE, label: 'Finance', icon: Wallet },
  { id: Page.REFERRALS, label: 'Referrals', icon: Users },
  { id: Page.WALLET, label: 'Withdraw', icon: CircleDollarSign },
  { id: Page.PROFILE, label: 'Account', icon: UserCircle },
];

const NavItem: React.FC<{
  item: typeof navItems[0];
  isActive: boolean;
  onClick: (id: Page) => void;
  currentSubPage?: Page;
}> = ({ item, isActive, onClick, currentSubPage }) => {
  const [isOpen, setIsOpen] = React.useState(isActive);
  const Icon = item.icon;
  
  return (
    <div className="space-y-1">
      <button
        onClick={() => {
          if (item.subItems) {
            setIsOpen(!isOpen);
          } else {
            onClick(item.id);
          }
        }}
        className={`flex items-center justify-between w-full px-4 py-3 rounded-lg transition-all ${
          isActive && !item.subItems
            ? 'bg-purple-600/20 text-purple-400 border-l-4 border-purple-500' 
            : 'text-gray-400 hover:bg-white/5 hover:text-gray-100'
        }`}
      >
        <div className="flex items-center space-x-3">
          <Icon size={18} />
          <span className="text-sm font-medium">{item.label}</span>
        </div>
        {item.subItems && (
          <ChevronDown size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        )}
      </button>
      
      {item.subItems && isOpen && (
        <div className="ml-9 space-y-1">
          {item.subItems.map(sub => (
            <button
              key={sub.id}
              onClick={() => onClick(sub.id)}
              className={`block w-full text-left px-4 py-2 text-xs rounded-lg transition-all ${
                currentSubPage === sub.id ? 'text-purple-400 font-bold' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {sub.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const Layout: React.FC<LayoutProps> = ({ currentPage, setCurrentPage, user, children, onLogout }) => {
  // Use a representative Pi coin logo with the brand colors
  const logoUrl = "https://raw.githubusercontent.com/pi-apps/pi-platform-docs/master/assets/pi-logo.png"; 

  return (
    <div className="min-h-screen bg-[#0d0d0d] flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 gradient-sidebar border-r border-white/5 fixed h-full z-20">
        <div className="p-6 flex items-center space-x-3">
          <div className="w-10 h-10 flex items-center justify-center p-1 bg-purple-600 rounded-xl neon-border-purple">
            <img src={logoUrl} alt="Earn Pi Logo" className="w-full h-full object-contain" />
          </div>
          <span className="text-xl font-bold text-white tracking-wider">Earn Pi</span>
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto no-scrollbar">
          {navItems.map((item) => (
            <NavItem 
              key={item.id} 
              item={item} 
              isActive={currentPage === item.id || (item.subItems?.some(s => s.id === currentPage) ?? false)}
              onClick={setCurrentPage}
              currentSubPage={currentPage}
            />
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
          <button 
            onClick={onLogout}
            className="flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-red-500 hover:bg-red-500/10 transition-all"
          >
            <LogOut size={18} />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 lg:ml-64 pb-24 lg:pb-0">
        {/* Header */}
        <header className="bg-[#0d0d0d]/80 backdrop-blur-md border-b border-white/5 sticky top-0 z-30 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
             <h2 className="text-lg font-bold text-gray-100 hidden lg:block">Dashboard</h2>
             <div className="lg:hidden flex items-center space-x-3">
                <div className="w-8 h-8 p-0.5 bg-purple-600 rounded-lg">
                  <img src={logoUrl} alt="Logo" className="w-full h-full object-contain" />
                </div>
                <span className="font-bold text-white">Earn Pi</span>
             </div>
          </div>
          <div className="flex items-center space-x-6">
            <button className="text-gray-400 hover:text-white transition-colors relative">
               <Bell size={20} />
               <span className="absolute -top-1 -right-1 w-2 h-2 bg-purple-500 rounded-full"></span>
            </button>
            <div className="flex items-center space-x-3 bg-white/5 p-1.5 pr-4 rounded-full border border-white/10 hover:border-purple-500/30 transition-all cursor-pointer" onClick={() => setCurrentPage(Page.PROFILE)}>
              <img src={user.avatar} className="w-8 h-8 rounded-full border border-white/20" alt="user" />
              <div className="hidden sm:block">
                <p className="text-xs font-bold text-white leading-tight">{user.name}</p>
                <p className="text-[10px] text-gray-500">{user.email}</p>
              </div>
            </div>
          </div>
        </header>

        <div className="p-4 lg:p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#121212] border-t border-white/10 px-2 py-3 z-50 flex items-center justify-around shadow-2xl">
        {mobileNavItems.map(item => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`flex flex-col items-center space-y-1 ${isActive ? 'text-purple-500' : 'text-gray-500'}`}
            >
              <div className={`p-2 rounded-xl transition-all ${isActive ? 'bg-purple-500/10 shadow-[0_0_15px_rgba(168,85,247,0.3)]' : ''}`}>
                <Icon size={20} />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-tighter">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Layout;
