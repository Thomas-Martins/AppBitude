import { Plus } from 'lucide-react'
import { Habit } from '../../types/habit'
import HabitsCard from './components/habits/habits_card'
import DashboardLayout from './components/layouts/dashboard_layout'

interface DashboardProps {
  habits: Habit[]
  resetDailyHabits: Habit[]
  test: string
}

export default function Dashboard(props: DashboardProps) {
  const { habits } = props

  // Filtrer les habitudes par fréquence
  const dailyHabits = habits.filter((habit) => habit.frequency === 'Daily')
  const weeklyHabits = habits.filter((habit) => habit.frequency === 'Weekly')
  const monthlyHabits = habits.filter((habit) => habit.frequency === 'Monthly')

  return (
    <DashboardLayout>
      <div className="w-full relative">
        <div className="absolute top-0 right-0">
          <a
            href="/habits"
            className="flex items-center gap-5 p-3 rounded-full mb-2 decoration-none color-black hover:bg-light-400 transition duration-400"
          >
            <Plus size={35} />
          </a>
        </div>
        {dailyHabits.length > 0 && (
          <div className="mb-5 space-y-5">
            <h2>Today</h2>
            <div className="grid grid-cols-1 justify-items-center gap-5 md:grid-cols-2 md:justify-items-start lg:grid-cols-3 xl:grid-cols-4">
              {dailyHabits.map((habit) => (
                <HabitsCard
                  key={habit.id}
                  idHabit={habit.id}
                  name={
                    habit.customCategory ? habit.customCategory.name : habit.defaultCategory.name
                  }
                  goalValue={habit.goalValue}
                  goalUnit={habit.goalUnit}
                  value={habit.value}
                  icon={
                    habit.customCategory ? habit.customCategory.icon : habit.defaultCategory.icon
                  }
                  color={
                    habit.customCategory ? habit.customCategory.color : habit.defaultCategory.color
                  }
                />
              ))}
            </div>
          </div>
        )}

        {weeklyHabits.length > 0 && (
          <div className="mb-5 space-y-5">
            <h2>This Week</h2>
            <div className="grid grid-cols-1 justify-items-center gap-5 md:grid md-grid-cols-2 md:justify-items-start md:gap- lg:grid-cols-3 xl:grid-cols-4">
              {weeklyHabits.map((habit) => (
                <HabitsCard
                  key={habit.id}
                  idHabit={habit.id}
                  name={
                    habit.customCategory ? habit.customCategory.name : habit.defaultCategory.name
                  }
                  goalValue={habit.goalValue}
                  goalUnit={habit.goalUnit}
                  value={habit.value}
                  icon={
                    habit.customCategory ? habit.customCategory.icon : habit.defaultCategory.icon
                  }
                  color={
                    habit.customCategory ? habit.customCategory.color : habit.defaultCategory.color
                  }
                />
              ))}
            </div>
          </div>
        )}
        {monthlyHabits.length > 0 && (
          <div className="mb-5 space-y-5">
            <h2>This Month</h2>
            <div className="grid grid-cols-1 justify-items-center gap-5 md:grid md-grid-cols-2 md:justify-items-start md:gap- lg:grid-cols-3 xl:grid-cols-4">
              {monthlyHabits.map((habit) => (
                <HabitsCard
                  key={habit.id}
                  idHabit={habit.id}
                  name={
                    habit.customCategory ? habit.customCategory.name : habit.defaultCategory.name
                  }
                  goalValue={habit.goalValue}
                  goalUnit={habit.goalUnit}
                  value={habit.value}
                  icon={
                    habit.customCategory ? habit.customCategory.icon : habit.defaultCategory.icon
                  }
                  color={
                    habit.customCategory ? habit.customCategory.color : habit.defaultCategory.color
                  }
                />
              ))}
            </div>
          </div>
        )}
        {habits.length === 0 && (
          <div>
            <p>Vous n'avez pas encore d'habitudes</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
