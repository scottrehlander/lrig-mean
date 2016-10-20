(function () {
  'use strict';

  angular
    .module('events.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('events', {
        abstract: true,
        url: '/events',
        template: '<ui-view/>'
      })
      .state('events.list', {
        url: '',
        templateUrl: 'modules/events/client/views/list-events.client.view.html',
        controller: 'EventsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Events List'
        }
      })
      .state('events.view', {
        url: '/:eventId',
        templateUrl: 'modules/events/client/views/view-event.client.view.html',
        controller: 'EventsController',
        controllerAs: 'vm',
        resolve: {
          eventResolve: getEvent
        },
        data: {
          pageTitle: 'Event {{ eventResolve.name }}'
        }
      });
  }

  getEvent.$inject = ['$stateParams', 'EventsService'];

  function getEvent($stateParams, EventsService) {
    return EventsService.get({
      eventId: $stateParams._id
    }).$promise;
  }

}());
