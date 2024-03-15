// import type { HttpContext } from '@adonisjs/core/http'

import CustomCategory from '#models/custom_category'
import Habits from '#models/habits'
import { HttpContext } from '@adonisjs/core/http'

export default class HabitsController {
  addHabitsView({ inertia }: HttpContext) {
    return inertia.render('new_habits')
  }

  async createCustomHabits({ request, response, session }: HttpContext) {
    const userId = session.get('authenticated_user')
    // 1. Créer la custom category
    const payload = request.only(['name', 'icon', 'color', 'goal_value', 'goal_unit'])
    const customCategory = await CustomCategory.create({
      name: payload.name,
      icon: payload.icon,
      color: payload.color,
      userId: userId,
    })
    // 2. Récupérer l'id de la custom category créée
    const { id: customCategoryId } = customCategory

    // 3. Créer la custom habit avec l'id de la custom category
    await Habits.create({
      userId: userId,
      customCategoryId: customCategoryId,
      goalValue: payload.goal_value,
      goalUnit: payload.goal_unit,
    })

    // 4. Retourner sur le dashboard
    return response.redirect().toRoute('/dashboard')
  }

  createDefaultHabits({ request, response }: HttpContext) {
    const payload = request.only(['name', 'icon', 'color', 'id_user', 'goal_value', 'goal_unit'])
    return response.json(payload)
  }
}
