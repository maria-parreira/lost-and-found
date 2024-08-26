let express = require('express');
let router = express.Router();

router.use('/', require('./lostItems'));

module.exports = router;
