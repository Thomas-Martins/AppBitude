import { Head } from '@inertiajs/react'
import Button from './components/button'

export default function Home() {
  return (
    <>
      <Head title="Dashboard" />
      <div className="w-full h-full">
        <div className="shadow-lg bg-white">
          <nav className="flex justify-center items-center px-10 py-7">
            <div className="w-full flex justify-between items-center max-w-6xl">
              <div className="text-3xl">
                <p>App'Bitude</p>
              </div>
              <a href="/login">
                <Button type="button">Login</Button>
              </a>
            </div>
          </nav>
        </div>

        <div>
          <div className="text-center mt-20">
            <h1 className="uppercase text-4xl">You want to track your habits ? </h1>
            <p className="mt-10">
              App'Bitude is an open source app for tracking habits to do more.
            </p>
            <div className="mt-10">
              <a href="/register">
                <Button type="button">Register for free</Button>
              </a>
            </div>
            <div>
              <div className="mx-auto w-[800px] h-[400px] bg-dark-500 mt-20 rounded-lg">
                <span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
