import { CircleMinus, CirclePlus, icons } from 'lucide-react'
import CircleProgressBar from '../circle_progress_bar'

interface HabitCardProps {
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
  name,
  goalValue,
  goalUnit,
  value,
  icon,
  color,
}: HabitCardProps) {
  const Icon = ({ iconName, iconColor, size }: IconProps) => {
    const LucideIcon = icons[iconName]

    return <LucideIcon color={iconColor} size={size} />
  }

  // Calculer le pourcentage d'avancement de l'objectif
  const progress = (value / goalValue) * 100

  return (
    <div>
      <div className="w-[250px] h-auto text-center shadow-xl rounded-lg bg-white">
        <div className="space-y-1 p-5">
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
          <div className="flex gap-3 justify-center items-center">
            <button className="border-none bg-transparent cursor-pointer">
              <CircleMinus size={40} />
            </button>
            <div className="bg-dark-100 px-5 py-3 rounded-lg">
              {' '}
              <p className="text-3xl font-bold">{0}</p>
            </div>
            <button className="border-none bg-transparent cursor-pointer">
              <CirclePlus size={40} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
