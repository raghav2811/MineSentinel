import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, User, Lock, AlertCircle, UserCog, ArrowLeft } from 'lucide-react';
import { useAuth } from './AuthContext';

const LoginPage = ({ onBack }) => {
  const [role, setRole] = useState('user');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showDemo, setShowDemo] = useState(true);
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const result = login({ username, password, role });
    
    if (!result.success) {
      setError(result.error);
    }
  };

  const demoCredentials = {
    admin: { username: 'admin', password: 'admin123' },
    user: [
      { username: 'worker1', password: 'worker123', name: 'Rajesh Patel (W-001)' },
      { username: 'worker2', password: 'worker123', name: 'Suresh Kumar (W-002)' },
      { username: 'worker3', password: 'worker123', name: 'Luis Gomez (W-003)' }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-stone-900 to-black flex items-center justify-center p-6 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-orange-500 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Back Button */}
        {onBack && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            onClick={onBack}
            className="mb-4 flex items-center gap-2 text-gray-400 hover:text-orange-500 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </motion.button>
        )}
        
        <div className="bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-2xl border-2 border-orange-500/30 p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="inline-block"
            >
              <Shield className="w-16 h-16 mx-auto mb-4 text-orange-500" />
            </motion.div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Mine<span className="text-orange-500">Guard</span>
            </h1>
            <p className="text-gray-400">Secure Access Portal</p>
          </div>

          {/* Role Selection */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => {
                setRole('user');
                setError('');
              }}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                role === 'user'
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/50'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <User className="w-5 h-5" />
              Worker
            </button>
            <button
              onClick={() => {
                setRole('admin');
                setError('');
              }}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                role === 'admin'
                  ? 'bg-green-500 text-white shadow-lg shadow-green-500/50'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <UserCog className="w-5 h-5" />
              Admin
            </button>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-2 text-sm font-medium">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder={role === 'admin' ? 'Enter admin username' : 'Enter worker ID'}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 mb-2 text-sm font-medium">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Enter password"
                  required
                />
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm"
              >
                <AlertCircle className="w-4 h-4" />
                {error}
              </motion.div>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className={`w-full py-3 rounded-lg font-semibold text-white transition-all shadow-lg ${
                role === 'admin'
                  ? 'bg-green-500 hover:bg-green-600 shadow-green-500/50'
                  : 'bg-orange-500 hover:bg-orange-600 shadow-orange-500/50'
              }`}
            >
              Sign In as {role === 'admin' ? 'Admin' : 'Worker'}
            </motion.button>
          </form>

          {/* Demo Credentials Toggle */}
          <div className="mt-6 pt-6 border-t border-gray-700">
            <button
              onClick={() => setShowDemo(!showDemo)}
              className="text-sm text-gray-400 hover:text-orange-500 transition-colors w-full text-center"
            >
              {showDemo ? '▼ Hide' : '▶ Show'} Demo Credentials
            </button>

            {showDemo && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 space-y-3"
              >
                <div className="bg-gray-700/50 p-3 rounded-lg">
                  <p className="text-xs font-semibold text-green-400 mb-2">Admin Credentials:</p>
                  <p className="text-xs text-gray-300">
                    Username: <span className="font-mono text-orange-400">{demoCredentials.admin.username}</span>
                  </p>
                  <p className="text-xs text-gray-300">
                    Password: <span className="font-mono text-orange-400">{demoCredentials.admin.password}</span>
                  </p>
                </div>

                <div className="bg-gray-700/50 p-3 rounded-lg">
                  <p className="text-xs font-semibold text-orange-400 mb-2">Worker Credentials:</p>
                  {demoCredentials.user.map((worker, idx) => (
                    <div key={idx} className="mb-2 last:mb-0">
                      <p className="text-xs text-gray-400">{worker.name}</p>
                      <p className="text-xs text-gray-300">
                        Username: <span className="font-mono text-orange-400">{worker.username}</span> | 
                        Password: <span className="font-mono text-orange-400">{worker.password}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-6">
          MineGuard © 2025 | Smart India Hackathon
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
