/* eslint-disable @typescript-eslint/naming-convention */
import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'

export default class RegisterController {
  async renderView({ inertia }: HttpContext) {
    return inertia.render('auth/register')
  }

  async register({ auth, request, response, inertia }: HttpContext) {
    const { email, username, password, password_confirmation } = request.only([
      'email',
      'username',
      'password',
      'password_confirmation',
    ])
    if (password === password_confirmation) {
      const user = await User.create({ email, password, username })
      await auth.use('web').login(user)
      return response.redirect('/dashboard')
    } else {
      return inertia.render('auth/register', { errorMessage: 'The password does not match.' })
    }
  }
}
