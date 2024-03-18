import CustomCategory from '#models/custom_category'
import Habits from '#models/habits'
import { HttpContext } from '@adonisjs/core/http'

export default class HabitsController {
  addHabitsView({ inertia }: HttpContext) {
    return inertia.render('new_habits')
  }

  async createCustomHabits({ request, response, session }: HttpContext) {
    const userId = session.get('authenticated_user')
    if (!userId) {
      return response.redirect().toRoute('/login')
    }
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

  async updateHabitsData({ request, response, params, session, inertia }: HttpContext) {
    const userId = session.get('authenticated_user')
    if (!userId) {
      return response.redirect().toRoute('/login')
    }

    const payload = request.only(['value'])

    const updatedHabits = await Habits.findOrFail(params.id)

    if (updatedHabits) {
      await updatedHabits.merge(payload).save()
      return inertia.render('dashboard')
    }

    return response.status(404).json({ message: 'Error updating' })
  }

  async deleteHabit({ response, session, params }: HttpContext) {
    const userId = session.get('authenticated_user')

    if (!userId) {
      return response.redirect().toRoute('/login')
    }

    const habitsToDelete = await Habits.findOrFail(params.id)
    await habitsToDelete.delete()
    return response.redirect().toRoute('/dashboard')
  }
}
