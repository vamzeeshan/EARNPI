
import { User, Transaction, Page } from '../types';

const STORAGE_KEY = 'earnfi_user_data_v2';
const TRANS_KEY = 'earnfi_transactions_v2';

const MOCK_USER: User = {
  id: 'user_123',
  name: 'Muhammad Zeeshan',
  email: 'recoveryboss1428@gmail.com',
  balance: 0.00,
  depositWallet: 0.00,
  totalInvested: 0.00,
  referralEarning: 0.00,
  totalDeposit: 0.00,
  totalWithdrawn: 0.00,
  liveEarning: 0.00,
  referralCode: 'MUHAMMADZEESHAN1428',
  referralsCount: 0,
  avatar: 'https://picsum.photos/seed/user123/200',
  rank: 'No Rank',
  rankProgress: 0
};

const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 't1', type: 'deposit', amount: 10.00, status: 'failed', date: '2025-01-16T03:26:00Z', description: 'Deposit' },
  { id: 't2', type: 'deposit', amount: 7.00, status: 'failed', date: '2025-01-16T03:26:00Z', description: 'Deposit' },
];

export const mockApi = {
  getUser: (): User => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_USER));
    return MOCK_USER;
  },
  
  updateUser: (user: User) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  },

  getTransactions: (): Transaction[] => {
    const saved = localStorage.getItem(TRANS_KEY);
    if (saved) return JSON.parse(saved);
    localStorage.setItem(TRANS_KEY, JSON.stringify(MOCK_TRANSACTIONS));
    return MOCK_TRANSACTIONS;
  },

  addTransaction: (trans: Omit<Transaction, 'id' | 'date' | 'status'>) => {
    const list = mockApi.getTransactions();
    const newTrans: Transaction = {
      ...trans,
      id: `t_${Date.now()}`,
      date: new Date().toISOString(),
      status: 'completed'
    };
    const updated = [newTrans, ...list];
    localStorage.setItem(TRANS_KEY, JSON.stringify(updated));
    return newTrans;
  },

  logout: () => {
    localStorage.removeItem('earnfi_session');
  }
};
