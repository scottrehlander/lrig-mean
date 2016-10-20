'use strict';

/**
 * Module dependencies
 */
var eventsPolicy = require('../policies/events.server.policy'),
  events = require('../controllers/events.server.controller');

module.exports = function (app) {
  // Articles collection routes
  app.route('/api/events').all(eventsPolicy.isAllowed)
    .get(events.list)
    .post(events.create);

  // Single article routes
  app.route('/api/events/:eventId').all(eventsPolicy.isAllowed)
    .get(events.read);

  // Finish by binding the chapter middleware
  app.param('eventId', events.eventById);
};
