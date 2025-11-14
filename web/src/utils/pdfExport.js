// PDF Export utility using jsPDF
// Note: You'll need to install jsPDF: npm install jspdf

export const generatePortfolioPDF = async (portfolio, holdings) => {
  try {
    // Dynamic import to avoid bundle size issues if not used
    const { jsPDF } = await import('jspdf')
    const doc = new jsPDF()
    
    // Title
    doc.setFontSize(20)
    doc.text('Portfolio Report', 20, 20)
    
    // Date
    doc.setFontSize(10)
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 20, 30)
    
    // Portfolio Summary
    doc.setFontSize(16)
    doc.text('Portfolio Summary', 20, 45)
    
    doc.setFontSize(12)
    doc.text(`Total Value: $${(portfolio.totalValue || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 20, 55)
    doc.text(`Number of Holdings: ${holdings.length}`, 20, 62)
    
    // Holdings Table
    let yPos = 75
    doc.setFontSize(14)
    doc.text('Holdings', 20, yPos)
    
    yPos += 10
    doc.setFontSize(10)
    
    // Table headers
    doc.setFont(undefined, 'bold')
    doc.text('Symbol', 20, yPos)
    doc.text('Name', 50, yPos)
    doc.text('Quantity', 100, yPos)
    doc.text('Price', 130, yPos)
    doc.text('Value', 160, yPos)
    
    yPos += 5
    doc.setFont(undefined, 'normal')
    
    holdings.forEach((holding, index) => {
      if (yPos > 270) {
        doc.addPage()
        yPos = 20
      }
      
      doc.text(holding.symbol || 'N/A', 20, yPos)
      doc.text((holding.name || 'N/A').substring(0, 20), 50, yPos)
      doc.text((holding.shares || holding.amount || 0).toString(), 100, yPos)
      doc.text(`$${(holding.price || 0).toFixed(2)}`, 130, yPos)
      doc.text(`$${(holding.value || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 160, yPos)
      
      yPos += 7
    })
    
    // Save
    doc.save(`portfolio-report-${new Date().toISOString().split('T')[0]}.pdf`)
  } catch (error) {
    console.error('Error generating PDF:', error)
    // Fallback: if jsPDF is not installed, show message
    if (error.message.includes('Cannot find module')) {
      alert('PDF export requires jsPDF. Install it with: npm install jspdf')
    } else {
      throw error
    }
  }
}

export const generateTransactionsPDF = async (transactions, budget) => {
  try {
    const { jsPDF } = await import('jspdf')
    const doc = new jsPDF()
    
    // Title
    doc.setFontSize(20)
    doc.text('Transaction Report', 20, 20)
    
    doc.setFontSize(10)
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 20, 30)
    
    // Summary
    doc.setFontSize(16)
    doc.text('Summary', 20, 45)
    
    doc.setFontSize(12)
    const income = transactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0)
    const expenses = transactions.filter(t => t.amount < 0).reduce((sum, t) => sum + Math.abs(t.amount), 0)
    doc.text(`Total Income: $${income.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 20, 55)
    doc.text(`Total Expenses: $${expenses.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 20, 62)
    doc.text(`Net: $${(income - expenses).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 20, 69)
    
    // Transactions
    let yPos = 85
    doc.setFontSize(14)
    doc.text('Recent Transactions', 20, yPos)
    
    yPos += 10
    doc.setFontSize(10)
    
    // Headers
    doc.setFont(undefined, 'bold')
    doc.text('Date', 20, yPos)
    doc.text('Description', 50, yPos)
    doc.text('Category', 110, yPos)
    doc.text('Amount', 150, yPos)
    
    yPos += 5
    doc.setFont(undefined, 'normal')
    
    transactions.slice(0, 20).forEach((transaction) => {
      if (yPos > 270) {
        doc.addPage()
        yPos = 20
      }
      
      const date = transaction.date instanceof Date 
        ? transaction.date.toLocaleDateString()
        : new Date(transaction.date).toLocaleDateString()
      
      doc.text(date, 20, yPos)
      doc.text((transaction.description || 'N/A').substring(0, 25), 50, yPos)
      doc.text((transaction.category || 'N/A').substring(0, 15), 110, yPos)
      doc.text(`$${Math.abs(transaction.amount || 0).toFixed(2)}`, 150, yPos)
      
      yPos += 7
    })
    
    doc.save(`transactions-report-${new Date().toISOString().split('T')[0]}.pdf`)
  } catch (error) {
    console.error('Error generating PDF:', error)
    if (error.message.includes('Cannot find module')) {
      alert('PDF export requires jsPDF. Install it with: npm install jspdf')
    } else {
      throw error
    }
  }
}

export const generateGoalsPDF = async (goals) => {
  try {
    const { jsPDF } = await import('jspdf')
    const doc = new jsPDF()
    
    // Title
    doc.setFontSize(20)
    doc.text('Goals Report', 20, 20)
    
    doc.setFontSize(10)
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 20, 30)
    
    // Summary
    doc.setFontSize(16)
    doc.text('Summary', 20, 45)
    
    doc.setFontSize(12)
    const totalGoals = goals.length
    const completedGoals = goals.filter(g => (g.current || 0) >= (g.target || 0)).length
    const totalTarget = goals.reduce((sum, g) => sum + (g.target || 0), 0)
    const totalCurrent = goals.reduce((sum, g) => sum + (g.current || 0), 0)
    
    doc.text(`Total Goals: ${totalGoals}`, 20, 55)
    doc.text(`Completed: ${completedGoals}`, 20, 62)
    doc.text(`Total Target: $${totalTarget.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 20, 69)
    doc.text(`Total Progress: $${totalCurrent.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 20, 76)
    
    // Goals List
    let yPos = 90
    doc.setFontSize(14)
    doc.text('Goals', 20, yPos)
    
    yPos += 10
    doc.setFontSize(10)
    
    goals.forEach((goal) => {
      if (yPos > 270) {
        doc.addPage()
        yPos = 20
      }
      
      doc.setFont(undefined, 'bold')
      doc.text(goal.name || 'Unnamed Goal', 20, yPos)
      
      yPos += 5
      doc.setFont(undefined, 'normal')
      doc.text(`Target: $${(goal.target || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 20, yPos)
      doc.text(`Current: $${(goal.current || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 100, yPos)
      
      const progress = ((goal.current || 0) / (goal.target || 1)) * 100
      doc.text(`Progress: ${progress.toFixed(1)}%`, 160, yPos)
      
      yPos += 10
    })
    
    doc.save(`goals-report-${new Date().toISOString().split('T')[0]}.pdf`)
  } catch (error) {
    console.error('Error generating PDF:', error)
    if (error.message.includes('Cannot find module')) {
      alert('PDF export requires jsPDF. Install it with: npm install jspdf')
    } else {
      throw error
    }
  }
}

