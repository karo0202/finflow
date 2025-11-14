// Market data service for real-time stock/crypto prices
// Using Alpha Vantage API (free tier: 5 calls/minute, 500 calls/day)

const ALPHA_VANTAGE_API_KEY = import.meta.env.VITE_ALPHA_VANTAGE_API_KEY || 'demo'

export const getStockPrice = async (symbol) => {
  try {
    // If no API key, return mock data
    if (!ALPHA_VANTAGE_API_KEY || ALPHA_VANTAGE_API_KEY === 'demo') {
      return {
        symbol: symbol.toUpperCase(),
        price: (Math.random() * 200 + 50).toFixed(2),
        change: (Math.random() * 10 - 5).toFixed(2),
        changePercent: ((Math.random() * 10 - 5)).toFixed(2),
        timestamp: new Date().toISOString(),
      }
    }

    const response = await fetch(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`
    )
    const data = await response.json()

    if (data['Global Quote'] && data['Global Quote']['05. price']) {
      const quote = data['Global Quote']
      return {
        symbol: quote['01. symbol'],
        price: parseFloat(quote['05. price']),
        change: parseFloat(quote['09. change']),
        changePercent: parseFloat(quote['10. change percent'].replace('%', '')),
        timestamp: new Date().toISOString(),
      }
    }

    // Fallback to mock if API fails
    return {
      symbol: symbol.toUpperCase(),
      price: (Math.random() * 200 + 50).toFixed(2),
      change: (Math.random() * 10 - 5).toFixed(2),
      changePercent: ((Math.random() * 10 - 5)).toFixed(2),
      timestamp: new Date().toISOString(),
    }
  } catch (error) {
    console.error('Error fetching stock price:', error)
    // Return mock data on error
    return {
      symbol: symbol.toUpperCase(),
      price: (Math.random() * 200 + 50).toFixed(2),
      change: (Math.random() * 10 - 5).toFixed(2),
      changePercent: ((Math.random() * 10 - 5)).toFixed(2),
      timestamp: new Date().toISOString(),
    }
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
    const data = await response.json()

    if (data[cryptoId]) {
      const crypto = data[cryptoId]
      const price = crypto.usd
      const changePercent = crypto.usd_24h_change || 0
      const change = (price * changePercent) / 100
      
      return {
        symbol: symbol.toUpperCase(),
        price: price,
        change: change,
        changePercent: changePercent,
        timestamp: new Date().toISOString(),
      }
    }

    // Fallback for common cryptos
    const mockPrices = {
      btc: 42500,
      eth: 2650,
      sol: 100,
    }
    const price = mockPrices[symbol.toLowerCase()] || 100

    return {
      symbol: symbol.toUpperCase(),
      price: price + (Math.random() * 1000 - 500),
      change: (Math.random() * 10 - 5).toFixed(2),
      changePercent: ((Math.random() * 10 - 5)).toFixed(2),
      timestamp: new Date().toISOString(),
    }
  } catch (error) {
    console.error('Error fetching crypto price:', error)
    return {
      symbol: symbol.toUpperCase(),
      price: 100,
      change: 0,
      changePercent: 0,
      timestamp: new Date().toISOString(),
    }
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

