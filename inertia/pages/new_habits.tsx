import { Carrot, CirclePlus, Droplets } from 'lucide-react'
import { useState } from 'react'
import CustomHabitsModal from './components/habits/custom_habits_modal'
import DefaultHabitsModal from './components/habits/default_habits_modal'
import DashboardLayout from './components/layouts/dashboard_layout'
export default function NewHabitsPage() {
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false)
  const [isDefaultModalOpen, setIsDefaultModalOpen] = useState(false)

  const customModal = () => {
    setIsCustomModalOpen(!isCustomModalOpen)
  }
  const defaultModal = () => {
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
          <div>
            <h3 className="mb-5">Healthy habits</h3>
            <div className="flex gap-2">
              <div
                onClick={defaultModal}
                className="bg-white shadow-lg w-30 h-35 p-3 rounded-lg flex flex-col justify-center items-center cursor-pointer hover:bg-light-400 hover:color-primary-500 transition duration-300"
              >
                <Droplets size={30} />
                <p className="mt-5 text-center">Drink Water</p>
              </div>
              <div
                onClick={defaultModal}
                className="bg-white shadow-lg w-30 h-35 p-3 rounded-lg flex flex-col justify-center items-center cursor-pointer hover:bg-light-400 hover:color-primary-500 transition duration-300"
              >
                <Carrot size={30} />
                <p className="mt-5 text-center">Eat vegetables</p>
              </div>
            </div>
          </div>
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
              <DefaultHabitsModal closeModal={defaultModal} />
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
