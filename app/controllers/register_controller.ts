import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'

export default class RegisterController {
  renderView({ inertia }: HttpContext) {
    return inertia.render('auth/register')
  }

  async register({ auth, request, response }: HttpContext) {
    const { email, username, password } = request.only(['email', 'password', 'username'])

    const user = await User.create({ email, password, username })
    await auth.use('web').login(user)

    return response.redirect('/dashboard')
  }
}
