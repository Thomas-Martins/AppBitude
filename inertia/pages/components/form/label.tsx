interface LabelProps {
  name: string
  children: string
}

export default function Label(props: LabelProps) {
  const { children, name } = props

  return <label htmlFor={name}>{children}</label>
}
