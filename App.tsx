
import React from 'react';
import { Page, User, Transaction } from './types';
import Layout from './components/Layout';
import Landing from './views/Landing';
import Auth from './views/Auth';
import Dashboard from './views/Dashboard';
import Wallet from './views/Wallet';
import Referrals from './views/Referrals';
import Profile from './views/Profile';
import AIAdvisor from './views/AIAdvisor';
import InvestmentPlans from './views/InvestmentPlans';
import { mockApi } from './services/mockApi';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = React.useState<Page>(Page.LANDING);
  const [user, setUser] = React.useState<User | null>(null);
  const [transactions, setTransactions] = React.useState<Transaction[]>([]);
  const [isAuth, setIsAuth] = React.useState(false);

  // Initialize data
  React.useEffect(() => {
    const session = localStorage.getItem('earnfi_session');
    if (session) {
      const userData = mockApi.getUser();
      const transData = mockApi.getTransactions();
      setUser(userData);
      setTransactions(transData);
      setIsAuth(true);
      setCurrentPage(Page.DASHBOARD);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAuthSuccess = () => {
    const userData = mockApi.getUser();
    const transData = mockApi.getTransactions();
    setUser(userData);
    setTransactions(transData);
    setIsAuth(true);
    setCurrentPage(Page.DASHBOARD);
  };

  const handleLogout = () => {
    mockApi.logout();
    setIsAuth(false);
    setUser(null);
    setCurrentPage(Page.LANDING);
  };

  const handleDeposit = (amount: number) => {
    if (!user) return;
    const newTrans = mockApi.addTransaction({
      type: 'deposit',
      amount,
      description: 'Funds Deposit'
    });
    const updatedUser = { ...user, balance: user.balance + amount };
    mockApi.updateUser(updatedUser);
    setUser(updatedUser);
    setTransactions([newTrans, ...transactions]);
  };

  const handleWithdraw = (amount: number) => {
    if (!user || user.balance < amount) return;
    const newTrans = mockApi.addTransaction({
      type: 'withdrawal',
      amount: -amount,
      description: 'Withdrawal to PayPal'
    });
    const updatedUser = { ...user, balance: user.balance - amount };
    mockApi.updateUser(updatedUser);
    setUser(updatedUser);
    setTransactions([newTrans, ...transactions]);
  };

  // Routing Logic
  if (!isAuth) {
    if (currentPage === Page.LANDING) {
      return <Landing onNavigate={setCurrentPage} />;
    }
    if (currentPage === Page.LOGIN || currentPage === Page.SIGNUP) {
      return (
        <Auth 
          type={currentPage === Page.LOGIN ? 'login' : 'signup'} 
          onAuthSuccess={handleAuthSuccess}
          onNavigate={setCurrentPage} 
        />
      );
    }
    return <Landing onNavigate={setCurrentPage} />;
  }

  return (
    <Layout 
      currentPage={currentPage} 
      setCurrentPage={setCurrentPage} 
      user={user!} 
      onLogout={handleLogout}
    >
      {currentPage === Page.DASHBOARD && <Dashboard user={user!} transactions={transactions} />}
      {currentPage === Page.WALLET && <Wallet user={user!} transactions={transactions} onDeposit={handleDeposit} onWithdraw={handleWithdraw} />}
      {currentPage === Page.INVESTMENT_PLANS && <InvestmentPlans user={user!} />}
      {currentPage === Page.REFERRALS && <Referrals user={user!} />}
      {currentPage === Page.AI_ADVISOR && <AIAdvisor user={user!} />}
      {currentPage === Page.PROFILE && <Profile user={user!} />}
    </Layout>
  );
};

export default App;
