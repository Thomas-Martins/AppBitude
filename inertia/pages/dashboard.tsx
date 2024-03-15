import HabitsCard from './components/dashboard/habits_card'
import DashboardLayout from './components/layouts/dashboard_layout'
export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="w-full">
        <HabitsCard />
      </div>
    </DashboardLayout>
  )
}
