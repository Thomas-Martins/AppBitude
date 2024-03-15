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
          <table className="w-full">
            <thead>
              <tr>
                <th className="px-2 py-2">Name</th>
                <th className="px-2 py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {categories.map((category) => (
                <tr key={category.name}>
                  <td className="px-2 py-2 flex justify-start items-center gap-3">
                    <div className="p-2 rounded-full flex items-center bg-white">
                      <LucideIcon name={category.icon} color={category.color} size={20} />
                    </div>
                    <p className="text-sm lg:text-2xl">{category.name}</p>
                  </td>
                  <td className="">
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
