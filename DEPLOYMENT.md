# FinFlow Deployment Guide

## 🚀 Deployment Instructions

### Prerequisites
- Node.js 18+ installed
- Firebase account and project
- Stripe account (for payments)
- OpenAI API key (for AI features)
- Expo account (for mobile app)

---

## 📱 Mobile App Deployment (React Native + Expo)

### 1. Setup Expo
```bash
cd mobile
npm install
npx expo install --fix
```

### 2. Configure Environment
Update `mobile/src/config/firebase.js` with your Firebase credentials.

### 3. Build for Production

#### Android
```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Configure build
eas build:configure

# Build APK/AAB
eas build --platform android
```

#### iOS
```bash
# Build for iOS (requires Apple Developer account)
eas build --platform ios
```

### 4. Submit to Stores
```bash
# Submit to Google Play
eas submit --platform android

# Submit to App Store
eas submit --platform ios
```

---

## 🌐 Web App Deployment (React + Vite)

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Deploy**
```bash
cd web
vercel
```

3. **Set Environment Variables**
In Vercel dashboard, add:
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
- `VITE_FIREBASE_MEASUREMENT_ID`
- `VITE_STRIPE_PUBLISHABLE_KEY`
- `VITE_OPENAI_API_KEY`

### Option 2: Firebase Hosting

1. **Install Firebase CLI**
```bash
npm install -g firebase-tools
```

2. **Login and Initialize**
```bash
firebase login
cd web
firebase init hosting
```

3. **Build and Deploy**
```bash
npm run build
firebase deploy
```

---

## 🔥 Firebase Setup

### 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Authentication (Email/Password, Google)
4. Create Firestore database
5. Enable Analytics

### 2. Firestore Rules
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
    match /transactions/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /goals/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /community/{postId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && request.auth.uid == resource.data.authorId;
    }
  }
}
```

### 3. Firebase Functions (Optional - for Stripe webhooks)
```bash
firebase init functions
```

---

## 💳 Stripe Setup

### 1. Create Products
1. Go to Stripe Dashboard → Products
2. Create products:
   - Premium Monthly: $12.99/month
   - Lifetime: $249 one-time

### 2. Webhook Setup
1. Go to Stripe Dashboard → Webhooks
2. Add endpoint: `https://your-domain.com/api/stripe-webhook`
3. Select events:
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `payment_intent.succeeded`

### 3. Backend Integration
Create a backend API (Node.js/Express) to handle:
- Creating payment intents
- Managing subscriptions
- Webhook handling
- Updating user subscription status in Firestore

---

## 🤖 OpenAI Setup

### 1. Get API Key
1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Create API key
3. Add to environment variables

### 2. Backend Proxy (Recommended)
For security, create a backend API that proxies OpenAI requests:
```javascript
// Example: /api/ai-chat endpoint
app.post('/api/ai-chat', async (req, res) => {
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: req.body.messages,
  })
  res.json({ message: response.choices[0].message.content })
})
```

---

## 📊 Analytics Setup

### Firebase Analytics
Already configured in the app. Ensure:
- Firebase project has Analytics enabled
- Measurement ID is in environment variables

### Google Analytics (Optional)
1. Create Google Analytics property
2. Add tracking ID to environment variables

---

## 🔐 Security Checklist

- [ ] Environment variables are not committed to git
- [ ] Firebase security rules are configured
- [ ] API keys are stored securely
- [ ] HTTPS is enabled for all deployments
- [ ] CORS is configured correctly
- [ ] Rate limiting is implemented for APIs
- [ ] User data is encrypted at rest
- [ ] Stripe webhooks are verified

---

## 🧪 Testing Before Deployment

### Web App
```bash
cd web
npm run build
npm run preview
```

### Mobile App
```bash
cd mobile
npx expo start
# Test on iOS simulator and Android emulator
```

---

## 📈 Post-Deployment

1. **Monitor Errors**: Set up error tracking (Sentry, LogRocket)
2. **Analytics**: Verify Firebase Analytics is working
3. **Performance**: Monitor app performance
4. **User Feedback**: Set up feedback collection
5. **Updates**: Plan for regular updates and feature releases

---

## 🆘 Troubleshooting

### Common Issues

**Firebase Auth not working**
- Check Firebase config in environment variables
- Verify Authentication is enabled in Firebase Console
- Check domain is authorized in Firebase

**Stripe payments failing**
- Verify Stripe keys are correct
- Check webhook endpoint is accessible
- Verify subscription products exist in Stripe

**OpenAI API errors**
- Check API key is valid
- Verify rate limits aren't exceeded
- Ensure backend proxy is working (if used)

**Build failures**
- Clear node_modules and reinstall
- Check Node.js version compatibility
- Verify all environment variables are set

---

## 📝 Next Steps

1. Set up CI/CD pipeline
2. Implement automated testing
3. Add monitoring and alerting
4. Create user onboarding flow
5. Plan marketing and growth strategy

