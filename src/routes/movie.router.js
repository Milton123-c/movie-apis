const { getAll, create, getOne, remove, update, setGenres, setActors, setDirectors } = require('../controllers/movie.controllers');
const express = require('express');

const routerMovie = express.Router();

routerMovie.route('/')
    .get(getAll)
    .post(create);

routerMovie.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

//movie -> genres
routerMovie.route('/:id/genres')
    .post(setGenres)

//Movie -> actors
routerMovie.route('/:id/actors')
    .post(setActors)

//Movie -> directors
routerMovie.route('/:id/directors')
    .post(setDirectors)

module.exports = routerMovie;