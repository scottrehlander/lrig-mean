(function () {
  'use strict';

  angular
    .module('events')
    .controller('EventInteractionFormController', EventInteractionFormController);

  function EventInteractionFormController(close, EventsService, ChaptersService, $scope, $filter, Authentication, $window) {
    var vm = this;

    vm.datePickerOptions = {
      dateOptions: {
        maxDate: new Date(2020, 5, 22),
        minDate: new Date(),
        startingDay: 1
      },
      isOpen: false,
      format: 'MM/dd/yyyy'
    };

    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.event = {};
    vm.remove;
    vm.save = save;
    vm.remove = remove;

    // Remove existing Event
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.article.$remove(close('Success'));
      }
    }

    // Save Event
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.eventForm');
        return false;
      }

      // Create a new article, or update the current instance
      vm.event.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        close('Success'); // should we send the User to the list or the updated Article's view?
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }

    // Grab the chapters to populate the option dropdown
    ChaptersService.query(
      // TODO: This should be limited to the chapters for which this user is an admin
      function(results) {
        vm.chapters = $filter('orderBy')(results, 'name').map(function(chapter) {
          return chapter.name;
        });
        vm.event.chapter = vm.chapters[0];
      }
    );

    vm.closeModal = function() {
      close('Cancelled');
    };

  }
}());
