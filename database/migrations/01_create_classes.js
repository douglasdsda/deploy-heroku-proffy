"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.up = up;
exports.down = down;

async function up(knex) {
  await knex.schema.createTable('classes', table => {
    table.increments("id").primary();
    table.string('subject').notNullable();
    table.decimal('cost').notNullable();
    table.timestamp('created_at').defaultTo(knex.raw('CURRENT_TIMESTAMP')).notNullable();
    table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP')).notNullable();
    table.string('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
  });
}

async function down(knex) {
  await knex.schema.dropTable('classes');
}