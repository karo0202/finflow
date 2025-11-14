# 🔐 Environment Variables Guide

## Required Environment Variables

### Firebase Configuration (Required)

These are **essential** for the app to work:

```env
VITE_FIREBASE_API_KEY=your-api-key-here
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=your-app-id
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Optional Environment Variables

```env
# Stripe (for payments)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here

# OpenAI (for AI chat - has fallback if not set)
VITE_OPENAI_API_KEY=sk-your-api-key-here
```

---

## 📍 Where to Add Environment Variables

### 1. Local Development (`web/.env`)

Create a `.env` file in the `web/` directory:

```bash
cd web
# Create .env file
# Copy the template below and fill in your values
```

**Important**: `.env` files are in `.gitignore` and won't be committed to GitHub.

### 2. Vercel Deployment

Add environment variables in Vercel dashboard:

1. Go to your Vercel project
2. Settings → Environment Variables
3. Add each variable:
   - **Key**: `VITE_FIREBASE_API_KEY`
   - **Value**: Your actual API key
   - **Environment**: Production, Preview, Development (select all)
4. Repeat for all variables
5. Redeploy after adding

Or via CLI:
```bash
vercel env add VITE_FIREBASE_API_KEY
# Enter value when prompted
```

---

## 🔥 How to Get Firebase Config

### Step 1: Create Firebase Project

1. Go to https://console.firebase.google.com/
2. Click "Add Project"
3. Enter project name: `finflow` (or your choice)
4. Follow setup wizard
5. Enable Google Analytics (optional)

### Step 2: Enable Authentication

1. In Firebase Console → **Authentication**
2. Click "Get Started"
3. Enable **Email/Password** provider
4. (Optional) Enable **Google** provider

### Step 3: Create Firestore Database

1. In Firebase Console → **Firestore Database**
2. Click "Create Database"
3. Start in **Test Mode** (for development)
4. Choose a location (closest to your users)

### Step 4: Get Your Config

1. Firebase Console → **Project Settings** (gear icon)
2. Scroll to "Your apps"
3. Click the **Web icon** (`</>`)
4. Register app name: `FinFlow Web`
5. Copy the config values:

```javascript
const firebaseConfig = {
  apiKey: "AIza...",                    // → VITE_FIREBASE_API_KEY
  authDomain: "project.firebaseapp.com", // → VITE_FIREBASE_AUTH_DOMAIN
  projectId: "project-id",              // → VITE_FIREBASE_PROJECT_ID
  storageBucket: "project.appspot.com",  // → VITE_FIREBASE_STORAGE_BUCKET
  messagingSenderId: "123456789",        // → VITE_FIREBASE_MESSAGING_SENDER_ID
  appId: "1:123456789:web:abc123",      // → VITE_FIREBASE_APP_ID
  measurementId: "G-XXXXXXXXXX"         // → VITE_FIREBASE_MEASUREMENT_ID
};
```

### Step 5: Add to Environment Variables

Copy each value to your `.env` file or Vercel.

---

## 💳 Stripe Configuration (Optional)

### Get Stripe Keys

1. Go to https://dashboard.stripe.com/
2. Sign up/Login
3. Go to **Developers** → **API keys**
4. Copy **Publishable key** (starts with `pk_`)
5. Add to `VITE_STRIPE_PUBLISHABLE_KEY`

**Note**: Use test keys for development, live keys for production.

---

## 🤖 OpenAI Configuration (Optional)

### Get OpenAI API Key

1. Go to https://platform.openai.com/
2. Sign up/Login
3. Go to **API keys**
4. Click "Create new secret key"
5. Copy the key (starts with `sk-`)
6. Add to `VITE_OPENAI_API_KEY`

**Note**: The app has intelligent fallback responses if OpenAI key is not set.

---

## 📝 Environment Variable Template

Create `web/.env` file with this template:

```env
# ============================================
# Firebase Configuration (REQUIRED)
# ============================================
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=

# ============================================
# Stripe Configuration (Optional)
# ============================================
VITE_STRIPE_PUBLISHABLE_KEY=

# ============================================
# OpenAI Configuration (Optional)
# ============================================
VITE_OPENAI_API_KEY=
```

---

## ✅ Verification Checklist

### Local Development
- [ ] `.env` file created in `web/` directory
- [ ] All Firebase variables filled in
- [ ] App runs without errors: `npm run dev`
- [ ] Can sign up/login
- [ ] Data saves to Firestore

### Vercel Deployment
- [ ] All environment variables added in Vercel
- [ ] Variables set for Production, Preview, Development
- [ ] Redeployed after adding variables
- [ ] App works on live URL
- [ ] Firebase authorized domains updated

---

## 🔒 Security Best Practices

1. **Never commit `.env` files**
   - ✅ Already in `.gitignore`
   - ✅ Use `.env.example` for templates

2. **Use different keys for dev/prod**
   - Development: Test Firebase project
   - Production: Production Firebase project

3. **Rotate keys if exposed**
   - Generate new keys in Firebase/Stripe/OpenAI
   - Update all environments

4. **Limit API key permissions**
   - Only grant necessary permissions
   - Use test keys for development

---

## 🐛 Troubleshooting

### "Firebase: Error (auth/api-key-not-valid)"
- Check `VITE_FIREBASE_API_KEY` is correct
- Verify Firebase project is active
- Check authorized domains in Firebase

### "Environment variable not found"
- Make sure variable starts with `VITE_`
- Restart dev server after adding variables
- Check variable name matches exactly

### "Firestore permission denied"
- Check Firestore security rules
- Verify user is authenticated
- Check rules allow your operations

### Variables not working in Vercel
- Make sure variables start with `VITE_`
- Redeploy after adding variables
- Check variable names match exactly (case-sensitive)

---

## 📚 Additional Resources

- [Firebase Setup Guide](https://firebase.google.com/docs/web/setup)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Stripe API Keys](https://stripe.com/docs/keys)
- [OpenAI API Keys](https://platform.openai.com/api-keys)

---

## 🎯 Quick Setup Commands

### Create Local .env File
```bash
cd web
cp .env.example .env
# Then edit .env and add your values
```

### Add to Vercel (CLI)
```bash
cd web
vercel env add VITE_FIREBASE_API_KEY
vercel env add VITE_FIREBASE_AUTH_DOMAIN
vercel env add VITE_FIREBASE_PROJECT_ID
vercel env add VITE_FIREBASE_STORAGE_BUCKET
vercel env add VITE_FIREBASE_MESSAGING_SENDER_ID
vercel env add VITE_FIREBASE_APP_ID
vercel env add VITE_FIREBASE_MEASUREMENT_ID
```

---

**Remember**: Environment variables starting with `VITE_` are exposed to the browser. Never put sensitive secrets there - use a backend API for those!

