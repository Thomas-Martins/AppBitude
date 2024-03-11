import Input, { InputProps } from './input'
import Label from './label'

interface InputGroupProps extends InputProps {
  label: string
}

export default function InputGroup(props: InputGroupProps) {
  const { name, label, type = 'text', placeholder } = props

  return (
    <div className="flex flex-col font-bold space-y-4 mb-5">
      <Label name={name}>{label}</Label>
      <Input name={name} type={type} placeholder={placeholder} />
    </div>
  )
}
