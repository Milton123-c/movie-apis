const express = require('express');
const routerGenre = require('./genre.router');
const routerMovie = require('./movie.router');
const routerDirector = require('./director.router');
const routerActor = require('./actor.router');
const router = express.Router();

// colocar las rutas aquí
router.use('/genres', routerGenre) //genres

router.use('/movies', routerMovie) // movies

router.use('/directors', routerDirector) // directors

router.use('/actors', routerActor) // actors

module.exports = router;