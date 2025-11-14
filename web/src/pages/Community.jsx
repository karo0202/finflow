import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { getCommunityPosts, addCommunityPost } from '../services/firestore'
import { Plus, Heart, MessageCircle, TrendingUp, Users, Filter, X } from 'lucide-react'
import toast from 'react-hot-toast'

export default function Community() {
  const { user } = useAuth()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'Investing',
  })

  const categories = ['All', 'Investing', 'Savings', 'Crypto', 'Taxes', 'Budgeting']
  const [selectedCategory, setSelectedCategory] = useState('All')

  useEffect(() => {
    fetchPosts()
  }, [selectedCategory])

  const fetchPosts = async () => {
    try {
      setLoading(true)
      const fetchedPosts = await getCommunityPosts(selectedCategory, 20)
      setPosts(fetchedPosts)
    } catch (error) {
      console.error('Error fetching posts:', error)
      toast.error('Failed to load posts')
    } finally {
      setLoading(false)
    }
  }

  const handleAddPost = async (e) => {
    e.preventDefault()
    if (!user) {
      toast.error('Please login to post')
      return
    }

    try {
      await addCommunityPost(user.uid, {
        title: formData.title,
        content: formData.content,
        category: formData.category,
        authorName: user.displayName || user.email?.split('@')[0] || 'Anonymous',
      })
      toast.success('Post created!')
      setShowAddForm(false)
      setFormData({ title: '', content: '', category: 'Investing' })
      fetchPosts()
    } catch (error) {
      console.error('Error adding post:', error)
      toast.error('Failed to create post')
    }
  }

  const filteredPosts = posts

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Community</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Connect, learn, and share with fellow investors
          </p>
        </div>
        <button 
          onClick={() => user ? setShowAddForm(true) : toast.error('Please login to post')}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>New Post</span>
        </button>
      </div>

      {/* Community Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">Active Members</p>
            <Users className="text-primary-600" size={20} />
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">12,458</p>
        </div>
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Posts</p>
            <MessageCircle className="text-accent-600" size={20} />
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">3,247</p>
        </div>
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">Trending Topics</p>
            <TrendingUp className="text-green-600" size={20} />
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">8</p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex items-center space-x-4">
        <Filter className="text-gray-600 dark:text-gray-400" size={20} />
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
      </div>

      {/* Add Post Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="card max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">New Post</h2>
              <button
                onClick={() => setShowAddForm(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddPost} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="input-field"
                >
                  <option value="Investing">Investing</option>
                  <option value="Savings">Savings</option>
                  <option value="Crypto">Crypto</option>
                  <option value="Taxes">Taxes</option>
                  <option value="Budgeting">Budgeting</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Content</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="input-field"
                  rows={6}
                  required
                />
              </div>
              <div className="flex space-x-2">
                <button type="submit" className="btn-primary flex-1">Post</button>
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

      {/* Posts List */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          </div>
        ) : posts.length === 0 ? (
          <div className="card text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">No posts yet. Be the first to post!</p>
          </div>
        ) : (
          <>
            {filteredPosts.map((post) => (
              <div key={post.id} className="card hover:shadow-lg transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                {(post.authorName || post.author || 'U').charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {post.authorName || post.author || 'Anonymous'}
                      </span>
                      {post.likes > 20 && (
                        <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-xs font-medium flex items-center">
                          <TrendingUp size={12} className="mr-1" />
                          Trending
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'Recently'}
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-xs font-medium">
                    {post.category}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {post.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">{post.content}</p>
                <div className="flex items-center space-x-6">
                  <button className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 transition-colors">
                    <Heart size={18} />
                    <span>{post.likes || 0}</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 transition-colors">
                    <MessageCircle size={18} />
                    <span>{post.comments || 0}</span>
                  </button>
                  <button className="text-primary-600 hover:text-primary-700 font-medium">
                    Reply
                  </button>
                </div>
              </div>
            </div>
          </div>
            ))}
          </>
        )}
      </div>
    </div>
  )
}

