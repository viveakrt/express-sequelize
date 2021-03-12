const router = require("express").Router();
const { user: User } = require("../models");
const { isAlpha, isEmail } = require("validator");
const logger = require("../config/logger");

router.post("/register", async (req, res) => {
	if (
		!(isAlpha(req.body.name) &&
		isEmail(req.body.email))
	) {
		logger.info("TRUUUUUUUUu");
        res.sendStatus(400).end();
        return;
	}
	const newUser = {
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
	};
    
	await User.create(newUser)
		.then((userData) => {
			res
				.status(201)
				.json({
					userData,
				})
				.end();
		})
		.catch((err) => {
			console.log(err);

			res.sendStatus(500).end();
		});
});

module.exports = router;
