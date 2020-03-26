exports.seed = async function(knex) {
	// Deletes ALL existing entries
	await knex('user').del().then(function() {
		// Inserts seed entries
		return knex('user').insert([
			{ id: 1, firstName: 'Ramy', lastName: 'Metry', email: 'Romairo.717@gmail.com', password: 'Ramy123' }
		]);
	});
	await knex('property').del().then(function() {
		// Inserts seed entries
		return knex('property').insert([
			{
				id: 1,
				address: 'miranda st',
				city: 'hayward',
				state: 'ca',
				zip: '94544',
				description: 'apartment with 3 bedrooms',
				children_allowed: false,
				property_type: 'apartment',
				bedrooms_number: '3',
				bathrooms_number: '2',
				amenities: 'AC',
				price: '4000 usd',
				user_id: '1'
			},
			{
				id: 2,
				address: 'lincoln ave',
				city: 'buena park',
				state: 'ca',
				zip: '90620',
				description: 'appt has 4 bedrooms',
				children_allowed: true,
				property_type: 'apartment',
				bedrooms_number: '4',
				bathrooms_number: '3',
				amenities: 'AC',
				price: '4500',
				user_id: '1'
			}
		]);
	});
};
