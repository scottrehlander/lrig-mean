(function () {
  'use strict';

  angular
    .module('chapters.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('chapters', {
        abstract: true,
        url: '/chapters',
        template: '<ui-view/>'
      })
      .state('chapters.list', {
        url: '',
        templateUrl: 'modules/chapters/client/views/list-chapters.client.view.html',
        controller: 'ChaptersListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Chapters List'
        }
      })
      .state('chapters.view', {
        url: '/:chapterName',
        templateUrl: 'modules/chapters/client/views/view-chapter.client.view.html',
        controller: 'ChaptersController',
        controllerAs: 'vm',
        resolve: {
          chapterResolve: getChapter
        },
        data: {
          pageTitle: 'Chapter {{ chapterResolve.name }}'
        }
      });
  }

  getChapter.$inject = ['$stateParams', 'ChaptersService'];

  function getChapter($stateParams, ChaptersService) {
    return ChaptersService.get({
      chapterName: $stateParams.chapterName
    }).$promise;
  }

}());
