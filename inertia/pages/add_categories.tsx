import { useState } from 'react'
import { ColorPicker, useColor } from 'react-color-palette'
import 'react-color-palette/css'
import Button from './components/button'
import InputGroup from './components/form/input_group'
import DashboardLayout from './components/layouts/dashboard_layout'
import LucideIcon from './components/lucide_icon'

export default function AddCategoriesPage() {
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
  ]
  const [selectedIcon, setSelectedIcon] = useState('')
  const [selectedColor, setSelectedColor] = useColor('#561ecb')

  const handleIconClick = (name: any) => {
    setSelectedIcon(name)
    console.log(name)
  }

  console.log(selectedColor.hex)
  return (
    <DashboardLayout>
      <div>
        <h1 className="mb-10">New Category</h1>
        <form action="/categories/new" method="post">
          <InputGroup type="text" label="Name" name="name" />

          <div className="mb-5">
            <ColorPicker
              hideInput={['hex', 'rgb', 'hsv']}
              color={selectedColor}
              onChange={setSelectedColor}
            />
            <input type="hidden" name="color" value={selectedColor.hex} />
          </div>
          <div className="mb-5">
            <p className="font-bold text-lg mb-3">Choose an icon</p>
            {iconNames.map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => handleIconClick(name)}
                className={`bg-white border-none w-13 h-13 mr-2 mb-2 rounded-lg border-2 border-white border-solid hover:bg-light-500 hover:border-dark-400 transition duration-300 ${selectedIcon === name ? 'focus:outline-none focus:ring-2 focus:ring-primary-500' : ''}`}
              >
                <LucideIcon name={name} size={30} color={'#000'} />
              </button>
            ))}
            <input type="hidden" name="icon" value={selectedIcon} />
          </div>
          <div>
            <Button type="submit">Create category</Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  )
}
