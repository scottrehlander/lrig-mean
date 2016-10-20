(function () {
  'use strict';

  angular
    .module('chapters.services')
    .factory('ChaptersService', ChaptersService);

  ChaptersService.$inject = ['$resource'];

  function ChaptersService($resource) {
    var Chapter = $resource('api/chapters/:chapterName', {
      chapterName: '@name'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Chapter.prototype, {
      createOrUpdate: function () {
        var chapter = this;
        return createOrUpdate(chapter);
      }
    });

    return Chapter;

    function createOrUpdate(chapter) {
      if (chapter.name) {
        return chapter.$update(onSuccess, onError);
      } else {
        return chapter.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(chapter) {
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
