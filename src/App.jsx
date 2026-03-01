import React, { useState } from 'react';
import { AuthProvider, useAuth } from './AuthContext';
import LoginPage from './LoginPage';
import UserDashboard from './UserDashboard';
import AdminDashboard from './AdminDashboard';
import MineGuardLanding from './MineGuardLanding';

const AppContent = () => {
  const { user, loading } = useAuth();
  const [showLogin, setShowLogin] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-stone-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg font-semibold">Loading Mine Sentinel...</p>
        </div>
      </div>
    );
  }

  // If not logged in, show landing page or login based on state
  if (!user) {
    return showLogin ? <LoginPage onBack={() => setShowLogin(false)} /> : <MineGuardLanding onGetStarted={() => setShowLogin(true)} />;
  }

  // If logged in as admin, show admin dashboard
  if (user.role === 'admin') {
    return <AdminDashboard />;
  }

  // If logged in as user/worker, show user dashboard
  if (user.role === 'user') {
    return <UserDashboard />;
  }

  // Fallback to login
  return <LoginPage />;
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
