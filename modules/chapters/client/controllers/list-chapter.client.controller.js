(function () {
  'use strict';

  angular
    .module('chapters')
    .controller('ChaptersListController', ChaptersListController);

  ChaptersListController.$inject = ['ChaptersService'];

  function ChaptersListController(ChaptersService) {
    var vm = this;

    vm.chapters = ChaptersService.query();
  }
}());
