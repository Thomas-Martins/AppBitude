import { Beer, Carrot, CirclePlus, Droplets, Dumbbell, Footprints, Twitter } from 'lucide-react'
import DashboardLayout from './components/layouts/dashboard_layout'

export default function AddHabitsPage() {
  return (
    <DashboardLayout>
      <div>
        <h1>Add Habits</h1>

        <div className="flex items-center gap-5 mt-5">
          <div className="bg-white shadow-lg w-20 h-25 rounded-lg flex justify-center items-center hover:bg-light-400 hover:color-primary-500 transition duration-300">
            <CirclePlus />
          </div>
          <h5>Create a custom habits</h5>
        </div>

        <div className="mt-10">
          <div>
            <h3 className="mb-5">Healthy habits</h3>
            <div className="flex gap-2">
              <div className="bg-white shadow-lg w-30 h-35 p-3 rounded-lg flex flex-col justify-center items-center hover:bg-light-400 hover:color-primary-500 transition duration-300">
                <Droplets size={30} />
                <p className="mt-5 text-center">Drink Water</p>
              </div>
              <div className="bg-white shadow-lg w-30 h-35 p-3 rounded-lg flex flex-col justify-center items-center hover:bg-light-400 hover:color-primary-500 transition duration-300">
                <Carrot size={30} />
                <p className="mt-5 text-center">Eat vegetables</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <div>
            <h3 className="mb-5">Unhealthy habits</h3>
            <div className="flex gap-2">
              <div className="bg-white shadow-lg w-30 h-35 p-3 rounded-lg flex flex-col justify-center items-center hover:bg-light-400 hover:color-primary-500 transition duration-300">
                <Twitter size={30} />
                <p className="mt-5 text-center">Reduce Social Media</p>
              </div>
              <div className="bg-white shadow-lg w-30 h-35 p-3 rounded-lg flex flex-col justify-center items-center hover:bg-light-400 hover:color-primary-500 transition duration-300">
                <Beer size={30} />
                <p className="mt-5 text-center">Reduce alcoohol</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <div>
            <h3 className="mb-5">Body</h3>
            <div className="flex gap-2">
              <div className="bg-white shadow-lg w-30 h-35 p-3 rounded-lg flex flex-col justify-center items-center hover:bg-light-400 hover:color-primary-500 transition duration-300">
                <Footprints size={30} />
                <p className="mt-5 text-center">Walk</p>
              </div>
              <div className="bg-white shadow-lg w-30 h-35 p-3 rounded-lg flex flex-col justify-center items-center hover:bg-light-400 hover:color-primary-500 transition duration-300">
                <Dumbbell size={30} />
                <p className="mt-5 text-center">Go to the gym</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
