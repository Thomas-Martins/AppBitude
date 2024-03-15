import { CircleMinus, CirclePlus, icons } from 'lucide-react'
import { useState } from 'react'

interface HabitCardProps {
  name: string
  goalValue: number
  goalUnit: string
  value: number
  icon: string
  color: string
}

export default function HabitsCard({
  name,
  goalValue,
  goalUnit,
  value,
  icon,
  color,
}: HabitCardProps) {
  const [count, setCount] = useState(0)

  type IconProps = {
    iconName: keyof typeof icons
    iconColor: string
    size: number
  }

  const Icon = ({ iconName, iconColor, size }: IconProps) => {
    const LucideIcon = icons[iconName]

    return <LucideIcon color={iconColor} size={size} />
  }

  return (
    <div>
      <div className="md:flex gap-5">
        <div className="w-[200px] h-auto text-center shadow-xl rounded-lg bg-white">
          <div className="space-y-5 p-5">
            <div className="flex justify-center items-center gap-3">
              <div
                className="p-1 rounded-full flex justify-center items-center border-3 border-solid "
                style={{ borderColor: color }}
              >
                <Icon iconName={icon as keyof typeof icons} iconColor={color} size={30} />
              </div>
              <p className="font-bold text-2xl">{name}</p>
            </div>
            <div className="font-bold text-2xl flex justify-center gap-2">
              <p>{value}</p>
              <p style={{ color: color }}>{' / ' + goalValue + ' ' + goalUnit}</p>
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
      </div>
    </div>
  )
}
