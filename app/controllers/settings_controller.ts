import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'

export default class SettingsController {
  render({ inertia }: HttpContext) {
    return inertia.render('settings')
  }

  async updateUserInfo({ request, inertia, response, session }: HttpContext) {
    const userId = session.get('authenticated_user')

    if (!userId) {
      return response.redirect('/login')
    }

    const user = await User.findByOrFail('id', userId)

    if (!user) {
      return response.redirect('/login')
    }
    const { email, password, username } = request.only(['email', 'password', 'username'])
    const passwordMatches = await hash.verify(user.password, password)

    if (passwordMatches) {
      user.email = email
      user.username = username

      await user.save()

      return response.redirect().toRoute('/user/settings')
    } else {
      return inertia.render('settings', {
        errorMessage: 'An Error has occurred. Please try again',
      })
    }
  }
}
