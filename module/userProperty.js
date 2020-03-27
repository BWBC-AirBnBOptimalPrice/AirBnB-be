const db = require('../data/knexConfig');

async function find() {
	return await db('property').select('*');
}

async function findBy(id) {
	const user = await db('user as u').select('u.*').where('u.id', id).first();
	const properties = await db('property as p').select('p.*').where('p.user_id', id);
	return {
		user,
		properties
	};
}

async function insert(property) {
	return await db('property').insert(property);
}

async function update(propertyId, property) {
	return await db('property as p').where('p.id', propertyId).update(property);
}

async function Delete(propertyId) {
	return await db('property as p').where('p.id', propertyId).del();
}

module.exports = {
	find,
	findBy,
	insert,
	update,
	Delete
};
