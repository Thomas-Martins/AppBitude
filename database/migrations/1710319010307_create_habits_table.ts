import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'habits'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('gen_random_uuid()').knexQuery)
      table.uuid('id_user').references('id').inTable('users').onDelete('CASCADE')
      table
        .uuid('id_default_category')
        .references('id')
        .inTable('default_category')
        .nullable()
        .onDelete('CASCADE')
      table
        .uuid('id_custom_category')
        .references('id')
        .inTable('custom_category')
        .nullable()
        .onDelete('CASCADE')
      table.timestamp('created_at', { useTz: false }).notNullable()
      table.timestamp('updated_at', { useTz: false }).notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
