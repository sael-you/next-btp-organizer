import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { calculateBudgetAnalysis, calculateCategoryBudgetAnalysis } from '@/lib/calculations'

// GET /api/calculations/budget?projectId=xxx - Calculate budget analysis for a project
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const projectId = searchParams.get('projectId')

    if (!projectId) {
      return NextResponse.json(
        { error: 'Project ID is required' },
        { status: 400 }
      )
    }

    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: {
        expenses: true,
        budgetItems: true,
      },
    })

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      )
    }

    const overallAnalysis = calculateBudgetAnalysis(project.totalBudget, project.expenses)
    const categoryAnalysis = calculateCategoryBudgetAnalysis(project.budgetItems, project.expenses)

    return NextResponse.json({
      overall: overallAnalysis,
      byCategory: categoryAnalysis,
    })
  } catch (error) {
    console.error('Error calculating budget:', error)
    return NextResponse.json(
      { error: 'Failed to calculate budget' },
      { status: 500 }
    )
  }
}
