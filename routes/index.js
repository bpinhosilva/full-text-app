'use strict';

let express = require('express');
let router = express.Router();

router.get('/', function (req, res, next) {
    res.send("Ok");
});

router.get('/alive', (req, res, next) => {
    res.send("alive");
});

module.exports = router;
