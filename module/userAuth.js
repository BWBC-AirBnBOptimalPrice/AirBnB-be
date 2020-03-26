const db = require('../data/knexConfig');
const bcrypt = require('bcryptjs');

function findBy(filter) {
	return db('user').select('id', 'firstName', 'lastName', 'email', 'password').where(filter);
}

async function insert(user) {
	user.password = await bcrypt.hashSync(user.password, 14);
	const [ id ] = await db('user').insert(user);
	return findBy({ id });
}

module.exports = {
	insert,
	findBy
};
