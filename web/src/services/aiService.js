import openai from '../config/openai'

export const chatWithAI = async (messages, userData = null) => {
  try {
    // Check if OpenAI API key is configured
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY
    
    if (!apiKey || apiKey === 'your-api-key-here') {
      // Return intelligent mock response if API key not configured
      return getMockResponse(messages[messages.length - 1]?.content || '')
    }

    // Prepare system message with context
    const systemMessage = {
      role: 'system',
      content: `You are a helpful AI financial coach. Provide practical, actionable financial advice. 
      Be concise but thorough. Focus on:
      - Budgeting and saving strategies
      - Investment basics and portfolio management
      - Debt management
      - Financial goal setting
      - Risk management
      
      Always remind users to consult with certified financial advisors for personalized advice.`
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [systemMessage, ...messages],
      max_tokens: 500,
      temperature: 0.7,
    })

    return response.choices[0].message.content
  } catch (error) {
    console.error('OpenAI API Error:', error)
    // Fallback to mock response
    return getMockResponse(messages[messages.length - 1]?.content || '')
  }
}

const getMockResponse = (userMessage) => {
  const message = userMessage.toLowerCase()
  
  if (message.includes('invest') || message.includes('investment')) {
    return `Great question about investing! Here's my advice:

**Start with the basics:**
1. **Emergency Fund First**: Build 3-6 months of expenses before investing
2. **Diversify**: Don't put all your money in one stock or asset
3. **Index Funds**: Low-cost index funds are great for beginners
4. **Dollar-Cost Averaging**: Invest regularly, regardless of market conditions
5. **Long-term Focus**: Investing is a marathon, not a sprint

**Next Steps:**
- Start with a small amount you can afford to lose
- Consider a robo-advisor or low-cost index fund
- Automate your investments
- Review and rebalance quarterly

Remember: Past performance doesn't guarantee future results. Always do your own research or consult a financial advisor.`
  }
  
  if (message.includes('budget') || message.includes('save')) {
    return `Here's how to create and stick to a budget:

**The 50/30/20 Rule:**
- 50% for needs (housing, food, utilities)
- 30% for wants (entertainment, dining out)
- 20% for savings and debt repayment

**Budgeting Steps:**
1. Track all expenses for a month
2. Categorize spending
3. Set realistic limits
4. Use budgeting apps (like FinFlow!)
5. Review and adjust monthly

**Saving Tips:**
- Pay yourself first (automate savings)
- Cut unnecessary subscriptions
- Cook at home more
- Use cashback apps
- Set specific savings goals

Start small and build the habit. Even saving $50/month adds up over time!`
  }
  
  if (message.includes('debt') || message.includes('pay off')) {
    return `Managing debt effectively:

**Debt Payoff Strategies:**
1. **Debt Snowball**: Pay smallest debts first (psychological wins)
2. **Debt Avalanche**: Pay highest interest first (saves money)
3. **Debt Consolidation**: Combine debts into one payment

**Priority Order:**
1. High-interest credit card debt
2. Personal loans
3. Student loans
4. Mortgage (lowest priority)

**Tips:**
- Pay more than minimum when possible
- Consider balance transfer cards (0% APR)
- Negotiate lower interest rates
- Stop using credit cards while paying off

**Should you invest or pay debt?**
- If debt interest > potential investment returns, pay debt first
- If debt interest < 4%, you might invest while paying minimums

Focus on high-interest debt first!`
  }
  
  if (message.includes('emergency') || message.includes('fund')) {
    return `Emergency funds are crucial for financial security:

**How Much:**
- Minimum: 3 months of expenses
- Recommended: 6 months
- If self-employed: 9-12 months

**What Counts:**
- Essential expenses only (housing, food, utilities, insurance)
- Not discretionary spending

**Where to Keep It:**
- High-yield savings account
- Easily accessible (not locked in investments)
- Separate from checking account

**Building It:**
- Start with $1,000 goal
- Then build to 3 months
- Automate monthly contributions
- Use windfalls (tax refunds, bonuses)

**When to Use:**
- Job loss
- Medical emergencies
- Major car/home repairs
- Unexpected expenses

Start building yours today - even $25/month helps!`
  }
  
  if (message.includes('goal') || message.includes('save for')) {
    return `Setting financial goals:

**SMART Goals:**
- **Specific**: "Save $10,000 for down payment"
- **Measurable**: Track progress monthly
- **Achievable**: Realistic for your income
- **Relevant**: Aligns with your values
- **Time-bound**: "By December 2025"

**Goal Categories:**
1. **Short-term** (0-1 year): Emergency fund, vacation
2. **Medium-term** (1-5 years): Car, home down payment
3. **Long-term** (5+ years): Retirement, kids' education

**Tips:**
- Write goals down
- Break into smaller milestones
- Automate savings
- Review quarterly
- Celebrate progress

**Prioritize:**
1. Emergency fund
2. High-interest debt
3. Retirement savings
4. Other goals

Use FinFlow's goal tracker to stay on track!`
  }
  
  // Default response
  return `I'd be happy to help with your financial question! 

As your AI financial coach, I can assist with:
- **Budgeting** and expense tracking
- **Investment** strategies and portfolio management
- **Debt** payoff strategies
- **Emergency fund** planning
- **Financial goals** and saving strategies
- **Retirement** planning basics

Could you provide more details about what you'd like to know? I can give you more specific advice based on your situation.

**Remember**: While I can provide general guidance, always consult with a certified financial advisor for personalized advice tailored to your specific circumstances.`
}

