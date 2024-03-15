import { X } from 'lucide-react'
import Button from '../button'
import InputGroup from '../form/input_group'

interface DefaultHabitsModalProps {
  closeModal: () => void
}
export default function DefaultHabitsModal({ closeModal }: DefaultHabitsModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-auto">
      <div className="bg-white p-8 rounded-lg w-80 md:w-140 ">
        <div
          className="max-h-full overflow-auto"
          style={{ maxHeight: 'calc(100vh - 200px)', overflowX: 'hidden' }}
        >
          <button
            onClick={closeModal}
            className="absolute top-0 right-0 m-4 rounded-full p-2 bg-white border-none flex justify-center items-center cursor-pointer hover:bg-light-600 transition duration-400"
          >
            <X />
          </button>
          <h2 className="text-xl font-semibold mb-4">New Default Habits</h2>
          <form action="/habits/new/custom" method="post">
            <InputGroup type="text" name="name" label="Name" placeholder="Drink, Run ..." />
            <div className="grid grid-cols-2 gap-3">
              <InputGroup type="number" label="Goal" name="goal_value" placeholder="1" />
              <InputGroup
                type="text"
                label="Unit"
                name="goal_unit"
                placeholder="liters, minutes, etc"
              />
            </div>
            <div>
              <Button type="submit">Create</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
