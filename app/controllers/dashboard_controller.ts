import Habits from '#models/habits'
import { type HttpContext } from '@adonisjs/core/http'
import HabitsController from './habits_controller.js'

export default class DashboardController {
  async index({ inertia, session }: HttpContext) {
    const userId = session.get('authenticated_user')

    await new HabitsController().resetDailyHabits({ session })
    await new HabitsController().resetWeeklyHabits({ session })

    // Chercher les habitudes de l'utilisateur
    const habits = await Habits.query()
      .preload('customCategory')
      .preload('defaultCategory')
      .where('user_id', userId)
      .orderBy('date', 'asc')

    if (habits) {
      return inertia.render('dashboard', { habits })
    } else {
      return inertia.render('dashboard', { habits: [] })
    }
  }
}
