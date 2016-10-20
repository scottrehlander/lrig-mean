(function () {
  'use strict';

  angular
    .module('chapters')
    .controller('ChaptersController', ChaptersController);

  ChaptersController.$inject = ['$scope', 'chapterResolve', 'Authentication'];

  function ChaptersController($scope, chapter, Authentication) {
    var vm = this;

    vm.chapter = chapter;
    vm.authentication = Authentication;
    vm.error = null;

  }
}());
