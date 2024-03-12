import Button from '../components/button'
import InputGroup from '../components/form/input_group'
import DefaultLayout from '../components/layouts/default_layout'
import Snackbar from '../components/snackbar'

export default function RegisterPage({ errorMessage }: any) {
  return (
    <DefaultLayout>
      <div className="">
        {errorMessage && (
          <div className="snackbar show ">
            <Snackbar type="alert" message={errorMessage} />
          </div>
        )}
        <div className="mx-5 h-auto bg-white shadow-lg rounded-lg py-6 px-12 md:w-[500px] md:mx-auto md:mt-30">
          <h1 className="text-center text-xl font-bold mb-7">Create an account.</h1>
          <form action="/register" method="POST">
            <InputGroup label="Email" name="email" type="email" />
            <InputGroup label="Username" name="username" type="text" />
            <InputGroup label="Password" name="password" type="password" />
            <InputGroup
              label="Password confirmation"
              name="password_confirmation"
              type="password"
            />
            <div className="text-center md:text-left">
              <Button type="submit">Register</Button>
            </div>
          </form>
          <div className="mt-8 text-center font-bold">
            <p>
              You already have an account ? Please sign in{' '}
              <a className="color-black" href="/login">
                here
              </a>
            </p>
          </div>
        </div>
      </div>
    </DefaultLayout>
  )
}
