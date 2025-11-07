'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Home() {
  const [projects] = useState<any[]>([])

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
            <button
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={() => alert('Project creation form will be implemented with full database connectivity')}
            >
              + New Project
            </button>
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
                    0
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
                    0.00 MAD
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
                    0.00 MAD
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Setup Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-blue-900 mb-2">
            🚀 Application Successfully Scaffolded!
          </h2>
          <p className="text-blue-800 mb-4">
            The Morocco Building Project Organizer is running. To enable full database functionality, you need to generate the Prisma client.
          </p>
          <div className="bg-white rounded-md p-4 font-mono text-sm">
            <p className="text-gray-700 mb-2">Run these commands in your terminal:</p>
            <code className="block text-blue-600 mb-1">PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING=1 npx prisma generate</code>
            <code className="block text-blue-600">PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING=1 npx prisma db push</code>
          </div>
        </div>

        {/* Projects List */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Your Projects</h2>
          </div>

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
            <h3 className="mt-2 text-sm font-medium text-gray-900">No projects yet</h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by generating the Prisma client to enable database connectivity.
            </p>
          </div>
        </div>

        {/* Features Overview */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Features</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white overflow-hidden shadow rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="ml-4 text-lg font-medium text-gray-900">Project Management</h3>
              </div>
              <p className="text-sm text-gray-600">
                Create and track building projects with milestones, tasks, and due dates
              </p>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="ml-4 text-lg font-medium text-gray-900">Expense Tracking</h3>
              </div>
              <p className="text-sm text-gray-600">
                Track expenses by category (Land, Permits, Materials, Labour, Utilities)
              </p>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="ml-4 text-lg font-medium text-gray-900">Budget Analysis</h3>
              </div>
              <p className="text-sm text-gray-600">
                Real-time budget tracking with over-budget warnings and forecasts
              </p>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="ml-4 text-lg font-medium text-gray-900">ROI Calculator</h3>
              </div>
              <p className="text-sm text-gray-600">
                Calculate return on investment and break-even analysis
              </p>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 bg-red-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <h3 className="ml-4 text-lg font-medium text-gray-900">Mortgage Calculator</h3>
              </div>
              <p className="text-sm text-gray-600">
                Calculate monthly payments and total loan costs
              </p>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="ml-4 text-lg font-medium text-gray-900">Document Management</h3>
              </div>
              <p className="text-sm text-gray-600">
                Attach contracts, invoices, permits, and construction plans
              </p>
            </div>
          </div>
        </div>

        {/* API Endpoints Info */}
        <div className="mt-8 bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Available API Endpoints</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Projects</h3>
              <ul className="space-y-1 text-gray-600">
                <li>GET /api/projects</li>
                <li>POST /api/projects</li>
                <li>GET /api/projects/[id]</li>
                <li>PUT /api/projects/[id]</li>
                <li>DELETE /api/projects/[id]</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Milestones</h3>
              <ul className="space-y-1 text-gray-600">
                <li>GET /api/milestones</li>
                <li>POST /api/milestones</li>
                <li>GET /api/milestones/[id]</li>
                <li>PUT /api/milestones/[id]</li>
                <li>DELETE /api/milestones/[id]</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Expenses</h3>
              <ul className="space-y-1 text-gray-600">
                <li>GET /api/expenses</li>
                <li>POST /api/expenses</li>
                <li>GET /api/expenses/[id]</li>
                <li>PUT /api/expenses/[id]</li>
                <li>DELETE /api/expenses/[id]</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Calculations</h3>
              <ul className="space-y-1 text-gray-600">
                <li>GET /api/calculations/budget</li>
                <li>POST /api/calculations/roi</li>
                <li>POST /api/calculations/mortgage</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
