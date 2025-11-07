import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/expenses - List all expenses (optionally filtered by projectId)
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const projectId = searchParams.get('projectId')
    const category = searchParams.get('category')

    const expenses = await prisma.expense.findMany({
      where: {
        ...(projectId && { projectId }),
        ...(category && { category }),
      },
      include: {
        project: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        date: 'desc',
      },
    })

    return NextResponse.json(expenses)
  } catch (error) {
    console.error('Error fetching expenses:', error)
    return NextResponse.json(
      { error: 'Failed to fetch expenses' },
      { status: 500 }
    )
  }
}

// POST /api/expenses - Create a new expense
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      projectId,
      category,
      description,
      amount,
      currency,
      date,
      vendor,
      invoiceNumber,
      isPaid,
      paidDate,
      notes,
    } = body

    if (!projectId || !category || !description || amount === undefined) {
      return NextResponse.json(
        { error: 'Project ID, category, description, and amount are required' },
        { status: 400 }
      )
    }

    const expense = await prisma.expense.create({
      data: {
        projectId,
        category,
        description,
        amount,
        currency: currency || 'MAD',
        date: date ? new Date(date) : new Date(),
        vendor,
        invoiceNumber,
        isPaid: isPaid || false,
        paidDate: paidDate ? new Date(paidDate) : null,
        notes,
      },
    })

    return NextResponse.json(expense, { status: 201 })
  } catch (error) {
    console.error('Error creating expense:', error)
    return NextResponse.json(
      { error: 'Failed to create expense' },
      { status: 500 }
    )
  }
}
