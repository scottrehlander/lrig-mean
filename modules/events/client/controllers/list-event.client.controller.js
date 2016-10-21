(function () {
  'use strict';

  angular
    .module('events')
    .controller('EventsListController', EventsListController);

  EventsListController.$inject = ['EventsService', 'ModalService'];

  function EventsListController(EventsService, ModalService) {
    var vm = this;

    vm.events = EventsService.query();

    vm.createModal = function() {
      ModalService.showModal({
        templateUrl: 'modules/events/client/views/event-interaction-form.client.view.html',
        controller: 'EventInteractionFormController',
        controllerAs: 'vm'
      }).then(function(modal) {
        modal.element.show();
        modal.close.then(function(result) {
          vm.message = result;
          vm.showingModal = false;
        });
      });
    };

  }
}());
