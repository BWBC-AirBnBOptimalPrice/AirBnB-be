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

async function insert(id, property) {
	return await db('property as p').insert(property).where('p.user_id', id);
}

async function update(id, propertyId, property) {
	return await db('property as p', 'p.user_id', id).where('p.id', propertyId).update(property);
}

async function Delete(id, propertyId) {
	return await db('property as p', 'p.user_id', id).where('p.id', propertyId).del();
}

module.exports = {
	find,
	findBy,
	insert,
	update,
	Delete
};
