import { Opaque } from '@adonisjs/core/types/helpers'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import Tag, { type TagId } from './tag.js'

export type DefaultCategoryId = Opaque<'defaultCategoryId', string>

export default class DefaultCategory extends BaseModel {
  static table = 'default_category'

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

  @column()
  declare tagId: TagId

  @belongsTo(() => Tag)
  declare tag: BelongsTo<typeof Tag>
}
