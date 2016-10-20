(function () {
  'use strict';

  angular
    .module('events')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Events',
      state: 'events.list',
      type: 'item',
      roles: ['*']
    });
  }
}());
