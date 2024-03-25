import CustomCategory from '#models/custom_category'
import DefaultCategory from '#models/default_category'
import Habits from '#models/habits'
import ResetHabits from '#models/reset_habits'
import { HttpContext } from '@adonisjs/core/http'

export default class HabitsController {
  async addHabitsView({ inertia }: HttpContext) {
    const defaultCategories = await DefaultCategory.query().preload('tag')
    return inertia.render('new_habits', { defaultCategories })
  }

  async createCustomHabits({ request, response, session }: HttpContext) {
    // 1 - Check if the user is authenticated
    const userId = session.get('authenticated_user')
    if (!userId) {
      return response.redirect().toRoute('/login')
    }
    // 2 - Check the request
    const payload = request.only(['name', 'icon', 'color', 'goal_value', 'goal_unit', 'frequency'])
    // 3. Create the custom category
    const customCategory = await CustomCategory.create({
      name: payload.name,
      icon: payload.icon,
      color: payload.color,
      userId: userId,
    })

    // return the id of the custom category
    const { id: customCategoryId } = customCategory

    // 4 - Create the habit with the id of the custom category, id of the user, the goal value and the goal unit, and the frequency
    await Habits.create({
      userId: userId,
      customCategoryId: customCategoryId,
      goalValue: payload.goal_value,
      goalUnit: payload.goal_unit,
      frequency: payload.frequency,
    })
    return response.redirect().toRoute('/dashboard')
  }

  async createDefaultHabits({ request, response, session }: HttpContext) {
    const userId = session.get('authenticated_user')
    if (!userId) {
      return response.redirect().toRoute('/login')
    }
    const payload = request.only(['id', 'goal_value', 'goal_unit', 'frequency'])

    await Habits.create({
      userId: userId,
      defaultCategoryId: payload.id,
      goalValue: payload.goal_value,
      goalUnit: payload.goal_unit,
      frequency: payload.frequency,
    })

    return response.redirect().toRoute('/dashboard')
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

  // Modifier la logique ou crée d'autre methode pour le weekly et le monthly
  async resetDailyHabits({ session }: HttpContext) {
    const userId = session.get('authenticated_user')
    const currentDate = new Date().toISOString().split('T')[0]
    let resetHabit = await ResetHabits.query().where('user_id', userId).first()
    let lastResetDate: string | null = null

    //variable avec la date de la vieille
    const previousDate = new Date()
    previousDate.setDate(previousDate.getDate() - 1)
    const previousDateString = previousDate.toISOString().split('T')[0]

    if (resetHabit) {
      lastResetDate = resetHabit.date.toISOString().split('T')[0]
    }

    // Si je n'ai pas de date de reset enregistrée ou si la date de réinitialisation précédente est différente de la date actuelle
    if (!lastResetDate || lastResetDate !== currentDate) {
      // Je récupère les habitudes avec une fréquence daily
      const dailyHabits = await Habits.query()
        .where('frequency', 'Daily')
        .where('user_id', userId)
        .where('date', previousDateString)
      // Je boucle sur les habitudes
      await Promise.all(
        dailyHabits.map(async (habit: any) => {
          const habitDate = habit.date.toISOString().split('T')[0]
          // Si la date de création de l'habitude est différente de la date du jour
          // on crée une nouvelle habitude identique avec une valeur de 0
          if (habitDate !== currentDate) {
            await Habits.create({
              userId: userId,
              customCategoryId: habit.customCategoryId,
              defaultCategoryId: habit.defaultCategoryId,
              goalValue: habit.goalValue,
              goalUnit: habit.goalUnit,
              frequency: habit.frequency,
              value: 0,
              date: currentDate,
            })
          }
        })
      )

      // Une fois les habitudes créées, j'ajoute ou je mets à jour la date de reset avec l'id de l'utilisateur en bdd pour limiter le reset
      if (!lastResetDate) {
        // S'il n'y a pas de date de reset enregistrée, je crée une nouvelle entrée dans la table ResetHabits
        await ResetHabits.create({ date: new Date(currentDate), userId: userId })
      } else {
        // S'il y a une date de reset enregistrée, je mets à jour la date avec la date actuelle
        await ResetHabits.query()
          .where('user_id', userId)
          .update({ date: new Date(currentDate) })
      }
    }
  }
}
