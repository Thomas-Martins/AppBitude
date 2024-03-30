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
    let lastResetDate: string = resetHabit ? resetHabit.date.toISOString().split('T')[0] : ''

    if (!lastResetDate || lastResetDate !== currentDate) {
      const latestHabit = await Habits.query()
        .where('frequency', 'Daily')
        .where('user_id', userId)
        .where('date', lastResetDate ? lastResetDate : currentDate)
        .orderBy('created_at', 'desc')
        .first()

      if (latestHabit) {
        const habitsBetweenDates = await Habits.query()
          .where('frequency', 'Daily')
          .where('user_id', userId)
          .whereBetween('date', [lastResetDate, currentDate])

        const existingDates = habitsBetweenDates.map(
          (habit: any) => habit.date.toISOString().split('T')[0]
        )

        const allDates = await this.getMissingDates(lastResetDate, currentDate)

        for (const habit of habitsBetweenDates) {
          const missingDatesForHabit = allDates.filter(
            (date: string) => !existingDates.includes(date)
          )

          await Promise.all(
            missingDatesForHabit.map(async (date: string) => {
              await Habits.create({
                userId: userId,
                customCategoryId: habit.customCategoryId,
                defaultCategoryId: habit.defaultCategoryId,
                goalValue: habit.goalValue,
                goalUnit: habit.goalUnit,
                frequency: 'Daily',
                value: 0,
                date: date,
              })
            })
          )
        }
      }
      console.log(currentDate)

      if (!resetHabit) {
        await ResetHabits.create({ date: new Date(currentDate), userId: userId })
      } else {
        await ResetHabits.query()
          .where('user_id', userId)
          .update({ date: new Date(currentDate) })
      }
    }
  }

  // Fonction pour obtenir les dates manquantes entre deux dates
  async getMissingDates(startDate: string, endDate: string): Promise<string[]> {
    const missingDates: string[] = []
    const start = new Date(startDate)
    const end = new Date(endDate)
    const currentDate = new Date(start)

    while (currentDate < end) {
      currentDate.setDate(currentDate.getDate() + 1)
      missingDates.push(currentDate.toISOString().split('T')[0])
    }

    return missingDates
  }
}
