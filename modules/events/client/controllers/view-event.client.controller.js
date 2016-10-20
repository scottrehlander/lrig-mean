(function () {
  'use strict';

  angular
    .module('events')
    .controller('EventsController', EventsController);

  EventsController.$inject = ['$scope', 'eventResolve', 'Authentication'];

  function EventsController($scope, event, Authentication) {
    var vm = this;

    vm.event = event;
    vm.authentication = Authentication;
    vm.error = null;
  }
}());
