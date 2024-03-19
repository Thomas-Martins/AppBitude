import { X } from 'lucide-react'
import Button from '../button'
import InputGroup from '../form/input_group'

interface DefaultHabitsModalProps {
  closeModal: () => void
  defaultCategoryName: string
  defaultCategoryId: string
}
export default function DefaultHabitsModal({
  closeModal,
  defaultCategoryId,
  defaultCategoryName,
}: DefaultHabitsModalProps) {
  console.log(defaultCategoryId, defaultCategoryName)
  const handleCloseModal = () => {
    closeModal() // Appel à closeModal sans arguments
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-auto">
      <div className="bg-white p-8 rounded-lg w-80 md:w-140 ">
        <div
          className="max-h-full overflow-auto"
          style={{ maxHeight: 'calc(100vh - 200px)', overflowX: 'hidden' }}
        >
          <button
            onClick={handleCloseModal}
            className="absolute top-0 right-0 m-4 rounded-full p-2 bg-white border-none flex justify-center items-center cursor-pointer hover:bg-light-600 transition duration-400"
          >
            <X />
          </button>
          <h2 className="text-xl font-semibold mb-4">New Default Habits</h2>
          <form action="/habits/new/default" method="post">
            <InputGroup type="text" name="name" label="Name" value={defaultCategoryName} />
            <div className="grid grid-cols-2 gap-3">
              <InputGroup type="number" label="Goal" name="goal_value" placeholder="1" />
              <InputGroup
                type="text"
                label="Unit"
                name="goal_unit"
                placeholder="liters, minutes, etc"
              />
            </div>
            <div className="mb-5">
              <p className="font-bold mb-2">Frequency</p>
              <select
                name="frequency"
                id="frequency"
                className="border-none w-full p-4 text-lg bg-light-400 rounded-lg"
              >
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
              </select>
            </div>
            <input type="hidden" name="id" value={defaultCategoryId} />
            <div>
              <Button type="submit">Create</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
