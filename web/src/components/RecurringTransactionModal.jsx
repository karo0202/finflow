import { X, Calendar, Repeat } from 'lucide-react'
import { useState } from 'react'
import { validateAmount } from '../utils/validation'
import toast from 'react-hot-toast'

export default function RecurringTransactionModal({ isOpen, onClose, onSave, user }) {
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: 'Food',
    type: 'expense',
    frequency: 'monthly', // daily, weekly, monthly, yearly
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    enabled: true,
  })
  const [formErrors, setFormErrors] = useState({})

  if (!isOpen) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    
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
      await onSave({
        ...formData,
        amount: parseFloat(formData.amount),
        description: formData.description.trim(),
      })
      toast.success('Recurring transaction created!')
      onClose()
      setFormData({
        description: '',
        amount: '',
        category: 'Food',
        type: 'expense',
        frequency: 'monthly',
        startDate: new Date().toISOString().split('T')[0],
        endDate: '',
        enabled: true,
      })
      setFormErrors({})
    } catch (error) {
      toast.error(error.message || 'Failed to create recurring transaction')
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="card max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Repeat className="text-primary-600" size={24} />
            <h2 className="text-xl font-semibold">Recurring Transaction</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
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
            <label className="block text-sm font-medium mb-2">Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="input-field"
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="input-field"
            >
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Shopping">Shopping</option>
              <option value="Bills">Bills</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Health">Health</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Frequency</label>
            <select
              value={formData.frequency}
              onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
              className="input-field"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Start Date</label>
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">End Date (Optional)</label>
            <input
              type="date"
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              className="input-field"
              min={formData.startDate}
            />
            <p className="text-xs text-gray-500 mt-1">Leave empty for no end date</p>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="enabled"
              checked={formData.enabled}
              onChange={(e) => setFormData({ ...formData, enabled: e.target.checked })}
              className="w-4 h-4 text-primary-600 rounded"
            />
            <label htmlFor="enabled" className="text-sm text-gray-700 dark:text-gray-300">
              Enable this recurring transaction
            </label>
          </div>

          <div className="flex space-x-2 pt-4">
            <button type="button" onClick={onClose} className="btn-secondary flex-1">
              Cancel
            </button>
            <button type="submit" className="btn-primary flex-1">
              Create Recurring Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

