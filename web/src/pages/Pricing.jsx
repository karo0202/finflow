import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Check, Zap, Crown, Sparkles } from 'lucide-react'
import { Elements } from '@stripe/react-stripe-js'
import stripePromise from '../config/stripe'
import CheckoutForm from '../components/CheckoutForm'

const plans = [
  {
    name: 'Free',
    price: 0,
    period: 'forever',
    description: 'Perfect for getting started',
    features: [
      'Basic portfolio tracking',
      '3 AI conversations per week',
      'Access to beginner lessons',
      'Community forum access',
      'Basic goal tracking',
    ],
    icon: Zap,
    color: 'gray',
    popular: false,
  },
  {
    name: 'Premium',
    price: 12.99,
    period: 'month',
    description: 'For serious investors',
    features: [
      'Everything in Free',
      'Unlimited AI conversations',
      'Advanced analytics & insights',
      'Full learning library access',
      'Priority community support',
      'Advanced goal tracking',
      'Portfolio optimization suggestions',
      'Export reports',
    ],
    icon: Sparkles,
    color: 'primary',
    popular: true,
  },
  {
    name: 'Lifetime',
    price: 249,
    period: 'one-time',
    description: 'Best value for long-term users',
    features: [
      'Everything in Premium',
      'Lifetime access',
      'All future features included',
      'Priority customer support',
      'Early access to new features',
      'Custom AI coach training',
    ],
    icon: Crown,
    color: 'accent',
    popular: false,
  },
]

export default function Pricing() {
  const { user, userData } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Start free, upgrade when you're ready
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => {
            const Icon = plan.icon
            const isCurrentPlan = userData?.subscription === plan.name.toLowerCase()
            const isFree = plan.name === 'Free'

            return (
              <div
                key={plan.name}
                className={`card relative ${
                  plan.popular ? 'ring-2 ring-primary-600 scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <div
                    className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                      plan.color === 'primary'
                        ? 'bg-primary-100 dark:bg-primary-900'
                        : plan.color === 'accent'
                        ? 'bg-accent-100 dark:bg-accent-900'
                        : 'bg-gray-100 dark:bg-gray-700'
                    }`}
                  >
                    <Icon
                      className={
                        plan.color === 'primary'
                          ? 'text-primary-600 dark:text-primary-400'
                          : plan.color === 'accent'
                          ? 'text-accent-600 dark:text-accent-400'
                          : 'text-gray-600 dark:text-gray-400'
                      }
                      size={32}
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {plan.description}
                  </p>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">
                      ${plan.price}
                    </span>
                    {plan.price > 0 && (
                      <span className="text-gray-600 dark:text-gray-400">
                        /{plan.period === 'one-time' ? '' : plan.period}
                      </span>
                    )}
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <Check
                        className="text-green-600 flex-shrink-0 mt-0.5"
                        size={20}
                      />
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                {isCurrentPlan ? (
                  <button
                    disabled
                    className="w-full py-3 px-4 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-lg font-semibold cursor-not-allowed"
                  >
                    Current Plan
                  </button>
                ) : isFree ? (
                  <Link
                    to={user ? '/app' : '/signup'}
                    className="block w-full btn-secondary text-center"
                  >
                    {user ? 'Continue with Free' : 'Get Started'}
                  </Link>
                ) : (
                  <Elements stripe={stripePromise}>
                    <CheckoutForm plan={plan} />
                  </Elements>
                )}
              </div>
            )
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            All plans include a 30-day money-back guarantee
          </p>
        </div>
      </div>
    </div>
  )
}

