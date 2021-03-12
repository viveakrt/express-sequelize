const router = require("express").Router();
const { user: User } = require("../models");
const { isAlphanumeric, isEmail } = require("validator");
const logger = require("../config/logger");

router.post("/register", async (req, res) => {
    const newUser = {
		user: req.body.user,
		email: req.body.email,
		password: req.body.password,
	};

	if (
		!(
			isAlphanumeric(newUser.user) &&
			isEmail(newUser.email) &&
			newUser.user.length > 3
		)
	) {
		res
			.status(400)
			.json({
				massage:
					"Use valid email Id and Alphanumeric values for user using 4 or more characters without space",
			})
			.end();
		return;
	}

	//Checking if the user is already in the database
	const emailExist = await User.findOne({
		where: {
			email: newUser.email,
		},
	});
	if (emailExist !== null)
		return res
			.status(400)
			.json({
				message: `Email ${newUser.email} already exists`,
			})
			.end();
	const userExist = await User.findOne({
		where: {
			user: newUser.user,
		},
	});
	if (userExist !== null)
		return res
			.status(400)
			.json({
				message: `User Name ${newUser.user} not available use another`,
			})
			.end();



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
