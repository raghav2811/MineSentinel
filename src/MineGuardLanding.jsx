import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { Shield, Camera, Radio, Users, TrendingUp, AlertTriangle, CheckCircle, BarChart3, Eye, Zap, Moon, Sun, Github, Linkedin, Mail, HardHat, Mountain, Layers } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const MineGuardLanding = ({ onGetStarted }) => {
  const [darkMode, setDarkMode] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const [particles, setParticles] = useState([]);

  // atBottom state for helmet-lift easter egg
  const [atBottom, setAtBottom] = useState(false);

  // init demo dataset in localStorage
  useEffect(() => {
    const key = 'mineguard_demo';
    if (!localStorage.getItem(key)) {
      const demo = {
        workers: [
          { id: 'W-001', name: 'R. Patel', ppe: { helmet: true, vest: true, boots: true, lamp: true }, lastCheck: Date.now() - 1000 * 60 * 60 },
          { id: 'W-002', name: 'S. Kumar', ppe: { helmet: false, vest: true, boots: true, lamp: true }, lastCheck: Date.now() - 1000 * 60 * 30 },
          { id: 'W-003', name: 'L. Gomez', ppe: { helmet: true, vest: true, boots: false, lamp: true }, lastCheck: Date.now() - 1000 * 60 * 10 }
        ],
        alerts: [
          { id: 'A-001', workerId: 'W-002', type: 'Missing Helmet', time: Date.now() - 1000 * 60 * 30 }
        ]
      };
      localStorage.setItem(key, JSON.stringify(demo));
    }
  }, []);

  useEffect(() => {
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className={`${darkMode ? 'bg-gray-900' : 'bg-gray-100'} min-h-screen transition-colors duration-500`}>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-green-400 to-orange-500 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Dark/Light Mode Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="fixed top-6 right-6 z-40 p-3 rounded-full bg-orange-500 hover:bg-orange-600 transition-all shadow-lg"
      >
        {darkMode ? <Sun className="w-5 h-5 text-white" /> : <Moon className="w-5 h-5 text-white" />}
      </button>

      {/* Hero Section with Mask Animation */}
      <HeroSection darkMode={darkMode} particles={particles} scrollYProgress={scrollYProgress} atBottom={atBottom} onGetStarted={onGetStarted} />
      {/* Problem & Vision Section */}
      <ProblemVisionSection darkMode={darkMode} />
      {/* Technology Section */}
      <TechnologySection darkMode={darkMode} />
      {/* Dashboard Preview */}
      <DashboardSection darkMode={darkMode} />
      {/* Impact Section */}
      <ImpactSection darkMode={darkMode} />
      {/* Footer (passes setter to update atBottom) */}
      <Footer darkMode={darkMode} setAtBottom={setAtBottom} />
    </div>
  );
};

const HeroSection = ({ darkMode, particles, scrollYProgress, atBottom, onGetStarted }) => {
  const maskScale = useTransform(scrollYProgress, [0, 0.2], [0.3, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2], [0, -100]);

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Coal Mine Background Effects */}
      <CoalMineBackground darkMode={darkMode} />

      {/* Animated Coal Dust Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            className={`absolute rounded-full ${darkMode ? 'bg-gray-600/40' : 'bg-gray-500/30'}`}
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
              boxShadow: darkMode ? '0 0 8px rgba(0,0,0,0.5)' : '0 0 4px rgba(0,0,0,0.3)',
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
            }}
          />
        ))}
      </div>

      {/* Underground Depth Gradient */}
      <div className={`absolute inset-0 ${darkMode ? 'bg-gradient-to-b from-gray-900/80 via-stone-900/90 to-black/95' : 'bg-gradient-to-b from-gray-200 via-gray-400 to-gray-600'}`} style={{ mixBlendMode: 'multiply' }} />
      
      {/* Miner Silhouette with Mask Animation */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center"
        style={{ opacity, y }}
      >
        <motion.div
          className="relative w-64 h-96"
          style={{
            clipPath: useTransform(
              maskScale,
              [0.3, 1],
              ['circle(10% at 50% 20%)', 'circle(100% at 50% 50%)']
            ),
          }}
        >
          <MinerSilhouette darkMode={darkMode} atBottom={atBottom} />
        </motion.div>
      </motion.div>

      {/* Hero Content */}
      <motion.div 
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
        style={{ opacity, y }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Shield className={`w-20 h-20 mx-auto mb-6 ${darkMode ? 'text-orange-500' : 'text-orange-600'}`} />
          <h1 className={`text-5xl md:text-7xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Mine<span className="text-orange-500">Sentinel</span>
          </h1>
          <p className={`text-2xl md:text-3xl mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'} font-light`}>
            Protecting Coal Miners in the Depths
          </p>
          <p className={`text-lg md:text-xl mb-4 ${darkMode ? 'text-green-400' : 'text-green-600'} max-w-2xl mx-auto`}>
            AI-powered PPE Verification for Underground Coal Mining Safety
          </p>
          
          {/* Coal Mining Stats */}
          <div className="flex gap-6 justify-center mb-12 flex-wrap max-w-3xl mx-auto">
            <div className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-800/80 border border-orange-500/30' : 'bg-white/80 border border-orange-300'}`}>
              <p className="text-orange-500 text-sm font-semibold">Underground Depth</p>
              <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>500m+</p>
            </div>
            <div className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-800/80 border border-green-500/30' : 'bg-white/80 border border-green-300'}`}>
              <p className="text-green-500 text-sm font-semibold">Safety Compliance</p>
              <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>99%</p>
            </div>
            <div className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-800/80 border border-blue-500/30' : 'bg-white/80 border border-blue-300'}`}>
              <p className="text-blue-500 text-sm font-semibold">Miners Protected</p>
              <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>100+</p>
            </div>
          </div>
          
          <div className="flex gap-4 justify-center flex-wrap">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onGetStarted}
              className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold text-lg shadow-lg transition-colors"
            >
              Get Started
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onGetStarted}
              className={`px-8 py-4 ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'} ${darkMode ? 'text-white' : 'text-gray-900'} rounded-lg font-semibold text-lg shadow-lg transition-colors border-2 border-orange-500`}
            >
              Login
            </motion.button>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <div className={`w-6 h-10 border-2 ${darkMode ? 'border-orange-500' : 'border-orange-600'} rounded-full flex justify-center pt-2`}>
          <motion.div
            className={`w-1.5 h-1.5 ${darkMode ? 'bg-orange-500' : 'bg-orange-600'} rounded-full`}
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};

const MinerSilhouette = ({ darkMode, atBottom }) => (
  <svg viewBox="0 0 200 300" className="w-full h-full">
    {/* Helmet group - animate lift when atBottom */}
    <motion.g
      style={{ originX: '50%', originY: '20%' }}
      animate={atBottom ? { rotate: -12, y: -10 } : { rotate: 0, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <ellipse cx="100" cy="60" rx="45" ry="35" fill={darkMode ? '#f97316' : '#ea580c'} />
      <rect x="85" y="50" width="30" height="15" fill={darkMode ? '#fbbf24' : '#f59e0b'} />
      {/* Lamp on helmet */}
      <circle cx="100" cy="50" r="8" fill={darkMode ? '#fbbf24' : '#f59e0b'} />
    </motion.g>

    {/* Head */}
    <ellipse cx="100" cy="90" rx="35" ry="40" fill={darkMode ? '#4b5563' : '#6b7280'} />

    {/* Mouth: neutral -> smile on atBottom */}
    <motion.path
      d={atBottom ? 'M85 105 Q100 120 115 105' : 'M90 110 Q100 110 110 110'}
      stroke="#111827"
      strokeWidth="3"
      fill="transparent"
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.5 }}
    />

    {/* Body/Vest */}
    <rect x="60" y="120" width="80" height="100" rx="10" fill={darkMode ? '#10b981' : '#059669'} />
    <rect x="75" y="130" width="50" height="80" fill={darkMode ? '#f97316' : '#ea580c'} opacity="0.3" />
    {/* Arms */}
    <rect x="40" y="130" width="20" height="90" rx="10" fill={darkMode ? '#6b7280' : '#9ca3af'} />
    <rect x="140" y="130" width="20" height="90" rx="10" fill={darkMode ? '#6b7280' : '#9ca3af'} />
    {/* Legs */}
    <rect x="70" y="220" width="25" height="70" rx="5" fill={darkMode ? '#374151' : '#4b5563'} />
    <rect x="105" y="220" width="25" height="70" rx="5" fill={darkMode ? '#374151' : '#4b5563'} />
    {/* Boots */}
    <rect x="65" y="280" width="30" height="15" rx="3" fill={darkMode ? '#1f2937' : '#111827'} />
    <rect x="105" y="280" width="30" height="15" rx="3" fill={darkMode ? '#1f2937' : '#111827'} />

    {/* Lamp glow */}
    <motion.circle
      cx="100"
      cy="50"
      r="8"
      fill={darkMode ? '#fde047' : '#fbbf24'}
      animate={{ opacity: [0.3, 1, 0.3] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
  </svg>
);

const CoalMineBackground = ({ darkMode }) => {
  return (
    <div className="absolute inset-0 overflow-hidden">
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
      <div className="absolute inset-0 pointer-events-none opacity-20">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute h-3 ${darkMode ? 'bg-stone-600' : 'bg-gray-800'}`}
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
    </div>
  );
};

// ...existing sections: ProblemVisionSection, TechnologySection, DashboardSection, StatCard, ImpactSection, ImpactCard
// We'll reuse the implementations from the original file but adjust Footer to accept setAtBottom

const ProblemVisionSection = ({ darkMode }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className={`py-24 px-6 relative ${darkMode ? 'bg-gray-800' : 'bg-gradient-to-b from-gray-100 via-stone-100 to-gray-200'}`}>
      {/* Coal texture overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: darkMode 
          ? 'radial-gradient(circle at 20% 50%, transparent 0%, rgba(0,0,0,0.3) 100%), repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(100,100,100,0.1) 10px, rgba(100,100,100,0.1) 20px)'
          : 'radial-gradient(circle at 20% 50%, transparent 0%, rgba(120,113,108,0.15) 100%), repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(120,113,108,0.1) 10px, rgba(120,113,108,0.1) 20px)'
      }} />
      
      {/* Rock formation accents */}
      <div className={`absolute top-0 left-0 right-0 h-32 ${darkMode ? 'bg-gradient-to-b from-stone-800/20' : 'bg-gradient-to-b from-stone-400/10'} to-transparent`} style={{
        clipPath: 'polygon(0 0, 100% 0, 100% 80%, 85% 90%, 70% 75%, 50% 95%, 30% 80%, 15% 85%, 0 70%)',
      }} />
      
      <div className="relative z-10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
          animate={isInView ? { opacity: 1, clipPath: 'inset(0 0% 0 0)' } : {}}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Mountain className={`w-12 h-12 ${darkMode ? 'text-orange-500' : 'text-orange-600'}`} />
            <h2 className={`text-4xl md:text-5xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              The Underground Coal Mining Challenge
            </h2>
          </div>
          <p className={`text-xl mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'} max-w-3xl`}>
            Coal mining operations face critical safety challenges in hazardous underground environments where manual PPE compliance checks are time-consuming, 
            error-prone, and can't guarantee miner safety at depths of 500m+ below surface.
          </p>
          
          {/* Coal Mining Hazards */}
          <div className="flex flex-wrap gap-3 mb-12">
            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${darkMode ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-red-100 text-red-700 border border-red-300'}`}>
              ⚠️ Methane Gas Exposure
            </span>
            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${darkMode ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' : 'bg-orange-100 text-orange-700 border border-orange-300'}`}>
              🔥 Coal Dust Explosions
            </span>
            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${darkMode ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' : 'bg-yellow-100 text-yellow-700 border border-yellow-300'}`}>
              🏔️ Roof Collapses
            </span>
            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${darkMode ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'bg-blue-100 text-blue-700 border border-blue-300'}`}>
              🌫️ Poor Ventilation
            </span>
            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${darkMode ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : 'bg-purple-100 text-purple-700 border border-purple-300'}`}>
              ⛏️ Equipment Failures
            </span>
          </div>
        </motion.div>

        {/* Infographic */}
        <div className="grid md:grid-cols-2 gap-12 items-center mt-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            whileHover={{ scale: 1.02 }}
            className={`p-8 rounded-2xl ${darkMode ? 'bg-gray-900' : 'bg-gray-100'} border-2 border-red-500 transition-all duration-300 cursor-pointer hover:shadow-[0_0_40px_rgba(239,68,68,0.5)]`}
          >
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-16 h-16 text-red-500" />
              <HardHat className="w-12 h-12 text-red-400 opacity-50" />
            </div>
            <h3 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Traditional Coal Mine Safety ❌
            </h3>
            <ul className={`space-y-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <li>⏱️ 15-20 min manual PPE checks per shift</li>
              <li>👁️ Human error in low-visibility tunnels</li>
              <li>📝 Paper logs lost or damaged underground</li>
              <li>⚠️ Delayed detection of equipment failure</li>
              <li>📊 No real-time miner location tracking</li>
              <li>🔦 Lamp battery checks often missed</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            whileHover={{ scale: 1.02 }}
            className={`p-8 rounded-2xl ${darkMode ? 'bg-gray-900' : 'bg-gray-100'} border-2 border-green-500 shadow-lg shadow-green-500/20 transition-all duration-300 cursor-pointer hover:shadow-[0_0_40px_rgba(16,185,129,0.6)]`}
          >
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="w-16 h-16 text-green-500" />
              <Shield className="w-12 h-12 text-green-400" />
            </div>
            <h3 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Mine Sentinel AI System ✅
            </h3>
            <ul className={`space-y-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <li>⚡ 30-second automated verification</li>
              <li>🤖 99% accuracy with AI vision + RFID</li>
              <li>📱 Cloud-based compliance records</li>
              <li>🔔 Instant alerts for missing helmet/lamp</li>
              <li>📈 Live dashboard with miner locations</li>
              <li>🔋 Automated battery level monitoring</li>
            </ul>
          </motion.div>
        </div>
      </div>
      </div>
    </section>
  );
};

const TechnologySection = ({ darkMode }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const technologies = [
    { icon: Camera, title: 'Computer Vision', description: 'Advanced AI models detect PPE compliance with 99.2% accuracy', color: 'orange' },
    { icon: Radio, title: 'RFID/NFC Detection', description: 'Seamless worker identification and equipment tracking', color: 'green' },
    { icon: Eye, title: 'Face Recognition', description: 'Secure authentication and worker attendance tracking', color: 'blue' },
    { icon: Zap, title: 'Real-time Alerts', description: 'Instant notifications for non-compliance and safety issues', color: 'red' },
    { icon: BarChart3, title: 'Analytics Dashboard', description: 'Comprehensive insights into safety trends and compliance', color: 'purple' },
    { icon: TrendingUp, title: 'Predictive Analysis', description: 'ML-driven predictions to prevent safety incidents', color: 'cyan' }
  ];

  const colorMap = {
    orange: 'border-orange-500 shadow-orange-500/20',
    green: 'border-green-500 shadow-green-500/20',
    blue: 'border-blue-500 shadow-blue-500/20',
    red: 'border-red-500 shadow-red-500/20',
    purple: 'border-purple-500 shadow-purple-500/20',
    cyan: 'border-cyan-500 shadow-cyan-500/20'
  };

  return (
    <section ref={ref} className={`py-24 px-6 relative ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-b from-gray-200 via-slate-200 to-stone-200'}`}>
      {/* Underground tunnel grid pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: darkMode
          ? 'repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(100,100,100,0.3) 60px, rgba(100,100,100,0.3) 61px), repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(100,100,100,0.3) 60px, rgba(100,100,100,0.3) 61px)'
          : 'repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(80,80,80,0.2) 60px, rgba(80,80,80,0.2) 61px), repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(80,80,80,0.2) 60px, rgba(80,80,80,0.2) 61px)'
      }} />
      
      {/* Coal seam stripes */}
      <div className="absolute inset-0 overflow-hidden opacity-3">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute h-1 ${darkMode ? 'bg-black' : 'bg-stone-600'}`}
            style={{
              width: '120%',
              left: '-10%',
              top: `${15 + i * 15}%`,
              transform: `rotate(-5deg)`,
              opacity: 0.1
            }}
          />
        ))}
      </div>
      
      {/* Ambient glow spots */}
      <div className={`absolute top-20 right-20 w-64 h-64 rounded-full ${darkMode ? 'bg-orange-500/5' : 'bg-orange-400/10'} blur-3xl`} />
      <div className={`absolute bottom-20 left-20 w-64 h-64 rounded-full ${darkMode ? 'bg-green-500/5' : 'bg-green-400/10'} blur-3xl`} />
      
      <div className="relative z-10">
      <div className="max-w-7xl mx-auto">
        <motion.h2 initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className={`text-4xl md:text-5xl font-bold mb-16 text-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Powered by <span className="text-orange-500">Cutting-Edge</span> Technology
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {technologies.map((tech, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, clipPath: 'circle(0% at 50% 50%)' }} 
              animate={isInView ? { opacity: 1, clipPath: 'circle(100% at 50% 50%)' } : {}} 
              transition={{ duration: 0.6, delay: index * 0.1 }} 
              whileHover={{ scale: 1.05 }}
              className={`p-6 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} border-2 ${colorMap[tech.color]} shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer`}
              style={{
                transition: 'all 0.3s ease-in-out'
              }}
              onMouseEnter={(e) => {
                const colors = {
                  orange: '0, 0, 40px rgba(249, 115, 22, 0.6), 0 0 60px rgba(249, 115, 22, 0.4)',
                  green: '0, 0, 40px rgba(16, 185, 129, 0.6), 0 0 60px rgba(16, 185, 129, 0.4)',
                  blue: '0, 0, 40px rgba(59, 130, 246, 0.6), 0 0 60px rgba(59, 130, 246, 0.4)',
                  red: '0, 0, 40px rgba(239, 68, 68, 0.6), 0 0 60px rgba(239, 68, 68, 0.4)',
                  purple: '0, 0, 40px rgba(168, 85, 247, 0.6), 0 0 60px rgba(168, 85, 247, 0.4)',
                  cyan: '0, 0, 40px rgba(6, 182, 212, 0.6), 0 0 60px rgba(6, 182, 212, 0.4)'
                };
                e.currentTarget.style.boxShadow = colors[tech.color];
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '';
              }}
            >
              <tech.icon className={`w-12 h-12 mb-4 text-${tech.color}-500 transition-transform group-hover:scale-110`} />
              <h3 className={`text-xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{tech.title}</h3>
              <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{tech.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
};

const DashboardSection = ({ darkMode }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const complianceData = [
    { time: '00:00', rate: 85, alerts: 3 },
    { time: '04:00', rate: 92, alerts: 2 },
    { time: '08:00', rate: 88, alerts: 5 },
    { time: '12:00', rate: 95, alerts: 1 },
    { time: '16:00', rate: 97, alerts: 1 },
    { time: '20:00', rate: 93, alerts: 2 }
  ];

  return (
    <section ref={ref} className={`py-24 px-6 relative ${darkMode ? 'bg-gray-800' : 'bg-gradient-to-b from-stone-200 via-gray-100 to-slate-200'}`}>
      {/* Rock texture overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: darkMode
          ? 'radial-gradient(circle at 80% 20%, transparent 0%, rgba(0,0,0,0.3) 100%)'
          : 'radial-gradient(circle at 80% 20%, transparent 0%, rgba(100,100,100,0.1) 100%)',
        backgroundSize: '200% 200%'
      }} />
      
      {/* Mining equipment silhouettes */}
      <div className={`absolute bottom-0 left-0 right-0 h-48 ${darkMode ? 'bg-gradient-to-t from-stone-900/20' : 'bg-gradient-to-t from-stone-400/10'} to-transparent`} style={{
        clipPath: 'polygon(0 100%, 8% 40%, 15% 50%, 22% 35%, 30% 45%, 38% 30%, 45% 40%, 52% 25%, 60% 35%, 68% 30%, 75% 45%, 82% 35%, 90% 50%, 100% 40%, 100% 100%)',
      }} />
      
      <div className="relative z-10">
      <div className="max-w-7xl mx-auto">
        <motion.h2 initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className={`text-4xl md:text-5xl font-bold mb-16 text-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Real-Time Safety <span className="text-green-500">Dashboard</span>
        </motion.h2>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={isInView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.8, delay: 0.2 }} className={`p-8 rounded-3xl ${darkMode ? 'bg-gray-900' : 'bg-gray-100'} border-2 border-orange-500 shadow-2xl shadow-orange-500/10`}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <StatCard title="Compliance Rate" value="96.5%" icon={CheckCircle} color="green" darkMode={darkMode} />
            <StatCard title="Active Workers" value="247" icon={Users} color="blue" darkMode={darkMode} />
            <StatCard title="Active Alerts" value="3" icon={AlertTriangle} color="orange" darkMode={darkMode} />
            <StatCard title="Avg Check Time" value="2.3s" icon={Zap} color="purple" darkMode={darkMode} />
          </div>

          <div className="h-80">
            <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>24-Hour Compliance Trend</h3>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={complianceData}>
                <defs>
                  <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#d1d5db'} />
                <XAxis dataKey="time" stroke={darkMode ? '#9ca3af' : '#4b5563'} />
                <YAxis stroke={darkMode ? '#9ca3af' : '#4b5563'} />
                <Tooltip contentStyle={{ backgroundColor: darkMode ? '#1f2937' : '#ffffff', border: 'none', borderRadius: '8px', color: darkMode ? '#ffffff' : '#000000' }} />
                <Area type="monotone" dataKey="rate" stroke="#10b981" fillOpacity={1} fill="url(#colorRate)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
      </div>
    </section>
  );
};

const StatCard = ({ title, value, icon: Icon, color, darkMode }) => {
  const glowColors = {
    green: 'hover:shadow-[0_0_30px_rgba(16,185,129,0.6)]',
    blue: 'hover:shadow-[0_0_30px_rgba(59,130,246,0.6)]',
    orange: 'hover:shadow-[0_0_30px_rgba(249,115,22,0.6)]',
    purple: 'hover:shadow-[0_0_30px_rgba(168,85,247,0.6)]'
  };

  return (
    <motion.div 
      whileHover={{ scale: 1.05 }} 
      className={`p-4 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} border border-${color}-500/30 transition-all duration-300 cursor-pointer ${glowColors[color]}`}
    >
      <Icon className={`w-8 h-8 mb-2 text-${color}-500`} />
      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>{title}</p>
      <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{value}</p>
    </motion.div>
  );
};

const ImpactSection = ({ darkMode }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const impacts = [
    { label: 'Fewer Mine Accidents', target: 47, suffix: '%', icon: Shield, description: 'Reduction in PPE-related incidents' },
    { label: 'Better Safety Compliance', target: 99, suffix: '%', icon: CheckCircle, description: 'Helmet & lamp verification rate' },
    { label: 'Faster Entry Checks', target: 85, suffix: '%', icon: Zap, description: 'Time saved at mine entrance' },
    { label: 'Coal Mines Protected', target: 100, suffix: '+', icon: Mountain, description: 'Underground operations secured' }
  ];

  return (
    <section ref={ref} className={`py-24 px-6 relative ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-b from-slate-200 via-stone-100 to-gray-200'}`}>
      {/* Coal dust particles effect */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${darkMode ? 'bg-gray-600' : 'bg-stone-500'}`}
            style={{
              width: Math.random() * 4 + 2 + 'px',
              height: Math.random() * 4 + 2 + 'px',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>
      
      {/* Layered rock formations */}
      <div className="absolute top-0 left-0 right-0 h-40 opacity-10">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className={`absolute left-0 right-0 h-8 ${darkMode ? 'bg-stone-800' : 'bg-stone-600'}`}
            style={{
              top: `${i * 12}%`,
              transform: `skewY(-1deg)`,
              opacity: 0.3 - i * 0.05
            }}
          />
        ))}
      </div>
      
      {/* Mining lamps glow effect */}
      <div className={`absolute top-40 left-1/4 w-96 h-96 rounded-full ${darkMode ? 'bg-orange-500/5' : 'bg-orange-400/8'} blur-3xl`} />
      <div className={`absolute bottom-40 right-1/4 w-96 h-96 rounded-full ${darkMode ? 'bg-yellow-500/5' : 'bg-yellow-400/8'} blur-3xl`} />
      
      <div className="relative z-10">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <HardHat className={`w-10 h-10 ${darkMode ? 'text-orange-500' : 'text-orange-600'}`} />
            <h2 className={`text-4xl md:text-5xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Measurable <span className="text-orange-500">Impact</span>
            </h2>
          </div>
          <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Real results from coal mining operations across India
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {impacts.map((impact, index) => (
            <ImpactCard key={index} {...impact} darkMode={darkMode} isInView={isInView} delay={index * 0.1} />
          ))}
        </div>
      </div>
      </div>
    </section>
  );
};

const ImpactCard = ({ label, target, suffix, icon: Icon, description, darkMode, isInView, delay }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }} 
      animate={isInView ? { opacity: 1, y: 0 } : {}} 
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: 1.05 }}
      className={`p-8 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} text-center border-2 border-green-500 shadow-lg shadow-green-500/20 transition-all duration-300 cursor-pointer hover:shadow-[0_0_40px_rgba(16,185,129,0.6)] group`}
    >
      <Icon className="w-16 h-16 mx-auto mb-4 text-green-500 transition-transform group-hover:scale-110" />
      <div className={`text-5xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{count}{suffix}</div>
      <div className={`text-lg font-semibold mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{label}</div>
      <div className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>{description}</div>
    </motion.div>
  );
};

const Footer = ({ darkMode, setAtBottom }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  useEffect(() => {
    if (isInView) setTimeout(() => setShowEasterEgg(true), 500);
  }, [isInView]);

  // Detect scroll to bottom and inform parent
  useEffect(() => {
    const onScroll = () => {
      const scrolledToBottom = (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 10);
      setAtBottom && setAtBottom(scrolledToBottom);
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [setAtBottom]);

  return (
    <footer ref={ref} className={`py-12 px-6 relative ${darkMode ? 'bg-gray-950' : 'bg-gradient-to-b from-stone-800 via-gray-900 to-black'} text-white overflow-hidden`}>
      {/* Underground depth gradient */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: 'radial-gradient(ellipse at bottom, transparent 0%, rgba(0,0,0,0.5) 100%)',
      }} />
      
      {/* Coal seam lines */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute h-px bg-stone-600"
            style={{
              left: 0,
              right: 0,
              top: `${20 + i * 20}%`,
              transform: `rotate(-2deg)`,
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10">
      <div className="max-w-7xl mx-auto">
        {showEasterEgg && (
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center mb-8">
            <motion.div animate={{ rotate: [0, -10, 10, -10, 0] }} transition={{ duration: 1, repeat: 2 }} className="text-6xl">  </motion.div>
          </motion.div>
        )}

        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-orange-500">Mine Sentinel</h3>
            <p className="text-gray-400">AI-powered PPE compliance monitoring for safer mining operations.</p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-orange-500 transition-colors">Demo</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">API Access</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Support</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <div className="flex gap-4 justify-start items-center">
              <motion.a whileHover={{ scale: 1.1, color: '#f97316' }} href="#" className="text-gray-400"><Github className="w-6 h-6" /></motion.a>
              <motion.a whileHover={{ scale: 1.1, color: '#f97316' }} href="#" className="text-gray-400"><Linkedin className="w-6 h-6" /></motion.a>
              <motion.a whileHover={{ scale: 1.1, color: '#f97316' }} href="#" className="text-gray-400"><Mail className="w-6 h-6" /></motion.a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-500 text-sm">© 2025 Mine Sentinel. Built with ❤️ for safer mining operations.</p>
          <p className="text-gray-600 text-xs mt-2">Developed by Team [Your Team Name] | All rights reserved</p>
        </div>
      </div>
      </div>
    </footer>
  );
};

export default MineGuardLanding;
