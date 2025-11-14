# 🚀 Add Environment Variables via Vercel CLI

If you can't find the Settings in Vercel dashboard, use the CLI method!

## Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

## Step 2: Login to Vercel

```bash
vercel login
```

Follow the prompts to authenticate.

## Step 3: Navigate to Web Directory

```bash
cd web
```

## Step 4: Add Environment Variables

Run these commands one by one. You'll be prompted to enter the value:

```bash
# Firebase - Required
vercel env add VITE_FIREBASE_API_KEY
vercel env add VITE_FIREBASE_AUTH_DOMAIN
vercel env add VITE_FIREBASE_PROJECT_ID
vercel env add VITE_FIREBASE_STORAGE_BUCKET
vercel env add VITE_FIREBASE_MESSAGING_SENDER_ID
vercel env add VITE_FIREBASE_APP_ID
vercel env add VITE_FIREBASE_MEASUREMENT_ID

# Optional
vercel env add VITE_STRIPE_PUBLISHABLE_KEY
vercel env add VITE_OPENAI_API_KEY
```

For each command:
1. Enter the value when prompted
2. Select environments: **Production**, **Preview**, **Development** (select all)

## Step 5: Redeploy

```bash
vercel --prod
```

## ✅ Done!

Your environment variables are now set and the app is redeployed!

---

## 📋 Quick Copy-Paste Commands

Copy and paste this entire block (one at a time):

```bash
vercel env add VITE_FIREBASE_API_KEY
vercel env add VITE_FIREBASE_AUTH_DOMAIN
vercel env add VITE_FIREBASE_PROJECT_ID
vercel env add VITE_FIREBASE_STORAGE_BUCKET
vercel env add VITE_FIREBASE_MESSAGING_SENDER_ID
vercel env add VITE_FIREBASE_APP_ID
vercel env add VITE_FIREBASE_MEASUREMENT_ID
```

---

## 🔍 Verify Variables

List all environment variables:
```bash
vercel env ls
```

---

## 🗑️ Remove a Variable

```bash
vercel env rm VITE_FIREBASE_API_KEY
```

---

This method works even if you can't access the dashboard Settings!

