# 🚀 Deploy MineGuard to Vercel

## ✅ Prerequisites Created
- ✅ `vercel.json` configuration file added
- ✅ Build scripts already configured in `package.json`

## 📋 Step-by-Step Deployment Guide

### Method 1: Deploy via Vercel CLI (Recommended - Fastest)

#### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

#### Step 2: Login to Vercel
```bash
vercel login
```
This will open your browser. Choose your login method (GitHub, GitLab, Email).

#### Step 3: Deploy
```bash
vercel
```
Just press Enter for all prompts to accept defaults, or customize as needed.

#### Step 4: Production Deploy
```bash
vercel --prod
```

---

### Method 2: Deploy via Vercel Website (Easiest for beginners)

#### Step 1: Push to GitHub (if not already)
1. Create a new repository on GitHub
2. Run these commands:
```bash
git init
git add .
git commit -m "Initial commit - MineGuard Coal Safety System"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

#### Step 2: Connect to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up" or "Login" (use GitHub for easiest setup)
3. Click "Add New Project"
4. Import your GitHub repository
5. Vercel will auto-detect it's a Vite project
6. Click "Deploy"

**That's it!** ✅ Your site will be live in ~2 minutes!

---

## 🎯 What Happens Next

After deployment, you'll get:
- 🌐 **Live URL**: `https://your-project-name.vercel.app`
- 🔄 **Auto-deployments**: Every git push = automatic deploy
- 📊 **Analytics**: View site performance
- 🌍 **Global CDN**: Fast loading worldwide
- 🔒 **Free SSL**: HTTPS enabled automatically

---

## 🎨 Custom Domain (Optional)

In Vercel dashboard:
1. Go to your project → Settings → Domains
2. Add your custom domain (e.g., `mineguard.com`)
3. Update DNS settings as instructed
4. Done! ✅

---

## 📝 Important Notes

- **Build Command**: `npm run build` (already configured)
- **Output Directory**: `dist` (Vite default)
- **Node Version**: Vercel will use Node 18.x by default
- **Environment**: All dependencies will be installed automatically

---

## 🧪 Test Before Deploy

Want to test the production build locally first?

```bash
npm run build
npm run preview
```

This will build and serve your app exactly as it will appear on Vercel.

---

## 🆘 Need Help?

If you encounter issues:
1. Check build logs in Vercel dashboard
2. Ensure all dependencies are in `package.json`
3. Run `npm run build` locally to test

---

## 🎉 Demo Credentials for Testing

After deployment, test with these credentials:

**Worker Login:**
- Username: `worker1` | Password: `password123`
- Username: `worker2` | Password: `password123`
- Username: `worker3` | Password: `password123`

**Admin Login:**
- Username: `admin` | Password: `admin123`

---

**Ready to deploy? Run: `npm install -g vercel && vercel`** 🚀
