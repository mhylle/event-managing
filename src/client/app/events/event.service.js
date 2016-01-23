/**
 * Created by mhylle on 16-01-2016.
 */
(function () {
    'use strict';

    angular
        .module('event-managing-events')
        .factory('EventService', EventService);

    EventService.$inject = ['$http', 'Logger'];

    /* @ngInject */
    function EventService($http, Logger) {
        var service = {
            getEvents: getEvents,
            getEvent: getEvent
        };
        return service;

        ////////////////
        function getEvents() {
            return $http.get('/api/events')
                .then(onGetEventsSuccess)
                .catch(onGetEventsError);

            function onGetEventsSuccess(response) {
                //Logger.info('getting events, response was ' + response);
                if (response.data) {
                    return response.data;
                }
                return [];
            }

            function onGetEventsError(error) {
                //Logger.error('Error during getEvents: ' + error);
                return [];
            }
        }

        function getEvent(id) {
            return $http.get('/api/event/id/' + id)
                .then(onGetEventSuccess)
                .catch(onGetEventError);

            function onGetEventSuccess(response) {
                Logger.info(response.data.name);
                return response.data;
            }

            function onGetEventError(error) {
                Logger.error(error);
            }
        }
    }
})();
