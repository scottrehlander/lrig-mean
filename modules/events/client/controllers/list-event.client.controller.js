(function () {
  'use strict';

  angular
    .module('events')
    .controller('EventsListController', EventsListController);

  EventsListController.$inject = ['EventsService', 'ModalService'];

  function EventsListController(EventsService, ModalService) {
    var vm = this;

    vm.events = EventsService.query();
    vm.showingModal = false;

    vm.createModal = function() {
      if(vm.showingModal) {
        return;
      }
      // Just provide a template url, a controller and call 'showModal'.
      ModalService.showModal({
        templateUrl: 'modules/events/client/views/event-interaction-form.client.view.html',
        controller: 'EventInteractionFormController',
        controllerAs: 'vm'
      }).then(function(modal) {
        // The modal object has the element built, if this is a bootstrap modal
        // you can call 'modal' to show it, if it's a custom modal just show or hide
        // it as you need to.
        modal.element.show();
        vm.showingModal = true;
        modal.close.then(function(result) {
          vm.message = result ? 'You said Yes' : 'You said No';
          vm.showingModal = false;
        });
      });
    };

  }
}());
