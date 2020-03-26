exports.up = async function(knex) {
	await knex.schema.createTable('user', (table) => {
		table.increments();
		table.text('firstName').notNull();
		table.text('lastName').notNull();
		table.text('email').notNull().unique();
		table.text('password').notNull();
	});
	await knex.schema.createTable('property', (table) => {
		table.increments();
		table.text('address').notNull();
		table.text('city').notNull();
		table.text('state').notNull();
		table.integer('zip').notNull();
		table.text('description');
		table.boolean('children_allowed').default(false);
		table.text('property_type').notNull();
		table.integer('bedrooms_number');
		table.integer('bathrooms_number');
		table.text('amenities');
		table.float('price').notNull();
		table
			.integer('user_id')
			.unsigned()
			.notNull()
			.references('id')
			.inTable('user')
			.onDelete('CASCADE')
			.onUpdate('CASCADE');
	});
};

exports.down = async function(knex) {
	await knex.schema.dropTableIfExists('property');
	await knex.schema.dropTableIfExists('user');
};
