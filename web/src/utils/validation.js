// Form validation utilities

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export const validatePassword = (password) => {
  if (password.length < 6) {
    return { valid: false, message: 'Password must be at least 6 characters' }
  }
  return { valid: true }
}

export const validateAmount = (amount) => {
  const num = parseFloat(amount)
  if (isNaN(num) || num <= 0) {
    return { valid: false, message: 'Amount must be a positive number' }
  }
  if (num > 1000000000) {
    return { valid: false, message: 'Amount is too large' }
  }
  return { valid: true }
}

export const validateDate = (date) => {
  const dateObj = new Date(date)
  if (isNaN(dateObj.getTime())) {
    return { valid: false, message: 'Invalid date' }
  }
  if (dateObj < new Date()) {
    return { valid: false, message: 'Date cannot be in the past' }
  }
  return { valid: true }
}

export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .substring(0, 1000) // Limit length
}

export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

export const formatDate = (date) => {
  if (!date) return 'N/A'
  const d = date instanceof Date ? date : new Date(date)
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export const calculatePercentage = (current, target) => {
  if (!target || target === 0) return 0
  return Math.min((current / target) * 100, 100)
}

export const calculateDaysRemaining = (deadline) => {
  if (!deadline) return 0
  const deadlineDate = deadline instanceof Date ? deadline : new Date(deadline)
  const today = new Date()
  const diffTime = deadlineDate - today
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return Math.max(0, diffDays)
}

