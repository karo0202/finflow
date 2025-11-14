import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  Bot, 
  BookOpen, 
  Users, 
  Check, 
  ArrowRight,
  Shield,
  Zap,
  Target
} from 'lucide-react'

export default function LandingPage() {
  const features = [
    {
      icon: TrendingUp,
      title: 'Portfolio Tracking',
      description: 'Track all your investments in one place with real-time insights and analytics.',
    },
    {
      icon: Bot,
      title: 'AI Financial Coach',
      description: 'Get personalized financial advice powered by advanced AI technology.',
    },
    {
      icon: BookOpen,
      title: 'Learning Hub',
      description: 'Master personal finance with interactive lessons and quizzes.',
    },
    {
      icon: Users,
      title: 'Community Support',
      description: 'Connect with like-minded individuals and learn from the community.',
    },
  ]

  const benefits = [
    'Unified Budget + Investment tracking',
    'AI-powered insights and recommendations',
    'Personalized learning paths',
    'Community challenges and support',
    'Goal tracking with smart alerts',
    'Secure and encrypted data',
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Navigation */}
      <nav className="border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-primary-600">FinFlow</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login" className="text-gray-700 dark:text-gray-300 hover:text-primary-600">
                Login
              </Link>
              <Link
                to="/signup"
                className="btn-primary"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Master Your Money with
            <span className="text-primary-600"> AI-Powered Insights</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
            The all-in-one personal finance platform that combines budgeting, investing, learning, 
            and community support with an intelligent AI financial coach.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup" className="btn-primary text-lg px-8 py-3 inline-flex items-center justify-center">
              Start Free Trial
              <ArrowRight className="ml-2" size={20} />
            </Link>
            <Link to="/pricing" className="btn-secondary text-lg px-8 py-3">
              View Pricing
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 dark:bg-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Everything You Need to Grow Wealth
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Powerful features designed to help you achieve financial freedom
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="card text-center"
                >
                  <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="text-primary-600 dark:text-primary-400" size={32} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Why Choose FinFlow?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              We combine the best of budgeting, investing, education, and community 
              to help you build lasting wealth.
            </p>
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check size={16} className="text-white" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="card p-8">
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                    <Target className="text-primary-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold">Goal Tracking</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Save $5,000 by June 2026</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-accent-100 dark:bg-accent-900 rounded-lg flex items-center justify-center">
                    <Zap className="text-accent-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold">AI Insights</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Your portfolio grew 6.2% this month</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                    <Shield className="text-green-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold">Secure & Private</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Bank-level encryption</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Transform Your Finances?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join thousands of users who are taking control of their financial future.
          </p>
          <Link
            to="/signup"
            className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg inline-flex items-center transition-colors"
          >
            Get Started Free
            <ArrowRight className="ml-2" size={20} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4">FinFlow</h3>
            <p className="mb-4">© 2024 FinFlow. All rights reserved.</p>
            <div className="flex justify-center space-x-6">
              <Link to="/pricing" className="hover:text-white">Pricing</Link>
              <a href="#" className="hover:text-white">Privacy</a>
              <a href="#" className="hover:text-white">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

