import Button from '../components/button'
import InputGroup from '../components/form/input_group'

export default function LoginPage() {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
      <div className="w-[500px] h-[500px] bg-white shadow-lg rounded-lg">
        <h1>Login</h1>
        <form action="/login" method="post">
          <InputGroup label="Email" name="email" type="email" />
          <InputGroup label="Password" name="password" type="password" />

          <Button type="submit">Login</Button>
        </form>
        <div>
          <p>
            You don't have an account ? <a href="/register">Join Us</a>
          </p>
        </div>
      </div>
    </div>
  )
}
