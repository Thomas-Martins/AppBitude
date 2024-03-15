import { CircleMinus, CirclePlus, icons } from 'lucide-react'
import { useState } from 'react'

export default function HabitsCard() {
  const habits = [
    {
      name: 'Sleep',
      iconName: 'BedDouble',
      color: '#5E4BDE',
      goal: 8,
      goalUnit: 'hours',
      value: 0,
    },
    {
      name: 'Read',
      iconName: 'BookOpenText',
      color: '#E05013',
      goal: 30,
      goalUnit: 'min',
      value: 0,
    },
  ]
  const [count, setCount] = useState(0)

  type IconProps = {
    name: string
    color: string
    size: number
  }

  const Icon = ({ name, color, size }: IconProps) => {
    const LucideIcon = icons[name]

    return <LucideIcon color={color} size={size} />
  }

  return (
    <div>
      <div className="md:flex gap-5">
        {habits.map((habit) => (
          <div className="w-[200px] h-auto text-center shadow-xl rounded-lg bg-white">
            <div className="space-y-5 p-5">
              <div className="flex justify-center items-center gap-3">
                <div
                  className="p-1 rounded-full flex justify-center items-center border-3 border-solid "
                  style={{ borderColor: habit.color }}
                >
                  <Icon name={habit.iconName} color={habit.color} size={30} />
                </div>
                <p className="font-bold text-2xl">{habit.name}</p>
              </div>
              <div className="font-bold text-2xl flex justify-center gap-2">
                <p>{habit.value}</p>
                <p style={{ color: habit.color }}>{' / ' + habit.goal + ' ' + habit.goalUnit}</p>
              </div>
              <div className="flex gap-3 justify-center items-center">
                <button
                  className="border-none bg-transparent cursor-pointer"
                  onClick={() => setCount(count - 1)}
                >
                  <CircleMinus size={40} />
                </button>
                <div className="bg-dark-100 px-5 py-3 rounded-lg">
                  <p className="text-3xl font-bold">{count}</p>
                </div>
                <button
                  className="border-none bg-transparent cursor-pointer"
                  onClick={() => setCount(count + 1)}
                >
                  <CirclePlus size={40} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
