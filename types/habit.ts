import { Category } from './category.js'

export interface Habit {
  id: string
  userId: string
  defaultCategoryId: string
  customCategoryId: string
  goalValue: number
  goalUnit: string
  value: number
  customCategory: Category
  defaultCategory: Category
}
