(function (app) {
  'use strict';

  app.registerModule('events', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('events.routes', ['ui.router', 'core.routes', 'articles.services']);
  app.registerModule('events.services');
}(ApplicationConfiguration));
