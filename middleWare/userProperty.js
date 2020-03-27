const db = require('../data/knexConfig');
const jwt = require('jsonwebtoken');

async function validateUserId(req, res, next) {
	const user = await db('user').select('user.id').where('user.id', req.body.user_id).first();
	if (!user) {
		res.json({ message: 'This user not exist or has been deleted.' });
	}
	else {
		next();
	}
}

function validatePropertyData(req, res, next) {
	const { address, city, state, zip, property_type, price } = req.body;
	if (!address || !city || !state || !zip || !property_type || !price) {
		res.status(400).json({ message: 'Please some info are required to add a property' });
	}
	else next();
}

function restrict() {
	const authError = {
		message: 'shall not pass!'
	};
	return async (req, res, next) => {
		try {
			const token = req.headers.authorization;

			if (!token) {
				return res.status(401).json(authError);
			}

			jwt.verify(token, process.env.SECRET, (err, decoded) => {
				if (err) {
					return res.status(401).json(authError);
				}
				req.body.user_id = decoded.userId;
				next();
			});
		} catch (err) {
			console.log(err);
			next(err);
		}
	};
}
module.exports = {
	validateUserId,
	validatePropertyData,
	restrict
};
