import { usePage } from '@inertiajs/react'
import DashboardLayout from './components/layouts/dashboard_layout'

export default function Dashboard() {
  const { props } = usePage()

  console.log(props)

  return (
    <DashboardLayout>
      <div className="">Test</div>
    </DashboardLayout>
  )
}
