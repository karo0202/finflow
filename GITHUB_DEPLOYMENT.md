# 📦 Deploy FinFlow to GitHub

## Step-by-Step Guide

### 1. Initialize Git Repository

```bash
git init
git add .
git commit -m "Initial commit: FinFlow finance app"
```

### 2. Create GitHub Repository

1. Go to https://github.com
2. Click the **+** icon → **New repository**
3. Repository name: `finflow` (or your choice)
4. Description: "AI-Powered Personal Finance Coach"
5. Choose **Public** or **Private**
6. **DO NOT** initialize with README, .gitignore, or license (we already have these)
7. Click **Create repository**

### 3. Connect and Push to GitHub

After creating the repository, GitHub will show you commands. Use these:

```bash
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/finflow.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

### 4. Verify Upload

- Go to your GitHub repository
- You should see all your files
- Check that `.env` files are NOT uploaded (they're in .gitignore)

---

## 🔐 Important: Environment Variables

**NEVER commit `.env` files to GitHub!**

They're already in `.gitignore`, but double-check:
- ✅ `.env` is in `.gitignore`
- ✅ No `.env` files are in the repository
- ✅ Share `.env.example` instead (already created)

---

## 📝 Next Steps After GitHub

### Option 1: Deploy to Vercel from GitHub

1. Go to https://vercel.com
2. Click "Add New Project"
3. Import from GitHub
4. Select your `finflow` repository
5. Set Root Directory to `web`
6. Add environment variables
7. Deploy!

### Option 2: Clone on Another Machine

```bash
git clone https://github.com/YOUR_USERNAME/finflow.git
cd finflow/web
npm install
npm run dev
```

---

## 🔄 Making Updates

After making changes:

```bash
git add .
git commit -m "Description of changes"
git push
```

Vercel will automatically redeploy if connected!

---

## 📋 Repository Structure

Your GitHub repo will have:
```
finflow/
├── web/              # React web app
├── mobile/           # React Native app
├── docs/             # Documentation
├── .gitignore        # Git ignore rules
├── README.md         # Project readme
└── ...               # Other files
```

---

## ✅ Checklist

- [ ] Git repository initialized
- [ ] All files committed
- [ ] GitHub repository created
- [ ] Code pushed to GitHub
- [ ] `.env` files NOT in repository
- [ ] README.md looks good
- [ ] Ready to deploy to Vercel!

---

## 🎉 You're Done!

Your code is now on GitHub and ready for:
- ✅ Deployment to Vercel
- ✅ Collaboration with others
- ✅ Version control
- ✅ CI/CD pipelines

