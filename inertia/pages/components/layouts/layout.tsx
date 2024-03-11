import { Head } from '@inertiajs/react'
import Header from '../header'

interface LayoutProps {
  children: JSX.Element
}
export default function Layout(props: LayoutProps) {
  const { children } = props
  return (
    <div>
      <Head title="Dashboard" />
      <div className="w-full h-full">
        <Header />
        <div className="">{children}</div>
      </div>
    </div>
  )
}
