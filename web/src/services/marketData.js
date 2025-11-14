// Market data service for real-time stock/crypto prices
// Using multiple APIs for better accuracy and reliability

const ALPHA_VANTAGE_API_KEY = import.meta.env.VITE_ALPHA_VANTAGE_API_KEY || 'demo'

// Get stock price from Yahoo Finance (more reliable, no API key needed)
export const getStockPrice = async (symbol) => {
  try {
    // Try Yahoo Finance first (most reliable, no API key needed)
    try {
      const yahooResponse = await fetch(
        `https://query1.finance.yahoo.com/v8/finance/chart/${symbol.toUpperCase()}?interval=1d&range=1d`
      )
      
      if (yahooResponse.ok) {
        const yahooData = await yahooResponse.json()
        
        if (yahooData.chart?.result?.[0]) {
          const result = yahooData.chart.result[0]
          const currentPrice = result.meta?.regularMarketPrice || result.meta?.previousClose
          const previousClose = result.meta?.previousClose || currentPrice
          const change = currentPrice - previousClose
          const changePercent = previousClose ? (change / previousClose) * 100 : 0
          
          if (currentPrice) {
            return {
              symbol: symbol.toUpperCase(),
              price: parseFloat(currentPrice.toFixed(2)),
              change: parseFloat(change.toFixed(2)),
              changePercent: parseFloat(changePercent.toFixed(2)),
              timestamp: new Date().toISOString(),
              source: 'Yahoo Finance',
              isReal: true,
            }
          }
        }
      }
    } catch (yahooError) {
      console.warn('Yahoo Finance failed, trying Alpha Vantage:', yahooError)
    }

    // Fallback to Alpha Vantage if API key is available
    if (ALPHA_VANTAGE_API_KEY && ALPHA_VANTAGE_API_KEY !== 'demo') {
      const response = await fetch(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`
      )

      if (response.ok) {
        const contentType = response.headers.get('content-type')
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json()

          if (!data['Error Message'] && !data['Note'] && data['Global Quote'] && data['Global Quote']['05. price']) {
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
              source: 'Alpha Vantage',
              isReal: true,
            }
          }
        }
      }
    }

    // Final fallback to mock data
    const mockData = getMockStockPrice(symbol)
    return { ...mockData, source: 'Mock Data', isReal: false }
  } catch (error) {
    console.error('Error fetching stock price:', error)
    const mockData = getMockStockPrice(symbol)
    return { ...mockData, source: 'Mock Data', isReal: false }
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
    source: 'Mock Data',
    isReal: false,
  }
}

export const getCryptoPrice = async (symbol) => {
  try {
    // Map common crypto symbols to various API formats
    const cryptoIdMap = {
      'btc': { coingecko: 'bitcoin', binance: 'BTCUSDT', okx: 'BTC-USDT' },
      'eth': { coingecko: 'ethereum', binance: 'ETHUSDT', okx: 'ETH-USDT' },
      'sol': { coingecko: 'solana', binance: 'SOLUSDT', okx: 'SOL-USDT' },
      'ada': { coingecko: 'cardano', binance: 'ADAUSDT', okx: 'ADA-USDT' },
      'dot': { coingecko: 'polkadot', binance: 'DOTUSDT', okx: 'DOT-USDT' },
      'matic': { coingecko: 'matic-network', binance: 'MATICUSDT', okx: 'MATIC-USDT' },
      'bnb': { coingecko: 'binancecoin', binance: 'BNBUSDT', okx: 'BNB-USDT' },
      'xrp': { coingecko: 'ripple', binance: 'XRPUSDT', okx: 'XRP-USDT' },
      'doge': { coingecko: 'dogecoin', binance: 'DOGEUSDT', okx: 'DOGE-USDT' },
      'avax': { coingecko: 'avalanche-2', binance: 'AVAXUSDT', okx: 'AVAX-USDT' },
      'link': { coingecko: 'chainlink', binance: 'LINKUSDT', okx: 'LINK-USDT' },
      'ltc': { coingecko: 'litecoin', binance: 'LTCUSDT', okx: 'LTC-USDT' },
    }

    const cryptoInfo = cryptoIdMap[symbol.toLowerCase()] || {
      coingecko: symbol.toLowerCase(),
      binance: `${symbol.toUpperCase()}USDT`,
      okx: `${symbol.toUpperCase()}-USDT`
    }

    // Try Binance API first (most accurate, real-time)
    if (cryptoInfo.binance) {
      try {
        const binanceResponse = await fetch(
          `https://api.binance.com/api/v3/ticker/24hr?symbol=${cryptoInfo.binance}`
        )
        
        if (binanceResponse.ok) {
          const binanceData = await binanceResponse.json()
          
          if (binanceData.lastPrice) {
            const price = parseFloat(binanceData.lastPrice)
            const changePercent = parseFloat(binanceData.priceChangePercent) || 0
            const change = (price * changePercent) / 100
            
            return {
              symbol: symbol.toUpperCase(),
              price: price,
              change: change,
              changePercent: changePercent,
              timestamp: new Date().toISOString(),
              source: 'Binance',
              isReal: true,
            }
          }
        }
      } catch (binanceError) {
        console.warn('Binance API failed, trying CoinGecko:', binanceError)
      }
    }

    // Fallback to CoinGecko
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${cryptoInfo.coingecko}&vs_currencies=usd&include_24hr_change=true`
      )

      if (response.ok) {
        const contentType = response.headers.get('content-type')
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json()

          if (!data.error && !data.status?.error_code && data[cryptoInfo.coingecko]) {
            const crypto = data[cryptoInfo.coingecko]
            const price = parseFloat(crypto.usd) || 0
            const changePercent = parseFloat(crypto.usd_24h_change) || 0
            const change = (price * changePercent) / 100
            
            return {
              symbol: symbol.toUpperCase(),
              price: price,
              change: change,
              changePercent: changePercent,
              timestamp: new Date().toISOString(),
              source: 'CoinGecko',
              isReal: true,
            }
          }
        }
      }
    } catch (coingeckoError) {
      console.warn('CoinGecko API failed:', coingeckoError)
    }

    // Final fallback to mock data
    const mockData = getMockCryptoPrice(symbol)
    return { ...mockData, source: 'Mock Data', isReal: false }
  } catch (error) {
    console.error('Error fetching crypto price:', error)
    const mockData = getMockCryptoPrice(symbol)
    return { ...mockData, source: 'Mock Data', isReal: false }
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
    source: 'Mock Data',
    isReal: false,
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

