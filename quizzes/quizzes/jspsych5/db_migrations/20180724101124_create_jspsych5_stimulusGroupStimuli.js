// const knex = require('knex')(require('./knex.config.js'));

exports.up = function(knex) {
  return knex.schema.createTable('jspsych5_stimulusGroupStimuli', table => {
    table.increments('id').primary();
		table.integer('group').references('id').inTable('jspsych5_stimulusGroups').notNullable();
    table.integer('stimulus').references('id').inTable('jspsych5_stimuli').notNullable();
		table.integer('position').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('jspsych5_stimulusGroupStimuli');
};
