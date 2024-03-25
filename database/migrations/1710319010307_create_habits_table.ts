import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'habits'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('gen_random_uuid()').knexQuery)
      table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE')
      table
        .uuid('default_category_id')
        .references('id')
        .inTable('default_category')
        .nullable()
        .onDelete('CASCADE')
      table
        .uuid('custom_category_id')
        .references('id')
        .inTable('custom_category')
        .nullable()
        .onDelete('CASCADE')
      table.smallint('goal_value').notNullable()
      table.string('goal_unit').notNullable()
      table.smallint('value').notNullable().defaultTo(0)
      table.string('frequency').defaultTo('Daily').notNullable()
      table.date('date').notNullable().defaultTo(this.db.rawQuery('CURRENT_DATE').knexQuery)
      table.timestamp('created_at', { useTz: false }).notNullable()
      table.timestamp('updated_at', { useTz: false }).notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
