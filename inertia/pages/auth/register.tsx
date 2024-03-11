import Button from '../components/button'
import InputGroup from '../components/form/input_group'

export default function RegisterPage() {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
      <div className="w-[500px] h-[500px] bg-white shadow-lg rounded-lg">
        <h1>Register</h1>
        <form action="/register" method="POST">
          <InputGroup label="Email" name="email" type="email" />
          <InputGroup label="Username" name="username" type="text" />
          <InputGroup label="Password" name="password" type="pasword" />

          <Button type="submit">Register</Button>
        </form>
        <div>
          <p>
            You already have an account ? Sign in <a href="/login">here</a>
          </p>
        </div>
      </div>
    </div>
  )
}
