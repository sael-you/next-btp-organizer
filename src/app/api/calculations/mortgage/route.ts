import { NextRequest, NextResponse } from 'next/server'
import { calculateMortgage } from '@/lib/calculations'

// POST /api/calculations/mortgage - Calculate mortgage/loan payment
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { loanAmount, annualInterestRate, loanTermYears, includeBreakdown } = body

    if (
      loanAmount === undefined ||
      annualInterestRate === undefined ||
      loanTermYears === undefined
    ) {
      return NextResponse.json(
        { error: 'Loan amount, interest rate, and loan term are required' },
        { status: 400 }
      )
    }

    const mortgageCalculation = calculateMortgage(
      loanAmount,
      annualInterestRate,
      loanTermYears,
      includeBreakdown || false
    )

    return NextResponse.json(mortgageCalculation)
  } catch (error) {
    console.error('Error calculating mortgage:', error)
    return NextResponse.json(
      { error: 'Failed to calculate mortgage' },
      { status: 500 }
    )
  }
}
