exports.up = function(knex) {
  return knex.schema.createTable('jspsych5_stimuli', table => {
    table.increments('id').primary();
		table.string('stimulus').unique().notNullable();
		table.string('correct');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('jspsych5_stimuli');
};
