import { Category } from './category.js'

export interface Habit {
  id: string
  userId: string
  defaultCategoryId: string
  customCategoryId: string
  goalValue: number
  goalUnit: string
  value: number
  frequency: string
  customCategory: Category
  defaultCategory: Category
}
