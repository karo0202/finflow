import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Sparkles } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { chatWithAI } from '../services/aiService'
import toast from 'react-hot-toast'

export default function AICoach() {
  const { user, userData } = useAuth()
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content: `Hello ${user?.displayName || 'there'}! I'm your AI Financial Coach. I can help you with:\n\n• Budgeting and saving strategies\n• Investment advice and portfolio analysis\n• Financial goal planning\n• Answering finance-related questions\n\nWhat would you like to know?`,
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async (e) => {
    e.preventDefault()
    if (!input.trim() || loading) return

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      // Prepare messages for AI
      const messagesForAI = [...messages, userMessage].map(m => ({
        role: m.role,
        content: m.content,
      }))

      // Call AI service
      const aiResponse = await chatWithAI(messagesForAI, userData)
      
      const assistantMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: aiResponse,
      }
      
      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      toast.error('Failed to get AI response. Please try again.')
      console.error('AI Chat Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const quickQuestions = [
    'How should I start investing?',
    'What is a good emergency fund amount?',
    'How do I create a budget?',
    'Should I pay off debt or invest?',
  ]

  const handleQuickQuestion = (question) => {
    setInput(question)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
          <Sparkles className="text-primary-600" size={32} />
          <span>AI Financial Coach</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Get personalized financial advice powered by AI
        </p>
      </div>

      {/* Quick Questions */}
      <div className="card">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Quick Questions:
        </p>
        <div className="flex flex-wrap gap-2">
          {quickQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => handleQuickQuestion(question)}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg text-sm text-gray-700 dark:text-gray-300 transition-colors"
            >
              {question}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Container */}
      <div className="card p-0 overflow-hidden">
        <div className="h-[600px] flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-3 ${
                  message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.role === 'user'
                      ? 'bg-primary-600 text-white'
                      : 'bg-accent-600 text-white'
                  }`}
                >
                  {message.role === 'user' ? (
                    <User size={20} />
                  ) : (
                    <Bot size={20} />
                  )}
                </div>
                <div
                  className={`flex-1 rounded-lg p-4 ${
                    message.role === 'user'
                      ? 'bg-primary-100 dark:bg-primary-900 text-gray-900 dark:text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 rounded-full bg-accent-600 text-white flex items-center justify-center flex-shrink-0">
                  <Bot size={20} />
                </div>
                <div className="flex-1 rounded-lg p-4 bg-gray-100 dark:bg-gray-700">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="border-t border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything about personal finance..."
                className="flex-1 input-field"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="btn-primary p-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={20} />
              </button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              {userData?.subscription === 'premium' || userData?.subscription === 'lifetime'
                ? 'Unlimited AI conversations'
                : 'Free users: 3 conversations per week. Upgrade for unlimited access.'}
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

