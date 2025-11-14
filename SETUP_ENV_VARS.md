# ⚡ Quick Setup: Environment Variables

## 🎯 What You Need

### Required (Firebase)
- Firebase project created
- Authentication enabled
- Firestore database created
- Config values copied

### Optional
- Stripe account (for payments)
- OpenAI API key (for AI chat - has fallback)

---

## 🚀 Quick Setup Steps

### 1. Create Firebase Project (5 minutes)

1. Go to https://console.firebase.google.com/
2. Click "Add Project"
3. Name: `finflow`
4. Enable Google Analytics (optional)
5. Create project

### 2. Enable Services (2 minutes)

**Authentication:**
- Firebase Console → Authentication → Get Started
- Enable "Email/Password"
- (Optional) Enable "Google"

**Firestore:**
- Firebase Console → Firestore Database → Create Database
- Start in **Test Mode**
- Choose location

### 3. Get Config Values (1 minute)

- Firebase Console → ⚙️ Settings → Project Settings
- Scroll to "Your apps"
- Click Web icon (`</>`)
- App name: `FinFlow Web`
- **Copy the config object**

### 4. Create `.env` File (1 minute)

```bash
cd web
# Create .env file (copy from .env.example)
```

Paste your Firebase values:
```env
VITE_FIREBASE_API_KEY=AIza... (from config)
VITE_FIREBASE_AUTH_DOMAIN=project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=project-id
VITE_FIREBASE_STORAGE_BUCKET=project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123:web:abc
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXX
```

### 5. Test Locally

```bash
cd web
npm run dev
```

Try signing up - it should work!

### 6. Add to Vercel (for deployment)

1. Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add each `VITE_*` variable
3. Set for: Production, Preview, Development
4. Redeploy

---

## ✅ Verification

- [ ] Can sign up with email
- [ ] Can login
- [ ] Data saves to Firestore
- [ ] No console errors

---

## 📝 Example .env File

See `web/.env.example` for the template.

---

## 🆘 Need Help?

See `ENVIRONMENT_VARIABLES.md` for detailed instructions.

