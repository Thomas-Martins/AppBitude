import { useState } from 'react'
import { ColorPicker, useColor } from 'react-color-palette'
import 'react-color-palette/css'
import { Tag } from '../../types/tag'
import Button from './components/button'
import InputGroup from './components/form/input_group'
import DashboardLayout from './components/layouts/dashboard_layout'
import LucideIcon from './components/lucide_icon'

interface AddCategoriesPageProps {
  tags: Tag[]
}

export default function AddCategoriesPage(props: AddCategoriesPageProps) {
  const { tags } = props

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
  const [selectedTag, setSelectedTag] = useState(tags.length > 0 ? tags[0].id : '')

  const handleIconClick = (name: any) => {
    setSelectedIcon(name)
  }

  console.log(selectedTag)
  return (
    <DashboardLayout>
      <div>
        <h1 className="mb-10">New Category</h1>
        <form action="/categories/new" method="post">
          <InputGroup type="text" label="Name" name="name" />
          <div className="mb-5">
            <p className="font-bold mb-2">Choose a Tag</p>
            <select
              name="tag"
              id="tag"
              value={selectedTag}
              className="border-none w-full p-4 text-lg bg-dark-100 rounded-lg"
              onChange={(e) => setSelectedTag(e.target.value)}
            >
              {tags.map((tag) => (
                <option key={tag.id} value={tag.id}>
                  {tag.name}
                </option>
              ))}
            </select>
            <input type="hidden" name="tag_id" value={selectedTag} />
          </div>
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
                className={`bg-white border-none w-12 h-12 mr-2 mb-2 rounded-full border-2 border-white border-solid hover:bg-light-500 hover:border-dark-400 transition duration-300 ${selectedIcon === name ? 'focus:outline-none focus:ring-2 focus:ring-primary-500' : ''}`}
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
