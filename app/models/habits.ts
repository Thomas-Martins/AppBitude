import { Opaque } from '@adonisjs/core/types/helpers'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import { type BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import CustomCategory, { type CustomCategoryId } from './custom_category.js'
import DefaultCategory, { type DefaultCategoryId } from './default_category.js'
import User, { type UserId } from './user.js'

export type HabitsId = Opaque<'userHabitsId', string>

export default class Habits extends BaseModel {
  @column({ isPrimary: true })
  declare id: HabitsId

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare userId: UserId

  @column()
  declare defaultHabitsId: DefaultCategoryId

  @column()
  declare customHabitsId: CustomCategoryId

  @column()
  declare goalValue: number

  @column()
  declare goalUnit: string

  @column()
  declare value: number

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => DefaultCategory)
  declare defaultHabits: BelongsTo<typeof DefaultCategory>

  @belongsTo(() => CustomCategory)
  declare customHabits: BelongsTo<typeof CustomCategory>
}
