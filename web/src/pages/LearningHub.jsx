import { useState } from 'react'
import { BookOpen, CheckCircle, Lock, Play, Award, TrendingUp } from 'lucide-react'

export default function LearningHub() {
  const [lessons, setLessons] = useState([
    {
      id: 1,
      title: 'Introduction to Personal Finance',
      description: 'Learn the basics of managing your money, budgeting, and setting financial goals.',
      duration: '15 min',
      level: 'Beginner',
      completed: true,
      category: 'Basics',
    },
    {
      id: 2,
      title: 'Understanding Investments',
      description: 'Explore stocks, bonds, mutual funds, and how to build a diversified portfolio.',
      duration: '25 min',
      level: 'Intermediate',
      completed: true,
      category: 'Investing',
    },
    {
      id: 3,
      title: 'Cryptocurrency Basics',
      description: 'Introduction to Bitcoin, Ethereum, and other cryptocurrencies.',
      duration: '20 min',
      level: 'Beginner',
      completed: false,
      category: 'Crypto',
      locked: false,
    },
    {
      id: 4,
      title: 'Advanced Portfolio Strategies',
      description: 'Learn about options trading, derivatives, and advanced investment strategies.',
      duration: '35 min',
      level: 'Advanced',
      completed: false,
      category: 'Investing',
      locked: true,
    },
    {
      id: 5,
      title: 'Tax Optimization',
      description: 'Understand tax-advantaged accounts and strategies to minimize your tax burden.',
      duration: '30 min',
      level: 'Intermediate',
      completed: false,
      category: 'Taxes',
      locked: false,
    },
    {
      id: 6,
      title: 'Retirement Planning',
      description: 'Plan for your future with 401(k), IRA, and other retirement strategies.',
      duration: '40 min',
      level: 'Intermediate',
      completed: false,
      category: 'Planning',
      locked: false,
    },
  ])

  const categories = ['All', 'Basics', 'Investing', 'Crypto', 'Taxes', 'Planning']
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredLessons = selectedCategory === 'All'
    ? lessons
    : lessons.filter(lesson => lesson.category === selectedCategory)

  const completedCount = lessons.filter(l => l.completed).length
  const totalLessons = lessons.length
  const progress = (completedCount / totalLessons) * 100

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Learning Hub</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Master personal finance with interactive lessons
        </p>
      </div>

      {/* Progress Overview */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">Lessons Completed</p>
            <CheckCircle className="text-green-600" size={20} />
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {completedCount} / {totalLessons}
          </p>
        </div>
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">Overall Progress</p>
            <TrendingUp className="text-primary-600" size={20} />
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {Math.round(progress)}%
          </p>
        </div>
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">Achievements</p>
            <Award className="text-accent-600" size={20} />
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">3</p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Lessons Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLessons.map((lesson) => (
          <div
            key={lesson.id}
            className={`card relative ${
              lesson.locked ? 'opacity-60' : 'hover:shadow-xl transition-shadow'
            }`}
          >
            {lesson.locked && (
              <div className="absolute top-4 right-4">
                <Lock className="text-gray-400" size={20} />
              </div>
            )}
            {lesson.completed && (
              <div className="absolute top-4 right-4">
                <CheckCircle className="text-green-600" size={20} />
              </div>
            )}
            <div className="flex items-start space-x-3 mb-4">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center flex-shrink-0">
                <BookOpen className="text-primary-600 dark:text-primary-400" size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  {lesson.title}
                </h3>
                <div className="flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-400">
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">
                    {lesson.level}
                  </span>
                  <span>{lesson.duration}</span>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {lesson.description}
            </p>
            <button
              disabled={lesson.locked}
              className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                lesson.locked
                  ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                  : lesson.completed
                  ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                  : 'btn-primary'
              }`}
            >
              {lesson.locked ? (
                'Locked'
              ) : lesson.completed ? (
                <span className="flex items-center justify-center">
                  <CheckCircle className="mr-2" size={16} />
                  Completed
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <Play className="mr-2" size={16} />
                  Start Lesson
                </span>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

