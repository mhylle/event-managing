/**
 * Created by mhylle on 16-01-2016.
 */
(function () {
    'use strict';

    angular
        .module('event-managing-events')
        .factory('EventService', EventService);

    EventService.$inject = ['$http', '$q', 'Logger'];

    /* @ngInject */
    function EventService($http, $q, Logger) {
        var service = {
            getEvents: getEvents
        };
        return service;

        ////////////////

        function getEvents() {
            Logger.info('getting events');
            var defer = $q.defer;
            $http.get('/api/events')
                .then(function (response) {
                    var data = response.data;
                    defer.resolve(data);
                })
                .catch(function (error) {
                    defer.resolve(error);
                });
            return defer.promise;
        }
    }
})();

