import Habits from '#models/habits'
import { type HttpContext } from '@adonisjs/core/http'
import HabitsController from './habits_controller.js'

export default class DashboardController {
  async index({ inertia, session }: HttpContext) {
    const userId = session.get('authenticated_user')

    const currentDate = new Date().toISOString().split('T')[0]

    await new HabitsController().resetDailyHabits({ session })
    // Chercher les habitudes de l'utilisateur
    const habits = await Habits.query()
      .preload('customCategory')
      .preload('defaultCategory')
      .where('user_id', userId)
      .where('date', [currentDate])

    if (habits) {
      return inertia.render('dashboard', { habits })
    } else {
      return inertia.render('dashboard', { habits: [] })
    }
  }
}
