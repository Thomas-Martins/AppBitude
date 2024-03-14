import { CircleFadingPlus, LayoutDashboard, Settings } from 'lucide-react'

interface DashboardMenuProps {
  isMobileMenuOpen: boolean
}

const DashboardMenu = ({ isMobileMenuOpen }: DashboardMenuProps) => {
  return (
    <div className={`color-white ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
      <div className="px-2 py-2">
        <div className="flex items-center gap-5 p-3 rounded-xl mb-2 hover:bg-primary-600 transition duration-400">
          <LayoutDashboard size={28} />
          <a href="/dashboard" className="color-white decoration-none">
            Dashboard
          </a>
        </div>
        <div className="flex items-center gap-5 p-3 rounded-xl mb-2 hover:bg-primary-600 transition duration-400">
          <CircleFadingPlus />
          <a href="/habits" className="color-white decoration-none">
            Add Habits
          </a>
        </div>
        <div className="flex items-center gap-5 p-3 rounded-xl mb-2 hover:bg-primary-600 transition duration-400">
          <Settings />
          <a href="/user/settings" className="color-white decoration-none">
            Settings
          </a>
        </div>
        <div className="w-full text-center mt-5">
          <form action="/logout">
            <button
              className="border-none w-full py-3 rounded-lg hover:bg-dark-100 transition duration-400"
              type="submit"
            >
              Logout
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default DashboardMenu
