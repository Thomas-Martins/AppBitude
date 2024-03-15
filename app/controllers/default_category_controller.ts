// import type { HttpContext } from '@adonisjs/core/http'

import DefaultCategory from '#models/default_category'
import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'

export default class DefaultCategoryController {
  async index({ inertia }: HttpContext) {
    const categories = await DefaultCategory.query().orderBy('name', 'asc')

    return inertia.render('categories', { categories })
  }

  async create({ request, response, session }: HttpContext) {
    const userId = session.get('authenticated_user')

    if (!userId) {
      return response.redirect('/login')
    }

    const user = await User.findByOrFail('id', userId)

    if (!user || user.role !== 'admin') {
      return response.redirect('/login')
    }

    const payload = request.only(['name', 'icon', 'color'])

    await DefaultCategory.create(payload)

    return response.redirect().toRoute('/categories')
  }

  async delete({ response, session, params }: HttpContext) {
    const userId = session.get('authenticated_user')

    if (!userId) {
      return response.redirect('/login')
    }

    const user = await User.findByOrFail('id', userId)

    if (!user || user.role !== 'admin') {
      return response.redirect('/login')
    }

    const category = await DefaultCategory.findOrFail(params.id)

    await category.delete()

    return response.redirect().back()
  }
}
