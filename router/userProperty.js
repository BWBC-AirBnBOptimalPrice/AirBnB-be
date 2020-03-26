const db = require('../module/userProperty');
const express = require('express');
const router = express();
const { validateUserId, validatePropertyData, restrict } = require('../middleWare/userProperty');

router.get('/', restrict(), async (req, res, next) => {
	try {
		res.json(await db.find());
	} catch (err) {
		next(err);
	}
});

router.get('/:id', restrict(), validateUserId, async (req, res, next) => {
	try {
		res.json(await db.findBy(req.params.id));
	} catch (err) {
		next(err);
	}
});

router.post('/:id', restrict(), validateUserId, validatePropertyData, async (req, res, next) => {
	try {
		const payload = {
			...req.body,
			user_id: req.params.id
		};
		res.json(await db.insert(req.params.id, payload));
	} catch (err) {
		next(err);
	}
});

router.put('/:id/:propId', validateUserId, restrict(), async (req, res, next) => {
	try {
		const updated = await db.update(req.params.id, req.params.propId, req.body);
		if (updated) {
			res.json({ message: 'This property has successfully updated.' });
		}
	} catch (err) {
		console.log(err);
		next(err);
	}
});

router.delete('/:id/:propId', validateUserId, restrict(), async (req, res, next) => {
	try {
		const deleted = await db.Delete(req.params.id, req.params.propId);
		if (deleted) {
			res.json({ message: 'This property has successfully deleted' });
		}
	} catch (err) {
		console.log(err);
		next(err);
	}
});

module.exports = router;
