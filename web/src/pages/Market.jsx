import { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, Search, RefreshCw, DollarSign, Info, AlertCircle } from 'lucide-react'
import { getStockPrice, getCryptoPrice, getMultiplePrices } from '../services/marketData'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import toast from 'react-hot-toast'

const POPULAR_STOCKS = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA', 'META', 'NVDA', 'NFLX']
const POPULAR_CRYPTO = ['BTC', 'ETH', 'SOL', 'ADA', 'DOT', 'MATIC']

export default function Market() {
  const [stocks, setStocks] = useState([])
  const [crypto, setCrypto] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResult, setSearchResult] = useState(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [selectedSymbol, setSelectedSymbol] = useState(null)
  const [priceHistory, setPriceHistory] = useState([])

  useEffect(() => {
    fetchMarketData()
    // Auto-refresh every 60 seconds (reduced frequency to avoid rate limits)
    const interval = setInterval(() => {
      fetchMarketData()
    }, 60000) // Changed from 30s to 60s

    return () => clearInterval(interval)
  }, [])

  const fetchMarketData = async () => {
    setUpdating(true)
    try {
      // Fetch popular stocks
      const stockPrices = await getMultiplePrices(POPULAR_STOCKS)
      setStocks(stockPrices)

      // Fetch popular crypto
      const cryptoSymbols = POPULAR_CRYPTO.map(s => s.toLowerCase())
      const cryptoPrices = await Promise.all(
        cryptoSymbols.map(symbol => getCryptoPrice(symbol))
      )
      setCrypto(cryptoPrices)

      setLoading(false)
    } catch (error) {
      console.error('Error fetching market data:', error)
      toast.error('Failed to fetch market data')
      setLoading(false)
    } finally {
      setUpdating(false)
    }
  }

  const handleSearch = async () => {
    if (!searchTerm.trim()) return

    try {
      const symbol = searchTerm.toUpperCase().trim()
      // Try stock first
      let result = await getStockPrice(symbol)
      
      // If stock fails, try crypto
      if (!result || result.price === 0) {
        result = await getCryptoPrice(symbol.toLowerCase())
      }

      if (result && result.price) {
        setSearchResult(result)
        setSelectedSymbol(symbol)
        // Generate mock price history
        generatePriceHistory(result)
      } else {
        toast.error('Symbol not found')
        setSearchResult(null)
      }
    } catch (error) {
      console.error('Error searching:', error)
      toast.error('Failed to search symbol')
    }
  }

  const generatePriceHistory = (currentPrice) => {
    // Generate 30 days of mock historical data
    const history = []
    const basePrice = currentPrice.price
    for (let i = 29; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      const variation = (Math.random() - 0.5) * 0.1 // ±5% variation
      history.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        price: basePrice * (1 + variation),
      })
    }
    setPriceHistory(history)
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price)
  }

  const formatChange = (change, changePercent) => {
    const changeNum = parseFloat(change) || 0
    const changePercentNum = parseFloat(changePercent) || 0
    const isPositive = changeNum >= 0
    return (
      <span className={isPositive ? 'text-green-600' : 'text-red-600'}>
        {isPositive ? '+' : ''}{formatPrice(changeNum)} ({isPositive ? '+' : ''}{changePercentNum.toFixed(2)}%)
      </span>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Market</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Real-time stock and cryptocurrency prices
          </p>
        </div>
        <button
          onClick={fetchMarketData}
          disabled={updating}
          className="btn-secondary flex items-center space-x-2"
        >
          <RefreshCw size={20} className={updating ? 'animate-spin' : ''} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Data Source Disclaimer */}
      <div className="card bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
        <div className="flex items-start space-x-3">
          <Info className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" size={20} />
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">About Price Data</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Prices are sourced from <strong>Yahoo Finance</strong> (stocks) and <strong>Binance/CoinGecko</strong> (crypto) APIs. 
              Prices may differ slightly from exchange platforms like OKX due to:
            </p>
            <ul className="text-sm text-gray-600 dark:text-gray-400 mt-2 ml-4 list-disc space-y-1">
              <li>Different liquidity and trading volumes</li>
              <li>Exchange-specific fees and spreads</li>
              <li>Regional market conditions</li>
              <li>Data update frequency (prices update every 60 seconds)</li>
            </ul>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
              For trading decisions, always check prices directly on your exchange platform.
            </p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Search Symbol</h2>
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Enter symbol (e.g., AAPL, BTC)"
              className="input-field pl-10"
            />
          </div>
          <button onClick={handleSearch} className="btn-primary">
            Search
          </button>
        </div>

        {searchResult && (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-2xl font-bold">{searchResult.symbol}</h3>
                  {searchResult.source && (
                    <span className={`text-xs px-2 py-1 rounded ${
                      searchResult.isReal 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    }`}>
                      {searchResult.source}
                    </span>
                  )}
                </div>
                <p className="text-3xl font-bold mt-2">{formatPrice(searchResult.price)}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {formatChange(searchResult.change || 0, searchResult.changePercent || 0)}
                </p>
              </div>
              {searchResult.change >= 0 ? (
                <TrendingUp className="text-green-600" size={48} />
              ) : (
                <TrendingDown className="text-red-600" size={48} />
              )}
            </div>

            {priceHistory.length > 0 && (
              <div className="mt-6">
                <h4 className="text-sm font-semibold mb-2">30-Day Price History</h4>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={priceHistory}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip formatter={(value) => formatPrice(value)} />
                    <Line type="monotone" dataKey="price" stroke="#22c55e" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Stocks */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold flex items-center space-x-2">
            <DollarSign size={24} />
            <span>Popular Stocks</span>
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 text-sm font-semibold">Symbol</th>
                <th className="text-right py-3 px-4 text-sm font-semibold">Price</th>
                <th className="text-right py-3 px-4 text-sm font-semibold">Change</th>
                <th className="text-right py-3 px-4 text-sm font-semibold">Change %</th>
                <th className="text-right py-3 px-4 text-sm font-semibold">Source</th>
              </tr>
            </thead>
            <tbody>
              {stocks.map((stock) => (
                <tr
                  key={stock.symbol}
                  className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                  onClick={() => {
                    setSearchTerm(stock.symbol)
                    setSearchResult(stock)
                    setSelectedSymbol(stock.symbol)
                    generatePriceHistory(stock)
                  }}
                >
                  <td className="py-3 px-4">
                    <span className="font-semibold text-gray-900 dark:text-white">{stock.symbol}</span>
                  </td>
                  <td className="py-3 px-4 text-right font-semibold">
                    {formatPrice(stock.price)}
                  </td>
                  <td className={`py-3 px-4 text-right ${
                    stock.change >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stock.change >= 0 ? '+' : ''}{formatPrice(stock.change)}
                  </td>
                  <td className={`py-3 px-4 text-right ${
                    (stock.changePercent || 0) >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {(stock.changePercent || 0) >= 0 ? '+' : ''}{((stock.changePercent || 0)).toFixed(2)}%
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className={`text-xs px-2 py-1 rounded ${
                      stock.isReal 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    }`}>
                      {stock.source || 'Unknown'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Crypto */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold flex items-center space-x-2">
            <DollarSign size={24} />
            <span>Popular Cryptocurrencies</span>
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 text-sm font-semibold">Symbol</th>
                <th className="text-right py-3 px-4 text-sm font-semibold">Price</th>
                <th className="text-right py-3 px-4 text-sm font-semibold">Change</th>
                <th className="text-right py-3 px-4 text-sm font-semibold">Change %</th>
              </tr>
            </thead>
            <tbody>
              {crypto.map((coin) => (
                <tr
                  key={coin.symbol}
                  className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                  onClick={() => {
                    setSearchTerm(coin.symbol)
                    setSearchResult(coin)
                    setSelectedSymbol(coin.symbol)
                    generatePriceHistory(coin)
                  }}
                >
                  <td className="py-3 px-4">
                    <span className="font-semibold text-gray-900 dark:text-white">{coin.symbol}</span>
                  </td>
                  <td className="py-3 px-4 text-right font-semibold">
                    {formatPrice(coin.price)}
                  </td>
                  <td className={`py-3 px-4 text-right ${
                    coin.change >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {coin.change >= 0 ? '+' : ''}{formatPrice(coin.change)}
                  </td>
                  <td className={`py-3 px-4 text-right ${
                    (coin.changePercent || 0) >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {(coin.changePercent || 0) >= 0 ? '+' : ''}{((coin.changePercent || 0)).toFixed(2)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

