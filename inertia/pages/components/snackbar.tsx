interface SnackbarProps {
  message: string
  type?: string
}

export default function Snackbar({ message, type = 'alert' }: SnackbarProps) {
  let bgColorClass

  // Détermine la classe de couleur en fonction du type
  switch (type) {
    case 'success':
      bgColorClass = 'bg-success-600'
      break
    case 'warning':
      bgColorClass = 'bg-warning-500'
      break
    default:
      bgColorClass = 'bg-error-500'
  }

  return (
    <div
      className={`text-center w-sm h-14 mx-auto flex justify-center items-center text-white rounded-lg mt-10 md:mt-20 ${bgColorClass}`}
    >
      <div>{message}</div>
    </div>
  )
}
