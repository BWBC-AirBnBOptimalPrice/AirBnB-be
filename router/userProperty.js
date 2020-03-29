const db = require('../module/userProperty');
const express = require('express');
const router = express();
const { validateUserId, validatePropertyData, restrict } = require('../middleWare/userProperty');

router.get('/', restrict(), async (req, res, next) => {
	try {
		const property = await db.find();
		const data = property.map((item) => {
			return {
				...item,
				children_allowed: Boolean(item.children_allowed)
			};
		});
		res.json(data);
	} catch (err) {
		next(err);
	}
});

router.get('/:id', restrict(), validateUserId, async (req, res, next) => {
	try {
		const data = await db.findBy(req.params.id);
		const properties = data.properties.map((item) => {
			return {
				...item,
				children_allowed: Boolean(item.children_allowed)
			};
		});
		const payload = {
			...data.user,
			properties
		};
		res.json(payload);
	} catch (err) {
		next(err);
	}
});

router.post('/property', restrict(), async (req, res, next) => {
	try {
		res.json(await db.insert(req.body));
	} catch (err) {
		next(err);
	}
});

router.put('/property/:id', restrict(), validateUserId, async (req, res, next) => {
	try {
		const updated = await db.update(req.params.id, req.body);
		if (updated) {
			res.json({ message: 'This property has successfully updated.' });
		}
	} catch (err) {
		console.log(err);
		next(err);
	}
});

router.delete('/property/:id', restrict(), validateUserId, async (req, res, next) => {
	try {
		const deleted = await db.Delete(req.params.id);
		if (deleted) {
			res.json({ message: 'This property has successfully deleted' });
		}
	} catch (err) {
		console.log(err);
		next(err);
	}
});

module.exports = router;
