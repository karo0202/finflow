// Export utilities for generating reports

export const exportToCSV = (data, filename = 'export.csv') => {
  if (!data || data.length === 0) {
    alert('No data to export')
    return
  }

  // Get headers from first object
  const headers = Object.keys(data[0])
  
  // Create CSV content
  const csvContent = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        const value = row[header]
        // Handle values with commas or quotes
        if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
          return `"${value.replace(/"/g, '""')}"`
        }
        return value
      }).join(',')
    )
  ].join('\n')

  // Create blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  
  link.setAttribute('href', url)
  link.setAttribute('download', filename)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export const exportTransactionsToCSV = (transactions) => {
  const csvData = transactions.map(t => ({
    Date: new Date(t.date).toLocaleDateString(),
    Description: t.description,
    Category: t.category,
    Type: t.type,
    Amount: t.amount,
  }))
  
  exportToCSV(csvData, `transactions-${new Date().toISOString().split('T')[0]}.csv`)
}

export const exportPortfolioToCSV = (holdings) => {
  const csvData = holdings.map(h => ({
    Symbol: h.symbol,
    Name: h.name,
    Type: h.type,
    Quantity: h.shares || h.amount,
    Price: h.price,
    Value: h.value || (h.price * (h.shares || h.amount || 0)),
    Change: `${h.change || 0}%`,
  }))
  
  exportToCSV(csvData, `portfolio-${new Date().toISOString().split('T')[0]}.csv`)
}

export const generatePortfolioReport = (portfolio, transactions, goals) => {
  const report = {
    generatedAt: new Date().toISOString(),
    portfolio: {
      totalValue: portfolio.totalValue || 0,
      holdings: portfolio.holdings?.length || 0,
    },
    transactions: {
      total: transactions.length,
      income: transactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0),
      expenses: transactions.filter(t => t.amount < 0).reduce((sum, t) => sum + Math.abs(t.amount), 0),
    },
    goals: {
      total: goals.length,
      completed: goals.filter(g => (g.current || 0) >= (g.target || 0)).length,
      inProgress: goals.filter(g => (g.current || 0) < (g.target || 0)).length,
    },
  }

  return report
}

