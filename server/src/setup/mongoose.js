/**
* Setup MongoDB.
*/
'use strict';

let mongoose = require('mongoose');
const logger = require('pino')()

module.exports = (async function() {
  const DATABASE_URL = 'mongodb://127.0.0.1:27017/AirportAI-exercise';

  if (!DATABASE_URL) {
    throw new Error('DATABASE_URL is not set');
  }

  // Mongoose events.
  mongoose.connection.on('connected', function() {
    logger.info('MongoDB', `Connected to database for env ${process.env.NODE_ENV}`);
  });
  mongoose.connection.on('open', function() {
    logger.info('MongoDB', 'Connection opened');
  });
  mongoose.connection.on('error', async function(err) {
    logger.error('MongoDB', 'Connection error! Throwing error to restart application', err);
    // Throw error on mongoose error, so we restart the application.
    // eslint-disable-next-line promise/catch-or-return
    throw new Error('MongoDB disconnected');
  });
  mongoose.connection.on('disconnected', function() {
    logger.error('MongoDB', 'Disconnected, Reconnecting...');
  });
  mongoose.connection.on('reconnected', function() {
    logger.info('MongoDB', 'Reconnected');
  });
  mongoose.connection.on('close', function() {
    logger.info('MongoDB', 'Closed');
  });

  try {
    // Connect to db.
    await mongoose.connect(DATABASE_URL, {
      connectTimeoutMS: 20000,
      serverSelectionTimeoutMS: 5000,
      maxPoolSize: 75,
    });

    // Require models after connection.
    require('../models');
    return mongoose;
  }
  catch (error) {
    // To avoid promise not handled exception.
    logger.error('MongoDB', 'Unable to connect MongoDB. If problem persists, please restart the server', error);
    return null;
  }
}());
