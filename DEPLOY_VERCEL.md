# 🚀 Deploy to Vercel - Quick Guide

## Prerequisites
- Vercel account (sign up at https://vercel.com)
- GitHub account (for easiest deployment)
- Firebase project set up

## Step-by-Step Deployment

### 1. Install Vercel CLI (Optional)
```bash
npm install -g vercel
```

### 2. Login to Vercel
```bash
vercel login
```

### 3. Navigate to Web Directory
```bash
cd web
```

### 4. Deploy
```bash
vercel
```

Follow the prompts:
- Set up and deploy? **Yes**
- Which scope? **Your account**
- Link to existing project? **No** (first time)
- Project name? **finflow** (or your choice)
- Directory? **./** (current directory)
- Override settings? **No**

### 5. Add Environment Variables

After first deployment, add your environment variables:

```bash
vercel env add VITE_FIREBASE_API_KEY
vercel env add VITE_FIREBASE_AUTH_DOMAIN
vercel env add VITE_FIREBASE_PROJECT_ID
vercel env add VITE_FIREBASE_STORAGE_BUCKET
vercel env add VITE_FIREBASE_MESSAGING_SENDER_ID
vercel env add VITE_FIREBASE_APP_ID
vercel env add VITE_FIREBASE_MEASUREMENT_ID
```

For each variable, enter the value when prompted.

### 6. Deploy to Production
```bash
vercel --prod
```

## ✅ Done!

Your app is now live at: `https://your-project.vercel.app`

## 🔄 Continuous Deployment

Every time you push to GitHub:
- Vercel automatically builds and deploys
- Preview URLs for each branch/PR
- Production deploys from `main` branch

## 📝 Important Notes

1. **Firebase Configuration**
   - Add your Vercel domain to Firebase authorized domains
   - Firebase Console → Authentication → Settings → Authorized domains

2. **Environment Variables**
   - Must start with `VITE_` to be accessible in the app
   - Add them in Vercel dashboard or via CLI

3. **Custom Domain** (Optional)
   - Add in Vercel project settings
   - Update Firebase authorized domains

## 🐛 Troubleshooting

- **Build fails?** Check build logs in Vercel dashboard
- **Environment variables not working?** Make sure they start with `VITE_`
- **404 on refresh?** The `vercel.json` file handles SPA routing

See `VERCEL_DEPLOYMENT.md` for detailed instructions.

