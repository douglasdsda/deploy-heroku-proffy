"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.up = up;
exports.down = down;

async function up(knex) {
  await knex.schema.createTable('class_schedule', table => {
    table.increments('id').primary();
    table.integer('week_day').notNullable();
    table.integer('from').notNullable();
    table.integer('to').notNullable();
    table.timestamp('created_at').defaultTo(knex.raw('CURRENT_TIMESTAMP')).notNullable();
    table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP')).notNullable();
    table.integer('class_id').notNullable().references('id').inTable('classes').onUpdate('CASCADE').onDelete('CASCADE');
  });
}

async function down(knex) {
  await knex.schema.dropTable('class_schedule');
}