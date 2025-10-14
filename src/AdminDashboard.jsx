import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  Users,
  AlertTriangle,
  TrendingUp,
  LogOut,
  CheckCircle,
  BarChart3,
  Moon,
  Sun,
  UserCheck,
  Award,
  Calendar,
  Eye,
  MapPin
} from 'lucide-react';
import { useAuth } from './AuthContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const AdminDashboard = () => {
  const { user, logout, getAllWorkers } = useAuth();
  const [darkMode, setDarkMode] = useState(true);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [workers, setWorkers] = useState([]);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    // Get real worker data from AuthContext
    const realWorkers = getAllWorkers();
    setWorkers(realWorkers);

    // Generate alerts based on actual worker status
    const generatedAlerts = realWorkers
      .filter(w => w.status === 'alert' || w.status === 'warning')
      .map(w => ({
        id: `A-${w.id}`,
        workerId: w.id,
        workerName: w.name,
        type: w.creditPoints < 70 ? 'Critical - Low Credit Points' : 'Warning - PPE Issues',
        time: Date.now() - 1000 * 60 * 30,
        severity: w.creditPoints < 70 ? 'high' : 'medium'
      }));
    
    setAlerts(generatedAlerts);
  }, [getAllWorkers]);

  // Calculate stats
  const totalWorkers = workers.length;
  const activeWorkers = workers.filter(w => w.status === 'active').length;
  const averageAttendance = workers.reduce((sum, w) => sum + w.attendance, 0) / totalWorkers || 0;
  const averageCredits = workers.reduce((sum, w) => sum + w.creditPoints, 0) / totalWorkers || 0;
  const complianceRate = (workers.filter(w => 
    w.ppe.helmet && w.ppe.vest && w.ppe.boots && w.ppe.lamp
  ).length / totalWorkers * 100) || 0;

  // Sector distribution
  const sectorData = workers.reduce((acc, worker) => {
    const existing = acc.find(s => s.sector === worker.sector);
    if (existing) {
      existing.count++;
    } else {
      acc.push({ sector: worker.sector, count: 1 });
    }
    return acc;
  }, []);

  // Attendance trend (last 7 days) - Static pattern with visible variation
  const attendanceTrend = [
    { date: 'Oct 8', attendance: 100 },
    { date: 'Oct 9', attendance: 66.7 },
    { date: 'Oct 10', attendance: 33.3 },
    { date: 'Oct 11', attendance: 0 },
    { date: 'Oct 12', attendance: 66.7 },
    { date: 'Oct 13', attendance: 100 },
    { date: 'Oct 14', attendance: 100 }
  ];

  const COLORS = ['#10b981', '#f97316', '#3b82f6', '#8b5cf6', '#ec4899'];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'} transition-colors duration-500`}>
      {/* Header */}
      <header className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg border-b-2 border-green-500`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Shield className="w-8 h-8 text-green-500" />
            <div>
              <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Mine<span className="text-green-500">Sentinel</span>
              </h1>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Admin Dashboard</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right mr-4">
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Logged in as</p>
              <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{user?.name}</p>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-green-500 hover:bg-green-600 transition-all"
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

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={Users}
            label="Total Workers"
            value={totalWorkers}
            color="blue"
            darkMode={darkMode}
          />
          <StatCard
            icon={UserCheck}
            label="Active Now"
            value={activeWorkers}
            color="green"
            darkMode={darkMode}
          />
          <StatCard
            icon={CheckCircle}
            label="Compliance Rate"
            value={`${complianceRate.toFixed(1)}%`}
            color="orange"
            darkMode={darkMode}
          />
          <StatCard
            icon={AlertTriangle}
            label="Active Alerts"
            value={workers.filter(w => w.status !== 'active').length}
            color="red"
            darkMode={darkMode}
          />
        </div>

        {/* Charts Row */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Attendance Trend */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-lg`}
          >
            <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              <TrendingUp className="w-6 h-6 text-green-500" />
              7-Day Attendance Trend
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={attendanceTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#d1d5db'} />
                  <XAxis dataKey="date" stroke={darkMode ? '#9ca3af' : '#4b5563'} fontSize={12} />
                  <YAxis stroke={darkMode ? '#9ca3af' : '#4b5563'} fontSize={12} domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                      border: 'none',
                      borderRadius: '8px',
                      color: darkMode ? '#ffffff' : '#000000'
                    }}
                    formatter={(value) => `${value}%`}
                  />
                  <Line type="monotone" dataKey="attendance" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Sector Distribution */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-lg`}
          >
            <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              <MapPin className="w-6 h-6 text-orange-500" />
              Workers by Sector
            </h3>
            <div className="h-64 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sectorData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ sector, count }) => `${sector}: ${count}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {sectorData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                      border: 'none',
                      borderRadius: '8px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Workers Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-lg`}
        >
          <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            <Users className="w-6 h-6 text-blue-500" />
            Worker Overview
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`border-b-2 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <th className={`text-left py-3 px-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'} font-semibold`}>ID</th>
                  <th className={`text-left py-3 px-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'} font-semibold`}>Name</th>
                  <th className={`text-left py-3 px-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'} font-semibold`}>Sector</th>
                  <th className={`text-left py-3 px-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'} font-semibold`}>Shift</th>
                  <th className={`text-left py-3 px-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'} font-semibold`}>Attendance</th>
                  <th className={`text-left py-3 px-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'} font-semibold`}>Credits</th>
                  <th className={`text-left py-3 px-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'} font-semibold`}>PPE Status</th>
                  <th className={`text-left py-3 px-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'} font-semibold`}>Status</th>
                  <th className={`text-left py-3 px-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'} font-semibold`}>Action</th>
                </tr>
              </thead>
              <tbody>
                {workers.map((worker, index) => (
                  <motion.tr
                    key={worker.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`border-b ${darkMode ? 'border-gray-700 hover:bg-gray-700/50' : 'border-gray-200 hover:bg-gray-50'} transition-colors`}
                  >
                    <td className={`py-3 px-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'} font-mono`}>{worker.id}</td>
                    <td className={`py-3 px-4 ${darkMode ? 'text-white' : 'text-gray-900'} font-semibold`}>{worker.name}</td>
                    <td className={`py-3 px-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded font-semibold text-sm">{worker.sector}</span>
                    </td>
                    <td className={`py-3 px-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{worker.shift}</td>
                    <td className={`py-3 px-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      <span className={`font-semibold ${worker.attendance >= 90 ? 'text-green-500' : worker.attendance >= 75 ? 'text-orange-500' : 'text-red-500'}`}>
                        {worker.attendance.toFixed(1)}%
                      </span>
                    </td>
                    <td className={`py-3 px-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      <span className={`font-semibold ${worker.creditPoints >= 90 ? 'text-green-500' : worker.creditPoints >= 70 ? 'text-orange-500' : 'text-red-500'}`}>
                        {worker.creditPoints}
                      </span>
                    </td>
                    <td className={`py-3 px-4`}>
                      <div className="flex gap-1">
                        <PPEIndicator active={worker.ppe.helmet} label="H" darkMode={darkMode} />
                        <PPEIndicator active={worker.ppe.vest} label="V" darkMode={darkMode} />
                        <PPEIndicator active={worker.ppe.boots} label="B" darkMode={darkMode} />
                        <PPEIndicator active={worker.ppe.lamp} label="L" darkMode={darkMode} />
                      </div>
                    </td>
                    <td className={`py-3 px-4`}>
                      <StatusBadge status={worker.status} darkMode={darkMode} />
                    </td>
                    <td className={`py-3 px-4`}>
                      <button
                        onClick={() => setSelectedWorker(worker)}
                        className="text-blue-500 hover:text-blue-400 flex items-center gap-1 text-sm"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Performance Metrics */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <MetricCard
            icon={Calendar}
            label="Avg. Attendance"
            value={`${averageAttendance.toFixed(1)}%`}
            trend="+2.5%"
            darkMode={darkMode}
          />
          <MetricCard
            icon={Award}
            label="Avg. Credit Points"
            value={averageCredits.toFixed(0)}
            trend="+5"
            darkMode={darkMode}
          />
          <MetricCard
            icon={BarChart3}
            label="Compliance Score"
            value={`${complianceRate.toFixed(0)}%`}
            trend="+3.2%"
            darkMode={darkMode}
          />
        </div>
      </div>

      {/* Worker Detail Modal */}
      {selectedWorker && (
        <WorkerDetailModal
          worker={selectedWorker}
          onClose={() => setSelectedWorker(null)}
          darkMode={darkMode}
        />
      )}
    </div>
  );
};

const StatCard = ({ icon: Icon, label, value, color, darkMode }) => {
  const colorMap = {
    blue: 'text-blue-500',
    green: 'text-green-500',
    orange: 'text-orange-500',
    red: 'text-red-500',
    purple: 'text-purple-500'
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg border-2 border-${color}-500/30`}
    >
      <Icon className={`w-10 h-10 mb-3 ${colorMap[color]}`} />
      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>{label}</p>
      <p className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{value}</p>
    </motion.div>
  );
};

const PPEIndicator = ({ active, label, darkMode }) => (
  <div
    className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold ${
      active
        ? 'bg-green-500 text-white'
        : darkMode
        ? 'bg-red-500/30 text-red-400 border border-red-500'
        : 'bg-red-100 text-red-600 border border-red-300'
    }`}
    title={`${label}: ${active ? 'OK' : 'Missing'}`}
  >
    {label}
  </div>
);

const StatusBadge = ({ status, darkMode }) => {
  const config = {
    active: { bg: darkMode ? 'bg-green-500/20' : 'bg-green-100', text: 'text-green-500', label: 'Active' },
    warning: { bg: darkMode ? 'bg-orange-500/20' : 'bg-orange-100', text: 'text-orange-500', label: 'Warning' },
    alert: { bg: darkMode ? 'bg-red-500/20' : 'bg-red-100', text: 'text-red-500', label: 'Alert' }
  };

  const style = config[status] || config.active;

  return (
    <span className={`px-2 py-1 rounded text-xs font-semibold ${style.bg} ${style.text}`}>
      {style.label}
    </span>
  );
};

const MetricCard = ({ icon: Icon, label, value, trend, darkMode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}
  >
    <div className="flex items-start justify-between mb-3">
      <Icon className={`w-8 h-8 ${darkMode ? 'text-orange-500' : 'text-orange-600'}`} />
      <span className="text-sm text-green-500 font-semibold">{trend}</span>
    </div>
    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>{label}</p>
    <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{value}</p>
  </motion.div>
);

const WorkerDetailModal = ({ worker, onClose, darkMode }) => (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 md:p-6">
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-2xl border-2 border-orange-500/30 w-full max-w-4xl max-h-[90vh] flex flex-col`}
    >
      {/* Fixed Header */}
      <div className={`flex justify-between items-start p-6 md:p-8 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div>
          <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{worker.name}</h2>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Worker ID: {worker.id}</p>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-red-500 text-2xl leading-none transition-colors"
        >
          ×
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="overflow-y-auto flex-1 p-6 md:p-8 scroll-smooth" style={{ scrollbarGutter: 'stable' }}>
        {/* Basic Info */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Sector</p>
          <p className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{worker.sector}</p>
        </div>
        <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Department</p>
          <p className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{worker.department}</p>
        </div>
        <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Shift</p>
          <p className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{worker.shift}</p>
        </div>
        <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Join Date</p>
          <p className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{new Date(worker.joinDate).toLocaleDateString()}</p>
        </div>
      </div>

      {/* Attendance & Credits */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>Attendance</p>
          <p className={`text-2xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{worker.attendance.toFixed(1)}%</p>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
            {worker.daysWorked}/{worker.totalDays} days
          </p>
        </div>
        <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>Credit Points</p>
          <p className={`text-2xl font-semibold ${worker.creditPoints >= 90 ? 'text-green-500' : worker.creditPoints >= 70 ? 'text-orange-500' : 'text-red-500'}`}>
            {worker.creditPoints}/100
          </p>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
            {worker.deductions.length} deductions
          </p>
        </div>
      </div>

      {/* PPE Wearables Status */}
      {worker.wearables && (
        <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} mb-4`}>
          <p className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>PPE Wearables Status</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Helmet */}
            <div className={`p-3 rounded ${darkMode ? 'bg-gray-600' : 'bg-white'}`}>
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className={worker.wearables.helmet.status ? 'text-green-500' : 'text-red-500'} size={20} />
                <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Helmet</span>
              </div>
              <div className="text-sm space-y-1">
                <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                  Lamp: {worker.wearables.helmet.withLamp ? '✓' : '✗'}
                </p>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                  Battery: <span className={worker.wearables.helmet.batteryLevel < 20 ? 'text-red-500 font-bold' : ''}>{worker.wearables.helmet.batteryLevel}%</span>
                </p>
                <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                  Last Check: {worker.wearables.helmet.lastCheck}
                </p>
              </div>
            </div>

            {/* Vest */}
            <div className={`p-3 rounded ${darkMode ? 'bg-gray-600' : 'bg-white'}`}>
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className={worker.wearables.vest.status ? 'text-green-500' : 'text-red-500'} size={20} />
                <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Safety Vest</span>
              </div>
              <div className="text-sm space-y-1">
                <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                  Condition: {worker.wearables.vest.condition}
                </p>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                  Reflectivity: <span className={worker.wearables.vest.reflectivity < 80 ? 'text-orange-500 font-bold' : ''}>{worker.wearables.vest.reflectivity}%</span>
                </p>
              </div>
            </div>

            {/* SpO2 Monitor */}
            <div className={`p-3 rounded ${darkMode ? 'bg-gray-600' : 'bg-white'}`}>
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className={worker.wearables.spo2Monitor.status ? 'text-green-500' : 'text-red-500'} size={20} />
                <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Health Monitor</span>
              </div>
              <div className="text-sm space-y-1">
                <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                  Heart Rate: {worker.wearables.spo2Monitor.heartRate} BPM
                </p>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                  SpO2: {worker.wearables.spo2Monitor.spo2Level}%
                </p>
                <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                  Last Reading: {worker.wearables.spo2Monitor.lastReading}
                </p>
              </div>
            </div>

            {/* RFID Badge */}
            <div className={`p-3 rounded ${darkMode ? 'bg-gray-600' : 'bg-white'}`}>
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className={worker.wearables.rfidBadge.status ? 'text-green-500' : 'text-red-500'} size={20} />
                <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>RFID Badge</span>
              </div>
              <div className="text-sm space-y-1">
                <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                  ID: {worker.wearables.rfidBadge.badgeId}
                </p>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                  Location: {worker.wearables.rfidBadge.location}
                </p>
                <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                  Last Scan: {worker.wearables.rfidBadge.lastScan}
                </p>
              </div>
            </div>

            {/* Facial Recognition */}
            <div className={`p-3 rounded ${darkMode ? 'bg-gray-600' : 'bg-white'} md:col-span-2`}>
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className={worker.wearables.facialRecognition.verified ? 'text-green-500' : 'text-red-500'} size={20} />
                <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Facial Recognition</span>
              </div>
              <div className="text-sm space-y-1">
                <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                  Status: {worker.wearables.facialRecognition.verified ? 'Verified ✓' : 'Not Verified ✗'}
                </p>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                  Confidence: {worker.wearables.facialRecognition.confidence}%
                </p>
                <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                  Timestamp: {worker.wearables.facialRecognition.timestamp}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Credit Point Deductions */}
      {worker.deductions && worker.deductions.length > 0 && (
        <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} mb-4`}>
          <p className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-3`}>Credit Point Deductions</p>
          <div className="space-y-2 max-h-64 overflow-y-auto pr-2 scroll-smooth" style={{ scrollbarWidth: 'thin', scrollbarColor: darkMode ? '#f97316 #374151' : '#f97316 #e5e7eb' }}>
            {worker.deductions.map((deduction, index) => (
              <div
                key={index}
                className={`p-3 rounded flex justify-between items-start ${
                  deduction.category === 'historical' 
                    ? darkMode ? 'bg-orange-500/10 border border-orange-500/30' : 'bg-orange-50 border border-orange-200'
                    : darkMode ? 'bg-red-500/10 border border-red-500/30' : 'bg-red-50 border border-red-200'
                }`}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className={`text-sm font-semibold ${
                      deduction.category === 'historical'
                        ? darkMode ? 'text-orange-400' : 'text-orange-700'
                        : darkMode ? 'text-red-400' : 'text-red-700'
                    }`}>
                      {deduction.reason}
                    </p>
                    {deduction.category !== 'historical' && (
                      <span className="text-xs px-2 py-0.5 bg-red-500 text-white rounded font-bold">ACTIVE</span>
                    )}
                  </div>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
                    {new Date(deduction.date).toLocaleDateString()}
                  </p>
                </div>
                <p className={`text-sm font-bold ${
                  deduction.category === 'historical'
                    ? darkMode ? 'text-orange-400' : 'text-orange-600'
                    : darkMode ? 'text-red-400' : 'text-red-600'
                }`}>
                  {deduction.points}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Contact Info */}
      <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Contact</p>
        <p className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{worker.contact}</p>
      </div>
    </div>

    {/* Fixed Footer */}
    <div className={`p-6 md:p-8 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
      <button
        onClick={onClose}
        className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition-all"
      >
        Close
      </button>
    </div>
  </motion.div>
  </div>
);

export default AdminDashboard;
