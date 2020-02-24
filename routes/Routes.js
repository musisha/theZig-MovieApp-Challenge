const express = require('express');
const router = express.Router();
const Request = require('request');

const Contollers = require('../controllers/Controller');


router.get('/api/popular', Contollers.getPopular);

router.get('/api/:movieName', Contollers.getSearched)

router.get('/api/:movieId', )

module.exports = router;