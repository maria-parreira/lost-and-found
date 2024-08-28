/**
 * Setup Express app.
 */
'use strict';

let helmet = require('helmet');
let methodOverride = require('method-override');
let express = require('express');
let lostItemsRoute = require('../routes/lostItems');

/**
 * Sets up Express app.
 *
 * @param {Object} app  The express app.
 */
function setup(app) {
  app.use(helmet());
  app.use(methodOverride());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(lostItemsRoute);

  return app;
};

module.exports = setup;
