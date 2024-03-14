import React from 'react'
import Input, { InputProps } from './input'
import Label from './label'

interface InputGroupProps extends InputProps {
  label: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void // Ajoutez cette ligne
}

export default function InputGroup(props: InputGroupProps) {
  const { name, label, type = 'text', placeholder, value, onChange } = props // Ajoutez onChange ici

  return (
    <div className="flex flex-col font-bold space-y-4 mb-5">
      <Label name={name}>{label}</Label>
      <Input name={name} type={type} placeholder={placeholder} value={value} onChange={onChange} />
    </div>
  )
}
