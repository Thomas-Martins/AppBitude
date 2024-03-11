import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'

export default class LoginController {
  renderView({ inertia }: HttpContext) {
    return inertia.render('auth/login')
  }

  async login({ auth, request, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    const user = await User.verifyCredentials(email, password)
    await auth.use('web').login(user)

    return response.redirect('/dashboard')
  }
}
