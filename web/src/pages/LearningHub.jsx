import { useState } from 'react'
import { BookOpen, CheckCircle, Lock, Play, Award, TrendingUp, ExternalLink, Shield, FileText, Video, Link as LinkIcon } from 'lucide-react'

export default function LearningHub() {
  const [lessons, setLessons] = useState([
    {
      id: 1,
      title: 'Introduction to Personal Finance',
      description: 'Learn the fundamentals of managing your money, creating budgets, and building a strong financial foundation. Based on guidance from the Consumer Financial Protection Bureau (CFPB) and Federal Reserve.',
      duration: '20 min',
      level: 'Beginner',
      completed: false,
      category: 'Basics',
      source: 'CFPB & Federal Reserve',
      content: {
        sections: [
          {
            title: 'Understanding Your Financial Situation',
            content: `Before you can improve your finances, you need to understand where you stand. Track your income, expenses, and net worth.

Key Concepts:
• Net Worth = Assets - Liabilities
• Emergency Fund: Aim for 3-6 months of expenses
• The 50/30/20 Rule: 50% needs, 30% wants, 20% savings

Source: Consumer Financial Protection Bureau (CFPB)`
          },
          {
            title: 'Creating a Budget',
            content: `A budget is a plan for your money. It helps you:
• Control spending
• Save for goals
• Avoid debt
• Build wealth

Steps to Create a Budget:
1. Calculate your monthly income
2. List all expenses (fixed and variable)
3. Subtract expenses from income
4. Adjust as needed
5. Review monthly

Source: Federal Reserve Economic Education`
          },
          {
            title: 'Building an Emergency Fund',
            content: `An emergency fund protects you from unexpected expenses like:
• Medical bills
• Car repairs
• Job loss
• Home repairs

How to Build:
• Start small: $500-$1,000
• Automate savings
• Keep in a high-yield savings account
• Build to 3-6 months of expenses

Source: FDIC Money Smart Program`
          }
        ],
        resources: [
          { name: 'CFPB Financial Education', url: 'https://www.consumerfinance.gov/consumer-tools/', type: 'official' },
          { name: 'Federal Reserve Education', url: 'https://www.federalreserveeducation.org/', type: 'official' },
          { name: 'FDIC Money Smart', url: 'https://www.fdic.gov/resources/consumers/money-smart/', type: 'official' }
        ]
      }
    },
    {
      id: 2,
      title: 'Understanding Investments',
      description: 'Learn about stocks, bonds, mutual funds, ETFs, and how to build a diversified portfolio. Information based on SEC Investor Education and FINRA guidance.',
      duration: '30 min',
      level: 'Intermediate',
      completed: false,
      category: 'Investing',
      source: 'SEC & FINRA',
      content: {
        sections: [
          {
            title: 'Types of Investments',
            content: `Stocks (Equities):
• Ownership shares in a company
• Higher risk, higher potential return
• Long-term growth potential

Bonds:
• Loans to companies or governments
• Lower risk, fixed income
• Regular interest payments

Mutual Funds & ETFs:
• Diversified portfolios of stocks/bonds
• Professional management
• Lower individual stock risk

Source: SEC Investor.gov`
          },
          {
            title: 'Diversification',
            content: `"Don't put all your eggs in one basket" - Diversification reduces risk by spreading investments across:
• Different asset classes (stocks, bonds, cash)
• Different industries
• Different geographic regions
• Different company sizes

Benefits:
• Reduces portfolio volatility
• Protects against single-stock risk
• Smooths returns over time

Source: FINRA Investor Education`
          },
          {
            title: 'Risk and Return',
            content: `Understanding the relationship:
• Higher risk = Higher potential return
• Lower risk = Lower potential return
• Your risk tolerance depends on:
  - Time horizon
  - Financial goals
  - Comfort with volatility

Asset Allocation by Age:
• 20s-30s: 80-90% stocks, 10-20% bonds
• 40s-50s: 60-70% stocks, 30-40% bonds
• 60+: 40-50% stocks, 50-60% bonds

Source: SEC Investor.gov`
          }
        ],
        resources: [
          { name: 'SEC Investor.gov', url: 'https://www.investor.gov/', type: 'official' },
          { name: 'FINRA Investor Education', url: 'https://www.finra.org/investors', type: 'official' },
          { name: 'SIFMA Foundation', url: 'https://www.sifma.org/foundation/', type: 'official' }
        ]
      }
    },
    {
      id: 3,
      title: 'Cryptocurrency Basics',
      description: 'Understand what cryptocurrency is, how blockchain works, and the risks involved. Information from SEC and CFTC regulatory guidance.',
      duration: '25 min',
      level: 'Beginner',
      completed: false,
      category: 'Crypto',
      source: 'SEC & CFTC',
      content: {
        sections: [
          {
            title: 'What is Cryptocurrency?',
            content: `Cryptocurrency is a digital or virtual currency secured by cryptography.

Key Characteristics:
• Decentralized (no central authority)
• Uses blockchain technology
• Highly volatile
• Not backed by governments

Major Types:
• Bitcoin (BTC) - First and largest
• Ethereum (ETH) - Smart contracts
• Others: Thousands of altcoins

Source: SEC Investor Bulletin`
          },
          {
            title: 'Understanding Blockchain',
            content: `Blockchain is a distributed ledger technology:
• Records transactions in "blocks"
• Blocks are linked in a "chain"
• Immutable (can't be changed)
• Transparent and secure

How It Works:
1. Transaction requested
2. Broadcast to network
3. Validated by network
4. Added to block
5. Block added to chain

Source: CFTC Educational Resources`
          },
          {
            title: 'Risks and Considerations',
            content: `Important Warnings:
• Extreme volatility (prices can drop 50%+ quickly)
• No government insurance (unlike bank deposits)
• Risk of fraud and scams
• Regulatory uncertainty
• Technical risks (lost passwords = lost funds)

Best Practices:
• Only invest what you can afford to lose
• Use reputable exchanges
• Secure your wallet
• Be wary of "get rich quick" schemes

Source: SEC Investor Alerts`
          }
        ],
        resources: [
          { name: 'SEC Crypto Assets', url: 'https://www.sec.gov/crypto', type: 'official' },
          { name: 'CFTC Digital Assets', url: 'https://www.cftc.gov/LearnAndProtect/AdvisoriesAndArticles/digitalassets.html', type: 'official' },
          { name: 'FINRA Crypto Guide', url: 'https://www.finra.org/investors/learn-to-invest/types-investments/cryptocurrency', type: 'official' }
        ]
      }
    },
    {
      id: 4,
      title: 'Retirement Planning',
      description: 'Learn about 401(k), IRA, Roth accounts, and how to plan for a secure retirement. Based on IRS guidelines and Social Security Administration information.',
      duration: '35 min',
      level: 'Intermediate',
      completed: false,
      category: 'Planning',
      source: 'IRS & SSA',
      content: {
        sections: [
          {
            title: 'Retirement Accounts Overview',
            content: `401(k) Plans:
• Employer-sponsored
• Pre-tax contributions (traditional) or post-tax (Roth)
• Employer matching available
• 2024 contribution limit: $23,000 ($30,500 if 50+)

IRA (Individual Retirement Account):
• Traditional IRA: Pre-tax, taxed on withdrawal
• Roth IRA: Post-tax, tax-free withdrawals
• 2024 contribution limit: $7,000 ($8,000 if 50+)

Source: IRS Publication 590`
          },
          {
            title: 'Social Security',
            content: `Social Security provides:
• Retirement benefits
• Disability benefits
• Survivor benefits

Key Facts:
• Full retirement age: 66-67 (depending on birth year)
• Can claim as early as 62 (reduced benefits)
• Can delay until 70 (increased benefits)
• Based on your 35 highest-earning years

Source: Social Security Administration`
          },
          {
            title: 'Retirement Savings Goals',
            content: `General Guidelines:
• By 30: 1x annual salary saved
• By 40: 3x annual salary saved
• By 50: 6x annual salary saved
• By 60: 8x annual salary saved
• By 67: 10x annual salary saved

The 4% Rule:
• Withdraw 4% of retirement savings annually
• Should last 30 years
• Adjust based on market conditions

Source: Fidelity Investments Research`
          }
        ],
        resources: [
          { name: 'IRS Retirement Plans', url: 'https://www.irs.gov/retirement-plans', type: 'official' },
          { name: 'Social Security Administration', url: 'https://www.ssa.gov/', type: 'official' },
          { name: 'Department of Labor', url: 'https://www.dol.gov/general/topic/retirement', type: 'official' }
        ]
      }
    },
    {
      id: 5,
      title: 'Tax Optimization Strategies',
      description: 'Understand tax-advantaged accounts, deductions, credits, and strategies to minimize your tax burden legally. Based on IRS publications and tax code.',
      duration: '30 min',
      level: 'Intermediate',
      completed: false,
      category: 'Taxes',
      source: 'IRS',
      content: {
        sections: [
          {
            title: 'Tax-Advantaged Accounts',
            content: `Accounts that reduce your tax burden:

Traditional 401(k) / IRA:
• Contributions reduce taxable income
• Taxes deferred until withdrawal
• Withdrawals taxed as ordinary income

Roth 401(k) / IRA:
• Contributions made with after-tax money
• Growth is tax-free
• Qualified withdrawals are tax-free

Health Savings Account (HSA):
• Triple tax advantage
• Pre-tax contributions
• Tax-free growth
• Tax-free withdrawals for medical expenses

Source: IRS Publication 969`
          },
          {
            title: 'Common Deductions and Credits',
            content: `Deductions (reduce taxable income):
• Standard deduction: $14,600 (single), $29,200 (married) - 2024
• Itemized deductions: Mortgage interest, charitable contributions, state/local taxes

Tax Credits (reduce tax owed):
• Earned Income Tax Credit (EITC)
• Child Tax Credit
• Education credits (AOTC, LLC)
• Retirement Savings Contribution Credit

Source: IRS Tax Topics`
          },
          {
            title: 'Tax-Loss Harvesting',
            content: `Strategy to offset capital gains:
• Sell investments at a loss
• Use losses to offset gains
• Can deduct up to $3,000 in net losses per year
• Remaining losses carry forward

Important Rules:
• Wash sale rule: Can't buy same/similar security within 30 days
• Long-term vs short-term capital gains rates differ
• Consult a tax professional for complex situations

Source: IRS Publication 550`
          }
        ],
        resources: [
          { name: 'IRS Tax Topics', url: 'https://www.irs.gov/help/ita', type: 'official' },
          { name: 'IRS Forms & Publications', url: 'https://www.irs.gov/forms-pubs', type: 'official' },
          { name: 'Taxpayer Advocate Service', url: 'https://www.taxpayeradvocate.irs.gov/', type: 'official' }
        ]
      }
    },
    {
      id: 6,
      title: 'Debt Management',
      description: 'Learn strategies to pay off debt, understand interest rates, and improve your credit score. Information from CFPB and credit bureau guidance.',
      duration: '25 min',
      level: 'Beginner',
      completed: false,
      category: 'Basics',
      source: 'CFPB & Credit Bureaus',
      content: {
        sections: [
          {
            title: 'Types of Debt',
            content: `Good Debt:
• Mortgage (builds equity)
• Student loans (investment in education)
• Business loans (income-generating)

Bad Debt:
• Credit card debt (high interest)
• Payday loans (extremely high rates)
• Car loans (depreciating asset)

Managing Debt:
• Pay high-interest debt first (avalanche method)
• Or pay smallest balances first (snowball method)
• Consider debt consolidation
• Avoid taking on new debt

Source: CFPB Debt Collection`
          },
          {
            title: 'Understanding Credit Scores',
            content: `Credit Score Factors:
• Payment history (35%)
• Credit utilization (30%)
• Length of credit history (15%)
• Credit mix (10%)
• New credit inquiries (10%)

Score Ranges:
• 800-850: Excellent
• 740-799: Very Good
• 670-739: Good
• 580-669: Fair
• Below 580: Poor

Source: Experian, Equifax, TransUnion`
          },
          {
            title: 'Improving Your Credit',
            content: `Steps to Improve:
• Pay bills on time (set up autopay)
• Keep credit utilization below 30%
• Don't close old accounts
• Limit new credit applications
• Check credit reports regularly (free at AnnualCreditReport.com)
• Dispute errors immediately

Source: CFPB Credit Reports`
          }
        ],
        resources: [
          { name: 'CFPB Credit Reports', url: 'https://www.consumerfinance.gov/consumer-tools/credit-reports-and-scores/', type: 'official' },
          { name: 'AnnualCreditReport.com', url: 'https://www.annualcreditreport.com/', type: 'official' },
          { name: 'FTC Credit & Loans', url: 'https://www.consumer.ftc.gov/topics/credit-and-loans', type: 'official' }
        ]
      }
    },
    {
      id: 7,
      title: 'Estate Planning Basics',
      description: 'Understand wills, trusts, power of attorney, and how to protect your assets for your heirs. Based on legal and financial planning best practices.',
      duration: '20 min',
      level: 'Intermediate',
      completed: false,
      category: 'Planning',
      source: 'Legal & Financial Planning',
      content: {
        sections: [
          {
            title: 'Essential Documents',
            content: `Will:
• Specifies asset distribution
• Names guardians for children
• Executor manages estate

Trust:
• Manages assets during lifetime
• Avoids probate
• More control over distribution

Power of Attorney:
• Financial: Manages finances if incapacitated
• Healthcare: Makes medical decisions

Source: American Bar Association`
          },
          {
            title: 'Beneficiary Designations',
            content: `Important Accounts:
• Retirement accounts (401k, IRA)
• Life insurance policies
• Bank accounts (payable on death)
• Investment accounts

Keep Updated:
• Review after major life events
• Update after divorce
• Consider contingent beneficiaries

Source: FINRA Beneficiary Guide`
          }
        ],
        resources: [
          { name: 'American Bar Association', url: 'https://www.americanbar.org/groups/real_property_trust_estate/', type: 'professional' },
          { name: 'FINRA Estate Planning', url: 'https://www.finra.org/investors/learn-to-invest/types-investments/estate-planning', type: 'official' }
        ]
      }
    },
    {
      id: 8,
      title: 'Advanced Portfolio Strategies',
      description: 'Learn about asset allocation, rebalancing, dollar-cost averaging, and advanced investment concepts. For experienced investors only.',
      duration: '40 min',
      level: 'Advanced',
      completed: false,
      category: 'Investing',
      source: 'SEC & Academic Research',
      locked: false,
      content: {
        sections: [
          {
            title: 'Asset Allocation',
            content: `Strategic Asset Allocation:
• Long-term target allocation
• Based on risk tolerance and goals
• Rebalance periodically

Tactical Asset Allocation:
• Short-term adjustments
• Based on market conditions
• More active management

Modern Portfolio Theory:
• Diversification reduces risk
• Efficient frontier concept
• Risk-return optimization

Source: SEC Investor.gov`
          },
          {
            title: 'Rebalancing',
            content: `Why Rebalance:
• Maintain target allocation
• Sell high, buy low
• Control risk

Methods:
• Time-based: Quarterly, annually
• Threshold-based: When allocation drifts 5%+
• Combination approach

Source: FINRA Investment Strategies`
          }
        ],
        resources: [
          { name: 'SEC Advanced Topics', url: 'https://www.investor.gov/introduction-investing', type: 'official' },
          { name: 'CFA Institute', url: 'https://www.cfainstitute.org/', type: 'professional' }
        ]
      }
    },
  ])

  const categories = ['All', 'Basics', 'Investing', 'Crypto', 'Taxes', 'Planning']
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedLesson, setSelectedLesson] = useState(null)

  const filteredLessons = selectedCategory === 'All'
    ? lessons
    : lessons.filter(lesson => lesson.category === selectedCategory)

  const completedCount = lessons.filter(l => l.completed).length
  const totalLessons = lessons.length
  const progress = (completedCount / totalLessons) * 100

  const handleStartLesson = (lesson) => {
    if (lesson.locked) return
    setSelectedLesson(lesson)
  }

  const handleCompleteLesson = () => {
    if (selectedLesson) {
      setLessons(lessons.map(l => 
        l.id === selectedLesson.id ? { ...l, completed: true } : l
      ))
      setSelectedLesson(null)
    }
  }

  if (selectedLesson) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <button
              onClick={() => setSelectedLesson(null)}
              className="text-primary-600 hover:text-primary-700 mb-4 flex items-center"
            >
              ← Back to Lessons
            </button>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{selectedLesson.title}</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Source: {selectedLesson.source}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Shield className="text-green-600" size={24} />
            <span className="text-sm text-gray-600 dark:text-gray-400">Trusted Source</span>
          </div>
        </div>

        <div className="card">
          <div className="space-y-8">
            {selectedLesson.content?.sections.map((section, index) => (
              <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {section.title}
                </h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
                    {section.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedLesson.content?.resources && selectedLesson.content.resources.length > 0 && (
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <LinkIcon className="mr-2" size={20} />
              Official Resources
            </h2>
            <div className="space-y-3">
              {selectedLesson.content.resources.map((resource, index) => (
                <a
                  key={index}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    {resource.type === 'official' ? (
                      <Shield className="text-green-600" size={20} />
                    ) : (
                      <FileText className="text-blue-600" size={20} />
                    )}
                    <span className="font-medium text-gray-900 dark:text-white">
                      {resource.name}
                    </span>
                    {resource.type === 'official' && (
                      <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded">
                        Official
                      </span>
                    )}
                  </div>
                  <ExternalLink className="text-gray-400" size={18} />
                </a>
              ))}
            </div>
          </div>
        )}

        <div className="flex space-x-4">
          <button
            onClick={() => setSelectedLesson(null)}
            className="btn-secondary flex-1"
          >
            Back
          </button>
          <button
            onClick={handleCompleteLesson}
            className="btn-primary flex-1"
          >
            {selectedLesson.completed ? (
              <span className="flex items-center justify-center">
                <CheckCircle className="mr-2" size={18} />
                Mark as Complete
              </span>
            ) : (
              'Mark as Complete'
            )}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Learning Hub</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Trusted financial education from official sources
        </p>
      </div>

      {/* Trust Badge */}
      <div className="card bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-green-200 dark:border-green-800">
        <div className="flex items-center space-x-3">
          <Shield className="text-green-600 dark:text-green-400" size={24} />
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Trusted Sources</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              All content is based on official sources including SEC, FINRA, IRS, CFPB, Federal Reserve, and other government agencies.
            </p>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">Lessons Completed</p>
            <CheckCircle className="text-green-600" size={20} />
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {completedCount} / {totalLessons}
          </p>
        </div>
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">Overall Progress</p>
            <TrendingUp className="text-primary-600" size={20} />
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {Math.round(progress)}%
          </p>
        </div>
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">Trusted Sources</p>
            <Shield className="text-green-600" size={20} />
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">8+</p>
        </div>
      </div>

      {/* Category Filter */}
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

      {/* Lessons Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLessons.map((lesson) => (
          <div
            key={lesson.id}
            className={`card relative ${
              lesson.locked ? 'opacity-60' : 'hover:shadow-xl transition-shadow'
            }`}
          >
            {lesson.locked && (
              <div className="absolute top-4 right-4">
                <Lock className="text-gray-400" size={20} />
              </div>
            )}
            {lesson.completed && (
              <div className="absolute top-4 right-4">
                <CheckCircle className="text-green-600" size={20} />
              </div>
            )}
            <div className="flex items-start space-x-3 mb-4">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center flex-shrink-0">
                <BookOpen className="text-primary-600 dark:text-primary-400" size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  {lesson.title}
                </h3>
                <div className="flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-400 mb-2">
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">
                    {lesson.level}
                  </span>
                  <span>{lesson.duration}</span>
                </div>
                <div className="flex items-center space-x-1 text-xs">
                  <Shield className="text-green-600" size={12} />
                  <span className="text-green-600 font-medium">{lesson.source}</span>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {lesson.description}
            </p>
            <button
              onClick={() => handleStartLesson(lesson)}
              disabled={lesson.locked}
              className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                lesson.locked
                  ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                  : lesson.completed
                  ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                  : 'btn-primary'
              }`}
            >
              {lesson.locked ? (
                'Locked'
              ) : lesson.completed ? (
                <span className="flex items-center justify-center">
                  <CheckCircle className="mr-2" size={16} />
                  Review Lesson
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <Play className="mr-2" size={16} />
                  Start Lesson
                </span>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
