import { loadStripe } from '@stripe/stripe-js'

// TODO: Replace with your Stripe publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_your_key_here')

export default stripePromise

