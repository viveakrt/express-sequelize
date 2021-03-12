const router = require("express").Router();
const crypto = require('crypto');
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
	}).catch((err) => {
		console.log(err);

		res.sendStatus(500).end();
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

router.post("/login", async (req, res) => {
	let newUser;
	let cipher = crypto.createCipher("aes192", "i am strong password");
	let encrypted = cipher.update(req.body.password, "utf8", "hex");
	encrypted += cipher.final("hex");
	if (req.body.user) {
		newUser = {
			user: req.body.user,
			password: encrypted,
		};
    }else if(req.body.email){
		newUser = {
			email: req.body.email,
			password: encrypted,
		};
	} else {
		return res.sendStatus(401).end();
	}

	const userExists = await User.findOne({
		where: newUser,
	});

	if (userExists !== null)
		return res
			.status(201)
			.json({
				message: `Welcome ${userExists.user} `,
			})
			.end();
	else {
		res
			.status(400)
			.json({
				message: `${userExists} Register To login`,
			})
			.end();
	}
});

module.exports = router;
