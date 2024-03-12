import { CircleFadingPlus, LayoutDashboard, Settings } from 'lucide-react'

interface DashboardMenuProps {
  isMobileMenuOpen: boolean
}

const DashboardMenu = ({ isMobileMenuOpen }: DashboardMenuProps) => {
  return (
    <div className={`color-white p-2 ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
      <div className="p-4 space-y-5">
        <div className="flex items-center gap-5">
          <LayoutDashboard size={28} />
          <a href="/dashboard" className="color-white decoration-none">
            Dashboard
          </a>
        </div>
        <div className="flex items-center gap-5">
          <CircleFadingPlus />
          <p>Add Habits</p>
        </div>
        <div className="flex items-center gap-5">
          <Settings />
          <p>Settings</p>
        </div>
        <div className="w-full bg-green-500 text-center">
          <form action="/logout">
            <button className="border-none w-full py-3 rounded-lg" type="submit">
              Logout
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default DashboardMenu
