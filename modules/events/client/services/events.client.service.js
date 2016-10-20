(function () {
  'use strict';

  angular
    .module('events.services')
    .factory('EventsService', EventsService);

  EventsService.$inject = ['$resource'];

  function EventsService($resource) {
    var Event = $resource('api/events/:eventId', {
      eventId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Event.prototype, {
      createOrUpdate: function () {
        var event = this;
        return createOrUpdate(event);
      }
    });

    return Event;

    function createOrUpdate(event) {
      if (event.name) {
        return event.$update(onSuccess, onError);
      } else {
        return event.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(event) {
        // Any required internal processing from inside the service, goes here.
      }

      // Handle error response
      function onError(errorResponse) {
        var error = errorResponse.data;
        // Handle error internally
        handleError(error);
      }
    }

    function handleError(error) {
      // Log error
      console.log(error);
    }
  }
}());
