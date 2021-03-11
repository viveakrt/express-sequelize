const express = require("express");
const {
	director: Director,
	genreTypes: Genre,
	movieDetails: Movie,
	actor: Actor,
} = require("../models");

const path = require("path");
const fs = require("fs");


const router = express.Router();

router.get("/add", (req, res) => {
	fs.readFile(
		path.join(__dirname, "../movies.json"),
		"utf-8",
		(err, movies) => {
			if (err) {
				console.log(err);
				res.status(500).json({
					message: "internal server error",
				});
				res.end();
			} else {
				movies = JSON.parse(movies);

				let directors = [];
				let actors = [];
				let genres = [];

				movies.forEach((movie) => {
					let director = movie.Director;
					let actor = movie.Actor;
					let genre = movie.Genre;
					if (!actors.includes(actor)) {
						actors.push(actor);
					}
					if (!directors.includes(director)) {
						directors.push(director);
					}
					if (!genres.includes(genre)) {
						genres.push(genre);
					}
				});

				Actor.truncate().catch((err) => {
					res.status(500).json({
						message: "internal server error actor",
					});
					res.end();
				});
				Director.truncate().catch((err) => {
					res.status(500).json({
						message: "internal server error director",
					});
					res.end();
				});
				Genre.truncate().catch((err) => {
					res.status(500).json({
						message: "internal server error genre",
					});
					res.end();
				});

				actors.forEach(async (actorName) => {
					let actor = {
						name: actorName,
					};

					await Actor.create(actor).catch((err) => {
						res.status(500).json({
							message: "internal server error actor",
						});
						res.end();
					});
				});

				directors.forEach(async (directorName) => {
					let director = {
						name: directorName,
					};

					await Director.create(director).catch((err) => {
						res.status(500).json({
							message: "internal server error director",
						});
						res.end();
					});
				});

				genres.forEach(async (genreName) => {
					let genre = {
						type: genreName,
					};

					await Genre.create(genre).catch((err) => {
						res.status(500).json({
							message: "internal server error genre",
						});
						res.end();
					});
				});

				res.status(200).json({
					message: "All data added successfully",
				});
				res.end();
			}
		}
	);
});

router.get("/movies", (req, res) => {
	fs.readFile(
		path.join(__dirname, "../movies.json"),
		"utf-8",
		(err, movies) => {
			if (err) {
				console.log(err);
				res.status(500).json({
					message: "internal server error",
				});
				res.end();
			} else {
				movies = JSON.parse(movies);
				let moviesDetails = [];

				movies.forEach((movie) => {
					let newMovie = {};
					newMovie = { ...movie, ...newMovie };
					moviesDetails.push(newMovie);
				});

				Movie.truncate().catch((err) => {
					res.status(500).json({
						message: "internal server error",
						err: err,
					});
					res.end();
				});

				moviesDetails.forEach(async (newMovie) => {
					if (newMovie.Gross_Earning_in_Mil == "NA") {
						delete newMovie.Gross_Earning_in_Mil;
					}
					if (newMovie.Metascore == "NA") {
						delete newMovie.Metascore;
					}
					await Movie.create(newMovie).catch((err) => {
						res.status(500).json({
							message: "internal server error",
							err: err,
						});
						res.end();
					});
				});

				res.status(200).json({
					message: "Data added successfully",
				});
				res.end();
			}
		}
	);
});

module.exports = router;
