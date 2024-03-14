import { usePage } from '@inertiajs/react'
import { useState } from 'react'
import Button from './components/button'
import InputGroup from './components/form/input_group'
import DashboardLayout from './components/layouts/dashboard_layout'
import Snackbar from './components/snackbar'

type FormData = {
  email: string
  username: string
  password: string
}

type SettingsPageProps = {
  errorMessage: string | null | undefined
  successMessage: string | null | undefined
}

export default function SettingsPage({ errorMessage, successMessage }: SettingsPageProps) {
  const { props } = usePage()
  console.log(props)

  const currentUser = props.currentUser as { email: string; username: string } // Spécifiez le type de currentUser
  const [formData, setFormData] = useState<FormData>({
    email: currentUser.email,
    username: currentUser.username,
    password: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  return (
    <DashboardLayout>
      <div>
        <h1>Settings</h1>
        {errorMessage && (
          <div className="mt-10">
            <Snackbar type="alert" message={errorMessage} />
          </div>
        )}
        {successMessage && (
          <div className="mt-10">
            <Snackbar type="success" message={successMessage} />
          </div>
        )}
        <div className="mt-10">
          <form action="/user/settings" method="post">
            <InputGroup
              type="email"
              name="email"
              label="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <InputGroup
              type="text"
              name="username"
              label="Username"
              value={formData.username}
              onChange={handleChange}
            />
            <InputGroup
              type="password"
              name="password"
              label="Password"
              placeholder="Your password is required to save changes"
              value={formData.password}
              onChange={handleChange}
            />
            <div>
              <Button type="submit">Save modification</Button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  )
}
