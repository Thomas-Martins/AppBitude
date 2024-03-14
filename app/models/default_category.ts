import { Opaque } from '@adonisjs/core/types/helpers'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export type DefaultCategoryId = Opaque<'defaultCategoryId', string>

export default class DefaultCategory extends BaseModel {
  @column({ isPrimary: true })
  declare id: DefaultCategoryId

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
}
