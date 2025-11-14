# 📈 Real-Time Stock Market Feature

## ✅ What's New

A complete **Market** page has been added to FinFlow with real-time stock and cryptocurrency market data!

## 🎯 Features

### 1. **Real-Time Market Data**
- Live stock prices for popular stocks (AAPL, GOOGL, MSFT, AMZN, TSLA, META, NVDA, NFLX)
- Live cryptocurrency prices (BTC, ETH, SOL, ADA, DOT, MATIC)
- Auto-refresh every 30 seconds
- Manual refresh button

### 2. **Symbol Search**
- Search any stock or crypto symbol
- Real-time price lookup
- Price history chart (30-day mock data)
- Shows price, change, and change percentage

### 3. **Market Tables**
- **Popular Stocks Table**: Shows price, change, and change % for top stocks
- **Popular Cryptocurrencies Table**: Shows price, change, and change % for top cryptos
- Color-coded changes (green for positive, red for negative)
- Click any row to view detailed information

### 4. **Price Charts**
- 30-day price history visualization
- Interactive charts with tooltips
- Shows price trends over time

## 🔧 Technical Details

### APIs Used
1. **Alpha Vantage** (for stocks)
   - Free tier: 5 calls/minute, 500 calls/day
   - Set `VITE_ALPHA_VANTAGE_API_KEY` in environment variables
   - Falls back to mock data if API key not set

2. **CoinGecko** (for cryptocurrencies)
   - Free, no API key required
   - Supports major cryptocurrencies
   - Real-time prices and 24h changes

### Market Data Service
- `web/src/services/marketData.js`
- Functions:
  - `getStockPrice(symbol)` - Get stock price
  - `getCryptoPrice(symbol)` - Get crypto price
  - `getMultiplePrices(symbols)` - Get multiple prices at once

### New Page
- `web/src/pages/Market.jsx`
- Route: `/app/market`
- Added to navigation menu

## 📱 User Experience

1. **Navigation**: Click "Market" in the sidebar
2. **View Popular Stocks/Crypto**: Scroll to see popular symbols
3. **Search**: Enter any symbol and click "Search"
4. **View Details**: Click any row in the table to see detailed info
5. **Auto-Refresh**: Prices update automatically every 30 seconds

## 🎨 UI Features

- **Color Coding**: 
  - Green for positive changes
  - Red for negative changes
- **Responsive Design**: Works on mobile and desktop
- **Loading States**: Shows spinner while fetching data
- **Error Handling**: Graceful fallback to mock data if APIs fail

## 🔮 Future Enhancements

Potential additions:
- Historical price data (real API integration)
- Watchlist functionality
- Price alerts
- Market news integration
- Advanced charting (candlesticks, indicators)
- Portfolio comparison with market performance

## 📝 Environment Variables

Optional (for real stock data):
```env
VITE_ALPHA_VANTAGE_API_KEY=your_api_key_here
```

**Note**: The app works without this - it uses mock data as fallback.

## ✨ Result

Your FinFlow app now has a complete real-time market data feature! Users can:
- ✅ View live stock and crypto prices
- ✅ Search any symbol
- ✅ See price changes and trends
- ✅ Track market movements in real-time

**The Market page is fully functional and ready to use!** 🚀

