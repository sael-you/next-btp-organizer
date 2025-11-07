import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/milestones/[id] - Get a single milestone
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const milestone = await prisma.milestone.findUnique({
      where: { id: params.id },
      include: {
        tasks: true,
        project: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })

    if (!milestone) {
      return NextResponse.json(
        { error: 'Milestone not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(milestone)
  } catch (error) {
    console.error('Error fetching milestone:', error)
    return NextResponse.json(
      { error: 'Failed to fetch milestone' },
      { status: 500 }
    )
  }
}

// PUT /api/milestones/[id] - Update a milestone
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { name, description, dueDate, status, priority, completedAt } = body

    const milestone = await prisma.milestone.update({
      where: { id: params.id },
      data: {
        name,
        description,
        dueDate: dueDate ? new Date(dueDate) : null,
        status,
        priority,
        completedAt: completedAt ? new Date(completedAt) : null,
      },
    })

    return NextResponse.json(milestone)
  } catch (error) {
    console.error('Error updating milestone:', error)
    return NextResponse.json(
      { error: 'Failed to update milestone' },
      { status: 500 }
    )
  }
}

// DELETE /api/milestones/[id] - Delete a milestone
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.milestone.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: 'Milestone deleted successfully' })
  } catch (error) {
    console.error('Error deleting milestone:', error)
    return NextResponse.json(
      { error: 'Failed to delete milestone' },
      { status: 500 }
    )
  }
}
