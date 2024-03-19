import { CirclePlus } from 'lucide-react'
import { useState } from 'react'
import { Category } from '~/types/category'
import CustomHabitsModal from './components/habits/custom_habits_modal'
import DefaultHabitsModal from './components/habits/default_habits_modal'
import DashboardLayout from './components/layouts/dashboard_layout'
import LucideIcon from './components/lucide_icon'

interface NewHabitsPageProps {
  defaultCategories: Category[]
}
export default function NewHabitsPage(props: NewHabitsPageProps) {
  const { defaultCategories } = props
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false)
  const [isDefaultModalOpen, setIsDefaultModalOpen] = useState(false)
  const [defaultCategoryId, setDefaultCategoryId] = useState<string>('')
  const [defaultCategoryName, setDefaultCategoryName] = useState<string>('')
  const bodyCategory = defaultCategories.filter((category) => category.tag.name === 'Body')
  const healthyCategory = defaultCategories.filter((category) => category.tag.name === 'Healthy')
  const unhealthyCategory = defaultCategories.filter(
    (category) => category.tag.name === 'Unhealthy'
  )
  const sportCategory = defaultCategories.filter((category) => category.tag.name === 'Sport')
  const mindCategory = defaultCategories.filter((category) => category.tag.name === 'Mind')

  const customModal = () => {
    setIsCustomModalOpen(!isCustomModalOpen)
  }
  const defaultModal = (id: string, name: string) => {
    setDefaultCategoryId(id)
    setDefaultCategoryName(name)
    setIsDefaultModalOpen(!isDefaultModalOpen)
  }
  const handleCloseDefaultModal = () => {
    setIsDefaultModalOpen(!isDefaultModalOpen)
  }
  return (
    <DashboardLayout>
      <div>
        <h1>Add Habits</h1>

        <div className="flex items-center gap-5 mt-5">
          <div
            onClick={customModal}
            className="bg-white shadow-lg w-20 h-25 rounded-lg flex justify-center items-center cursor-pointer hover:bg-light-400 hover:color-primary-500 transition duration-300"
          >
            <CirclePlus />
          </div>
          <h5>Create a custom habits</h5>
        </div>

        <div className="mt-10">
          {defaultCategories && defaultCategories.length > 0 ? (
            <div>
              <div>
                {bodyCategory.length > 0 && (
                  <div className="space-y-3 mb-5">
                    <h3>Body</h3>
                    <div className="flex gap-3">
                      {bodyCategory.map((category) => (
                        <div>
                          <div
                            onClick={() => defaultModal(category.id, category.name)}
                            className="bg-white shadow-lg w-30 h-35 p-3 rounded-lg flex flex-col justify-center items-center cursor-pointer hover:bg-light-400 hover:color-primary-500 transition duration-300"
                          >
                            <LucideIcon size={30} name={category.icon} color={category.color} />
                            <p className="mt-5 text-center">{category.name}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {healthyCategory.length > 0 && (
                  <div className="space-y-3 mb-5">
                    <h3>Healthy</h3>
                    <div className="flex gap-3">
                      {healthyCategory.map((category) => (
                        <div>
                          <div
                            onClick={() => defaultModal(category.id, category.name)}
                            className="bg-white shadow-lg w-30 h-35 p-3 rounded-lg flex flex-col justify-center items-center cursor-pointer hover:bg-light-400 hover:color-primary-500 transition duration-300"
                          >
                            <LucideIcon size={30} name={category.icon} color={category.color} />
                            <p className="mt-5 text-center">{category.name}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {unhealthyCategory.length > 0 && (
                  <div className="space-y-3 mb-5">
                    <h3>Unhealthy</h3>
                    <div className="flex gap-3">
                      {sportCategory.map((category) => (
                        <div>
                          <div
                            onClick={() => defaultModal(category.id, category.name)}
                            className="bg-white shadow-lg w-30 h-35 p-3 rounded-lg flex flex-col justify-center items-center cursor-pointer hover:bg-light-400 hover:color-primary-500 transition duration-300"
                          >
                            <LucideIcon size={30} name={category.icon} color={category.color} />
                            <p className="mt-5 text-center">{category.name}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {sportCategory.length > 0 && (
                  <div className="space-y-3 mb-5">
                    <h3>Sport</h3>
                    <div className="flex gap-3">
                      {sportCategory.map((category) => (
                        <div>
                          <div
                            onClick={() => defaultModal(category.id, category.name)}
                            className="bg-white shadow-lg w-30 h-35 p-3 rounded-lg flex flex-col justify-center items-center cursor-pointer hover:bg-light-400 hover:color-primary-500 transition duration-300"
                          >
                            <LucideIcon size={30} name={category.icon} color={category.color} />
                            <p className="mt-5 text-center">{category.name}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {mindCategory.length > 0 && (
                  <div className="space-y-3 mb-5">
                    <h3>Mind</h3>
                    <div className="flex gap-3">
                      {mindCategory.map((category) => (
                        <div>
                          <div
                            onClick={() => defaultModal(category.id, category.name)}
                            className="bg-white shadow-lg w-30 h-35 p-3 rounded-lg flex flex-col justify-center items-center cursor-pointer hover:bg-light-400 hover:color-primary-500 transition duration-300"
                          >
                            <LucideIcon size={30} name={category.icon} color={category.color} />
                            <p className="mt-5 text-center">{category.name}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div>
              <p>Il n'y a pas de catégories par défauts.</p>
            </div>
          )}
        </div>

        {/* CustomModal */}
        {isCustomModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="">
              <CustomHabitsModal closeModal={customModal} />
            </div>
          </div>
        )}
        {/* CustomModal */}
        {isDefaultModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="">
              <DefaultHabitsModal
                closeModal={handleCloseDefaultModal}
                defaultCategoryId={defaultCategoryId}
                defaultCategoryName={defaultCategoryName}
              />
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
