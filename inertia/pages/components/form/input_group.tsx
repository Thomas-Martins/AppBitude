import Input, { InputProps } from './input'
import Label from './label'

interface InputGroupProps extends InputProps {
  label: string
}

export default function InputGroup(props: InputGroupProps) {
  const { name, label, type = 'text', placeholder } = props

  return (
    <div>
      <Label name={name}>{label}</Label>
      <Input name={name} type={type} placeholder={placeholder} />
    </div>
  )
}
