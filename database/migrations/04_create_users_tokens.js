"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.up = up;
exports.down = down;

async function up(knex) {
  await knex.schema.createTable("users_tokens", table => {
    table.increments("id").primary();
    table.string("token");
    table.timestamp("created_at").defaultTo(knex.raw("CURRENT_TIMESTAMP")).notNullable();
    table.integer("user_id").notNullable().references("id").inTable("users").onDelete("CASCADE").onUpdate("CASCADE");
  });
}

async function down(knex) {
  await knex.schema.dropTable("users_tokens");
}