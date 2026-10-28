import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { Chat } from './pages/Chat';
import { Profile } from './pages/Profile';
import { Recommendations } from './pages/Recommendations';
import { History } from './pages/History';
import { Home } from './pages/Home';

const MainApp: React.FC = () => {
  const { isAuthenticated } = useAuth();
  
  // Initialize tab from URL hash if available (e.g., #/chat, #/profile, #/login)
  const getInitialTab = () => {
    const hash = window.location.hash.replace('#/', '').toLowerCase();
    if (['login', 'signup', 'home', 'profile', 'recommendations', 'chat', 'history'].includes(hash)) {
      return hash;
    }
    return 'chat'; // Default to Chat (Figure 11) or Home
  };

  const [currentTab, setCurrentTab] = useState<string>(getInitialTab);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').toLowerCase();
      if (hash && ['login', 'signup', 'home', 'profile', 'recommendations', 'chat', 'history'].includes(hash)) {
        setCurrentTab(hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (tab: string) => {
    setCurrentTab(tab);
    window.location.hash = `#/${tab}`;
  };

  // Auth pages (no Layout shell, matching Figure 15 & 16)
  if (currentTab === 'login') {
    return <Login onNavigate={handleNavigate} />;
  }

  if (currentTab === 'signup') {
    return <SignUp onNavigate={handleNavigate} />;
  }

  return (
    <Layout currentTab={currentTab} onNavigate={handleNavigate}>
      {currentTab === 'home' && <Home onNavigate={handleNavigate} />}
      {currentTab === 'profile' && <Profile />}
      {currentTab === 'recommendations' && <Recommendations />}
      {currentTab === 'chat' && <Chat />}
      {currentTab === 'history' && <History />}
    </Layout>
  );
};

export function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}

export default App;
