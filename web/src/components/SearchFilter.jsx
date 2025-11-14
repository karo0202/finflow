import { Search, Filter, X } from 'lucide-react'
import { useState } from 'react'

export default function SearchFilter({ 
  onSearch, 
  onFilter, 
  placeholder = 'Search...',
  filterOptions = [],
  activeFilter = null,
}) {
  const [searchTerm, setSearchTerm] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearchTerm(value)
    onSearch(value)
  }

  const handleFilterClick = (filter) => {
    onFilter(filter === activeFilter ? null : filter)
  }

  const clearSearch = () => {
    setSearchTerm('')
    onSearch('')
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      {/* Search Bar */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder={placeholder}
          className="input-field pl-10 pr-10 w-full"
        />
        {searchTerm && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Filter Buttons */}
      {filterOptions.length > 0 && (
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`btn-secondary flex items-center space-x-2 ${showFilters ? 'bg-primary-100 dark:bg-primary-900' : ''}`}
          >
            <Filter size={18} />
            <span className="hidden sm:inline">Filter</span>
          </button>
          
          {showFilters && (
            <div className="flex flex-wrap gap-2">
              {filterOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleFilterClick(option.value)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    activeFilter === option.value
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

