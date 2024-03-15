import { Category } from '../../types/category'
import Button from './components/button'
import DashboardLayout from './components/layouts/dashboard_layout'
import LucideIcon from './components/lucide_icon'

interface CategoriesPageProps {
  categories: Category[]
}

export default function CategoriesPage(props: CategoriesPageProps) {
  const { categories } = props

  return (
    <DashboardLayout>
      <div>
        <h1 className="mb-5">Categories</h1>
        <div className="mb-5">
          <a href="/categories/new">
            <Button type="button">New category</Button>
          </a>
        </div>
        {categories && categories.length > 0 ? (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Icon</th>
                <th className="border border-gray-300 px-4 py-2">Color</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {categories.map((category) => (
                <tr key={category.name}>
                  <td className="border border-gray-300 px-4 py-2">{category.name}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <LucideIcon name={category.icon} color={'#000'} size={20} />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <div
                      className="w-8 h-8 rounded mx-auto"
                      style={{ backgroundColor: category.color }}
                    ></div>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <form action={`categories/delete/${category.id}`} method="post">
                      <Button type="submit">Delete</Button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>There are no categories at the moment.</p>
        )}
      </div>
    </DashboardLayout>
  )
}
