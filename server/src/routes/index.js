let express = require('express');
let router = express.Router();

router.use('/', require('./lostItems'));
router.use('/', require('./user'));
module.exports = router;
