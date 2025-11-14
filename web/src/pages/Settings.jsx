import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'
import { User, Bell, CreditCard, Globe, Moon, Sun, Shield } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Settings() {
  const { user, userData } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    portfolio: true,
    goals: true,
    community: false,
  })

  const handleNotificationChange = (key) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Manage your account and preferences
        </p>
      </div>

      {/* Profile Settings */}
      <div className="card">
        <div className="flex items-center space-x-3 mb-6">
          <User className="text-primary-600" size={24} />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Profile</h2>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Display Name
            </label>
            <input
              type="text"
              defaultValue={user?.displayName || ''}
              className="input-field"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              defaultValue={user?.email || ''}
              className="input-field"
              disabled
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Email cannot be changed
            </p>
          </div>
          <button className="btn-primary">Save Changes</button>
        </div>
      </div>

      {/* Subscription */}
      <div className="card">
        <div className="flex items-center space-x-3 mb-6">
          <CreditCard className="text-primary-600" size={24} />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Subscription</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div>
              <p className="font-semibold text-gray-900 dark:text-white capitalize">
                {userData?.subscription || 'Free'} Plan
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {userData?.subscription === 'premium'
                  ? 'Full access to all features'
                  : userData?.subscription === 'lifetime'
                  ? 'Lifetime access to all features'
                  : 'Limited features'}
              </p>
            </div>
            <Link to="/pricing" className="btn-primary">
              {userData?.subscription === 'free' ? 'Upgrade' : 'Manage'}
            </Link>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="card">
        <div className="flex items-center space-x-3 mb-6">
          <Bell className="text-primary-600" size={24} />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Notifications</h2>
        </div>
        <div className="space-y-4">
          {Object.entries(notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-white capitalize">
                  {key === 'push' ? 'Push Notifications' : key}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {key === 'email' && 'Receive email notifications'}
                  {key === 'push' && 'Receive push notifications on mobile'}
                  {key === 'portfolio' && 'Get alerts for portfolio changes'}
                  {key === 'goals' && 'Get updates on your goals'}
                  {key === 'community' && 'Get notified about community activity'}
                </p>
              </div>
              <button
                onClick={() => handleNotificationChange(key)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  value ? 'bg-primary-600' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    value ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Appearance */}
      <div className="card">
        <div className="flex items-center space-x-3 mb-6">
          {theme === 'dark' ? (
            <Moon className="text-primary-600" size={24} />
          ) : (
            <Sun className="text-primary-600" size={24} />
          )}
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Appearance</h2>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-gray-900 dark:text-white">Theme</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {theme === 'dark' ? 'Dark mode' : 'Light mode'}
            </p>
          </div>
          <button
            onClick={toggleTheme}
            className="btn-secondary flex items-center space-x-2"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            <span>Switch to {theme === 'dark' ? 'Light' : 'Dark'}</span>
          </button>
        </div>
      </div>

      {/* Preferences */}
      <div className="card">
        <div className="flex items-center space-x-3 mb-6">
          <Globe className="text-primary-600" size={24} />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Preferences</h2>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Currency
            </label>
            <select className="input-field">
              <option>USD ($)</option>
              <option>EUR (€)</option>
              <option>GBP (£)</option>
              <option>JPY (¥)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Language
            </label>
            <select className="input-field">
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
              <option>German</option>
            </select>
          </div>
          <button className="btn-primary">Save Preferences</button>
        </div>
      </div>

      {/* Security */}
      <div className="card">
        <div className="flex items-center space-x-3 mb-6">
          <Shield className="text-primary-600" size={24} />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Security</h2>
        </div>
        <div className="space-y-4">
          <button className="btn-secondary w-full">Change Password</button>
          <button className="btn-secondary w-full">Two-Factor Authentication</button>
        </div>
      </div>
    </div>
  )
}

