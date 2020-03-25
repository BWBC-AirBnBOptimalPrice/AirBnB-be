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
		table.text('street').notNull();
		table.text('city').notNull();
		table.text('state').notNull();
		table.integer('zip').notNull();
		table.text('description');
		table.boolean('children-allowed').default(false);
		table.text('property-type').notNull();
		table.integer('bedrooms-Number');
		table.integer('bathrooms-Number');
		table.text('amenities');
		table.float('price').notNull();
		table
			.integer('user-id')
			.unsigned()
			.notNull()
			.references('id')
			.inTable('user')
			.onDelete('CASCADE')
			.onUpdate('CASCADE');
	});
};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists('property')
	await knex.schema.dropTableIfExists('users');
};
