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

    const habitToRef = await Habits.findOrFail(params.id)

    if (habitToRef.defaultCategoryId) {
      const habitsToDelete = await Habits.query()
        .where('default_category_id', habitToRef.defaultCategoryId)
        .where('user_id', userId)
      habitsToDelete.map((habit) => habit.delete())
    } else if (habitToRef.customCategoryId) {
      const habitsToDelete = await Habits.query()
        .where('custom_category_id', habitToRef.customCategoryId)
        .where('user_id', userId)
      habitsToDelete.map((habit) => habit.delete())
    }

    return response.redirect().toRoute('/dashboard')
  }

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
              try {
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
              } catch (error) {
                console.error("Erreur lors de la création d'une nouvelle habitude :", error)
              }
            })
          )
        }
      }

      if (!resetHabit) {
        try {
          await ResetHabits.create({ date: new Date(currentDate), userId: userId, type: 'Daily' })
        } catch (error) {
          console.error("Erreur lors de la création d'un nouveau reset habit :", error)
        }
      } else {
        try {
          await ResetHabits.query()
            .where('user_id', userId)
            .update({ date: new Date(currentDate) })
        } catch (error) {
          console.error('Erreur lors de la mise à jour du reset habit existant :', error)
        }
      }
    }
  }

  async resetWeeklyHabits({ session }: HttpContext) {
    const userId = session.get('authenticated_user')

    // Vérifiez s'il existe des habitudes hebdomadaires pour l'utilisateur
    const existingWeeklyHabits = await Habits.query()
      .where('frequency', 'Weekly')
      .where('user_id', userId)
      .orderBy('created_at', 'desc')
      .first()

    // Récupérez ou créez un enregistrement de réinitialisation hebdomadaire
    let resetHabit = await ResetHabits.query()
      .where('user_id', userId)
      .where('type', 'Weekly')
      .first()

    if (existingWeeklyHabits) {
      const currentDate = new Date()
      const startOfCurrentWeek = new Date(currentDate)
      const currentDay = currentDate.getDay() // 0 pour dimanche, 1 pour lundi, ..., 6 pour samedi

      // Calculez la différence entre la date actuelle et le premier jour de la semaine (lundi)
      const diff = currentDay === 0 ? 6 : currentDay - 1 // 0 pour dimanche, 1 pour lundi, ..., 6 pour samedi
      startOfCurrentWeek.setDate(currentDate.getDate() - diff)

      const lastResetDate = new Date(existingWeeklyHabits.date)

      // Vérifiez si la dernière habitude hebdomadaire a été créée pendant la semaine en cours
      const isCurrentWeek = lastResetDate >= startOfCurrentWeek && lastResetDate < currentDate

      // Définissez la date de début de la semaine en cours en fonction de la dernière habitude hebdomadaire
      let currentWeekStartDate = startOfCurrentWeek
      if (isCurrentWeek) {
        currentWeekStartDate = new Date(lastResetDate)
        currentWeekStartDate.setDate(
          currentWeekStartDate.getDate() - currentWeekStartDate.getDay() + 1 - 7
        )
      }

      // Vérifiez si la dernière habitude hebdomadaire a été créée la semaine précédente
      if (!isCurrentWeek && lastResetDate < startOfCurrentWeek) {
        // Vérifiez s'il n'y a pas déjà une habitude pour la semaine en cours
        const existingHabitForCurrentWeek = await Habits.query()
          .where('frequency', 'Weekly')
          .where('user_id', userId)
          .where('date', currentWeekStartDate.toISOString().split('T')[0])
          .first()

        if (!existingHabitForCurrentWeek) {
          // Créez une nouvelle habitude pour la semaine en cours
          await Habits.create({
            userId: userId,
            customCategoryId: existingWeeklyHabits.customCategoryId,
            defaultCategoryId: existingWeeklyHabits.defaultCategoryId,
            goalValue: existingWeeklyHabits.goalValue,
            goalUnit: existingWeeklyHabits.goalUnit,
            frequency: 'Weekly',
            value: 0,
            date: currentWeekStartDate.toISOString().split('T')[0],
          })

          // Mettez à jour la date de la dernière réinitialisation hebdomadaire
          if (!resetHabit) {
            await ResetHabits.create({
              date: new Date(currentWeekStartDate),
              userId: userId,
              type: 'Weekly',
            })
          } else {
            await ResetHabits.query()
              .where('user_id', userId)
              .where('type', 'Weekly')
              .update({ date: new Date(currentWeekStartDate) })
          }
        }
      }
    }
  }

  async getMissingDates(startDate: string, endDate: string): Promise<string[]> {
    const missingDates: string[] = []
    const start = new Date(startDate)
    const end = new Date(endDate)
    const currentDate = new Date(start)

    // Convertir les dates en format ISO pour la comparaison
    const isoStartDate = start.toISOString().split('T')[0]
    const isoEndDate = end.toISOString().split('T')[0]

    // Boucler sur toutes les dates entre startDate et endDate
    while (currentDate <= end) {
      const isoCurrentDate = currentDate.toISOString().split('T')[0]
      // Vérifier si la date courante est comprise entre startDate et endDate
      if (isoCurrentDate >= isoStartDate && isoCurrentDate <= isoEndDate) {
        missingDates.push(isoCurrentDate)
      }
      // Passer à la prochaine date
      currentDate.setDate(currentDate.getDate() + 1)
    }

    return missingDates
  }
}
