# FinFlow - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Prerequisites
- Node.js 18+ installed
- npm or yarn
- Firebase account (free tier works)
- Expo CLI (for mobile): `npm install -g expo-cli`

---

## Step 1: Clone & Install

```bash
# Install dependencies for web
cd web
npm install

# Install dependencies for mobile
cd ../mobile
npm install
```

---

## Step 2: Configure Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Authentication (Email/Password, Google)
4. Create Firestore database
5. Copy your config

### Update Web Config
Edit `web/src/config/firebase.js`:
```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  // ... rest of config
}
```

### Update Mobile Config
Edit `mobile/src/config/firebase.js` with the same config.

---

## Step 3: Set Environment Variables (Web)

Create `web/.env`:
```env
VITE_FIREBASE_API_KEY=your-key
VITE_FIREBASE_AUTH_DOMAIN=your-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_FIREBASE_MEASUREMENT_ID=your-measurement-id
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_key
VITE_OPENAI_API_KEY=sk-your-key
```

---

## Step 4: Run Web App

```bash
cd web
npm run dev
```

Open http://localhost:5173

---

## Step 5: Run Mobile App

```bash
cd mobile
npx expo start
```

Scan QR code with Expo Go app (iOS/Android)

---

## 🎯 First Steps

1. **Sign Up**: Create an account
2. **Explore Dashboard**: See your financial overview
3. **Add Portfolio**: Add your first investment
4. **Set a Goal**: Create a savings goal
5. **Try AI Coach**: Ask a finance question
6. **Browse Learning**: Start a lesson
7. **Join Community**: Check out discussions

---

## 🔧 Common Issues

### Firebase Auth Not Working
- Check Firebase config is correct
- Ensure Authentication is enabled
- Verify email domain is authorized

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Mobile App Not Starting
```bash
# Clear Expo cache
npx expo start -c
```

---

## 📚 Next Steps

1. **Customize**: Update branding, colors, content
2. **Add Data**: Connect real APIs for market data
3. **Test**: Test all features thoroughly
4. **Deploy**: Follow DEPLOYMENT.md guide

---

## 💡 Tips

- Start with web app for easier debugging
- Use Firebase Emulator for local development
- Test on real devices for mobile
- Set up error tracking (Sentry) early

---

## 🆘 Need Help?

- Check DEPLOYMENT.md for detailed setup
- See ARCHITECTURE.md for system overview
- Review code comments for implementation details

---

**Happy coding! 🎉**

