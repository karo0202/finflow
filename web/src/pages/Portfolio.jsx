import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { getPortfolio, addHolding, deleteHolding } from '../services/firestore'
import { Plus, TrendingUp, TrendingDown, Edit, Trash2, X } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import toast from 'react-hot-toast'

export default function Portfolio() {
  const { user } = useAuth()
  const [holdings, setHoldings] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [formData, setFormData] = useState({
    symbol: '',
    name: '',
    shares: '',
    price: '',
    type: 'stock', // 'stock' or 'crypto'
  })

  useEffect(() => {
    fetchPortfolio()
  }, [user])

  const fetchPortfolio = async () => {
    if (!user) {
      setLoading(false)
      return
    }

    try {
      const portfolio = await getPortfolio(user.uid)
      setHoldings(portfolio.holdings || [])
    } catch (error) {
      console.error('Error fetching portfolio:', error)
      toast.error('Failed to load portfolio')
    } finally {
      setLoading(false)
    }
  }

  const handleAddHolding = async (e) => {
    e.preventDefault()
    if (!user) return

    try {
      const holding = {
        symbol: formData.symbol.toUpperCase(),
        name: formData.name,
        type: formData.type,
        price: parseFloat(formData.price),
        shares: formData.type === 'stock' ? parseFloat(formData.shares) : undefined,
        amount: formData.type === 'crypto' ? parseFloat(formData.shares) : undefined,
        value: parseFloat(formData.price) * parseFloat(formData.shares),
        change: (Math.random() * 10 - 5).toFixed(2), // Mock change percentage
      }

      await addHolding(user.uid, holding)
      toast.success('Holding added successfully!')
      setShowAddForm(false)
      setFormData({ symbol: '', name: '', shares: '', price: '', type: 'stock' })
      fetchPortfolio()
    } catch (error) {
      console.error('Error adding holding:', error)
      toast.error('Failed to add holding')
    }
  }

  const handleDeleteHolding = async (holdingId) => {
    if (!user || !confirm('Are you sure you want to delete this holding?')) return

    try {
      await deleteHolding(user.uid, holdingId)
      toast.success('Holding deleted successfully!')
      fetchPortfolio()
    } catch (error) {
      console.error('Error deleting holding:', error)
      toast.error('Failed to delete holding')
    }
  }

  const portfolioHistory = [
    { date: 'Jan', value: 42000 },
    { date: 'Feb', value: 43500 },
    { date: 'Mar', value: 44800 },
    { date: 'Apr', value: 45230 },
  ]

  const totalValue = holdings.reduce((sum, holding) => {
    const value = holding.value || (holding.price * (holding.shares || holding.amount || 0))
    return sum + value
  }, 0)
  const totalChange = holdings.reduce((sum, holding) => {
    const value = holding.value || (holding.price * (holding.shares || holding.amount || 0))
    return sum + (value * (parseFloat(holding.change || 0) / 100))
  }, 0)
  const totalChangePercent = totalValue > 0 ? (totalChange / totalValue) * 100 : 0

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Portfolio</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Track and manage your investments
          </p>
        </div>
        <button 
          onClick={() => setShowAddForm(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Add Holding</span>
        </button>
      </div>

      {/* Portfolio Summary */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="card">
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Portfolio Value</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
            ${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <p className={`text-sm mt-2 flex items-center ${totalChangePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {totalChangePercent >= 0 ? <TrendingUp size={16} className="mr-1" /> : <TrendingDown size={16} className="mr-1" />}
            {totalChangePercent >= 0 ? '+' : ''}{totalChangePercent.toFixed(2)}% today
          </p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Holdings</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
            {holdings.length}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            {holdings.filter(h => !h.symbol.includes('BTC') && !h.symbol.includes('ETH')).length} stocks, {holdings.filter(h => h.symbol.includes('BTC') || h.symbol.includes('ETH')).length} crypto
          </p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-600 dark:text-gray-400">Today's Gain/Loss</p>
          <p className={`text-3xl font-bold mt-2 ${totalChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {totalChange >= 0 ? '+' : ''}${totalChange.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            All time performance
          </p>
        </div>
      </div>

      {/* Portfolio Chart */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Portfolio Performance</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={portfolioHistory}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-gray-300 dark:stroke-gray-700" />
            <XAxis dataKey="date" className="text-gray-600 dark:text-gray-400" />
            <YAxis className="text-gray-600 dark:text-gray-400" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
              }}
            />
            <Line type="monotone" dataKey="value" stroke="#22c55e" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Add Holding Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="card max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Add Holding</h2>
              <button
                onClick={() => setShowAddForm(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddHolding} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="input-field"
                >
                  <option value="stock">Stock</option>
                  <option value="crypto">Crypto</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Symbol</label>
                <input
                  type="text"
                  value={formData.symbol}
                  onChange={(e) => setFormData({ ...formData, symbol: e.target.value })}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  {formData.type === 'stock' ? 'Shares' : 'Amount'}
                </label>
                <input
                  type="number"
                  step="0.0001"
                  value={formData.shares}
                  onChange={(e) => setFormData({ ...formData, shares: e.target.value })}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Price per {formData.type === 'stock' ? 'Share' : 'Coin'}</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="input-field"
                  required
                />
              </div>
              <div className="flex space-x-2">
                <button type="submit" className="btn-primary flex-1">Add</button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Holdings Table */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Holdings</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Symbol</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Name</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Quantity</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Price</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Value</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Change</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {holdings.map((holding) => (
                <tr key={holding.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="py-3 px-4">
                    <span className="font-semibold text-gray-900 dark:text-white">{holding.symbol}</span>
                  </td>
                  <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{holding.name}</td>
                  <td className="py-3 px-4 text-right text-gray-700 dark:text-gray-300">
                    {holding.shares || holding.amount || 0}
                  </td>
                  <td className="py-3 px-4 text-right text-gray-700 dark:text-gray-300">
                    ${holding.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="py-3 px-4 text-right font-semibold text-gray-900 dark:text-white">
                    ${(holding.value || holding.price * (holding.shares || holding.amount || 0)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className={`py-3 px-4 text-right font-semibold ${parseFloat(holding.change || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {parseFloat(holding.change || 0) >= 0 ? '+' : ''}{holding.change || 0}%
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded">
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => handleDeleteHolding(holding.id)}
                        className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded text-red-600"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

