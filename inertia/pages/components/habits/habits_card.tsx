import { Inertia } from '@inertiajs/inertia'
import { CircleMinus, CirclePlus, X, icons } from 'lucide-react'
import { useEffect, useState } from 'react'
import CircleProgressBar from '../circle_progress_bar'

interface HabitCardProps {
  idHabit: string
  name: string
  goalValue: number
  goalUnit: string
  value: number
  icon: string
  color: string
}

interface IconProps {
  iconName: keyof typeof icons
  iconColor: string
  size: number
}

export default function HabitsCard({
  idHabit,
  name,
  goalValue,
  goalUnit,
  value: initialValue,
  icon,
  color,
}: HabitCardProps) {
  const [value, setValue] = useState(initialValue)
  const [progress, setProgress] = useState((initialValue / goalValue) * 100)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    setProgress((value / goalValue) * 100)
  }, [value, goalValue])

  const Icon = ({ iconName, iconColor, size }: IconProps) => {
    const LucideIcon = icons[iconName]

    return <LucideIcon color={iconColor} size={size} />
  }

  const handleAdd = (amount: number) => {
    let updatedValue = value + amount
    if (updatedValue > goalValue) {
      updatedValue = goalValue
    } else if (updatedValue < 0) {
      updatedValue = 0
    }
    setValue(updatedValue)
    updateProgress(updatedValue)
  }

  const updateProgress = (updatedValue: number) => {
    setProgress((updatedValue / goalValue) * 100)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    Inertia.post(`/habits/${idHabit}/update`, { value })
  }

  return (
    <div
      className="relative w-60 h-auto text-center shadow-xl rounded-lg bg-white hover:scale-105 transition duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <form action={`habits/${idHabit}/delete`} method="post">
          <button className="absolute top-2 right-2 bg-dark-100 text-white border-none w-8 h-8 rounded-full p-2 flex items-center transition duration-300 ease-in-out hover:bg-error-500">
            <X size={20} />
          </button>
        </form>
      )}
      <div className="space-y-1 py-7">
        <div className="flex justify-center items-center gap-3">
          <div
            className="p-1 rounded-full flex justify-center items-center border-3 border-solid "
            style={{ borderColor: color }}
          >
            <Icon iconName={icon as keyof typeof icons} iconColor={color} size={25} />
          </div>
          <p className="font-bold text-2xl">{name}</p>
        </div>
        <div className="relative">
          <div className="relative">
            <CircleProgressBar percentage={progress} circleWidth={175} color={color} />
          </div>
          <div className="absolute inset-0 flex justify-center items-center flex-col text-center text-xl font-bold">
            <p className="font-bold text-3xl">
              {value} / <span style={{ color: color }}>{goalValue}</span>
            </p>
            <p className="font-bold text-sm" style={{ color: color }}>
              {goalUnit}
            </p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex gap-3 justify-center items-center">
          <button
            type="submit" // Bouton de type "button"
            className="border-none bg-transparent cursor-pointer"
            onClick={() => {
              handleAdd(-1)
            }}
          >
            <CircleMinus size={40} />
          </button>
          <button
            type="submit" // Bouton de type "button"
            className="border-none bg-transparent cursor-pointer"
            onClick={() => {
              handleAdd(1)
            }}
          >
            <CirclePlus size={40} />
          </button>
          {/* <input type="hidden" id="value" name="value" value={value} /> */}
        </form>
      </div>
    </div>
  )
}
