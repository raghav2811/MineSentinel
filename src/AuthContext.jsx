import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

// Helper function to calculate credit deductions based on wearables status
const calculateWearablesDeductions = (wearables) => {
  const deductions = [];
  let totalPoints = 0;

  if (!wearables) return { deductions, totalPoints };

  // Check Helmet Status
  if (!wearables.helmet.status) {
    deductions.push({ 
      date: new Date().toISOString().split('T')[0], 
      reason: 'Safety helmet not detected', 
      points: -15,
      category: 'helmet'
    });
    totalPoints -= 15;
  } else {
    // Check lamp functionality
    if (!wearables.helmet.withLamp) {
      deductions.push({ 
        date: new Date().toISOString().split('T')[0], 
        reason: 'Helmet lamp not functioning', 
        points: -5,
        category: 'helmet'
      });
      totalPoints -= 5;
    }
    // Check battery level
    if (wearables.helmet.batteryLevel < 20) {
      deductions.push({ 
        date: new Date().toISOString().split('T')[0], 
        reason: 'Helmet lamp battery critically low (<20%)', 
        points: -3,
        category: 'helmet'
      });
      totalPoints -= 3;
    }
  }

  // Check Safety Vest
  if (!wearables.vest.status) {
    deductions.push({ 
      date: new Date().toISOString().split('T')[0], 
      reason: 'Safety vest not detected', 
      points: -10,
      category: 'vest'
    });
    totalPoints -= 10;
  } else {
    // Check vest condition and reflectivity
    if (wearables.vest.reflectivity < 70) {
      deductions.push({ 
        date: new Date().toISOString().split('T')[0], 
        reason: 'Safety vest reflectivity below standard (<70%)', 
        points: -8,
        category: 'vest'
      });
      totalPoints -= 8;
    } else if (wearables.vest.reflectivity < 80) {
      deductions.push({ 
        date: new Date().toISOString().split('T')[0], 
        reason: 'Safety vest reflectivity needs attention (<80%)', 
        points: -5,
        category: 'vest'
      });
      totalPoints -= 5;
    }
  }

  // Check Health Monitor
  if (!wearables.spo2Monitor.status) {
    deductions.push({ 
      date: new Date().toISOString().split('T')[0], 
      reason: 'Health monitor not active', 
      points: -8,
      category: 'health'
    });
    totalPoints -= 8;
  } else {
    // Check heart rate (normal: 60-100 BPM)
    if (wearables.spo2Monitor.heartRate > 100 || wearables.spo2Monitor.heartRate < 60) {
      deductions.push({ 
        date: new Date().toISOString().split('T')[0], 
        reason: `Abnormal heart rate detected (${wearables.spo2Monitor.heartRate} BPM) - Health concern`, 
        points: -5,
        category: 'health'
      });
      totalPoints -= 5;
    }
    // Check SpO2 level (normal: >95%)
    if (wearables.spo2Monitor.spo2Level < 95) {
      deductions.push({ 
        date: new Date().toISOString().split('T')[0], 
        reason: `Low oxygen saturation (${wearables.spo2Monitor.spo2Level}%) - Health alert`, 
        points: -7,
        category: 'health'
      });
      totalPoints -= 7;
    }
  }

  // Check RFID Badge
  if (!wearables.rfidBadge.status) {
    deductions.push({ 
      date: new Date().toISOString().split('T')[0], 
      reason: 'RFID attendance badge not scanned', 
      points: -3,
      category: 'rfid'
    });
    totalPoints -= 3;
  }

  // Check Facial Recognition
  if (!wearables.facialRecognition.status) {
    deductions.push({ 
      date: new Date().toISOString().split('T')[0], 
      reason: 'Facial recognition verification failed', 
      points: -5,
      category: 'face'
    });
    totalPoints -= 5;
  } else {
    // Check confidence level
    if (!wearables.facialRecognition.verified) {
      deductions.push({ 
        date: new Date().toISOString().split('T')[0], 
        reason: 'Facial recognition not verified', 
        points: -5,
        category: 'face'
      });
      totalPoints -= 5;
    } else if (wearables.facialRecognition.confidence < 90) {
      deductions.push({ 
        date: new Date().toISOString().split('T')[0], 
        reason: `Low facial recognition confidence (${wearables.facialRecognition.confidence}%)`, 
        points: -3,
        category: 'face'
      });
      totalPoints -= 3;
    }
  }

  return { deductions, totalPoints };
};

