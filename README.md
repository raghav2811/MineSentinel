# MineSentinel

Local development scaffolded with Vite + React + Tailwind.

## 🚀 Quick Start

### Run locally (Windows CMD)

1. Install dependencies

```cmd
npm install
```

2. Start dev server

```cmd
npm run dev
```

3. Open the Vite URL printed in the terminal (e.g., http://localhost:5173)

## 🔐 Login Feature

The application now includes a **complete authentication system** with role-based access:

### Demo Credentials

**Admin Access:**
- Username: `admin`
- Password: `admin123`

**Worker Access:**
- Worker 1: `worker1` / `worker123` (Rajesh Patel - A1 Sector)
- Worker 2: `worker2` / `worker123` (Suresh Kumar - A2 Sector)
- Worker 3: `worker3` / `worker123` (Luis Gomez - B1 Sector)

### Features
- **Worker Dashboard**: View attendance %, days worked (e.g., 27/30), credit points with deduction reasons, and personal details
- **PPE Wearables Monitoring**: Real-time tracking of:
  - 🪖 Safety helmet with lamp (battery level, status)
  - 🦺 High-visibility vest (condition, reflectivity)
  - ❤️ Health monitor (heart rate, SpO2 levels)
  - 📇 RFID attendance badge (location, scan time)
  - 👤 Facial recognition (verification, confidence level)
- **Admin Dashboard**: Manage all workers, view analytics, and monitor compliance
- **Persistent login** via localStorage
- **Dark/Light mode** throughout the app

## Notes

- The demo dataset is stored in localStorage under the key `mineguard_demo`.
- The demo contains workers and sample alerts so the Dashboard section can read realistic values.
- Helmet-lift easter egg: when you scroll to the bottom of the page, the miner's helmet tilts and the miner smiles.

## Deploy

- Build: `npm run build`
- Preview build locally: `npm run preview`

## Troubleshooting

If Tailwind utilities don't appear, ensure `postcss` and `tailwindcss` are installed (they are included in devDependencies). If you change styles, restart Vite.
"# MineSentinel" 
