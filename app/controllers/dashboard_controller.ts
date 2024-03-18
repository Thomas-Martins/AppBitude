import Habits from '#models/habits'
import type { HttpContext } from '@adonisjs/core/http'

export default class DashboardController {
  async index({ inertia, session }: HttpContext) {
    const userId = session.get('authenticated_user')

    // Chercher les habitudes de l'utilisateur
    const habits = await Habits.query()
      .preload('customCategory')
      .preload('defaultCategory')
      .where('user_id', userId)
      .orderBy('created_at', 'asc')

    // Vérifier si des habitudes ont été trouvées
    if (habits) {
      // S'il y a des habitudes, les envoyer à la vue
      return inertia.render('dashboard', { habits })
    } else {
      // S'il n'y a pas d'habitudes, envoyer un tableau vide à la vue
      return inertia.render('dashboard', { habits: [] })
    }
  }
}
