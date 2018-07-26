// const knex = require('knex')(require('./knex.config.js'));

exports.up = function(knex) {
  return knex.schema.createTable('test_stimulusResponses', table => {
    table.increments('id').primary();
    table.integer('user_id').references('id').inTable('test_users');
    table.string('stimulus').references('stimulus').inTable('test_stimuli');
    table.json('data_string');
    table.timestamp('created_at');
    table.timestamp('updated_at');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('test_stimulusResponses');
};
