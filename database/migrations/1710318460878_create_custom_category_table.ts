import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'custom_category'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('gen_random_uuid()').knexQuery)
      table.string('name')
      table.string('icon').notNullable()
      table.string('color').notNullable()
      table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE')

      table.timestamp('created_at', { useTz: false }).notNullable()
      table.timestamp('updated_at', { useTz: false }).notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
