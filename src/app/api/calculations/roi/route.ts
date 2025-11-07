import { NextRequest, NextResponse } from 'next/server'
import { calculateROI } from '@/lib/calculations'

// POST /api/calculations/roi - Calculate Return on Investment
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { investmentCost, expectedRevenue, annualOperatingCosts } = body

    if (investmentCost === undefined || expectedRevenue === undefined) {
      return NextResponse.json(
        { error: 'Investment cost and expected revenue are required' },
        { status: 400 }
      )
    }

    const roiCalculation = calculateROI(
      investmentCost,
      expectedRevenue,
      annualOperatingCosts || 0
    )

    return NextResponse.json(roiCalculation)
  } catch (error) {
    console.error('Error calculating ROI:', error)
    return NextResponse.json(
      { error: 'Failed to calculate ROI' },
      { status: 500 }
    )
  }
}
