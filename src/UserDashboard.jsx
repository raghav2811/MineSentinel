import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  User,
  Calendar,
  Award,
  TrendingDown,
  LogOut,
  MapPin,
  Clock,
  Phone,
  BadgeCheck,
  AlertTriangle,
  CheckCircle,
  Moon,
  Sun,
  HardHat,
  Lightbulb,
  Shirt,
  Activity,
  CreditCard,
  ScanFace,
  Battery,
  Zap,
  Heart,
  Radio,
  ShieldAlert,
  Wind,
  Footprints
} from 'lucide-react';
import { useAuth } from './AuthContext';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const UserDashboard = () => {
  const { user, logout } = useAuth();
  const [darkMode, setDarkMode] = useState(true);

  if (!user) return null;

  const attendanceData = [
    { name: 'Present', value: user.attendance.daysWorked },
    { name: 'Absent', value: user.attendance.totalDays - user.attendance.daysWorked }
  ];

  const COLORS = ['#10b981', '#ef4444'];

  // Generate credit points trend (last 10 days)
  const creditTrend = [];
  let currentPoints = 100;
  for (let i = 10; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dayLabel = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    
    // Simulate deductions on specific days
    const deduction = user.creditPoints.deductions.find(d => {
      const deductionDate = new Date(d.date);
      return deductionDate.toDateString() === date.toDateString();
    });
    
    if (deduction) {
      currentPoints += deduction.points; // points are negative
    }
    
    creditTrend.push({ date: dayLabel, points: currentPoints });
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gradient-to-br from-gray-900 via-stone-900 to-black' : 'bg-gradient-to-br from-gray-100 via-stone-100 to-gray-200'} transition-colors duration-500 relative overflow-hidden`}>
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

      {/* Header */}
      <header className={`${darkMode ? 'bg-gray-800/95 backdrop-blur-sm' : 'bg-white/95 backdrop-blur-sm'} shadow-lg border-b-2 border-orange-500 relative z-10`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Shield className="w-8 h-8 text-orange-500" />
            <div>
              <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Mine<span className="text-orange-500">Sentinel</span>
              </h1>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Worker Portal</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-orange-500 hover:bg-orange-600 transition-all"
            >
              {darkMode ? <Sun className="w-5 h-5 text-white" /> : <Moon className="w-5 h-5 text-white" />}
            </button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-all"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </motion.button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 mb-6 border-2 border-orange-500/30 shadow-lg`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-500 to-green-500 flex items-center justify-center">
                <User className="w-10 h-10 text-white" />
              </div>
              <div>
                <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Welcome, {user.name}!
                </h2>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-lg`}>
                  {user.department} • {user.shift}
                </p>
              </div>
            </div>
            <div className={`text-right ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <p className="text-sm">Current Date</p>
              <p className="text-xl font-semibold">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
            </div>
          </div>
        </motion.div>

        {/* Worker Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 mb-6 shadow-lg`}
        >
          <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            <BadgeCheck className="w-6 h-6 text-orange-500" />
            Worker Details
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <InfoCard icon={User} label="Worker ID" value={user.workerId} darkMode={darkMode} />
            <InfoCard icon={MapPin} label="Sector" value={user.sector} darkMode={darkMode} />
            <InfoCard icon={Phone} label="Contact" value={user.contact} darkMode={darkMode} />
            <InfoCard icon={Calendar} label="Join Date" value={new Date(user.joinDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} darkMode={darkMode} />
          </div>
        </motion.div>

        {/* PPE Wearables Status - Today's Check */}
        {user.wearables && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className={`${darkMode ? 'bg-gradient-to-br from-gray-800 to-gray-900' : 'bg-gradient-to-br from-white to-gray-50'} rounded-2xl p-6 mb-6 shadow-lg border-2 border-blue-500/30`}
          >
            <h3 className={`text-xl font-bold mb-6 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              <Shield className="w-6 h-6 text-blue-500" />
              PPE Wearables Status - Today
              <span className={`ml-auto text-sm font-normal px-3 py-1 rounded-full ${darkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-700'}`}>
                <CheckCircle className="w-4 h-4 inline mr-1" />
                All Systems Active
              </span>
            </h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Helmet with Lamp */}
              <WearableCard
                icon={HardHat}
                title="Safety Helmet"
                status={user.wearables.helmet.status}
                darkMode={darkMode}
                glowColor="text-orange-500"
                details={[
                  { 
                    icon: Lightbulb, 
                    label: 'Lamp Status', 
                    value: user.wearables.helmet.withLamp ? 'Active' : 'Inactive',
                    color: user.wearables.helmet.withLamp ? 'text-green-500' : 'text-red-500'
                  },
                  { 
                    icon: Battery, 
                    label: 'Battery', 
                    value: `${user.wearables.helmet.batteryLevel}%`,
                    color: user.wearables.helmet.batteryLevel > 50 ? 'text-green-500' : user.wearables.helmet.batteryLevel > 20 ? 'text-orange-500' : 'text-red-500'
                  },
                  { 
                    icon: Clock, 
                    label: 'Last Check', 
                    value: user.wearables.helmet.lastCheck,
                    color: darkMode ? 'text-gray-400' : 'text-gray-600'
                  }
                ]}
              />

              {/* Safety Vest */}
              <WearableCard
                icon={Shirt}
                title="Safety Vest"
                status={user.wearables.vest.status}
                darkMode={darkMode}
                details={[
                  { 
                    icon: CheckCircle, 
                    label: 'Condition', 
                    value: user.wearables.vest.condition,
                    color: user.wearables.vest.condition === 'Excellent' ? 'text-green-500' : user.wearables.vest.condition === 'Good' ? 'text-blue-500' : 'text-orange-500'
                  },
                  { 
                    icon: Zap, 
                    label: 'Reflectivity', 
                    value: `${user.wearables.vest.reflectivity}%`,
                    color: user.wearables.vest.reflectivity > 85 ? 'text-green-500' : 'text-orange-500'
                  }
                ]}
              />

              {/* Safety Boots */}
              <WearableCard
                icon={Footprints}
                title="Safety Boots"
                status={true}
                darkMode={darkMode}
                details={[
                  { 
                    icon: CheckCircle, 
                    label: 'Condition', 
                    value: user.wearables.boots?.condition || 'Good',
                    color: 'text-green-500'
                  },
                  { 
                    icon: Shield, 
                    label: 'Steel Toe', 
                    value: user.wearables.boots?.steelToe !== false ? 'Active' : 'Inactive',
                    color: 'text-green-500'
                  },
                  { 
                    icon: Clock, 
                    label: 'Last Check', 
                    value: user.wearables.boots?.lastCheck || '08:45 AM',
                    color: darkMode ? 'text-gray-400' : 'text-gray-600'
                  }
                ]}
              />

              {/* Gas Detector */}
              <WearableCard
                icon={Wind}
                title="Gas Detector"
                status={true}
                darkMode={darkMode}
                details={[
                  { 
                    icon: CheckCircle, 
                    label: 'Status', 
                    value: user.wearables.gasDetector?.reading || 'Normal',
                    color: 'text-green-500'
                  },
                  { 
                    icon: Battery, 
                    label: 'Battery', 
                    value: `${user.wearables.gasDetector?.batteryLevel || 95}%`,
                    color: (user.wearables.gasDetector?.batteryLevel || 95) > 50 ? 'text-green-500' : 'text-orange-500'
                  },
                  { 
                    icon: Clock, 
                    label: 'Last Reading', 
                    value: user.wearables.gasDetector?.lastReading || '09:00 AM',
                    color: darkMode ? 'text-gray-400' : 'text-gray-600'
                  }
                ]}
              />

              {/* Self-Rescuer */}
              <WearableCard
                icon={ShieldAlert}
                title="Self-Rescuer"
                status={true}
                darkMode={darkMode}
                details={[
                  { 
                    icon: CheckCircle, 
                    label: 'Status', 
                    value: user.wearables.selfRescuer?.condition || 'Ready',
                    color: 'text-green-500'
                  },
                  { 
                    icon: Zap, 
                    label: 'Seal Intact', 
                    value: user.wearables.selfRescuer?.sealed !== false ? 'Yes' : 'No',
                    color: user.wearables.selfRescuer?.sealed !== false ? 'text-green-500' : 'text-red-500'
                  },
                  { 
                    icon: Clock, 
                    label: 'Expiry Date', 
                    value: user.wearables.selfRescuer?.expiryDate || 'Dec 2025',
                    color: darkMode ? 'text-gray-400' : 'text-gray-600'
                  }
                ]}
              />

              {/* SpO2 / Heart Monitor */}
              <WearableCard
                icon={Activity}
                title="Health Monitor"
                status={user.wearables.spo2Monitor.status}
                darkMode={darkMode}
                details={[
                  { 
                    icon: Heart, 
                    label: 'Heart Rate', 
                    value: `${user.wearables.spo2Monitor.heartRate} BPM`,
                    color: user.wearables.spo2Monitor.heartRate < 100 && user.wearables.spo2Monitor.heartRate > 60 ? 'text-green-500' : 'text-orange-500'
                  },
                  { 
                    icon: Activity, 
                    label: 'SpO2 Level', 
                    value: `${user.wearables.spo2Monitor.spo2Level}%`,
                    color: user.wearables.spo2Monitor.spo2Level > 95 ? 'text-green-500' : 'text-orange-500'
                  },
                  { 
                    icon: Clock, 
                    label: 'Last Reading', 
                    value: user.wearables.spo2Monitor.lastReading,
                    color: darkMode ? 'text-gray-400' : 'text-gray-600'
                  }
                ]}
              />

              {/* RFID Badge */}
              <WearableCard
                icon={CreditCard}
                title="RFID Attendance"
                status={user.wearables.rfidBadge.status}
                darkMode={darkMode}
                details={[
                  { 
                    icon: Radio, 
                    label: 'Badge ID', 
                    value: user.wearables.rfidBadge.badgeId,
                    color: 'text-blue-500'
                  },
                  { 
                    icon: MapPin, 
                    label: 'Last Scan', 
                    value: user.wearables.rfidBadge.location,
                    color: darkMode ? 'text-gray-400' : 'text-gray-600'
                  },
                  { 
                    icon: Clock, 
                    label: 'Time', 
                    value: user.wearables.rfidBadge.lastScan,
                    color: darkMode ? 'text-gray-400' : 'text-gray-600'
                  }
                ]}
              />

              {/* Facial Recognition */}
              <WearableCard
                icon={ScanFace}
                title="Facial Recognition"
                status={user.wearables.facialRecognition.status}
                darkMode={darkMode}
                details={[
                  { 
                    icon: CheckCircle, 
                    label: 'Verification', 
                    value: user.wearables.facialRecognition.verified ? 'Verified' : 'Pending',
                    color: user.wearables.facialRecognition.verified ? 'text-green-500' : 'text-orange-500'
                  },
                  { 
                    icon: Zap, 
                    label: 'Confidence', 
                    value: `${user.wearables.facialRecognition.confidence}%`,
                    color: user.wearables.facialRecognition.confidence > 95 ? 'text-green-500' : 'text-orange-500'
                  },
                  { 
                    icon: Clock, 
                    label: 'Timestamp', 
                    value: user.wearables.facialRecognition.timestamp,
                    color: darkMode ? 'text-gray-400' : 'text-gray-600'
                  }
                ]}
              />

              {/* Summary Card - Dynamic based on wearables status */}
              {(() => {
                const activeIssues = user.creditPoints.deductions.filter(d => d.category !== 'historical').length;
                const hasIssues = activeIssues > 0;
                
                return (
                  <motion.div 
                    animate={
                      hasIssues
                        ? {
                            boxShadow: [
                              '0 0 15px rgba(249, 115, 22, 0.4), 0 0 25px rgba(249, 115, 22, 0.2)',
                              '0 0 30px rgba(249, 115, 22, 0.8), 0 0 50px rgba(249, 115, 22, 0.5)',
                              '0 0 15px rgba(249, 115, 22, 0.4), 0 0 25px rgba(249, 115, 22, 0.2)',
                            ],
                          }
                        : {}
                    }
                    transition={
                      hasIssues
                        ? {
                            duration: 1.5,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }
                        : {}
                    }
                    className={`${
                      hasIssues 
                        ? darkMode ? 'bg-gradient-to-br from-orange-500/10 to-red-500/10 border-2 border-orange-500/30' : 'bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-300'
                        : darkMode ? 'bg-gradient-to-br from-green-500/10 to-blue-500/10 border-2 border-green-500/30' : 'bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-300'
                    } rounded-xl p-4 flex flex-col justify-center items-center transition-all duration-300 hover:scale-105 cursor-pointer ${
                      !hasIssues ? 'hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]' : ''
                    }`}>
                    {hasIssues ? (
                      <AlertTriangle className="w-12 h-12 text-orange-500 mb-3" />
                    ) : (
                      <CheckCircle className="w-12 h-12 text-green-500 mb-3" />
                    )}
                    <p className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-1`}>
                      {hasIssues ? `${activeIssues} Issue${activeIssues > 1 ? 's' : ''} Detected` : 'All Systems OK'}
                    </p>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} text-center`}>
                      {hasIssues 
                        ? 'Some PPE equipment needs attention. Check deductions below.' 
                        : 'All PPE equipment verified and functioning properly'}
                    </p>
                    <div className={`mt-4 px-4 py-2 rounded-lg ${
                      hasIssues 
                        ? darkMode ? 'bg-orange-500/20' : 'bg-orange-100'
                        : darkMode ? 'bg-green-500/20' : 'bg-green-100'
                    }`}>
                      <p className={`text-xs font-semibold ${
                        hasIssues 
                          ? darkMode ? 'text-orange-400' : 'text-orange-700'
                          : darkMode ? 'text-green-400' : 'text-green-700'
                      }`}>
                        {hasIssues 
                          ? `Safety Compliance: ${Math.max(0, 100 - (activeIssues * 10))}%` 
                          : 'Safety Compliance: 100%'}
                      </p>
                    </div>
                    {hasIssues && (
                      <p className={`text-xs ${darkMode ? 'text-orange-400' : 'text-orange-600'} mt-3 text-center font-semibold`}>
                        ⚠️ Fix issues to restore full compliance
                      </p>
                    )}
                  </motion.div>
                );
              })()}
            </div>

            {/* Real-time Status Indicator with Critical Alerts Summary */}
            <motion.div 
              animate={
                user.wearables.helmet.batteryLevel < 20 || user.wearables.vest.reflectivity < 80
                  ? {
                      boxShadow: [
                        '0 0 10px rgba(249, 115, 22, 0.3), 0 0 20px rgba(249, 115, 22, 0.2)',
                        '0 0 25px rgba(249, 115, 22, 0.7), 0 0 40px rgba(249, 115, 22, 0.4)',
                        '0 0 10px rgba(249, 115, 22, 0.3), 0 0 20px rgba(249, 115, 22, 0.2)',
                      ],
                    }
                  : {}
              }
              transition={
                user.wearables.helmet.batteryLevel < 20 || user.wearables.vest.reflectivity < 80
                  ? {
                      duration: 1.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }
                  : {}
              }
              className={`mt-6 p-4 rounded-lg ${
                user.wearables.helmet.batteryLevel < 20 || user.wearables.vest.reflectivity < 80
                  ? darkMode ? 'bg-orange-500/10 border border-orange-500/30' : 'bg-orange-50 border border-orange-300'
                  : darkMode ? 'bg-blue-500/10 border border-blue-500/30' : 'bg-blue-50 border border-blue-200'
              } flex items-center gap-3`}>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className={`w-3 h-3 rounded-full ${
                  user.wearables.helmet.batteryLevel < 20 || user.wearables.vest.reflectivity < 80
                    ? 'bg-orange-500'
                    : 'bg-green-500'
                }`}
              />
              <div>
                <p className={`text-sm font-semibold ${
                  user.wearables.helmet.batteryLevel < 20 || user.wearables.vest.reflectivity < 80
                    ? darkMode ? 'text-orange-400' : 'text-orange-700'
                    : darkMode ? 'text-blue-400' : 'text-blue-700'
                }`}>
                  {user.wearables.helmet.batteryLevel < 20 || user.wearables.vest.reflectivity < 80
                    ? '⚠️ Attention Required - Critical Warnings Detected'
                    : '✓ Real-time Monitoring Active'}
                </p>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {user.wearables.helmet.batteryLevel < 20 || user.wearables.vest.reflectivity < 80
                    ? `${user.wearables.helmet.batteryLevel < 20 ? 'Low battery detected. ' : ''}${user.wearables.vest.reflectivity < 80 ? 'Low reflectivity detected. ' : ''}Please take action immediately.`
                    : `All wearables are being monitored continuously. Last updated: ${new Date().toLocaleTimeString()}`}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Attendance Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-lg border-2 border-green-500/30`}
          >
            <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              <Calendar className="w-6 h-6 text-green-500" />
              Attendance Record
            </h3>
            
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="text-5xl font-bold text-green-500 mb-2">
                  {user.attendance.percentage}%
                </div>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-lg`}>
                  {user.attendance.daysWorked}/{user.attendance.totalDays} days worked
                </p>
                <p className={`${darkMode ? 'text-gray-500' : 'text-gray-500'} text-sm mt-1`}>
                  This month (October 2025)
                </p>
              </div>
              
              <div className="w-32 h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={attendanceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={35}
                      outerRadius={50}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {attendanceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className={`flex items-center gap-4 p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} transition-all duration-300 hover:scale-105 cursor-pointer ${
              user.attendance.percentage >= 90 
                ? 'hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]' 
                : user.attendance.percentage >= 75 
                  ? 'hover:shadow-[0_0_20px_rgba(249,115,22,0.4)]' 
                  : 'hover:shadow-[0_0_20px_rgba(239,68,68,0.4)]'
            }`}>
              <CheckCircle className="w-5 h-5 text-green-500" />
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Status</p>
                <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {user.attendance.percentage >= 90 ? 'Excellent' : user.attendance.percentage >= 75 ? 'Good' : 'Needs Improvement'}
                </p>
              </div>
            </div>

            {/* 7-Day Attendance Trend */}
            {user.attendance.last7Days && (
              <div className="mt-4">
                <p className={`text-sm font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>
                  Last 7 Days Trend
                </p>
                <div className="flex gap-1 items-end justify-between h-16">
                  {user.attendance.last7Days.map((day, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center gap-1">
                      <div 
                        className={`w-full rounded-t transition-all ${
                          day.status === 'present' 
                            ? 'bg-green-500 hover:bg-green-600' 
                            : 'bg-red-500 hover:bg-red-600'
                        }`}
                        style={{ 
                          height: day.status === 'present' ? '100%' : '30%',
                          minHeight: '8px'
                        }}
                        title={`${day.date}: ${day.status === 'present' ? 'Present' : 'Absent'}`}
                      />
                      <span className={`text-[9px] ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                        {day.date.split(' ')[1]}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-4 mt-2 text-xs">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded bg-green-500"></div>
                    <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Present</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded bg-red-500"></div>
                    <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Absent</span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          {/* Credit Points Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-lg border-2 ${
              user.creditPoints.current >= 90 ? 'border-green-500/30' : 
              user.creditPoints.current >= 70 ? 'border-orange-500/30' : 
              'border-red-500/30'
            }`}
          >
            <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              <Award className="w-6 h-6 text-orange-500" />
              Safety Credit Points
            </h3>
            
            <div className="mb-6">
              <div className="flex items-baseline gap-2 mb-2">
                <div className={`text-5xl font-bold ${
                  user.creditPoints.current >= 90 ? 'text-green-500' : 
                  user.creditPoints.current >= 70 ? 'text-orange-500' : 
                  'text-red-500'
                }`}>
                  {user.creditPoints.current}
                </div>
                <div className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>/100</div>
              </div>
              
              {/* Progress Bar */}
              <div className={`w-full h-3 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} overflow-hidden`}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${user.creditPoints.current}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className={`h-full ${
                    user.creditPoints.current >= 90 ? 'bg-green-500' : 
                    user.creditPoints.current >= 70 ? 'bg-orange-500' : 
                    'bg-red-500'
                  }`}
                />
              </div>

              <p className={`${darkMode ? 'text-gray-500' : 'text-gray-500'} text-sm mt-2`}>
                Based on PPE compliance
              </p>
            </div>

            {/* Credit Trend Chart */}
            <div className="h-32 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={creditTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#d1d5db'} />
                  <XAxis dataKey="date" stroke={darkMode ? '#9ca3af' : '#4b5563'} fontSize={10} />
                  <YAxis stroke={darkMode ? '#9ca3af' : '#4b5563'} fontSize={10} domain={[0, 100]} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: darkMode ? '#1f2937' : '#ffffff', 
                      border: 'none', 
                      borderRadius: '8px',
                      color: darkMode ? '#ffffff' : '#000000'
                    }} 
                  />
                  <Line type="monotone" dataKey="points" stroke="#f97316" strokeWidth={2} dot={{ fill: '#f97316' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className={`flex items-center gap-2 p-3 rounded-lg transition-all duration-300 hover:scale-105 cursor-pointer ${
              user.creditPoints.current >= 90 ? darkMode ? 'bg-green-500/20 hover:shadow-[0_0_20px_rgba(16,185,129,0.5)]' : 'bg-green-100 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]' : 
              user.creditPoints.current >= 70 ? darkMode ? 'bg-orange-500/20 hover:shadow-[0_0_20px_rgba(249,115,22,0.5)]' : 'bg-orange-100 hover:shadow-[0_0_20px_rgba(249,115,22,0.4)]' : 
              darkMode ? 'bg-red-500/20 hover:shadow-[0_0_20px_rgba(239,68,68,0.5)]' : 'bg-red-100 hover:shadow-[0_0_20px_rgba(239,68,68,0.4)]'
            }`}>
              {user.creditPoints.current >= 90 ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-orange-500" />
              )}
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Performance</p>
                <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {user.creditPoints.current >= 90 ? 'Outstanding' : user.creditPoints.current >= 70 ? 'Satisfactory' : 'Critical'}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Deductions History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-lg`}
        >
          <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            <TrendingDown className="w-6 h-6 text-red-500" />
            Credit Point Deductions
          </h3>

          {user.creditPoints.deductions.length === 0 ? (
            <div className={`text-center py-8 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              <CheckCircle className="w-12 h-12 mx-auto mb-3 text-green-500" />
              <p>No deductions this month! Keep up the great work!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {user.creditPoints.deductions.map((deduction, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={
                    deduction.category !== 'historical'
                      ? {
                          opacity: 1,
                          x: 0,
                          boxShadow: [
                            '0 0 10px rgba(239, 68, 68, 0.3), 0 0 20px rgba(239, 68, 68, 0.1)',
                            '0 0 25px rgba(239, 68, 68, 0.7), 0 0 40px rgba(239, 68, 68, 0.4)',
                            '0 0 10px rgba(239, 68, 68, 0.3), 0 0 20px rgba(239, 68, 68, 0.1)',
                          ],
                        }
                      : { opacity: 1, x: 0 }
                  }
                  transition={
                    deduction.category !== 'historical'
                      ? {
                          opacity: { duration: 0.5, delay: 0.5 + index * 0.1 },
                          x: { duration: 0.5, delay: 0.5 + index * 0.1 },
                          boxShadow: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
                        }
                      : { delay: 0.5 + index * 0.1 }
                  }
                  whileHover={{ scale: 1.02 }}
                  className={`flex items-start justify-between p-4 rounded-lg transition-all duration-300 cursor-pointer ${
                    deduction.category === 'historical'
                      ? darkMode ? 'bg-orange-500/10 border border-orange-500/30 hover:shadow-[0_0_25px_rgba(249,115,22,0.4)]' : 'bg-orange-50 border border-orange-200 hover:shadow-[0_0_25px_rgba(249,115,22,0.3)]'
                      : darkMode ? 'bg-red-500/10 border border-red-500/30' : 'bg-red-50 border border-red-200'
                  }`}
                >
                  <div className="flex items-start gap-3 flex-1">
                    <AlertTriangle className={`w-5 h-5 ${deduction.category === 'historical' ? 'text-orange-500' : 'text-red-500'} mt-1 flex-shrink-0`} />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {deduction.reason}
                        </p>
                        {deduction.category !== 'historical' && (
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            darkMode ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-700'
                          } font-semibold`}>
                            ACTIVE
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className={`w-4 h-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {new Date(deduction.date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric', 
                            year: 'numeric' 
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <div className="text-2xl font-bold text-red-500">{deduction.points}</div>
                    <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>points</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {user.creditPoints.deductions.length > 0 && (
            <>
              <div className={`mt-4 p-4 rounded-lg ${darkMode ? 'bg-blue-500/10 border border-blue-500/30' : 'bg-blue-50 border border-blue-200'}`}>
                <p className={`text-sm ${darkMode ? 'text-blue-400' : 'text-blue-700'} font-semibold mb-2`}>
                  💡 Understanding Your Deductions:
                </p>
                <ul className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'} space-y-1 ml-4`}>
                  <li>• <span className="font-semibold text-red-400">ACTIVE</span> deductions are based on current wearables status</li>
                  <li>• Historical deductions are from previous incidents</li>
                  <li>• Fix wearable issues to prevent further deductions</li>
                  <li>• Check your PPE Wearables Status above for details</li>
                </ul>
              </div>
              
              <div className={`mt-4 p-4 rounded-lg ${darkMode ? 'bg-orange-500/10 border border-orange-500/30' : 'bg-orange-50 border border-orange-200'}`}>
                <p className={`text-sm ${darkMode ? 'text-orange-400' : 'text-orange-700'} font-semibold`}>
                  ⚠️ Reminder: Always wear complete PPE to maintain your credit points!
                </p>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

const InfoCard = ({ icon: Icon, label, value, darkMode }) => (
  <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
    <div className="flex items-center gap-2 mb-2">
      <Icon className={`w-4 h-4 ${darkMode ? 'text-orange-500' : 'text-orange-600'}`} />
      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{label}</p>
    </div>
    <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{value}</p>
  </div>
);

const WearableCard = ({ icon: Icon, title, status, darkMode, details = [] }) => {
  // Check for critical issues
  const batteryDetail = details.find(d => d.label === 'Battery');
  const batteryLevel = batteryDetail ? parseInt(batteryDetail.value) : 100;
  const isBatteryLow = batteryLevel < 20;
  const isBatteryCritical = batteryLevel < 10;
  
  const reflectivityDetail = details.find(d => d.label === 'Reflectivity');
  const reflectivityLevel = reflectivityDetail ? parseInt(reflectivityDetail.value) : 100;
  const isReflectivityLow = reflectivityLevel < 80;
  
  const spo2Detail = details.find(d => d.label === 'SpO2 Level');
  const spo2Level = spo2Detail ? parseInt(spo2Detail.value) : 100;
  const isSpo2Low = spo2Level < 95;
  
  const hasWarning = isBatteryLow || isReflectivityLow || isSpo2Low || !status;
  const hasCritical = isBatteryCritical || !status;
  
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      animate={
        hasCritical
          ? {
              boxShadow: [
                '0 0 15px rgba(239, 68, 68, 0.5), 0 0 30px rgba(239, 68, 68, 0.3)',
                '0 0 30px rgba(239, 68, 68, 0.9), 0 0 50px rgba(239, 68, 68, 0.5)',
                '0 0 15px rgba(239, 68, 68, 0.5), 0 0 30px rgba(239, 68, 68, 0.3)',
              ],
            }
          : hasWarning
          ? {
              boxShadow: [
                '0 0 15px rgba(249, 115, 22, 0.4), 0 0 25px rgba(249, 115, 22, 0.2)',
                '0 0 25px rgba(249, 115, 22, 0.8), 0 0 45px rgba(249, 115, 22, 0.4)',
                '0 0 15px rgba(249, 115, 22, 0.4), 0 0 25px rgba(249, 115, 22, 0.2)',
              ],
            }
          : {}
      }
      transition={
        hasCritical || hasWarning
          ? {
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }
          : {}
      }
      className={`${darkMode ? 'bg-gray-700/50' : 'bg-white'} rounded-xl p-4 border-2 ${
        hasCritical
          ? darkMode ? 'border-red-500/50' : 'border-red-400'
          : hasWarning
            ? darkMode ? 'border-orange-500/50' : 'border-orange-400'
            : status 
              ? darkMode ? 'border-green-500/30' : 'border-green-300' 
              : darkMode ? 'border-red-500/30' : 'border-red-300'
      } shadow-lg transition-all duration-300 cursor-pointer ${
        !hasCritical && !hasWarning && status 
          ? 'hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]' 
          : !hasCritical && !hasWarning && !status
            ? 'hover:shadow-[0_0_30px_rgba(239,68,68,0.5)]'
            : ''
      }`}
    >
      {/* Alert Banner for Critical Issues */}
      {(isBatteryCritical || isBatteryLow || isReflectivityLow || isSpo2Low) && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={
            isBatteryCritical
              ? {
                  opacity: 1,
                  y: 0,
                  boxShadow: [
                    '0 0 10px rgba(239, 68, 68, 0.4), 0 0 20px rgba(239, 68, 68, 0.2)',
                    '0 0 20px rgba(239, 68, 68, 0.8), 0 0 35px rgba(239, 68, 68, 0.5)',
                    '0 0 10px rgba(239, 68, 68, 0.4), 0 0 20px rgba(239, 68, 68, 0.2)',
                  ],
                }
              : {
                  opacity: 1,
                  y: 0,
                  boxShadow: [
                    '0 0 10px rgba(249, 115, 22, 0.4), 0 0 20px rgba(249, 115, 22, 0.2)',
                    '0 0 20px rgba(249, 115, 22, 0.8), 0 0 35px rgba(249, 115, 22, 0.5)',
                    '0 0 10px rgba(249, 115, 22, 0.4), 0 0 20px rgba(249, 115, 22, 0.2)',
                  ],
                }
          }
          transition={
            isBatteryCritical
              ? {
                  opacity: { duration: 0.3 },
                  y: { duration: 0.3 },
                  boxShadow: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
                }
              : {
                  opacity: { duration: 0.3 },
                  y: { duration: 0.3 },
                  boxShadow: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
                }
          }
          className={`mb-3 p-2 rounded-lg flex items-center gap-2 ${
            isBatteryCritical 
              ? darkMode ? 'bg-red-500/20 border border-red-500/40' : 'bg-red-100 border border-red-300'
              : darkMode ? 'bg-orange-500/20 border border-orange-500/40' : 'bg-orange-100 border border-orange-300'
          }`}
        >
          <AlertTriangle className={`w-4 h-4 ${isBatteryCritical ? 'text-red-500' : 'text-orange-500'} animate-pulse`} />
          <span className={`text-xs font-semibold ${
            isBatteryCritical 
              ? darkMode ? 'text-red-400' : 'text-red-700'
              : darkMode ? 'text-orange-400' : 'text-orange-700'
          }`}>
            {isBatteryCritical ? '⚠️ CRITICAL: Battery Depleted!' : 
             isBatteryLow ? '⚠️ Low Battery Warning' : 
             isReflectivityLow ? '⚠️ Low Reflectivity' :
             isSpo2Low ? '⚠️ Low SpO2 Level' : 'Warning'}
          </span>
        </motion.div>
      )}

      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-lg ${
            status 
              ? darkMode ? 'bg-green-500/20' : 'bg-green-100' 
              : darkMode ? 'bg-red-500/20' : 'bg-red-100'
          }`}>
            <Icon className={`w-5 h-5 ${status ? 'text-green-500' : 'text-red-500'}`} />
          </div>
          <div>
            <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{title}</p>
            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {status ? 'Active' : 'Inactive'}
            </p>
          </div>
        </div>
        <div className={`w-2 h-2 rounded-full ${status ? 'bg-green-500' : 'bg-red-500'}`}>
          {status && (
            <motion.div
              className="w-2 h-2 rounded-full bg-green-500"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
        </div>
      </div>

      <div className="space-y-2">
        {details.map((detail, index) => {
          // Check if this detail needs a warning indicator
          const needsWarning = 
            (detail.label === 'Battery' && parseInt(detail.value) < 20) ||
            (detail.label === 'Reflectivity' && parseInt(detail.value) < 80) ||
            (detail.label === 'SpO2 Level' && parseInt(detail.value) < 95) ||
            (detail.label === 'Heart Rate' && (parseInt(detail.value) > 100 || parseInt(detail.value) < 60));
          
          return (
            <div key={index} className={`flex items-center justify-between p-2 rounded transition-all ${
              needsWarning 
                ? darkMode ? 'bg-orange-500/10' : 'bg-orange-50' 
                : ''
            }`}>
              <div className="flex items-center gap-2">
                <detail.icon className={`w-3.5 h-3.5 ${
                  needsWarning 
                    ? 'text-orange-500' 
                    : darkMode ? 'text-gray-500' : 'text-gray-400'
                }`} />
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{detail.label}</p>
              </div>
              <div className="flex items-center gap-1">
                {needsWarning && (
                  <AlertTriangle className="w-3 h-3 text-orange-500" />
                )}
                <p className={`text-xs font-semibold ${detail.color}`}>{detail.value}</p>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default UserDashboard;
