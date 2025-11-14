import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { getPortfolio, getTransactions, getGoals } from '../services/firestore'
import { TrendingUp, TrendingDown, Wallet, Target, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import toast from 'react-hot-toast'

const COLORS = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6']

export default function Dashboard() {
  const { user, userData } = useAuth()
  const [portfolioValue, setPortfolioValue] = useState(0)
  const [monthlyChange, setMonthlyChange] = useState(0)
  const [transactions, setTransactions] = useState([])
  const [goals, setGoals] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        setLoading(false)
        return
      }

      try {
        // Fetch portfolio
        const portfolio = await getPortfolio(user.uid)
        const totalValue = portfolio.totalValue || 0
        setPortfolioValue(totalValue)
        
        // Calculate monthly change (mock for now - would need historical data)
        const previousValue = totalValue * 0.94 // Simulate 6% growth
        const change = ((totalValue - previousValue) / previousValue) * 100
        setMonthlyChange(parseFloat(change.toFixed(2)))

        // Fetch transactions
        const userTransactions = await getTransactions(user.uid, 5)
        setTransactions(userTransactions)

        // Fetch goals
        const userGoals = await getGoals(user.uid)
        setGoals(userGoals)
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
        toast.error('Failed to load dashboard data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [user])

  // Generate portfolio history (last 4 months)
  const portfolioData = (() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
    const currentMonth = new Date().getMonth()
    const data = []
    
    for (let i = 3; i >= 0; i--) {
      const monthIndex = (currentMonth - i + 12) % 12
      const value = portfolioValue * (1 - (i * 0.02)) // Simulate growth
      data.push({
        month: months[monthIndex],
        value: Math.max(0, value),
      })
    }
    return data
  })()

  // Calculate asset allocation from portfolio
  const assetAllocation = (() => {
    if (!user) return []
    
    // This would come from actual holdings data
    // For now, using mock data based on portfolio value
    const total = portfolioValue || 0
    if (total === 0) {
      return [
        { name: 'Stocks', value: 0, amount: 0 },
        { name: 'Crypto', value: 0, amount: 0 },
        { name: 'Savings', value: 0, amount: 0 },
      ]
    }
    
    return [
      { name: 'Stocks', value: 60, amount: total * 0.6 },
      { name: 'Crypto', value: 25, amount: total * 0.25 },
      { name: 'Savings', value: 10, amount: total * 0.1 },
      { name: 'Bonds', value: 5, amount: total * 0.05 },
    ]
  })()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  const stats = [
    {
      name: 'Total Portfolio',
      value: `$${portfolioValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      change: `${monthlyChange > 0 ? '+' : ''}${monthlyChange}%`,
      changeType: monthlyChange > 0 ? 'positive' : 'negative',
      icon: TrendingUp,
    },
    {
      name: 'Monthly Income',
      value: '$5,200',
      change: '+2.5%',
      changeType: 'positive',
      icon: ArrowUpRight,
    },
    {
      name: 'Monthly Expenses',
      value: '$3,800',
      change: '-5.2%',
      changeType: 'negative',
      icon: ArrowDownRight,
    },
    {
      name: 'Active Goals',
      value: goals.length.toString(),
      change: '2 in progress',
      changeType: 'neutral',
      icon: Target,
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Welcome back, {user?.displayName || 'User'}!
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Here's your financial overview
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.name} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                    {stat.value}
                  </p>
                  <p
                    className={`text-sm mt-1 flex items-center ${
                      stat.changeType === 'positive'
                        ? 'text-green-600'
                        : stat.changeType === 'negative'
                        ? 'text-red-600'
                        : 'text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    {stat.changeType === 'positive' && <TrendingUp size={14} className="mr-1" />}
                    {stat.changeType === 'negative' && <TrendingDown size={14} className="mr-1" />}
                    {stat.change}
                  </p>
                </div>
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                  <Icon className="text-primary-600 dark:text-primary-400" size={24} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Portfolio Growth Chart */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Portfolio Growth</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={portfolioData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-gray-300 dark:stroke-gray-700" />
              <XAxis dataKey="month" className="text-gray-600 dark:text-gray-400" />
              <YAxis className="text-gray-600 dark:text-gray-400" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#22c55e"
                fillOpacity={1}
                fill="url(#colorValue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Asset Allocation */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Asset Allocation</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={assetAllocation}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {assetAllocation.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {assetAllocation.map((asset, index) => (
              <div key={asset.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">{asset.name}</span>
                </div>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  ${asset.amount.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Transactions & Goals */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
          <div className="space-y-3">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {transaction.description}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {transaction.date ? new Date(transaction.date).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
                <p
                  className={`font-semibold ${
                    transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {transaction.amount > 0 ? '+' : ''}${transaction.amount.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Active Goals */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Active Goals</h2>
          <div className="space-y-4">
            {goals.map((goal) => {
              const progress = (goal.current / goal.target) * 100
              return (
                <div key={goal.id}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900 dark:text-white">{goal.name}</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      ${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-primary-600 h-2 rounded-full transition-all"
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Deadline: {goal.deadline ? new Date(goal.deadline).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

