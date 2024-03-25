import { UserId } from '#models/user'

export interface ResetHabit {
  id: string
  date: Date
  userId: UserId
}
