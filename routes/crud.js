const express = require("express");
const logger = require("../config/logger");
const db = require("../models");
const {
	movieDetails: Movie,
} = require("../models");

const router = express.Router();

router.get("/all", (req, res) => {
	Movie.findAll()
		.then((movie) => {
			if (movie.length > 0) {
				res.status(200).json(movie).end();
			} else {
				res.sendStatus(404).end();
			}
		})
		.catch((err) => {
			console.log(err);

			res.sendStatus(500).end();
		});
});

router.get("/:id", (req, res) => {
	const id = Number(req.params.id);

	Movie.findByPk(id)
		.then((movie) => {
			if (movie) {
				res
					.status(200)
					.json({
						movie,
					})
					.end();
			} else {
				res.sendStatus(404).end();
			}
		})
		.catch((err) => {
			console.log(err);

			res
				.status(500)
				.json({
					msg: `error Id is : ${id} `,
				})
				.end();
		});
});

router.delete("/:id", (req, res) => {
	const id = Number(req.params.id);
	if (Number.isInteger(id) && id > 0) {
		Movie.destroy({
			where: {
				id: id,
			},
		})
			.then((data) => {
				if (data) {
					res.status(200).json({
						message: `Movie with Id ${id} DELETED`,
					});
					res.end();
				} else {
					res.status(404).json({
						message: `Movie with Id ${id} NOT FOUND`,
					});
					res.end();
				}
			})
			.catch((err) => {
				console.log(err);
				res.status(500).json({
					message: "internal server error",
				});
				res.end();
			});
	} else {
		res.status(400).json({
			message: `ERROR Id is : ${id}`,
		});
		res.end();
	}
});

router.post("/new", (req, res) => {
	if (
		!req.body.Rank ||
		!req.body.Title ||
		!req.body.Genre ||
		!req.body.Director ||
		!req.body.Actor ||
		!req.body.Year
	) {
		res.status(400).send({
			message: "Rank,Title, Genre ,Director,Actor,Year are mandatory",
		});
		return;
	}

	const movie = {
		Rank: req.body.Rank,
		Title: req.body.Title,
		Description: req.body.Description || "NA",
		Runtime: req.body.Runtime || 0,
		Genre: req.body.Genre,
		Rating: req.body.Rating || 0,
		Metascore: req.body.Metascore || "NA",
		Votes: req.body.Votes || 0,
		Gross_Earning_in_Mil: req.body.Gross_Earning_in_Mil || "NA",
		DirectorId: req.body.Director,
		ActorId: req.body.Actor,
		Year: req.body.Year,
	};

	Movie.create(movie)
		.then((movieDetails) => {
			res
				.status(201)
				.json({
					movieDetails,
				})
				.end();
		})
		.catch((err) => {
			logger.log("error", err);

			res.setStatus(500).end();
		});
});

router.put("/:id", (req, res) => {
	const id = Number(req.params.id);
	Movies.update(req.body, {
		where: { Rank: id },
	})
		.then((num) => {
			if (num == 1) {
				res
					.status(201)
					.json({
						message: "Movie was updated successfully.",
					})
					.end();
			} else {
				logger.log("info", `Movie with the id ${id} is not found!!!! :(`);

				res
					.status(404)
					.json({
						message: `Cannot update Movie with id=${id}. Maybe Movie was not found or req.body is empty!`,
					})
					.end();
			}
		})
		.catch((err) => {
			logger.log("error", err);

			res
				.status(500)
				.json({
					message: "Error updating Movie with id=" + id,
				})
				.end();
		});
});

module.exports = router;
