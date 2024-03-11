import Button from '../components/button'
import InputGroup from '../components/form/input_group'
import Layout from '../components/layouts/layout'
import Snackbar from '../components/snackbar'

export default function LoginPage({ errorMessage }: any) {
  return (
    <Layout>
      <div className="">
        {errorMessage && (
          <div className="mt-30">
            <Snackbar type="alert" message={errorMessage} />
          </div>
        )}
        <div className="w-[450px] h-[400px] bg-white shadow-lg rounded-lg fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] py-6 px-12">
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
    </Layout>
  )
}
