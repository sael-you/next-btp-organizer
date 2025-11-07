/**
 * Type definitions for the Morocco Building Project Organizer
 */

export type ProjectStatus = 'PLANNING' | 'IN_PROGRESS' | 'ON_HOLD' | 'COMPLETED'
export type MilestoneStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'OVERDUE'
export type Priority = 'LOW' | 'MEDIUM' | 'HIGH'
export type TaskStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED'
export type ExpenseCategory = 'LAND' | 'PERMITS' | 'MATERIALS' | 'LABOUR' | 'UTILITIES' | 'OTHER'
export type DocumentType = 'CONTRACT' | 'INVOICE' | 'PERMIT' | 'PLAN' | 'OTHER'

export const EXPENSE_CATEGORIES: { value: ExpenseCategory; label: string }[] = [
  { value: 'LAND', label: 'Land' },
  { value: 'PERMITS', label: 'Permits' },
  { value: 'MATERIALS', label: 'Materials' },
  { value: 'LABOUR', label: 'Labour' },
  { value: 'UTILITIES', label: 'Utilities' },
  { value: 'OTHER', label: 'Other' },
]

export const PROJECT_STATUSES: { value: ProjectStatus; label: string }[] = [
  { value: 'PLANNING', label: 'Planning' },
  { value: 'IN_PROGRESS', label: 'In Progress' },
  { value: 'ON_HOLD', label: 'On Hold' },
  { value: 'COMPLETED', label: 'Completed' },
]

export const MILESTONE_STATUSES: { value: MilestoneStatus; label: string }[] = [
  { value: 'PENDING', label: 'Pending' },
  { value: 'IN_PROGRESS', label: 'In Progress' },
  { value: 'COMPLETED', label: 'Completed' },
  { value: 'OVERDUE', label: 'Overdue' },
]

export const PRIORITIES: { value: Priority; label: string }[] = [
  { value: 'LOW', label: 'Low' },
  { value: 'MEDIUM', label: 'Medium' },
  { value: 'HIGH', label: 'High' },
]

export const DOCUMENT_TYPES: { value: DocumentType; label: string }[] = [
  { value: 'CONTRACT', label: 'Contract' },
  { value: 'INVOICE', label: 'Invoice' },
  { value: 'PERMIT', label: 'Permit' },
  { value: 'PLAN', label: 'Plan' },
  { value: 'OTHER', label: 'Other' },
]
