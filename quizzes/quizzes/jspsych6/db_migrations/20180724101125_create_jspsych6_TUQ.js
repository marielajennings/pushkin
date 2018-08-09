// const knex = require('knex')(require('./knex.config.js'));

exports.up = function(knex) {
  return knex.schema.createTable('jspsych6_TUQ', table => {
    table.integer('user_id').references('id').inTable('jspsych6_users').primary();
    table.integer('stim_group').references('id').inTable('jspsych6_stimulusGroups').notNullable();
    table.timestamp('started_at').notNullable();
    table.timestamp('finished_at');
		table.integer('cur_position').unsigned().notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('jspsych6_TUQ');
};