// Demo worker data (outside component for getAllWorkers access)
const getDemoWorkers = () => {
  return [
    {
      username: 'worker2',
      password: 'worker123',
      role: 'user',
      name: 'Suresh Kumar',
      workerId: 'W-002',
      sector: 'A2',
      attendance: {
        percentage: 88.3,
        daysWorked: 25,
        totalDays: 30,
        last7Days: [
          { date: 'Oct 8', status: 'present' },
          { date: 'Oct 9', status: 'present' },
          { date: 'Oct 10', status: 'absent' },
          { date: 'Oct 11', status: 'absent' },
          { date: 'Oct 12', status: 'present' },
          { date: 'Oct 13', status: 'present' },
          { date: 'Oct 14', status: 'present' }
        ]
      },
      wearables: {
        helmet: { status: false, withLamp: true, batteryLevel: 9, lastCheck: '10:15 PM' },
        vest: { status: true, condition: 'Fair', reflectivity: 78 },
        spo2Monitor: { status: true, heartRate: 82, spo2Level: 97, lastReading: '11:00 PM' },
        rfidBadge: { status: true, badgeId: 'RFID-W002', lastScan: '10:12 PM', location: 'East Wing Entry' },
        facialRecognition: { status: true, verified: true, confidence: 96.2, timestamp: '10:12 PM' }
      },
      department: 'Excavation',
      shift: 'Night Shift (10PM - 6AM)',
      joinDate: '2022-11-20',
      contact: '+91-9876543211',
      get creditPoints() {
        const basePoints = 100;
        const wearablesCheck = calculateWearablesDeductions(this.wearables);
        const historicalDeductions = [
          { date: '2025-10-12', reason: 'Missing helmet - multiple instances (Previous incident)', points: -15, category: 'historical' },
          { date: '2025-10-08', reason: 'Lamp not functioning (Previous incident)', points: -5, category: 'historical' },
          { date: '2025-10-02', reason: 'Late arrival without PPE (Previous incident)', points: -5, category: 'historical' }
        ];
        
        const allDeductions = [...historicalDeductions, ...wearablesCheck.deductions];
        const totalDeducted = historicalDeductions.reduce((sum, d) => sum + d.points, 0) + wearablesCheck.totalPoints;
        
        return {
          current: basePoints + totalDeducted,
          deductions: allDeductions
        };
      }
    },
    {
      username: 'worker3',
      password: 'worker123',
      role: 'user',
      name: 'Luis Gomez',
      workerId: 'W-003',
      sector: 'B1',
      attendance: {
        percentage: 96.7,
        daysWorked: 29,
        totalDays: 30,
        last7Days: [
          { date: 'Oct 8', status: 'present' },
          { date: 'Oct 9', status: 'absent' },
          { date: 'Oct 10', status: 'absent' },
          { date: 'Oct 11', status: 'absent' },
          { date: 'Oct 12', status: 'present' },
          { date: 'Oct 13', status: 'present' },
          { date: 'Oct 14', status: 'present' }
        ]
      },
      wearables: {
        helmet: { status: true, withLamp: true, batteryLevel: 92, lastCheck: '06:15 AM' },
        vest: { status: true, condition: 'Excellent', reflectivity: 98 },
        spo2Monitor: { status: true, heartRate: 72, spo2Level: 99, lastReading: '06:45 AM' },
        rfidBadge: { status: true, badgeId: 'RFID-W003', lastScan: '06:12 AM', location: 'Ventilation Access' },
        facialRecognition: { status: true, verified: true, confidence: 99.1, timestamp: '06:12 AM' }
      },
      department: 'Ventilation',
      shift: 'Day Shift (6AM - 2PM)',
      joinDate: '2024-02-10',
      contact: '+91-9876543212',
      get creditPoints() {
        const basePoints = 100;
        const wearablesCheck = calculateWearablesDeductions(this.wearables);
        const historicalDeductions = [
          { date: '2025-10-07', reason: 'Missing safety boots (Previous incident)', points: -5, category: 'historical' }
        ];
        
        const allDeductions = [...historicalDeductions, ...wearablesCheck.deductions];
        const totalDeducted = historicalDeductions.reduce((sum, d) => sum + d.points, 0) + wearablesCheck.totalPoints;
        
        return {
          current: basePoints + totalDeducted,
          deductions: allDeductions
        };
      }
    }
  ];
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('mineguard_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (credentials) => {
    const { username, password, role } = credentials;

    // Demo credentials
    const demoUsers = {
      admin: {
        username: 'admin',
        password: 'admin123',
        role: 'admin',
        name: 'Admin User',
        id: 'ADMIN-001'
      },
      user: {
        username: 'worker1',
        password: 'worker123',
        role: 'user',
        name: 'Rajesh Patel',
        workerId: 'W-001',
        sector: 'A1',
        attendance: {
          percentage: 92.5,
          daysWorked: 27,
          totalDays: 30,
          last7Days: [
            { date: 'Oct 8', status: 'present' },
            { date: 'Oct 9', status: 'absent' },
            { date: 'Oct 10', status: 'present' },
            { date: 'Oct 11', status: 'absent' },
            { date: 'Oct 12', status: 'present' },
            { date: 'Oct 13', status: 'present' },
            { date: 'Oct 14', status: 'present' }
          ]
        },
        wearables: {
          helmet: { status: true, withLamp: true, batteryLevel: 85, lastCheck: '08:45 AM' },
          vest: { status: true, condition: 'Good', reflectivity: 75 },
          spo2Monitor: { status: true, heartRate: 78, spo2Level: 98, lastReading: '09:30 AM' },
          rfidBadge: { status: true, badgeId: 'RFID-W001', lastScan: '08:42 AM', location: 'Main Entrance' },
          facialRecognition: { status: true, verified: true, confidence: 98.5, timestamp: '08:42 AM' }
        },
        department: 'Mining Operations',
        shift: 'Day Shift (6AM - 2PM)',
        joinDate: '2023-05-15',
        contact: '+91-9876543210',
        // Credit points will be calculated based on wearables
        get creditPoints() {
          const basePoints = 100;
          const wearablesCheck = calculateWearablesDeductions(this.wearables);
          const historicalDeductions = [
            { date: '2025-10-10', reason: 'Missing helmet at checkpoint (Previous incident)', points: -10, category: 'historical' },
            { date: '2025-10-05', reason: 'Incomplete safety vest (Previous incident)', points: -5, category: 'historical' }
          ];
          
          const allDeductions = [...historicalDeductions, ...wearablesCheck.deductions];
          const totalDeducted = historicalDeductions.reduce((sum, d) => sum + d.points, 0) + wearablesCheck.totalPoints;
          
          return {
            current: basePoints + totalDeducted,
            deductions: allDeductions
          };
        }
      }
    };

    // Get demo workers
    const demoWorkers = getDemoWorkers();

    // Check credentials
    let authenticatedUser = null;

    if (role === 'admin' && username === demoUsers.admin.username && password === demoUsers.admin.password) {
      authenticatedUser = demoUsers.admin;
    } else if (role === 'user') {
      if (username === demoUsers.user.username && password === demoUsers.user.password) {
        authenticatedUser = demoUsers.user;
      } else {
        const worker = demoWorkers.find(w => w.username === username && w.password === password);
        if (worker) {
          authenticatedUser = worker;
        }
      }
    }

    if (authenticatedUser) {
      setUser(authenticatedUser);
      localStorage.setItem('mineguard_user', JSON.stringify(authenticatedUser));
      return { success: true, user: authenticatedUser };
    }

    return { success: false, error: 'Invalid credentials' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mineguard_user');
  };

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isUser: user?.role === 'user',
    // Export all workers for admin dashboard
    getAllWorkers: () => {
      // Get demo workers
      const demoWorkers = getDemoWorkers();
      
      // Return all demo workers with computed properties
      const workers = demoWorkers.map(worker => ({
        id: worker.workerId,
        name: worker.name,
        sector: worker.sector,
        attendance: worker.attendance.percentage,
        creditPoints: worker.creditPoints.current,
        ppe: {
          helmet: worker.wearables.helmet.status,
          helmetWarning: worker.wearables.helmet.status && worker.wearables.helmet.batteryLevel < 20,
          vest: worker.wearables.vest.status,
          vestWarning: worker.wearables.vest.status && worker.wearables.vest.reflectivity < 80,
          boots: worker.wearables.spo2Monitor.status, // Using spo2 as boots equivalent
          bootsWarning: false,
          lamp: worker.wearables.helmet.withLamp,
          lampWarning: worker.wearables.helmet.withLamp && worker.wearables.helmet.batteryLevel < 20
        },
        status: worker.creditPoints.current >= 90 ? 'active' : worker.creditPoints.current >= 70 ? 'warning' : 'alert',
        shift: worker.shift,
        department: worker.department,
        contact: worker.contact,
        joinDate: worker.joinDate,
        wearables: worker.wearables,
        deductions: worker.creditPoints.deductions,
        daysWorked: worker.attendance.daysWorked,
        totalDays: worker.attendance.totalDays
      }));

      // Add worker1 (Rajesh Patel) from the default credentials
      const worker1Data = {
        username: 'worker1',
        password: 'worker123',
        role: 'user',
        name: 'Rajesh Patel',
        workerId: 'W-001',
        sector: 'A1',
        attendance: {
          percentage: 92.5,
          daysWorked: 27,
          totalDays: 30
        },
        wearables: {
          helmet: { status: true, withLamp: true, batteryLevel: 85, lastCheck: '08:45 AM' },
          vest: { status: true, condition: 'Good', reflectivity: 75 },
          spo2Monitor: { status: true, heartRate: 78, spo2Level: 98, lastReading: '09:30 AM' },
          rfidBadge: { status: true, badgeId: 'RFID-W001', lastScan: '08:42 AM', location: 'Main Entrance' },
          facialRecognition: { status: true, verified: true, confidence: 98.5, timestamp: '08:42 AM' }
        },
        department: 'Mining Operations',
        shift: 'Day Shift (6AM - 2PM)',
        joinDate: '2023-05-15',
        contact: '+91-9876543210',
        get creditPoints() {
          const basePoints = 100;
          const wearablesCheck = calculateWearablesDeductions(this.wearables);
          const historicalDeductions = [
            { date: '2025-10-10', reason: 'Missing helmet at checkpoint (Previous incident)', points: -10, category: 'historical' },
            { date: '2025-10-05', reason: 'Incomplete safety vest (Previous incident)', points: -5, category: 'historical' }
          ];
          
          const allDeductions = [...historicalDeductions, ...wearablesCheck.deductions];
          const totalDeducted = historicalDeductions.reduce((sum, d) => sum + d.points, 0) + wearablesCheck.totalPoints;
          
          return {
            current: basePoints + totalDeducted,
            deductions: allDeductions
          };
        }
      };

      const worker1 = {
        id: worker1Data.workerId,
        name: worker1Data.name,
        sector: worker1Data.sector,
        attendance: worker1Data.attendance.percentage,
        creditPoints: worker1Data.creditPoints.current,
        ppe: {
          helmet: worker1Data.wearables.helmet.status,
          helmetWarning: worker1Data.wearables.helmet.status && worker1Data.wearables.helmet.batteryLevel < 20,
          vest: worker1Data.wearables.vest.status,
          vestWarning: worker1Data.wearables.vest.status && worker1Data.wearables.vest.reflectivity < 80,
          boots: worker1Data.wearables.spo2Monitor.status,
          bootsWarning: false,
          lamp: worker1Data.wearables.helmet.withLamp,
          lampWarning: worker1Data.wearables.helmet.withLamp && worker1Data.wearables.helmet.batteryLevel < 20
        },
        status: worker1Data.creditPoints.current >= 90 ? 'active' : worker1Data.creditPoints.current >= 70 ? 'warning' : 'alert',
        shift: worker1Data.shift,
        department: worker1Data.department,
        contact: worker1Data.contact,
        joinDate: worker1Data.joinDate,
        wearables: worker1Data.wearables,
        deductions: worker1Data.creditPoints.deductions,
        daysWorked: worker1Data.attendance.daysWorked,
        totalDays: worker1Data.attendance.totalDays
      };

      return [worker1, ...workers];
    }
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
