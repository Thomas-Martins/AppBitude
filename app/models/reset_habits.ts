import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User, { type UserId } from './user.js'

export default class ResetHabits extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare date: Date

  @column()
  declare userId: UserId

  @column()
  declare type: string

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
