import { X } from 'lucide-react'
import { useState } from 'react'
import { ColorPicker, useColor } from 'react-color-palette'
import Button from '../button'
import InputGroup from '../form/input_group'
import LucideIcon from '../lucide_icon'

interface CustomHabitsModalProps {
  closeModal: () => void
}
export default function CustomHabitsModal({ closeModal }: CustomHabitsModalProps) {
  const iconNames = [
    'Droplet',
    'Droplets',
    'BedDouble',
    'BookOpenText',
    'Moon',
    'Cat',
    'Dog',
    'Fish',
    'Rabbit',
    'Apple',
    'Carrot',
    'Dumbbell',
    'Beer',
    'Dessert',
    'Cigarette',
    'Tablets',
    'Code',
    'Braces',
    'Smile',
    'CircleDollarSign',
    'Banknote',
    'PiggyBank',
    'Plane',
    'NotebookPen',
    'Brain',
    'Twitter',
  ]

  const [selectedIcon, setSelectedIcon] = useState('')
  const [selectedColor, setSelectedColor] = useColor('#561ecb')

  const handleIconClick = (name: any) => {
    setSelectedIcon(name)
  }

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
          <h2 className="text-xl font-semibold mb-4">New Custom Habits</h2>
          <form action="/habits/new/custom" method="post">
            <InputGroup type="text" name="name" label="Name" placeholder="Drink, Run ..." />
            <div className="mb-5">
              <p className="font-bold text-md mb-3">Choose an icon</p>
              {iconNames.map((name) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => handleIconClick(name)}
                  className={`bg-white border-none w-12 h-12 mr-2 mb-2 rounded-full border-2 border-white border-solid hover:bg-light-500 hover:border-dark-400 transition duration-300 ${selectedIcon === name ? 'focus:outline-none focus:ring-2 focus:ring-primary-500' : ''}`}
                >
                  <LucideIcon name={name} size={30} color={'#000'} />
                </button>
              ))}
              <input type="hidden" name="icon" value={selectedIcon} />
            </div>
            <div className="mb-5">
              <ColorPicker
                hideInput={['hex', 'rgb', 'hsv']}
                color={selectedColor}
                onChange={setSelectedColor}
              />
              <input type="hidden" name="color" value={selectedColor.hex} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <InputGroup type="number" label="Goal" name="goal_value" placeholder="1" />
              <InputGroup
                type="text"
                label="Unit"
                name="goal_unit"
                placeholder="liters, minutes, etc"
              />
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
