import { Opaque } from '@adonisjs/core/types/helpers'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import User, { type UserId } from './user.js'

export type CustomCategoryId = Opaque<'customCategoryId', string>

export default class CustomCategory extends BaseModel {
  @column({ isPrimary: true })
  declare id: CustomCategoryId

  @column()
  declare name: string

  @column()
  declare icon: string

  @column()
  declare color: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare userId: UserId

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
