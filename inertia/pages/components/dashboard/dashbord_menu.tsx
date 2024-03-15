import { LayoutDashboard, Settings, Tags } from 'lucide-react'

interface DashboardMenuProps {
  isMobileMenuOpen: boolean
  userRole: string
}

const DashboardMenu = ({ isMobileMenuOpen, userRole }: DashboardMenuProps) => {
  return (
    <div className={`color-white ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
      <div className="px-2 py-2">
        <a
          href="/"
          className="flex items-center gap-5 p-3 rounded-xl mb-2 color-white decoration-none hover:bg-primary-600 transition duration-400"
        >
          <LayoutDashboard size={28} />
          <div>Dashboard</div>
        </a>
        {userRole === 'admin' && (
          <a
            href="/categories"
            className="flex items-center gap-5 p-3 rounded-xl mb-2 color-white decoration-none hover:bg-primary-600 transition duration-400"
          >
            <Tags />
            <div>Categories</div>
          </a>
        )}

        <a
          href="/user/settings"
          className="flex items-center gap-5 p-3 rounded-xl mb-2 color-white decoration-none hover:bg-primary-600 transition duration-400"
        >
          <Settings />
          <div>Settings</div>
        </a>
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
