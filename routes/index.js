'use strict';

let express = require('express');
let router = express.Router();

router.use('/disc', require('../discs/routes'));

module.exports = router;