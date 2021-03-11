const express = require("express");
const {
	director: Director,
	genreTypes: Genre,
	movieDetails: Movie,
	actor: Actor,
} = require("../models");

const router = express.Router();

router.get("/all", (req, res) => {
	Movie.findAll()
		.then((movie) => {
			if (movie.length > 0) {
				res.status(200).json(movie).end();
			} else {
				res
					.sendStatus(404)
					.end();
			}
		})
		.catch((err) => {
			console.log(err);

			res
				.sendStatus(500)
				.end();
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
				res
					.sendStatus(404)
					.end();
			}
		})
		.catch((err) => {
			console.log(err);

			res
				.status(500)
                .json({
                    'msg':`error Id is : ${id} `
                })
				.end();
		});
});

router.delete('/:id', (req, res) => {
    const id = Number(req.params.id);
    if (Number.isInteger(id) && id > 0) {
        Movie.destroy({ 
            where: { 
                id: id 
            } })
            .then(data => {
                if (data) {
                    res.status(200).json({
                        'message': `Movie with Id ${id} DELETED`
                    });
                    res.end();
                } else {
                    res.status(404).json({
                        'message': `Movie with Id ${id} NOT FOUND`
                    })
                    res.end();
                }
            }).catch(err => {
                console.log(err);
                res.status(500).json({
                    'message': "internal server error",
                })
                res.end();
            })
    } else {
        res.status(400).json({
            'message': `ERROR Id is : ${id}`
        })
        res.end();
    }
})



module.exports = router;
