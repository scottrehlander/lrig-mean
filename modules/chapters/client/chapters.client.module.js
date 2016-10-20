(function (app) {
  'use strict';

  app.registerModule('chapters', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('chapters.routes', ['ui.router', 'core.routes', 'articles.services']);
  app.registerModule('chapters.services');

}(ApplicationConfiguration));
