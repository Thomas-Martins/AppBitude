import { Plus } from 'lucide-react'
import HabitsCard from './components/dashboard/habits_card'
import DashboardLayout from './components/layouts/dashboard_layout'
export default function Dashboard() {
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
        <HabitsCard />
      </div>
    </DashboardLayout>
  )
}
