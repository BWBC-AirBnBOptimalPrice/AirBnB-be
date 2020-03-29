const db = require('../module/userAuth');
const express = require('express');
const router = express();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validateUser, validateUserLogin } = require('../middleWare/userAuth');

router.post('/register', validateUser, async (req, res, next) => {
	try {
		const credentials = req.body;
		const newUser = await db.insert(credentials);
		res.json({
			message: `You are successfully Registered ${credentials.firstName} ${credentials.lastName}`,
			user: newUser
		});
	} catch (err) {
		console.log(err);
		next(err);
	}
});

router.post('/login', validateUserLogin, async (req, res, next) => {
	try {
		const { email, password } = req.body;
		const user = await db.findBy({ email }).first();

		if (user && bcrypt.compareSync(password, user.password)) {
			const payload = {
				userId: user.id,
				userName: user.firstName
			};
			const token = jwt.sign(payload, process.env.SECRET);
			res.cookie('token', token);
			res.json({
				message: `${user.id}`,
				token: token
			});
		}
		else {
			res.status(203).json({ message: 'Invalid credentials' });
		}
	} catch (err) {
		next(err);
	}
});

module.exports = router;
