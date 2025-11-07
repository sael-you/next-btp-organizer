/**
 * Financial calculation utilities for the Morocco Building Project Organizer
 */

export interface BudgetAnalysis {
  totalBudget: number
  totalExpenses: number
  remaining: number
  percentageUsed: number
  isOverBudget: boolean
  overBudgetAmount: number
}

export interface CategoryBudgetAnalysis {
  category: string
  budgeted: number
  spent: number
  remaining: number
  percentageUsed: number
  isOverBudget: boolean
}

export interface ROICalculation {
  investmentCost: number
  expectedRevenue: number
  expectedProfit: number
  roiPercentage: number
  breakEvenYears: number
}

export interface MortgageCalculation {
  loanAmount: number
  interestRate: number
  loanTermYears: number
  monthlyPayment: number
  totalPayment: number
  totalInterest: number
  monthlyBreakdown: Array<{
    month: number
    payment: number
    principal: number
    interest: number
    remainingBalance: number
  }>
}

/**
 * Calculate budget analysis for a project
 */
export function calculateBudgetAnalysis(
  totalBudget: number,
  expenses: Array<{ amount: number }>
): BudgetAnalysis {
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)
  const remaining = totalBudget - totalExpenses
  const percentageUsed = totalBudget > 0 ? (totalExpenses / totalBudget) * 100 : 0
  const isOverBudget = totalExpenses > totalBudget
  const overBudgetAmount = isOverBudget ? totalExpenses - totalBudget : 0

  return {
    totalBudget,
    totalExpenses,
    remaining,
    percentageUsed,
    isOverBudget,
    overBudgetAmount,
  }
}

/**
 * Calculate budget analysis by category
 */
export function calculateCategoryBudgetAnalysis(
  budgetItems: Array<{ category: string; estimatedAmount: number; actualAmount: number }>,
  expenses: Array<{ category: string; amount: number }>
): CategoryBudgetAnalysis[] {
  const categories = new Set([
    ...budgetItems.map((item) => item.category),
    ...expenses.map((expense) => expense.category),
  ])

  return Array.from(categories).map((category) => {
    const budgeted = budgetItems
      .filter((item) => item.category === category)
      .reduce((sum, item) => sum + item.estimatedAmount, 0)

    const spent = expenses
      .filter((expense) => expense.category === category)
      .reduce((sum, expense) => sum + expense.amount, 0)

    const remaining = budgeted - spent
    const percentageUsed = budgeted > 0 ? (spent / budgeted) * 100 : 0
    const isOverBudget = spent > budgeted

    return {
      category,
      budgeted,
      spent,
      remaining,
      percentageUsed,
      isOverBudget,
    }
  })
}

/**
 * Calculate Return on Investment (ROI)
 */
export function calculateROI(
  investmentCost: number,
  expectedRevenue: number,
  annualOperatingCosts: number = 0
): ROICalculation {
  const expectedProfit = expectedRevenue - investmentCost - annualOperatingCosts
  const roiPercentage = investmentCost > 0 ? (expectedProfit / investmentCost) * 100 : 0
  const breakEvenYears = expectedRevenue > 0 ? investmentCost / (expectedRevenue - annualOperatingCosts) : 0

  return {
    investmentCost,
    expectedRevenue,
    expectedProfit,
    roiPercentage,
    breakEvenYears,
  }
}

/**
 * Calculate mortgage/loan payment details
 * Using the standard mortgage formula: M = P * [r(1 + r)^n] / [(1 + r)^n - 1]
 * Where:
 * M = Monthly payment
 * P = Principal loan amount
 * r = Monthly interest rate (annual rate / 12)
 * n = Number of payments (years * 12)
 */
export function calculateMortgage(
  loanAmount: number,
  annualInterestRate: number,
  loanTermYears: number,
  includeBreakdown: boolean = false
): MortgageCalculation {
  const monthlyInterestRate = annualInterestRate / 100 / 12
  const numberOfPayments = loanTermYears * 12

  // Calculate monthly payment
  let monthlyPayment: number
  if (monthlyInterestRate === 0) {
    // If no interest, just divide the loan by number of payments
    monthlyPayment = loanAmount / numberOfPayments
  } else {
    monthlyPayment =
      (loanAmount * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments))) /
      (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1)
  }

  const totalPayment = monthlyPayment * numberOfPayments
  const totalInterest = totalPayment - loanAmount

  const result: MortgageCalculation = {
    loanAmount,
    interestRate: annualInterestRate,
    loanTermYears,
    monthlyPayment,
    totalPayment,
    totalInterest,
    monthlyBreakdown: [],
  }

  // Calculate monthly breakdown if requested
  if (includeBreakdown) {
    let remainingBalance = loanAmount

    for (let month = 1; month <= numberOfPayments; month++) {
      const interestPayment = remainingBalance * monthlyInterestRate
      const principalPayment = monthlyPayment - interestPayment
      remainingBalance -= principalPayment

      result.monthlyBreakdown.push({
        month,
        payment: monthlyPayment,
        principal: principalPayment,
        interest: interestPayment,
        remainingBalance: Math.max(0, remainingBalance),
      })
    }
  }

  return result
}

/**
 * Calculate project completion percentage based on milestones
 */
export function calculateProjectProgress(
  milestones: Array<{ status: string }>
): number {
  if (milestones.length === 0) return 0

  const completedMilestones = milestones.filter(
    (milestone) => milestone.status === 'COMPLETED'
  ).length

  return (completedMilestones / milestones.length) * 100
}

/**
 * Format currency in Moroccan Dirham
 */
export function formatMAD(amount: number): string {
  return new Intl.NumberFormat('ar-MA', {
    style: 'currency',
    currency: 'MAD',
    minimumFractionDigits: 2,
  }).format(amount)
}

/**
 * Check if a milestone is overdue
 */
export function isOverdue(dueDate: Date | null, status: string): boolean {
  if (!dueDate || status === 'COMPLETED') return false
  return new Date() > new Date(dueDate)
}
