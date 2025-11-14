# 🚀 Preview Your FinFlow App

## Web App Preview

The development server should be starting! Here's how to access it:

### 1. **Check the Terminal**
Look for output like:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### 2. **Open in Browser**
- Open your browser
- Go to: **http://localhost:5173**
- The app should load!

### 3. **If Server Didn't Start**
Run manually:
```bash
cd web
npm run dev
```

---

## ⚠️ Important: Firebase Setup

**Before you can use the app fully, you need to:**

1. **Create a Firebase Project**
   - Go to https://console.firebase.google.com/
   - Click "Add Project"
   - Follow the setup wizard

2. **Enable Authentication**
   - In Firebase Console → Authentication
   - Click "Get Started"
   - Enable "Email/Password" provider
   - (Optional) Enable "Google" provider

3. **Create Firestore Database**
   - In Firebase Console → Firestore Database
   - Click "Create Database"
   - Start in **Test Mode** (for development)
   - Choose a location

4. **Get Your Config**
   - Firebase Console → Project Settings → General
   - Scroll to "Your apps"
   - Click the web icon (</>)
   - Copy the config values

5. **Update Environment Variables**
   - Create `web/.env` file (if not exists)
   - Add your Firebase config:
   ```env
   VITE_FIREBASE_API_KEY=your-actual-key
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   VITE_FIREBASE_APP_ID=your-app-id
   VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

6. **Restart Dev Server**
   - Stop the server (Ctrl+C)
   - Run `npm run dev` again

---

## 📱 Mobile App Preview

### Option 1: Expo Go (Easiest)

1. **Install Expo Go**
   - iOS: App Store
   - Android: Google Play Store

2. **Start Expo**
   ```bash
   cd mobile
   npm install
   npx expo start
   ```

3. **Scan QR Code**
   - Open Expo Go app
   - Scan the QR code from terminal
   - App loads on your phone!

### Option 2: Web Preview
```bash
cd mobile
npx expo start --web
```

### Option 3: Simulator/Emulator
```bash
# iOS Simulator (Mac only)
npx expo start --ios

# Android Emulator
npx expo start --android
```

---

## 🎯 What You Can Test

### Without Firebase (Limited)
- ✅ View landing page
- ✅ See UI/UX design
- ✅ Navigate between pages
- ❌ Can't sign up/login
- ❌ Can't save data

### With Firebase (Full Functionality)
- ✅ Sign up / Login
- ✅ Add portfolio holdings
- ✅ Create goals
- ✅ Add transactions
- ✅ Post to community
- ✅ Chat with AI (or fallback)

---

## 🔧 Troubleshooting

### Port Already in Use
If port 5173 is busy:
```bash
# Kill process on port 5173 (Windows)
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Or use different port
npm run dev -- --port 3000
```

### Firebase Errors
- Make sure `.env` file exists in `web/` folder
- Check Firebase config values are correct
- Verify Firestore is enabled
- Check Authentication is enabled

### Build Errors
```bash
# Clear cache and reinstall
cd web
rm -rf node_modules package-lock.json
npm install
```

---

## 📝 Quick Test Checklist

Once Firebase is set up:

- [ ] Sign up with email
- [ ] Add a portfolio holding
- [ ] Create a financial goal
- [ ] Add a transaction
- [ ] Post to community
- [ ] Try AI chat
- [ ] Check dashboard updates

---

## 🎉 You're Ready!

The app is running and ready to preview. Just set up Firebase for full functionality!

**Current Status:**
- ✅ Web app server starting
- ⚠️ Need Firebase config for full features
- ✅ UI/UX fully functional
- ✅ All pages accessible

Enjoy exploring FinFlow! 🚀

