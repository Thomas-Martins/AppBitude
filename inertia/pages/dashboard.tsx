import { usePage } from '@inertiajs/react'
import HabitsCard from './components/dashboard/habits_card'
import DashboardLayout from './components/layouts/dashboard_layout'

export default function Dashboard() {
  const { props } = usePage()

  console.log(props)

  return (
    <DashboardLayout>
      <div className="">
        <HabitsCard />
      </div>
    </DashboardLayout>
  )
}
