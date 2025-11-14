// Market data service for real-time stock/crypto prices
// Using Alpha Vantage API (free tier: 5 calls/minute, 500 calls/day)

const ALPHA_VANTAGE_API_KEY = import.meta.env.VITE_ALPHA_VANTAGE_API_KEY || 'demo'

export const getStockPrice = async (symbol) => {
  try {
    // If no API key, return mock data
    if (!ALPHA_VANTAGE_API_KEY || ALPHA_VANTAGE_API_KEY === 'demo') {
      return getMockStockPrice(symbol)
    }

    const response = await fetch(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`
    )

    // Handle rate limiting and errors
    if (!response.ok) {
      if (response.status === 429) {
        console.warn('Alpha Vantage rate limit reached, using mock data')
        return getMockStockPrice(symbol)
      }
      throw new Error(`API error: ${response.status}`)
    }

    const contentType = response.headers.get('content-type')
    if (!contentType || !contentType.includes('application/json')) {
      console.warn('Non-JSON response from Alpha Vantage, using mock data')
      return getMockStockPrice(symbol)
    }

    const data = await response.json()

    // Check for API errors
    if (data['Error Message'] || data['Note']) {
      console.warn('Alpha Vantage API error, using mock data:', data['Error Message'] || data['Note'])
      return getMockStockPrice(symbol)
    }

    if (data['Global Quote'] && data['Global Quote']['05. price']) {
      const quote = data['Global Quote']
      const price = parseFloat(quote['05. price']) || 0
      const change = parseFloat(quote['09. change']) || 0
      const changePercentStr = quote['10. change percent'] || '0%'
      const changePercent = parseFloat(changePercentStr.replace('%', '')) || 0

      return {
        symbol: quote['01. symbol'] || symbol.toUpperCase(),
        price: price,
        change: change,
        changePercent: changePercent,
        timestamp: new Date().toISOString(),
      }
    }

    // Fallback to mock if API fails
    return getMockStockPrice(symbol)
  } catch (error) {
    console.error('Error fetching stock price:', error)
    // Return mock data on error
    return getMockStockPrice(symbol)
  }
}

// Helper function for mock stock prices
const getMockStockPrice = (symbol) => {
  const mockPrices = {
    AAPL: 185,
    GOOGL: 140,
    MSFT: 380,
    AMZN: 150,
    TSLA: 250,
    META: 350,
    NVDA: 500,
    NFLX: 450,
  }
  const basePrice = mockPrices[symbol.toUpperCase()] || (Math.random() * 200 + 50)
  const variation = (Math.random() * 0.1 - 0.05) // ±5% variation
  const price = basePrice * (1 + variation)
  const changePercent = (Math.random() * 10 - 5) // -5% to +5%
  const change = (price * changePercent) / 100

  return {
    symbol: symbol.toUpperCase(),
    price: parseFloat(price.toFixed(2)),
    change: parseFloat(change.toFixed(2)),
    changePercent: parseFloat(changePercent.toFixed(2)),
    timestamp: new Date().toISOString(),
  }
}

export const getCryptoPrice = async (symbol) => {
  try {
    // Map common crypto symbols to CoinGecko IDs
    const cryptoIdMap = {
      'btc': 'bitcoin',
      'eth': 'ethereum',
      'sol': 'solana',
      'ada': 'cardano',
      'dot': 'polkadot',
      'matic': 'matic-network',
      'bnb': 'binancecoin',
      'xrp': 'ripple',
      'doge': 'dogecoin',
      'avax': 'avalanche-2',
      'link': 'chainlink',
      'ltc': 'litecoin',
    }

    const cryptoId = cryptoIdMap[symbol.toLowerCase()] || symbol.toLowerCase()
    
    // Using CoinGecko API (free, no API key needed)
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${cryptoId}&vs_currencies=usd&include_24hr_change=true`
    )

    // Handle rate limiting (429) and other errors
    if (!response.ok) {
      if (response.status === 429) {
        console.warn('CoinGecko rate limit reached, using mock data')
        return getMockCryptoPrice(symbol)
      }
      // For other errors, try to parse but fallback to mock
      const text = await response.text()
      if (text.includes('Throttled') || text.includes('rate limit')) {
        return getMockCryptoPrice(symbol)
      }
      throw new Error(`API error: ${response.status}`)
    }

    const contentType = response.headers.get('content-type')
    if (!contentType || !contentType.includes('application/json')) {
      console.warn('Non-JSON response from CoinGecko, using mock data')
      return getMockCryptoPrice(symbol)
    }

    const data = await response.json()

    // Check if response is an error object
    if (data.error || data.status?.error_code) {
      console.warn('CoinGecko API error, using mock data:', data.error || data.status)
      return getMockCryptoPrice(symbol)
    }

    if (data[cryptoId]) {
      const crypto = data[cryptoId]
      const price = parseFloat(crypto.usd) || 0
      const changePercent = parseFloat(crypto.usd_24h_change) || 0
      const change = (price * changePercent) / 100
      
      return {
        symbol: symbol.toUpperCase(),
        price: price,
        change: change,
        changePercent: changePercent,
        timestamp: new Date().toISOString(),
      }
    }

    // Fallback to mock if data not found
    return getMockCryptoPrice(symbol)
  } catch (error) {
    console.error('Error fetching crypto price:', error)
    return getMockCryptoPrice(symbol)
  }
}

// Helper function for mock crypto prices
const getMockCryptoPrice = (symbol) => {
  const mockPrices = {
    btc: 42500,
    eth: 2650,
    sol: 100,
    ada: 0.5,
    dot: 7,
    matic: 0.8,
    bnb: 300,
    xrp: 0.6,
    doge: 0.08,
    avax: 35,
    link: 15,
    ltc: 70,
  }
  const basePrice = mockPrices[symbol.toLowerCase()] || 100
  const variation = (Math.random() * 0.1 - 0.05) // ±5% variation
  const price = basePrice * (1 + variation)
  const changePercent = (Math.random() * 10 - 5) // -5% to +5%
  const change = (price * changePercent) / 100

  return {
    symbol: symbol.toUpperCase(),
    price: parseFloat(price.toFixed(2)),
    change: parseFloat(change.toFixed(2)),
    changePercent: parseFloat(changePercent.toFixed(2)),
    timestamp: new Date().toISOString(),
  }
}

export const getMultiplePrices = async (symbols) => {
  const promises = symbols.map((symbol) => {
    // Determine if it's crypto or stock
    const cryptoSymbols = ['BTC', 'ETH', 'SOL', 'ADA', 'DOT', 'MATIC']
    if (cryptoSymbols.includes(symbol.toUpperCase())) {
      return getCryptoPrice(symbol)
    }
    return getStockPrice(symbol)
  })

  return Promise.all(promises)
}

