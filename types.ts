
export interface User {
  id: string;
  name: string;
  email: string;
  balance: number;
  depositWallet: number;
  totalInvested: number;
  referralEarning: number;
  totalDeposit: number;
  totalWithdrawn: number;
  liveEarning: number;
  referralCode: string;
  referralsCount: number;
  avatar?: string;
  rank: string;
  rankProgress: number;
}

export interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal' | 'earning' | 'referral';
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  date: string;
  description: string;
}

export enum Page {
  LANDING = 'landing',
  LOGIN = 'login',
  SIGNUP = 'signup',
  DASHBOARD = 'dashboard',
  FINANCE = 'finance',
  // Added WALLET to the Page enum
  WALLET = 'wallet',
  INVESTMENT_PLANS = 'investment_plans',
  GOALS = 'goals',
  TARGETS = 'targets',
  REFERRALS = 'referrals',
  TRANSACTIONS = 'transactions',
  PROFILE = 'profile',
  AI_ADVISOR = 'ai_advisor',
  HELP = 'help',
  SECURITY = 'security'
}
