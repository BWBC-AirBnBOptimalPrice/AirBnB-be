exports.seed =async function(knex) {
	// Deletes ALL existing entries
	await knex('user').del().then(function() {
		// Inserts seed entries
		return knex('user').insert([
			{ id: 1, firstName: 'Ramy', lastName: 'Metry', email: 'Romairo.717@gmail.com', password: 'Ramy123' }
		]);
	});
};
