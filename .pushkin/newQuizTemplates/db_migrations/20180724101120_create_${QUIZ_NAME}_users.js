exports.up = function(knex) {
  return knex.schema.createTable('${QUIZ_NAME}_users', table => {
    table.increments('id').primary();
    table.string('auth0_id');
    table.timestamp('created_at').notNullable();
    table.timestamp('updated_at');
		table.date('dob');
		table.string('native_language');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('${QUIZ_NAME}_users');
};
