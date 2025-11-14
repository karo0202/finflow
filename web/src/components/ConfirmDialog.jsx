import { X, AlertTriangle } from 'lucide-react'

export default function ConfirmDialog({ isOpen, onClose, onConfirm, title, message, confirmText = 'Confirm', cancelText = 'Cancel', variant = 'danger' }) {
  if (!isOpen) return null

  const variantStyles = {
    danger: 'bg-red-600 hover:bg-red-700',
    warning: 'bg-yellow-600 hover:bg-yellow-700',
    info: 'bg-blue-600 hover:bg-blue-700',
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="card max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              variant === 'danger' ? 'bg-red-100 dark:bg-red-900' : 
              variant === 'warning' ? 'bg-yellow-100 dark:bg-yellow-900' : 
              'bg-blue-100 dark:bg-blue-900'
            }`}>
              <AlertTriangle className={
                variant === 'danger' ? 'text-red-600 dark:text-red-400' : 
                variant === 'warning' ? 'text-yellow-600 dark:text-yellow-400' : 
                'text-blue-600 dark:text-blue-400'
              } size={20} />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          >
            <X size={20} />
          </button>
        </div>
        
        <p className="text-gray-700 dark:text-gray-300 mb-6">{message}</p>
        
        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="btn-secondary flex-1"
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              onConfirm()
              onClose()
            }}
            className={`${variantStyles[variant]} text-white font-semibold py-2 px-4 rounded-lg transition-colors flex-1`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}

