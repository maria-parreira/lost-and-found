/**
* App routes definitions.
*/
'use strict';

let express = require('express');
let router = express.Router();

// To confirm setup only.
router.get('/', function(req, res) { return res.send('Hello world!'); });

module.exports = router;
