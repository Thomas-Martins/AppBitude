import Button from '../components/button'
import InputGroup from '../components/form/input_group'
import DefaultLayout from '../components/layouts/default_layout'
import Snackbar from '../components/snackbar'

export default function LoginPage({ errorMessage }: any) {
  return (
    <DefaultLayout>
      <div className="">
        {errorMessage && (
          <div className="mt-30">
            <Snackbar type="alert" message={errorMessage} />
          </div>
        )}
        <div className="mx-5 mt-15 h-auto bg-white shadow-lg rounded-lg py-6 px-12 md:w-[500px] md:m-auto md:mt-30">
          <h1 className="text-center text-xl font-bold mb-7">Please sign in.</h1>
          <form action="/login" method="POST">
            <InputGroup label="Email" name="email" type="email" />
            <InputGroup label="Password" name="password" type="password" />

            <Button type="submit">Login</Button>
          </form>
          <div className="mt-8 text-center font-bold">
            <p>
              You don't have an account ?{' '}
              <a className="color-black" href="/register">
                Join us
              </a>
            </p>
          </div>
        </div>
      </div>
    </DefaultLayout>
  )
}
