import { Head } from '@inertiajs/react'
import BackgroundSvg from './components/background_svg'
import Button from './components/button'

export default function Home() {
  return (
    <>
      <Head title="Dashboard" />

      <div className="w-full">
        <div className="mt-8">
          <BackgroundSvg />
        </div>
        <div className="absolute top-0 left-0 w-full h-full">
          <nav className="flex justify-between items-center shadow-lg px-10 py-7">
            <div className="text-3xl">
              <p>App'Bitude</p>
            </div>
            <div>
              <Button label="Sign in" />
            </div>
          </nav>
          <div>
            <div className="text-center mt-20">
              <h1 className="uppercase text-4xl">You want to track your habits ? </h1>
              <p className="mt-10">
                App'Bitude is an open source app for tracking habits to do more.
              </p>
              <div className="mt-10">
                <Button label="Register for free" />
              </div>
              <div>
                <div className="mx-auto w-[800px] h-[400px] bg-dark-500 mt-20 rounded-lg">
                  <span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
