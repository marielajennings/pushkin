// const knex = require('knex')(require('./knex.config.js'));

exports.up = function(knex) {
  return knex.schema.createTable('jspsych6_stimulusGroupStimuli', table => {
    table.increments('id').primary();
		table.integer('group').references('id').inTable('jspsych6_stimulusGroups').notNullable();
    table.integer('stimulus').references('id').inTable('jspsych6_stimuli').notNullable();
		table.integer('position').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('jspsych6_stimulusGroupStimuli');
};
