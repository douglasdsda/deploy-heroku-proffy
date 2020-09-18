"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.up = up;
exports.down = down;

async function up(knex) {
  await knex.schema.createTable('users', table => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('sobrenome').notNullable();
    table.string('email').notNullable();
    table.string('password').notNullable();
    table.string('avatar');
    table.string('whatsapp');
    table.string('bio');
    table.timestamp('created_at').defaultTo(knex.raw('CURRENT_TIMESTAMP')).notNullable();
    table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP')).notNullable();
  });
}

async function down(knex) {
  await knex.schema.dropTable('users');
}