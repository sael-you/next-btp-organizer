import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { formatMAD, calculateProjectProgress } from '@/lib/calculations'

async function getProjects() {
  try {
    const projects = await prisma.project.findMany({
      include: {
        milestones: true,
        expenses: true,
        _count: {
          select: {
            milestones: true,
            expenses: true,
            documents: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    return projects
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}

export default async function Home() {
  const projects = await getProjects()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Morocco Building Project Organizer
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                Manage your construction projects, track expenses, and calculate budgets
              </p>
            </div>
            <Link
              href="/projects/new"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              + New Project
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600">Total Projects</p>
                  <p className="mt-1 text-3xl font-semibold text-gray-900">
                    {projects.length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600">Active Projects</p>
                  <p className="mt-1 text-3xl font-semibold text-gray-900">
                    {projects.filter(p => p.status === 'IN_PROGRESS').length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600">Total Budget</p>
                  <p className="mt-1 text-3xl font-semibold text-gray-900">
                    {formatMAD(projects.reduce((sum, p) => sum + p.totalBudget, 0))}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600">Total Expenses</p>
                  <p className="mt-1 text-3xl font-semibold text-gray-900">
                    {formatMAD(
                      projects.reduce((sum, p) =>
                        sum + p.expenses.reduce((expSum, e) => expSum + e.amount, 0), 0
                      )
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Projects List */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Your Projects</h2>
          </div>

          {projects.length === 0 ? (
            <div className="text-center py-12">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No projects</h3>
              <p className="mt-1 text-sm text-gray-500">
                Get started by creating a new project.
              </p>
              <div className="mt-6">
                <Link
                  href="/projects/new"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  + New Project
                </Link>
              </div>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {projects.map((project) => {
                const totalExpenses = project.expenses.reduce((sum, e) => sum + e.amount, 0)
                const progress = calculateProjectProgress(project.milestones)
                const isOverBudget = totalExpenses > project.totalBudget

                return (
                  <li key={project.id}>
                    <Link
                      href={`/projects/${project.id}`}
                      className="block hover:bg-gray-50 transition-colors"
                    >
                      <div className="px-6 py-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className="text-lg font-medium text-gray-900">
                                {project.name}
                              </h3>
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  project.status === 'IN_PROGRESS'
                                    ? 'bg-blue-100 text-blue-800'
                                    : project.status === 'COMPLETED'
                                    ? 'bg-green-100 text-green-800'
                                    : project.status === 'ON_HOLD'
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : 'bg-gray-100 text-gray-800'
                                }`}
                              >
                                {project.status.replace('_', ' ')}
                              </span>
                            </div>
                            {project.description && (
                              <p className="mt-1 text-sm text-gray-600 line-clamp-1">
                                {project.description}
                              </p>
                            )}
                            <div className="mt-2 flex items-center text-sm text-gray-500 space-x-4">
                              <span>{project._count.milestones} milestones</span>
                              <span>{project._count.expenses} expenses</span>
                              <span>{project._count.documents} documents</span>
                            </div>
                          </div>
                          <div className="ml-6 text-right">
                            <p className="text-sm font-medium text-gray-900">
                              Budget: {formatMAD(project.totalBudget)}
                            </p>
                            <p
                              className={`text-sm ${
                                isOverBudget ? 'text-red-600' : 'text-gray-600'
                              }`}
                            >
                              Spent: {formatMAD(totalExpenses)}
                            </p>
                            {isOverBudget && (
                              <p className="text-xs text-red-600 font-medium mt-1">
                                Over budget!
                              </p>
                            )}
                            <div className="mt-2">
                              <div className="flex items-center">
                                <span className="text-xs text-gray-500 mr-2">
                                  {progress.toFixed(0)}% complete
                                </span>
                              </div>
                              <div className="w-32 bg-gray-200 rounded-full h-2 mt-1">
                                <div
                                  className="bg-blue-600 h-2 rounded-full"
                                  style={{ width: `${progress}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </li>
                )
              })}
            </ul>
          )}
        </div>

        {/* Tools Section */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            href="/tools/roi-calculator"
            className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900">ROI Calculator</h3>
              <p className="mt-2 text-sm text-gray-600">
                Calculate return on investment for your projects
              </p>
            </div>
          </Link>

          <Link
            href="/tools/mortgage-calculator"
            className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900">Mortgage Calculator</h3>
              <p className="mt-2 text-sm text-gray-600">
                Calculate monthly payments and total loan costs
              </p>
            </div>
          </Link>

          <Link
            href="/expenses"
            className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900">All Expenses</h3>
              <p className="mt-2 text-sm text-gray-600">
                View and manage all expenses across projects
              </p>
            </div>
          </Link>
        </div>
      </main>
    </div>
  )
}
