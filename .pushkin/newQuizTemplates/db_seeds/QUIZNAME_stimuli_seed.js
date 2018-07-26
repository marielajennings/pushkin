
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('${QUIZ_NAME}_stimuli').del()
    .then(function () {
      // Inserts seed entries
      return knex('${QUIZ_NAME}_stimuli').insert([
				{ task: 'task1', stimulus: `What's your favorite color?`, options: `orange, green, blue`, num_responses: 0 },
				{ task: 'task2', stimulus: `What's your favorite number?`, options: `7, 8, 9`, num_responses: 0 }
      ]);
    });
};