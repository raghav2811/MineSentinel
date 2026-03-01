import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, User, Lock, AlertCircle, UserCog, ArrowLeft, Moon, Sun } from 'lucide-react';
import { useAuth } from './AuthContext';

const LoginPage = ({ onBack }) => {
  const [role, setRole] = useState('user');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showDemo, setShowDemo] = useState(true);
    const [darkMode, setDarkMode] = useState(true);
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
    <div className={`min-h-screen ${darkMode ? 'bg-gradient-to-br from-gray-900 via-stone-900 to-black' : 'bg-gradient-to-br from-gray-100 via-orange-50 to-gray-200'} flex items-center justify-center p-6 relative overflow-hidden transition-colors duration-500`}>
      {/* Coal Mine Background Effects */}
      
      {/* Mine Tunnel Grid Pattern - Light Mode Only */}
      {!darkMode && (
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 50px, rgba(50,50,50,0.2) 50px, rgba(50,50,50,0.2) 51px), repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(50,50,50,0.2) 50px, rgba(50,50,50,0.2) 51px)'
          }}
        />
      )}

      {/* Rock Formations - Top */}
      <motion.div
        className={`absolute -top-20 left-0 right-0 h-40 pointer-events-none ${darkMode ? 'bg-gradient-to-b from-stone-700/80 to-transparent' : 'bg-gradient-to-b from-stone-600 to-transparent'}`}
        style={{
          clipPath: 'polygon(0 0, 100% 0, 100% 60%, 85% 80%, 70% 60%, 50% 85%, 30% 65%, 15% 75%, 0 50%)',
        }}
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Rock Formations - Bottom */}
      <motion.div
        className={`absolute -bottom-20 left-0 right-0 h-40 pointer-events-none ${darkMode ? 'bg-gradient-to-t from-stone-800/80 to-transparent' : 'bg-gradient-to-t from-stone-700 to-transparent'}`}
        style={{
          clipPath: 'polygon(0 100%, 15% 40%, 30% 55%, 50% 35%, 70% 50%, 85% 30%, 100% 45%, 100% 100%)',
        }}
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Mining Lamps - Left */}
      <motion.div className="absolute top-1/4 left-10 pointer-events-none">
        <div className={`w-3 h-3 rounded-full ${darkMode ? 'bg-orange-400' : 'bg-orange-600'} shadow-lg`} />
        <motion.div
          className={`absolute top-0 left-0 w-3 h-3 rounded-full ${darkMode ? 'bg-orange-300' : 'bg-orange-500'}`}
          animate={{ scale: [1, 2.5, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <div className={`absolute top-0 left-3 w-32 h-32 ${darkMode ? 'bg-orange-500/25' : 'bg-orange-600/20'} blur-3xl`} />
      </motion.div>

      {/* Mining Lamps - Right */}
      <motion.div className="absolute top-1/3 right-16 pointer-events-none">
        <div className={`w-3 h-3 rounded-full ${darkMode ? 'bg-yellow-300' : 'bg-yellow-500'} shadow-lg`} />
        <motion.div
          className={`absolute top-0 left-0 w-3 h-3 rounded-full ${darkMode ? 'bg-yellow-200' : 'bg-yellow-400'}`}
          animate={{ scale: [1, 2.5, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
        />
        <div className={`absolute top-0 right-3 w-32 h-32 ${darkMode ? 'bg-yellow-500/25' : 'bg-yellow-600/20'} blur-3xl`} />
      </motion.div>

      {/* Coal Seams - Diagonal Stripes */}
      <div className={`absolute inset-0 pointer-events-none ${darkMode ? 'opacity-10' : 'opacity-5'}`}>
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute h-2 ${darkMode ? 'bg-stone-700' : 'bg-gray-800'}`}
            style={{
              width: '150%',
              left: '-25%',
              top: `${i * 15}%`,
              transform: `rotate(-15deg)`,
            }}
            animate={{
              x: [0, 20, 0],
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* Underground Ambient Glow */}
      <div className={`absolute inset-0 pointer-events-none ${darkMode ? 'bg-gradient-radial from-orange-800/15 via-transparent to-transparent' : 'bg-gradient-radial from-orange-700/10 via-transparent to-transparent'}`} />
      
      {/* Vignette Effect */}
      <div className={`absolute inset-0 pointer-events-none ${darkMode ? 'bg-gradient-radial from-transparent via-transparent to-black/70' : 'bg-gradient-radial from-transparent via-transparent to-black/60'}`} />

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
            className={`mb-4 flex items-center gap-2 ${darkMode ? 'text-gray-400 hover:text-orange-500' : 'text-gray-600 hover:text-orange-600'} transition-colors`}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </motion.button>
        )}
        
        <div className={`${darkMode ? 'bg-gray-800/90' : 'bg-white/95'} backdrop-blur-sm rounded-2xl shadow-2xl border-2 border-orange-500/30 p-8`}>
          {/* Logo */}
          <div className="text-center mb-8">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="inline-block"
            >
              <Shield className="w-16 h-16 mx-auto mb-4 text-orange-500" />
            </motion.div>
            <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
              Mine<span className="text-orange-500">Sentinel</span>
            </h1>
            <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Secure Access Portal</p>
            
            {/* Theme Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="mt-4 p-2 rounded-lg bg-orange-500 hover:bg-orange-600 transition-all"
            >
              {darkMode ? <Sun className="w-5 h-5 text-white" /> : <Moon className="w-5 h-5 text-white" />}
            </button>
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
                  : darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
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
                  : darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <UserCog className="w-5 h-5" />
              Admin
            </button>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className={`block ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2 text-sm font-medium`}>
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'} border rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
                  placeholder={role === 'admin' ? 'Enter admin username' : 'Enter worker ID'}
                  required
                />
              </div>
            </div>

            <div>
              <label className={`block ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2 text-sm font-medium`}>
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'} border rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
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
          <div className={`mt-6 pt-6 border-t ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>
            <button
              onClick={() => setShowDemo(!showDemo)}
              className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} hover:text-orange-500 transition-colors w-full text-center`}
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
                <div className={`${darkMode ? 'bg-gray-700/50' : 'bg-gray-100'} p-3 rounded-lg`}>
                  <p className="text-xs font-semibold text-green-500 mb-2">Admin Credentials:</p>
                  <p className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Username: <span className="font-mono text-orange-500">{demoCredentials.admin.username}</span>
                  </p>
                  <p className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Password: <span className="font-mono text-orange-500">{demoCredentials.admin.password}</span>
                  </p>
                </div>

                <div className={`${darkMode ? 'bg-gray-700/50' : 'bg-gray-100'} p-3 rounded-lg`}>
                  <p className="text-xs font-semibold text-orange-500 mb-2">Worker Credentials:</p>
                  {demoCredentials.user.map((worker, idx) => (
                    <div key={idx} className="mb-2 last:mb-0">
                      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{worker.name}</p>
                      <p className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Username: <span className="font-mono text-orange-500">{worker.username}</span> | 
                        Password: <span className="font-mono text-orange-500">{worker.password}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Footer */}
        <p className={`text-center ${darkMode ? 'text-gray-500' : 'text-gray-600'} text-sm mt-6`}>
          Mine Sentinel © 2025 | Smart India Hackathon
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
