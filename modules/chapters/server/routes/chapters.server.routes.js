'use strict';

/**
 * Module dependencies
 */
var chaptersPolicy = require('../policies/chapters.server.policy'),
  chapters = require('../controllers/chapters.server.controller');

module.exports = function (app) {
  // Articles collection routes
  app.route('/api/chapters').all(chaptersPolicy.isAllowed)
    .get(chapters.list)
    .post(chapters.create);

  // Single article routes
  app.route('/api/chapters/:chapterName').all(chaptersPolicy.isAllowed)
    .get(chapters.read);

  // Finish by binding the chapter middleware
  app.param('chapterName', chapters.chapterByName);
};
