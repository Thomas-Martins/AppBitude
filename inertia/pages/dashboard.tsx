// Dashboard.tsx

import { Plus } from 'lucide-react'
import { Habit } from '../../types/habit'
import ChartSection from './chart_section'
import HabitsCard from './components/habits/habits_card'
import DashboardLayout from './components/layouts/dashboard_layout'

interface DashboardProps {
  habits: Habit[]
}

export default function Dashboard({ habits }: DashboardProps) {
  // Filtrer les habitudes par fréquence et période
  const today = new Date().toISOString().split('T')[0]
  const startOfWeek = new Date()
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay())
  const startOfMonth = new Date()
  startOfMonth.setDate(1)

  const dailyHabits = habits.filter(
    (habit) => habit.frequency === 'Daily' && habit.date.toString().split('T')[0] === today
  )
  const weeklyHabits = habits.filter((habit) => {
    const habitDate = new Date(habit.date)
    return habit.frequency === 'Weekly' && habitDate >= startOfWeek
  })
  const monthlyHabits = habits.filter((habit) => {
    const habitDate = new Date(habit.date)
    return habit.frequency === 'Monthly' && habitDate >= startOfMonth
  })

  return (
    <DashboardLayout>
      <div className="w-full relative">
        <div>
          {habits.length === 0 ? (
            <div className="flex justify-between items-center ">
              <div>
                <p>You don't have any habits for the moment.</p>
              </div>
              <div className=" p-2 rounded-full  hover:bg-light-400 transition duration-400">
                <a href="/habits/new" className="flex items-center decoration-none color-black">
                  <Plus size={35} />
                </a>
              </div>
            </div>
          ) : (
            <div className="absolute top-0 right-0 p-2 rounded-full hover:bg-light-400 transition duration-400">
              <a href="/habits/new" className="flex items-center decoration-none color-black ">
                <Plus size={35} />
              </a>
            </div>
          )}
        </div>

        {dailyHabits.length > 0 && (
          <div className="mb-10 space-y-6">
            <h2>Today</h2>
            <div className="flex flex-col gap-5 justify-center items-center md:flex-row md:flex-wrap md:justify-start">
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
            <div className="flex flex-col gap-5 justify-center items-center md:flex-row md:flex-wrap md:justify-start">
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
            <div className="flex flex-col gap-5 justify-center items-center md:flex-row md:flex-wrap md:justify-start">
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
        {/* Section Graphique */}
        <div>
          <ChartSection data={habits} />
        </div>
      </div>
    </DashboardLayout>
  )
}
