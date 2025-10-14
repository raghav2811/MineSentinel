# MineGuard Login Feature Guide

## Overview
A complete authentication system has been implemented with role-based access for **Workers** and **Admins**.

## Features Implemented

### 🔐 Authentication System
- **Role-based login** (Worker / Admin)
- **Demo credentials** for testing
- **Persistent login** using localStorage
- **Secure logout** functionality

### 👷 Worker Dashboard
Displays comprehensive worker information:

#### Personal Details
- Worker Name
- Worker ID
- Sector assignment (A1, A2, B1, etc.)
- Department
- Shift timing
- Contact information
- Join date

#### 🛡️ PPE Wearables Status (NEW!)
Real-time monitoring of safety equipment worn today:

**1. Safety Helmet with Lamp**
- Lamp status (Active/Inactive)
- Battery level percentage
- Last equipment check time

**2. Safety Vest**
- Overall condition (Excellent/Good/Fair)
- Reflectivity percentage
- Visual status indicator

**3. Health Monitor (SpO2/Heart Rate)**
- Real-time heart rate (BPM)
- Oxygen saturation level (SpO2 %)
- Last reading timestamp
- Color-coded health indicators

**4. RFID Attendance Badge**
- Badge ID number
- Last scan location
- Scan timestamp
- Entry/exit tracking

**5. Facial Recognition**
- Verification status (Verified/Pending)
- Confidence level percentage
- Authentication timestamp
- Security confirmation

**Overall Compliance:**
- All systems active indicator
- 100% safety compliance display
- Real-time monitoring status
- Live update timestamps

#### Attendance Tracking
- **Attendance percentage** (e.g., 92.5%)
- **Days worked** out of total days (e.g., 27/30)
- Visual pie chart representation
- Monthly attendance overview
- Performance status (Excellent/Good/Needs Improvement)

#### Credit Points System
- **Current credit points** (out of 100)
- **Visual progress bar** with color coding:
  - Green (90-100): Outstanding
  - Orange (70-89): Satisfactory
  - Red (<70): Critical
- **10-day trend chart** showing credit history
- **Detailed deduction history** with:
  - Date of deduction
  - Reason (e.g., "Missing helmet at checkpoint")
  - Points deducted (e.g., -10 points)

#### Features
- Dark/Light mode toggle
- Responsive design
- Animated charts and statistics
- Real-time data visualization

### 👔 Admin Dashboard
Comprehensive management interface:

#### Overview Stats
- Total workers count
- Active workers now
- Overall compliance rate
- Active alerts count

#### Analytics
- **7-day attendance trend** (line chart)
- **Workers by sector** distribution (pie chart)
- **Performance metrics**:
  - Average attendance percentage
  - Average credit points
  - Overall compliance score

#### Worker Management
- **Complete worker table** with:
  - Worker ID and Name
  - Sector and Shift
  - Attendance percentage
  - Credit points
  - PPE equipment status (Helmet, Vest, Boots, Lamp)
  - Status badges (Active/Warning/Alert)
  - Quick view action button

- **Worker detail modal** for in-depth view
- Real-time PPE status indicators
- Color-coded performance metrics

## Demo Credentials

### Admin Login
```
Username: admin
Password: admin123
```

### Worker Login

**Worker 1 - Rajesh Patel (W-001)**
```
Username: worker1
Password: worker123
```
- Sector: A1
- Attendance: 92.5% (27/30 days)
- Credit Points: 85/100
- 2 deductions recorded
- **Wearables**: All active, Helmet lamp 85%, Heart rate 78 BPM, SpO2 98%

**Worker 2 - Suresh Kumar (W-002)**
```
Username: worker2
Password: worker123
```
- Sector: A2
- Attendance: 88.3% (25/30 days)
- Credit Points: 75/100
- 3 deductions recorded
- **Wearables**: All active, Helmet lamp 45%, Heart rate 82 BPM, SpO2 97%

**Worker 3 - Luis Gomez (W-003)**
```
Username: worker3
Password: worker123
```
- Sector: B1
- Attendance: 96.7% (29/30 days)
- Credit Points: 95/100
- 1 deduction recorded
- **Wearables**: All active, Helmet lamp 92%, Heart rate 72 BPM, SpO2 99%

## How to Run

1. **Install dependencies** (if not already installed):
```cmd
npm install
```

2. **Start the development server**:
```cmd
npm run dev
```

3. **Open the application** in your browser (typically http://localhost:5173)

4. **Login** using any of the demo credentials above

## File Structure

New files created:
```
src/
├── App.jsx                  # Main app with routing logic
├── AuthContext.jsx          # Authentication context and state management
├── LoginPage.jsx            # Login page with role selection
├── UserDashboard.jsx        # Worker dashboard with attendance & credits
├── AdminDashboard.jsx       # Admin dashboard with worker management
└── main.jsx                 # Updated entry point
```

## Usage Flow

### For Workers
1. Select "Worker" role on login page
2. Enter worker credentials (worker1/worker2/worker3)
3. View personal dashboard with:
   - Attendance record
   - Credit points and deductions
   - Personal details
4. Toggle dark/light mode
5. Logout when done

### For Admins
1. Select "Admin" role on login page
2. Enter admin credentials
3. Access admin dashboard with:
   - Overview statistics
   - Attendance trends
   - Worker management table
   - Sector distribution
   - Performance metrics
4. Click "View" on any worker to see detailed information
5. Logout when done

## Credit Points System

### How It Works
- Workers start with 100 credit points
- Points are deducted for PPE violations:
  - Missing helmet: -10 to -15 points
  - Missing vest: -5 to -10 points
  - Missing boots: -5 points
  - Lamp not functioning: -5 points
  - Multiple violations: Higher deductions

### Deduction Records
Each deduction includes:
- **Date**: When the violation occurred
- **Reason**: Specific PPE issue (e.g., "Missing helmet at checkpoint")
- **Points**: Number of points deducted (always shown as negative)

### Performance Levels
- **90-100 points**: Outstanding (Green)
- **70-89 points**: Satisfactory (Orange)
- **Below 70 points**: Critical (Red)

## Technical Details

### State Management
- React Context API for authentication
- localStorage for persistent login sessions
- Demo data stored in localStorage under `mineguard_demo` key

### Styling
- Tailwind CSS for responsive design
- Framer Motion for animations
- Recharts for data visualization

### Components
- Fully responsive on mobile, tablet, and desktop
- Dark mode support throughout
- Accessible and user-friendly UI

## Future Enhancements
- Real backend API integration
- Advanced filtering and search
- Export reports functionality
- Push notifications for violations
- Mobile app version

## Support
For issues or questions, refer to the main README.md or contact the development team.

---
**MineGuard** - Smart India Hackathon 2025 | Building Safer Mines 🛡️
