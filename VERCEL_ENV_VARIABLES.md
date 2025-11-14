# 🔐 How to Add Environment Variables in Vercel

## Step-by-Step Guide

### Step 1: Access Your Vercel Project

1. Go to **https://vercel.com**
2. **Sign in** to your account
3. Click on your **FinFlow project** (or the project name you used)

### Step 2: Navigate to Settings

1. In your project dashboard, look at the **top navigation bar**
2. Click on **"Settings"** tab (it's next to "Deployments", "Analytics", etc.)
3. If you don't see Settings, make sure you're the project owner/admin

### Step 3: Find Environment Variables

1. In the **Settings** page, look at the **left sidebar menu**
2. Scroll down and click on **"Environment Variables"**
3. It should be under the "General" section

### Step 4: Add Variables

1. You'll see a form with:
   - **Key** field
   - **Value** field
   - **Environment** checkboxes (Production, Preview, Development)

2. For each variable, click **"Add New"** or the **"+"** button

3. Fill in:
   - **Key**: `VITE_FIREBASE_API_KEY`
   - **Value**: Your actual Firebase API key
   - **Environment**: Check all three (Production, Preview, Development)

4. Click **"Save"**

5. Repeat for all variables:

```
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
VITE_FIREBASE_MEASUREMENT_ID
VITE_STRIPE_PUBLISHABLE_KEY (optional)
VITE_OPENAI_API_KEY (optional)
```

### Step 5: Redeploy

After adding variables:
1. Go to **"Deployments"** tab
2. Click the **"..."** (three dots) on your latest deployment
3. Click **"Redeploy"**
4. Or push a new commit to trigger automatic redeploy

---

## 🎯 Visual Guide

```
Vercel Dashboard
  └── Your Project
      └── Settings (top nav bar)
          └── Environment Variables (left sidebar)
              └── Add New
                  ├── Key: VITE_FIREBASE_API_KEY
                  ├── Value: [your value]
                  └── Environment: ☑ Production ☑ Preview ☑ Development
```

---

## 🔍 If You Can't Find Settings

### Option 1: Check Project Access
- Make sure you're the **project owner** or have **admin access**
- If it's a team project, you might need permissions

### Option 2: Direct URL
Try going directly to:
```
https://vercel.com/[your-username]/[project-name]/settings/environment-variables
```

### Option 3: Via Project Overview
1. Click on your project name
2. Look for a **gear icon** (⚙️) or **"Settings"** link
3. Click it to go to Settings

---

## 📝 Quick Checklist

- [ ] Logged into Vercel
- [ ] Selected your project
- [ ] Clicked "Settings" tab
- [ ] Found "Environment Variables" in left sidebar
- [ ] Added all Firebase variables
- [ ] Set for all environments (Production, Preview, Development)
- [ ] Redeployed the project

---

## 🆘 Still Can't Find It?

### Alternative: Use Vercel CLI

If you can't find it in the dashboard, use the command line:

```bash
# Install Vercel CLI (if not installed)
npm install -g vercel

# Login
vercel login

# Navigate to web directory
cd web

# Add environment variables one by one
vercel env add VITE_FIREBASE_API_KEY
# Enter value when prompted
# Select environments: Production, Preview, Development

# Repeat for each variable
vercel env add VITE_FIREBASE_AUTH_DOMAIN
vercel env add VITE_FIREBASE_PROJECT_ID
vercel env add VITE_FIREBASE_STORAGE_BUCKET
vercel env add VITE_FIREBASE_MESSAGING_SENDER_ID
vercel env add VITE_FIREBASE_APP_ID
vercel env add VITE_FIREBASE_MEASUREMENT_ID

# Redeploy
vercel --prod
```

---

## ✅ Verify Variables Are Added

1. Go to Settings → Environment Variables
2. You should see a list of all your variables
3. They should show as "Encrypted" (values are hidden for security)

---

## 🎯 What Each Variable Needs

### Firebase Variables (Required)
Get these from: https://console.firebase.google.com/
- Project Settings → Your apps → Web app config

### Optional Variables
- **Stripe**: https://dashboard.stripe.com/apikeys
- **OpenAI**: https://platform.openai.com/api-keys

---

## 💡 Pro Tip

After adding variables, **always redeploy** for them to take effect. Vercel doesn't automatically apply new environment variables to existing deployments.

---

Need more help? Check the Vercel docs: https://vercel.com/docs/concepts/projects/environment-variables

