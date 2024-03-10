interface ButtonProps {
  label: string
}
export default function Button({ label }: ButtonProps) {
  return <a className="bg-primary-500 text-white font-bold px-7 py-3 rounded-lg">{label}</a>
}
