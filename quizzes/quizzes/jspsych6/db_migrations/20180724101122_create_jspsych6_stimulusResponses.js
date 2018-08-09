// const knex = require('knex')(require('./knex.config.js'));

exports.up = function(knex) {
  return knex.schema.createTable('jspsych6_stimulusResponses', table => {
    table.increments('id').primary();
    table.integer('user_id').references('id').inTable('jspsych6_users').notNullable();
    table.integer('stimulus').references('id').inTable('jspsych6_stimuli').notNullable();
    table.json('response').notNullable();
    table.timestamp('created_at').notNullable();
    table.timestamp('updated_at');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('jspsych6_stimulusResponses');
};
