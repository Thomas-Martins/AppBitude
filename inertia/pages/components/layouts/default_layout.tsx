import { Head } from '@inertiajs/react'
import Header from '../header'

interface DefaultLayoutProps {
  children: JSX.Element
}
export default function DefaultLayout(props: DefaultLayoutProps) {
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
