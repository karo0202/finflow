import React from 'react'

export function CardSkeleton() {
  return (
    <div className="card animate-pulse">
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
    </div>
  )
}

export function TableSkeleton() {
  return (
    <div className="card animate-pulse">
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-center space-x-4">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function ChartSkeleton() {
  return (
    <div className="card animate-pulse">
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
      <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
    </div>
  )
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 animate-pulse"></div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        <ChartSkeleton />
        <ChartSkeleton />
      </div>
    </div>
  )
}

