(function () {
  'use strict';

  angular
    .module('events')
    .controller('EventInteractionFormController', EventInteractionFormController);

  // EventInteractionFormController.$inject = ['EventsService'];

  function EventInteractionFormController(close) {
    var vm = this;

    vm.closeModal = function() {
      close("Success");
    };

  }
}());
