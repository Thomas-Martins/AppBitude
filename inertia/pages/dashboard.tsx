import { Plus } from 'lucide-react'
import { Habit } from '../../types/habit'
import HabitsCard from './components/dashboard/habits_card'
import DashboardLayout from './components/layouts/dashboard_layout'
interface DashboardProps {
  habits: Habit[]
}
export default function Dashboard(props: DashboardProps) {
  const { habits } = props

  console.log(habits)
  return (
    <DashboardLayout>
      <div className="w-full">
        <div className="flex items-center justify-between">
          <h1>Today</h1>
          <a
            href="/habits"
            className="flex items-center gap-5 p-3 rounded-full mb-2 decoration-none color-black hover:bg-light-400 transition duration-400"
          >
            <Plus size={35} />
          </a>
        </div>
        {habits && habits.length > 0 ? (
          <div>
            {habits.map((habit) => (
              <HabitsCard
                name={habit.customCategory ? habit.customCategory.name : habit.defaultCategory.name}
                goalValue={habit.goalValue}
                goalUnit={habit.goalUnit}
                value={habit.value}
                icon={habit.customCategory ? habit.customCategory.icon : habit.defaultCategory.icon}
                color={
                  habit.customCategory ? habit.customCategory.color : habit.defaultCategory.color
                }
              />
            ))}
          </div>
        ) : (
          <div>
            <p>Vous n'avez pas encore d'habitudes</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
