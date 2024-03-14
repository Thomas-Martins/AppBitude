import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'

export default class LoginController {
  renderView({ inertia }: HttpContext) {
    return inertia.render('auth/login')
  }

  async login({ auth, request, response, inertia, session }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    try {
      const user = await User.verifyCredentials(email, password)
      session.put('authenticated_user', user.id)
      await auth.use('web').login(user)
      return response.redirect('/dashboard')
    } catch (error) {
      return inertia.render('auth/login', { errorMessage: 'The email or password is incorrect.' })
    }
  }
}
