import { icons } from 'lucide-react'

interface IconProps {
  name: string
  color: string
  size: number
}

const LucideIcon = ({ name, color = '#000000', size = 25 }: IconProps) => {
  const Icon = icons[name]

  return <Icon color={color} size={size} absoluteStrokeWidth={true} />
}

export default LucideIcon
