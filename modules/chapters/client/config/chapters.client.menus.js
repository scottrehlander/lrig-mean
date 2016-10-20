(function () {
  'use strict';

  angular
    .module('chapters')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Chapters',
      state: 'chapters.list',
      type: 'item',
      roles: ['*']
    });
  }
}());
