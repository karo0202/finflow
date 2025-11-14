# 🚀 Deploy FinFlow to Vercel

## Quick Deployment Guide

### Option 1: Deploy via Vercel Dashboard (Easiest)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/finflow.git
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to https://vercel.com
   - Sign up/Login
   - Click "Add New Project"
   - Import your GitHub repository
   - Select the `web` folder as the root directory
   - Vercel will auto-detect Vite settings

3. **Configure Environment Variables**
   - In Vercel project settings → Environment Variables
   - Add all your Firebase and API keys:
     ```
     VITE_FIREBASE_API_KEY
     VITE_FIREBASE_AUTH_DOMAIN
     VITE_FIREBASE_PROJECT_ID
     VITE_FIREBASE_STORAGE_BUCKET
     VITE_FIREBASE_MESSAGING_SENDER_ID
     VITE_FIREBASE_APP_ID
     VITE_FIREBASE_MEASUREMENT_ID
     VITE_STRIPE_PUBLISHABLE_KEY
     VITE_OPENAI_API_KEY
     ```

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your app will be live at `your-project.vercel.app`

---

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Navigate to Web Directory**
   ```bash
   cd web
   ```

4. **Deploy**
   ```bash
   vercel
   ```
   - Follow the prompts
   - Select default settings
   - When asked for environment variables, add them or skip and add later

5. **Add Environment Variables**
   ```bash
   vercel env add VITE_FIREBASE_API_KEY
   vercel env add VITE_FIREBASE_AUTH_DOMAIN
   vercel env add VITE_FIREBASE_PROJECT_ID
   vercel env add VITE_FIREBASE_STORAGE_BUCKET
   vercel env add VITE_FIREBASE_MESSAGING_SENDER_ID
   vercel env add VITE_FIREBASE_APP_ID
   vercel env add VITE_FIREBASE_MEASUREMENT_ID
   vercel env add VITE_STRIPE_PUBLISHABLE_KEY
   vercel env add VITE_OPENAI_API_KEY
   ```

6. **Redeploy with Environment Variables**
   ```bash
   vercel --prod
   ```

---

## 🔧 Configuration Files

### `vercel.json` (Already Created)
This file configures Vercel to:
- Build the Vite app
- Serve the `dist` folder
- Handle client-side routing (SPA)

### Build Settings
Vercel will automatically detect:
- **Framework**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

---

## 📝 Pre-Deployment Checklist

- [ ] Test build locally: `npm run build`
- [ ] Verify `dist` folder is created
- [ ] Check all environment variables are set
- [ ] Test the app locally with production build: `npm run preview`
- [ ] Ensure Firebase project is set up
- [ ] Update Firebase authorized domains (add your Vercel URL)

---

## 🔐 Firebase Configuration

### Add Vercel Domain to Firebase

1. Go to Firebase Console → Authentication → Settings
2. Scroll to "Authorized domains"
3. Add your Vercel domain (e.g., `your-app.vercel.app`)
4. Also add your custom domain if you have one

### Firestore Security Rules

Make sure your Firestore rules allow your app:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /portfolios/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /transactions/{transactionId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
    match /goals/{goalId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
    match /budgets/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /community/{postId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && request.auth.uid == resource.data.userId;
    }
  }
}
```

---

## 🌐 Custom Domain (Optional)

1. **In Vercel Dashboard**
   - Go to your project → Settings → Domains
   - Add your custom domain
   - Follow DNS configuration instructions

2. **Update Firebase**
   - Add custom domain to Firebase authorized domains

---

## 🔄 Continuous Deployment

Vercel automatically deploys when you push to:
- `main` branch → Production
- Other branches → Preview deployments

### Workflow
1. Make changes locally
2. Commit and push to GitHub
3. Vercel automatically builds and deploys
4. Get preview URL for each commit

---

## 📊 Monitoring

### Vercel Analytics
- Enable in project settings
- Track page views, performance
- Monitor errors

### Build Logs
- View in Vercel dashboard
- Check for build errors
- Monitor deployment status

---

## 🐛 Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Verify all dependencies are in `package.json`
- Ensure Node.js version is compatible (Vercel uses Node 18+)

### Environment Variables Not Working
- Make sure variables start with `VITE_`
- Redeploy after adding variables
- Check variable names match exactly

### Routing Issues (404 on refresh)
- `vercel.json` should handle SPA routing
- Verify rewrite rules are correct

### Firebase Errors
- Check authorized domains
- Verify environment variables
- Check Firestore security rules

---

## 🚀 Quick Deploy Script

Create a `deploy.sh` file:

```bash
#!/bin/bash
cd web
npm run build
vercel --prod
```

Or for Windows (`deploy.bat`):
```batch
cd web
npm run build
vercel --prod
```

---

## ✅ Post-Deployment

1. **Test Your Live App**
   - Visit your Vercel URL
   - Test sign up/login
   - Verify data saves to Firestore
   - Check all features work

2. **Set Up Custom Domain** (Optional)
   - Add domain in Vercel
   - Configure DNS
   - Update Firebase authorized domains

3. **Enable Analytics**
   - Vercel Analytics
   - Firebase Analytics
   - Error tracking (Sentry, etc.)

4. **Monitor Performance**
   - Check Vercel dashboard
   - Monitor Firebase usage
   - Track errors

---

## 📱 Mobile App Deployment

The mobile app (React Native) needs separate deployment:
- **iOS**: App Store via Expo/EAS
- **Android**: Google Play via Expo/EAS

See `DEPLOYMENT.md` for mobile app deployment instructions.

---

## 🎉 You're Live!

Once deployed, your app will be available at:
- **Production**: `https://your-project.vercel.app`
- **Preview**: `https://your-project-git-branch.vercel.app`

Share your app URL and start onboarding users! 🚀

