import { Head } from '@inertiajs/react'
import Footer from '../footer'
import Header from '../header'

interface DefaultLayoutProps {
  children: JSX.Element
}
export default function DefaultLayout(props: DefaultLayoutProps) {
  const { children } = props
  return (
    <div>
      <Head title="Habits Tracker" />
      <Header />
      <div className="p-5">
        <div>{children}</div>
      </div>
      <Footer />
    </div>
  )
}
