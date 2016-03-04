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
            name: 'EventService',
            getEvents: getEvents,
            getEvent: getEvent,
            createEvent: createEvent,
            attend: attend,
            unattend: unattend
        };
        return service;

        ////////////////
        function getEvents() {
            return $http.get('/api/event')
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
                Logger.error('Error during getEvents: ' + error);
                return [];
            }
        }

        function getEvent(id) {
            Logger.info('Trying to retrieve event by id ' + id);
            return $http.get('/api/event/id/' + id)
                .then(onGetEventSuccess)
                .catch(onGetEventError);

            function onGetEventSuccess(response) {
                Logger.info(response.name);
                return response;
            }

            function onGetEventError(error) {
                Logger.error(error);
            }
        }

        function createEvent(event) {
            Logger.info('Trying to retrieve event by id ' + event.id);
            return $http.post('/api/event', event)
                .then(onCreateEventSuccess)
                .catch(onCreateEventError);

            function onCreateEventSuccess(response) {
                Logger.info(response.name);
                return response;
            }

            function onCreateEventError(error) {
                Logger.error(error);
            }
        }

        function attend(event, user) {
            if (!event) {
                return {status: 'missing data', info: 'You must supply an event to attend.'};
            }
            if (!user) {
                return {status: 'missing data', info: 'You must supply a user to attend.'};
            }
            return $http.get('/api/event/attend/eid/' + event.id + '/uid/' + user.id)
                    .then(onAttendEventSuccess)
                    .catch(onAttendEventError);

            function onAttendEventSuccess(response) {
                return response.data;
            }

            function onAttendEventError(error) {
                Logger.error(error);
            }
        }

        function unattend() {
            return true;
        }
    }
})();
