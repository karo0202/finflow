import React from 'react'
import { LucideIcon } from 'lucide-react'

export default function EmptyState({ 
  icon: Icon, 
  title, 
  description, 
  action, 
  actionLabel = 'Get Started' 
}) {
  return (
    <div className="card text-center py-12">
      {Icon && (
        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon className="text-gray-400" size={32} />
        </div>
      )}
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
        {description}
      </p>
      {action && (
        <button onClick={action} className="btn-primary">
          {actionLabel}
        </button>
      )}
    </div>
  )
}

