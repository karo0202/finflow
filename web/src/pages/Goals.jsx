import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { getGoals, addGoal, updateGoal, deleteGoal } from '../services/firestore'
import { Plus, Target, Calendar, DollarSign, TrendingUp, X } from 'lucide-react'
import toast from 'react-hot-toast'

export default function Goals() {
  const { user } = useAuth()
  const [goals, setGoals] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    target: '',
    deadline: '',
    category: 'Savings',
  })

  useEffect(() => {
    fetchGoals()
  }, [user])

  const fetchGoals = async () => {
    if (!user) {
      setLoading(false)
      return
    }

    try {
      const userGoals = await getGoals(user.uid)
      setGoals(userGoals.map(goal => ({
        ...goal,
        progress: goal.target > 0 ? (goal.current / goal.target) * 100 : 0,
      })))
    } catch (error) {
      console.error('Error fetching goals:', error)
      toast.error('Failed to load goals')
    } finally {
      setLoading(false)
    }
  }

  const handleAddGoal = async (e) => {
    e.preventDefault()
    if (!user) return

    try {
      await addGoal(user.uid, {
        name: formData.name,
        description: formData.description,
        target: parseFloat(formData.target),
        deadline: formData.deadline,
        category: formData.category,
        current: 0,
      })
      toast.success('Goal created successfully!')
      setShowAddForm(false)
      setFormData({ name: '', description: '', target: '', deadline: '', category: 'Savings' })
      fetchGoals()
    } catch (error) {
      console.error('Error adding goal:', error)
      toast.error('Failed to create goal')
    }
  }

  const handleUpdateGoalProgress = async (goalId, newCurrent) => {
    if (!user) return

    try {
      await updateGoal(goalId, { current: newCurrent })
      toast.success('Goal updated!')
      fetchGoals()
    } catch (error) {
      console.error('Error updating goal:', error)
      toast.error('Failed to update goal')
    }
  }

  const handleDeleteGoal = async (goalId) => {
    if (!user || !confirm('Are you sure you want to delete this goal?')) return

    try {
      await deleteGoal(goalId)
      toast.success('Goal deleted!')
      fetchGoals()
    } catch (error) {
      console.error('Error deleting goal:', error)
      toast.error('Failed to delete goal')
    }
  }

  const totalGoals = goals.length
  const completedGoals = goals.filter(g => (g.progress || 0) >= 100).length
  const totalTarget = goals.reduce((sum, g) => sum + (g.target || 0), 0)
  const totalCurrent = goals.reduce((sum, g) => sum + (g.current || 0), 0)
  const overallProgress = totalTarget > 0 ? (totalCurrent / totalTarget) * 100 : 0

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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Goals</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Track your financial goals and milestones
          </p>
        </div>
        <button 
          onClick={() => setShowAddForm(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>New Goal</span>
        </button>
      </div>

      {/* Goals Overview */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">Active Goals</p>
            <Target className="text-primary-600" size={20} />
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{totalGoals}</p>
        </div>
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
            <TrendingUp className="text-green-600" size={20} />
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{completedGoals}</p>
        </div>
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Target</p>
            <DollarSign className="text-accent-600" size={20} />
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            ${(totalTarget / 1000).toFixed(0)}k
          </p>
        </div>
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">Overall Progress</p>
            <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
              <span className="text-primary-600 dark:text-primary-400 font-semibold text-sm">
                {Math.round(overallProgress)}%
              </span>
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            ${(totalCurrent / 1000).toFixed(1)}k
          </p>
        </div>
      </div>

      {/* Add Goal Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="card max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">New Goal</h2>
              <button
                onClick={() => setShowAddForm(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddGoal} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Goal Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="input-field"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Target Amount ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.target}
                  onChange={(e) => setFormData({ ...formData, target: e.target.value })}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Deadline</label>
                <input
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="input-field"
                >
                  <option value="Savings">Savings</option>
                  <option value="Travel">Travel</option>
                  <option value="Housing">Housing</option>
                  <option value="Investment">Investment</option>
                  <option value="Education">Education</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="flex space-x-2">
                <button type="submit" className="btn-primary flex-1">Create Goal</button>
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

      {/* Goals List */}
      <div className="grid md:grid-cols-2 gap-6">
        {goals.map((goal) => {
          const deadlineDate = goal.deadline instanceof Date ? goal.deadline : new Date(goal.deadline)
          const daysRemaining = Math.ceil(
            (deadlineDate - new Date()) / (1000 * 60 * 60 * 24)
          )
          const monthlyNeeded = daysRemaining > 0
            ? (goal.target - goal.current) / Math.ceil(daysRemaining / 30)
            : 0

          return (
            <div key={goal.id} className="card">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {goal.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {goal.description}
                  </p>
                </div>
                <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-xs font-medium">
                  {goal.category}
                </span>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Progress</span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {goal.progress}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    className="bg-primary-600 h-3 rounded-full transition-all"
                    style={{ width: `${Math.min(goal.progress, 100)}%` }}
                  ></div>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    ${goal.current.toLocaleString()}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    ${goal.target.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <Calendar size={16} />
                  <span>
                    {daysRemaining > 0
                      ? `${daysRemaining} days remaining`
                      : 'Deadline passed'}
                  </span>
                </div>
                {monthlyNeeded > 0 && (
                  <div className="text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Need: </span>
                    <span className="font-semibold text-primary-600">
                      ${Math.ceil(monthlyNeeded).toLocaleString()}/mo
                    </span>
                  </div>
                )}
              </div>
              <div className="mt-2 flex space-x-2">
                <button
                  onClick={() => {
                    const newCurrent = prompt('Update current amount:', goal.current)
                    if (newCurrent !== null && !isNaN(newCurrent)) {
                      handleUpdateGoalProgress(goal.id, parseFloat(newCurrent))
                    }
                  }}
                  className="text-xs text-primary-600 hover:text-primary-700"
                >
                  Update Progress
                </button>
                <button
                  onClick={() => handleDeleteGoal(goal.id)}
                  className="text-xs text-red-600 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

