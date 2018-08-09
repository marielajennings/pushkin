// const knex = require('knex')(require('./knex.config.js'));

exports.up = function(knex) {
  return knex.schema.createTable('jspsych6_stimulusGroups', table => {
    table.increments('id').primary();
		table.timestamp('created_at');
		table.timestamp('modified_at');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('jspsych6_stimulusGroups');
};
