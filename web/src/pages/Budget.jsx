import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { getBudget, getTransactions, addTransaction, getRecurringTransactions, updateBudget } from '../services/firestore'
import { Plus, DollarSign, TrendingDown, TrendingUp, X, Download, FileText, Repeat, Edit2, Save } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import SearchFilter from '../components/SearchFilter'
import RecurringTransactionModal from '../components/RecurringTransactionModal'
import { exportTransactionsToCSV } from '../utils/export'
import { generateTransactionsPDF } from '../utils/pdfExport'
import { validateAmount } from '../utils/validation'
import { addRecurringTransaction } from '../services/firestore'
import toast from 'react-hot-toast'

const COLORS = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899']

export default function Budget() {
  const { user } = useAuth()
  const [budget, setBudget] = useState({
    income: 0,
    expenses: 0,
    savings: 0,
  })
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: 'Food',
    type: 'expense',
    date: new Date().toISOString().split('T')[0],
  })
  const [formErrors, setFormErrors] = useState({})
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState(null)
  const [showRecurringModal, setShowRecurringModal] = useState(false)
  const [recurringTransactions, setRecurringTransactions] = useState([])
  const [editingSalary, setEditingSalary] = useState(false)
  const [salaryInput, setSalaryInput] = useState('')

  useEffect(() => {
    fetchBudgetData()
    fetchRecurringTransactions()
  }, [user])

  const fetchRecurringTransactions = async () => {
    if (!user) return
    try {
      const recurring = await getRecurringTransactions(user.uid)
      setRecurringTransactions(recurring)
    } catch (error) {
      console.error('Error fetching recurring transactions:', error)
    }
  }

  const fetchBudgetData = async () => {
    if (!user) {
      setLoading(false)
      return
    }

    try {
      const budgetData = await getBudget(user.uid)
      setBudget({
        income: budgetData.income || 0,
        expenses: 0, // Will calculate from transactions
        savings: 0,
      })

      const userTransactions = await getTransactions(user.uid, 20)
      setTransactions(userTransactions)

      // Calculate expenses from transactions
      const expenses = userTransactions
        .filter(t => t.type === 'expense' || t.amount < 0)
        .reduce((sum, t) => sum + Math.abs(t.amount), 0)
      
      const income = userTransactions
        .filter(t => t.type === 'income' || t.amount > 0)
        .reduce((sum, t) => sum + t.amount, 0)

      setBudget({
        income: budgetData.income || income,
        expenses,
        savings: (budgetData.income || income) - expenses,
      })
    } catch (error) {
      console.error('Error fetching budget:', error)
      toast.error('Failed to load budget data')
    } finally {
      setLoading(false)
    }
  }

  const handleAddTransaction = async (e) => {
    e.preventDefault()
    if (!user) return

    // Validate
    const errors = {}
    if (!formData.description.trim()) {
      errors.description = 'Description is required'
    }
    const amountValidation = validateAmount(formData.amount)
    if (!amountValidation.valid) {
      errors.amount = amountValidation.message
    }
    
    setFormErrors(errors)
    if (Object.keys(errors).length > 0) {
      toast.error('Please fix form errors')
      return
    }

    try {
      const amount = parseFloat(formData.amount)
      await addTransaction(user.uid, {
        description: formData.description.trim(),
        amount: formData.type === 'expense' ? -Math.abs(amount) : Math.abs(amount),
        category: formData.category,
        type: formData.type,
        date: formData.date,
      })
      toast.success('Transaction added!')
      setShowAddForm(false)
      setFormData({
        description: '',
        amount: '',
        category: 'Food',
        type: 'expense',
        date: new Date().toISOString().split('T')[0],
      })
      setFormErrors({})
      fetchBudgetData()
    } catch (error) {
      console.error('Error adding transaction:', error)
      toast.error(error.message || 'Failed to add transaction')
    }
  }

  const handleSaveRecurring = async (recurringData) => {
    if (!user) return
    await addRecurringTransaction(user.uid, recurringData)
    await fetchRecurringTransactions()
  }

  const handleEditSalary = () => {
    setSalaryInput(budget.income.toString())
    setEditingSalary(true)
  }

  const handleSaveSalary = async () => {
    if (!user) return

    const salaryAmount = parseFloat(salaryInput)
    if (isNaN(salaryAmount) || salaryAmount < 0) {
      toast.error('Please enter a valid salary amount')
      return
    }

    try {
      await updateBudget(user.uid, { income: salaryAmount })
      setBudget(prev => ({
        ...prev,
        income: salaryAmount,
        savings: salaryAmount - prev.expenses,
      }))
      setEditingSalary(false)
      toast.success('Salary updated successfully!')
    } catch (error) {
      console.error('Error updating salary:', error)
      toast.error('Failed to update salary')
    }
  }

  const handleCancelEditSalary = () => {
    setEditingSalary(false)
    setSalaryInput('')
  }

  // Filter transactions
  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = searchTerm === '' || 
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = filterCategory === null || transaction.category === filterCategory
    
    return matchesSearch && matchesFilter
  })

  // Get unique categories for filter
  const filterCategories = [...new Set(transactions.map(t => t.category))]

  // Calculate categories from transactions
  const categoryMap = {}
  filteredTransactions
    .filter(t => t.type === 'expense' || t.amount < 0)
    .forEach(t => {
      const cat = t.category || 'Other'
      categoryMap[cat] = (categoryMap[cat] || 0) + Math.abs(t.amount)
    })

  const categories = Object.entries(categoryMap).map(([name, amount], index) => ({
    name,
    amount,
    budget: amount * 1.2, // Mock budget (20% over)
    color: COLORS[index % COLORS.length],
  }))

  const totalExpenses = categories.reduce((sum, cat) => sum + cat.amount, 0)
  const remaining = budget.income - totalExpenses

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  const chartData = categories.map(cat => ({
    name: cat.name,
    value: cat.amount,
  }))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Budget</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Track your income and expenses
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <button 
              onClick={() => exportTransactionsToCSV(transactions)}
              className="btn-secondary flex items-center space-x-2 text-sm"
              disabled={transactions.length === 0}
            >
              <Download size={18} />
              <span className="hidden sm:inline">CSV</span>
            </button>
            <button 
              onClick={async () => {
                try {
                  await generateTransactionsPDF(transactions, budget)
                  toast.success('PDF generated!')
                } catch (error) {
                  toast.error('Failed to generate PDF')
                }
              }}
              className="btn-secondary flex items-center space-x-2 text-sm"
              disabled={transactions.length === 0}
            >
              <FileText size={18} />
              <span className="hidden sm:inline">PDF</span>
            </button>
            <button 
              onClick={() => setShowRecurringModal(true)}
              className="btn-secondary flex items-center space-x-2 text-sm"
            >
              <Repeat size={18} />
              <span className="hidden sm:inline">Recurring</span>
            </button>
            <button 
              onClick={() => setShowAddForm(true)}
              className="btn-primary flex items-center space-x-2 text-sm"
            >
              <Plus size={18} />
              <span className="hidden sm:inline">Add Transaction</span>
              <span className="sm:hidden">Add</span>
            </button>
          </div>
        </div>
      </div>

      {/* Budget Overview */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">Monthly Income</p>
            <DollarSign className="text-green-600" size={20} />
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            ${budget.income.toLocaleString()}
          </p>
        </div>
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">Monthly Expenses</p>
            <TrendingDown className="text-red-600" size={20} />
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            ${totalExpenses.toLocaleString()}
          </p>
        </div>
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">Remaining</p>
            <TrendingUp className={remaining >= 0 ? 'text-green-600' : 'text-red-600'} size={20} />
          </div>
          <p className={`text-3xl font-bold ${remaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            ${remaining.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Expense Categories Chart */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Expense Breakdown</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Category Details</h2>
          <div className="space-y-4">
            {categories.map((category) => {
              const percentage = (category.amount / category.budget) * 100
              const isOverBudget = category.amount > category.budget
              return (
                <div key={category.name}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900 dark:text-white">{category.name}</span>
                    <div className="text-right">
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        ${category.amount.toLocaleString()}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                        / ${category.budget.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        isOverBudget ? 'bg-red-600' : 'bg-primary-600'
                      }`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    ></div>
                  </div>
                  {isOverBudget && (
                    <p className="text-xs text-red-600 mt-1">
                      Over budget by ${(category.amount - category.budget).toLocaleString()}
                    </p>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Add Transaction Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="card max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Add Transaction</h2>
              <button
                onClick={() => setShowAddForm(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddTransaction} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="input-field"
                >
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => {
                    setFormData({ ...formData, description: e.target.value })
                    if (formErrors.description) setFormErrors({ ...formErrors, description: '' })
                  }}
                  className={`input-field ${formErrors.description ? 'border-red-500' : ''}`}
                  required
                />
                {formErrors.description && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.description}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Amount ($)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.amount}
                  onChange={(e) => {
                    setFormData({ ...formData, amount: e.target.value })
                    if (formErrors.amount) setFormErrors({ ...formErrors, amount: '' })
                  }}
                  className={`input-field ${formErrors.amount ? 'border-red-500' : ''}`}
                  required
                />
                {formErrors.amount && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.amount}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="input-field"
                >
                  <option value="Food">Food</option>
                  <option value="Housing">Housing</option>
                  <option value="Transportation">Transportation</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Utilities">Utilities</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
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

      {/* Recurring Transactions Modal */}
      <RecurringTransactionModal
        isOpen={showRecurringModal}
        onClose={() => setShowRecurringModal(false)}
        onSave={handleSaveRecurring}
        user={user}
      />

      {/* Recurring Transactions */}
      {recurringTransactions.length > 0 && (
        <div className="card">
          <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
            <Repeat size={20} />
            <span>Recurring Transactions</span>
          </h2>
          <div className="space-y-2">
            {recurringTransactions.map((recurring) => (
              <div key={recurring.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div>
                  <p className="font-medium">{recurring.description}</p>
                  <p className="text-sm text-gray-500">
                    ${Math.abs(recurring.amount).toFixed(2)} • {recurring.frequency} • {recurring.category}
                  </p>
                </div>
                <span className={`px-2 py-1 rounded text-xs ${recurring.enabled ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'}`}>
                  {recurring.enabled ? 'Active' : 'Inactive'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search and Filter */}
      {transactions.length > 0 && (
        <SearchFilter
          onSearch={setSearchTerm}
          onFilter={setFilterCategory}
          placeholder="Search transactions..."
          filterOptions={[
            { label: 'All', value: null },
            ...filterCategories.map(cat => ({ label: cat, value: cat })),
          ]}
          activeFilter={filterCategory}
        />
      )}

      {/* Recent Transactions */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">
          Recent Transactions {filteredTransactions.length !== transactions.length && `(${filteredTransactions.length} of ${transactions.length})`}
        </h2>
        <div className="space-y-3">
          {transactions.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-8">
              No transactions yet. Add your first transaction!
            </p>
          ) : filteredTransactions.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-8">
              No transactions match your search criteria.
            </p>
          ) : (
            <>
              {filteredTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{transaction.description}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {transaction.category} • {transaction.date ? new Date(transaction.date).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                  <p
                    className={`font-semibold ${
                      transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {transaction.amount > 0 ? '+' : ''}${transaction.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

