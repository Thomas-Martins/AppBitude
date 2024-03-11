import Button from './button'

export default function Header() {
  return (
    <div className="shadow-lg bg-white z-10">
      <nav className="flex justify-center items-center px-10 py-7">
        <div className="w-full flex justify-between items-center max-w-6xl">
          <div className="text-3xl ">
            <a className="decoration-none color-black font-bold" href="/">
              Habits Tracker
            </a>
          </div>
          <a href="/login">
            <Button type="button">Login</Button>
          </a>
        </div>
      </nav>
    </div>
  )
}
