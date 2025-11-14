# 🔐 Environment Variables Setup

## Quick Start

### 1. Create `.env` file in `web/` directory

```bash
cd web
# Create .env file
```

### 2. Add your Firebase config

```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=your-app-id
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

### 3. Get Firebase Config

1. Go to https://console.firebase.google.com/
2. Create/Select project
3. Enable Authentication (Email/Password)
4. Create Firestore Database
5. Project Settings → Your apps → Web icon
6. Copy config values

### 4. Restart dev server

```bash
npm run dev
```

---

## For Vercel Deployment

Add the same variables in:
- Vercel Dashboard → Settings → Environment Variables
- Or use: `vercel env add VITE_FIREBASE_API_KEY`

---

See `ENVIRONMENT_VARIABLES.md` for detailed guide.

