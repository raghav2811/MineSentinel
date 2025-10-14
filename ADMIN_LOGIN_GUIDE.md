# Admin Login Guide

## 🔐 Admin Login Credentials

To access the **Admin Dashboard**, use the following credentials:

### Admin Account
- **Username**: `admin`
- **Password**: `admin123`

## 📋 How to Login as Admin

1. **Start the Development Server** (if not already running):
   ```bash
   npm run dev
   ```

2. **Open the Application** in your browser:
   - Usually at: `http://localhost:5173/`

3. **Navigate to Login**:
   - Click on **"Get Started"** or **"Worker Login"** button on the landing page
   - OR if you're already on the login page, proceed to step 4

4. **Select Admin Role**:
   - Click the **"Admin"** button (green highlight)
   - Make sure it shows as selected (green background)

5. **Enter Credentials**:
   - Username: `admin`
   - Password: `admin123`

6. **Click "Sign In as Admin"**

## ✅ What You'll See in Admin Dashboard

Once logged in as admin, you will see:

### 📊 Statistics Overview
- Total Workers
- Active Workers  
- Average Attendance
- Compliance Rate

### 👥 Worker Management Table
All 3 workers with real-time data:
- **W-001** - Rajesh Patel (Mining Operations)
- **W-002** - Suresh Kumar (Excavation) ⚠️ Has active wearables issues
- **W-003** - Luis Gomez (Ventilation)

### 🔍 Worker Detail View
Click "View" on any worker to see:
- Complete profile (name, ID, sector, department, shift, join date)
- Attendance (percentage + days worked)
- Credit points with all deductions
- **Complete PPE Wearables Status**:
  - Helmet (lamp, battery level)
  - Safety Vest (condition, reflectivity)
  - Health Monitor (heart rate, SpO2)
  - RFID Badge (location, last scan)
  - Facial Recognition (confidence level)
- All credit point deductions (historical vs ACTIVE)
- Contact information

### 📈 Analytics
- Attendance trends chart
- Sector distribution
- Performance metrics

## 🚪 Logout
Click the **"Logout"** button in the top-right corner to return to the landing page.

## 🐛 Troubleshooting

### "Can't open admin login"
1. Make sure you selected **"Admin"** role (green button) before logging in
2. Verify you're using the correct credentials:
   - Username: `admin` (all lowercase)
   - Password: `admin123` (no spaces)
3. Check the browser console (F12) for any errors
4. Clear browser cache and try again

### Wrong credentials error
- Double-check you typed `admin` and `admin123` exactly
- Make sure "Admin" role is selected (not "Worker")

### Server not running
```bash
# Stop any running servers and restart
npm run dev
```

## 📝 Worker Login Credentials (for testing)

### Worker Accounts
1. **Rajesh Patel (W-001)**
   - Username: `worker1`
   - Password: `worker123`

2. **Suresh Kumar (W-002)** - Has wearables issues
   - Username: `worker2`
   - Password: `worker123`

3. **Luis Gomez (W-003)**
   - Username: `worker3`
   - Password: `worker123`

---

## 🎯 Quick Access

**Admin Login Flow:**
```
Landing Page → Get Started → Select "Admin" → Enter admin/admin123 → Sign In
```

**Worker Login Flow:**
```
Landing Page → Worker Login → Select "Worker" → Enter worker credentials → Sign In
```

---

💡 **Tip**: You can toggle between dark/light mode using the sun/moon icon in the top-right corner!
