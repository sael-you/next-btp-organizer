import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/milestones - List all milestones (optionally filtered by projectId)
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const projectId = searchParams.get('projectId')

    const milestones = await prisma.milestone.findMany({
      where: projectId ? { projectId } : undefined,
      include: {
        tasks: true,
        project: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        dueDate: 'asc',
      },
    })

    return NextResponse.json(milestones)
  } catch (error) {
    console.error('Error fetching milestones:', error)
    return NextResponse.json(
      { error: 'Failed to fetch milestones' },
      { status: 500 }
    )
  }
}

// POST /api/milestones - Create a new milestone
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { projectId, name, description, dueDate, status, priority } = body

    if (!projectId || !name) {
      return NextResponse.json(
        { error: 'Project ID and milestone name are required' },
        { status: 400 }
      )
    }

    const milestone = await prisma.milestone.create({
      data: {
        projectId,
        name,
        description,
        dueDate: dueDate ? new Date(dueDate) : null,
        status: status || 'PENDING',
        priority: priority || 'MEDIUM',
      },
    })

    return NextResponse.json(milestone, { status: 201 })
  } catch (error) {
    console.error('Error creating milestone:', error)
    return NextResponse.json(
      { error: 'Failed to create milestone' },
      { status: 500 }
    )
  }
}
