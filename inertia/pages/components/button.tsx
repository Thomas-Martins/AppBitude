interface ButtonProps {
  type?: 'button' | 'submit' | 'reset'
  children: string
}
export default function Button(props: ButtonProps) {
  const { type, children } = props
  return (
    <button
      type={type}
      className="
      border-none
      bg-primary-500 
      text-white 
      font-bold 
      px-7 
      py-3 
      rounded-lg
      hover:bg-primary-700
      hover:duration-400
      decoration-none
    "
    >
      {children}
    </button>
  )
}
