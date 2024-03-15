import React from 'react'

export interface InputProps {
  name: string
  type?: string
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Input(props: InputProps) {
  const { name, type = 'text', placeholder, value, onChange } = props

  return (
    <input
      className="
        border-none
        bg-light-500
        p-5
        rounded-lg
      "
      id={name}
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange} // Ajout de l'attribut onChange
    />
  )
}
