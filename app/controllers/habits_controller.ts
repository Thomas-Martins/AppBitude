// import type { HttpContext } from '@adonisjs/core/http'

import { HttpContext } from '@adonisjs/core/http'

export default class HabitsController {
  render({ inertia }: HttpContext) {
    return inertia.render('add_habits')
  }
}
