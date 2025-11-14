# 🚀 Push FinFlow to GitHub - Quick Steps

## ✅ Step 1: Create GitHub Repository

1. Go to **https://github.com**
2. Click the **+** icon (top right) → **New repository**
3. Fill in:
   - **Repository name**: `finflow` (or your choice)
   - **Description**: "AI-Powered Personal Finance Coach - React + React Native"
   - **Visibility**: Choose **Public** or **Private**
   - **⚠️ IMPORTANT**: Do NOT check:
     - ❌ Add a README file
     - ❌ Add .gitignore
     - ❌ Choose a license
   - (We already have these files!)
4. Click **Create repository**

---

## ✅ Step 2: Connect and Push

After creating the repository, GitHub will show you commands. Run these in your terminal:

### Option A: HTTPS (Easier)

```bash
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/finflow.git
git push -u origin main
```

**Replace `YOUR_USERNAME` with your GitHub username!**

### Option B: SSH (If you have SSH keys set up)

```bash
git branch -M main
git remote add origin git@github.com:YOUR_USERNAME/finflow.git
git push -u origin main
```

---

## 🔐 Authentication

If prompted for credentials:
- **Username**: Your GitHub username
- **Password**: Use a **Personal Access Token** (not your GitHub password)
  - Get token: GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
  - Generate new token with `repo` permissions

---

## ✅ Step 3: Verify

1. Go to your GitHub repository
2. You should see all your files
3. Check that:
   - ✅ All files are there
   - ✅ `.env` files are NOT visible (they're in .gitignore)
   - ✅ README.md is visible

---

## 🎉 Done!

Your code is now on GitHub! Next steps:

1. **Deploy to Vercel**: Import from GitHub
2. **Share with team**: Give them the repo URL
3. **Make updates**: `git add .`, `git commit -m "message"`, `git push`

---

## 📝 Quick Commands Reference

```bash
# Check status
git status

# Add changes
git add .

# Commit
git commit -m "Your commit message"

# Push to GitHub
git push

# Pull latest changes
git pull
```

---

## 🆘 Troubleshooting

### "Repository not found"
- Check the repository name is correct
- Verify you have access to the repository

### "Authentication failed"
- Use Personal Access Token instead of password
- Or set up SSH keys

### "Branch name mismatch"
- Run: `git branch -M main` (if on master branch)

---

**Your repository will be at**: `https://github.com/YOUR_USERNAME/finflow`

