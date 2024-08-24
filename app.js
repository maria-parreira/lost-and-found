/**
* App entrypoint.
*/
'use strict';

let app = require('express')();
const PORT = 3000;

// Set up Express.
require('./server/setup/express')(app);

// Set up MongoDB.
require('./server/setup/mongoose')();

// Set up routes.
app.use('/', require('./server/routes'));

// Start app.
app.listen(PORT, function() {
  console.log('App now listening on port ' + PORT);
});

module.exports = app;
