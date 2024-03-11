export interface InputProps {
  name: string
  type?: string
  placeholder?: string
}
export default function Input(props: InputProps) {
  const { name, type = 'text', placeholder } = props
  return (
    <input
      className="
      border-none
      bg-dark-100
      p-5
      rounded-lg
    "
      id={name}
      name={name}
      type={type}
      placeholder={placeholder}
    />
  )
}
