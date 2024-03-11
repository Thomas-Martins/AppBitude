import Button from '../components/button'
import InputGroup from '../components/form/input_group'
import Layout from '../components/layouts/layout'
import Snackbar from '../components/snackbar'

export default function RegisterPage({ errorMessage }: any) {
  return (
    <Layout>
      <div className="">
        {errorMessage && (
          <div className="snackbar show ">
            <Snackbar type="alert" message={errorMessage} />
          </div>
        )}
        <div className="w-[450px] h-auto bg-white shadow-lg rounded-lg fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] py-6 px-12">
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
            <Button type="submit">Register</Button>
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
    </Layout>
  )
}
