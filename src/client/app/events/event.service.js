/**
 * Created by mhylle on 16-01-2016.
 */
(function () {
    'use strict';

    angular
        .module('event-managing-events')
        .factory('EventService', EventService);

    EventService.$inject = ['$http', 'Logger', 'eventServer'];

    /* @ngInject */
    function EventService($http, Logger, eventServer) {
        var eventLocation = eventServer.url + ':' + eventServer.port + '/api/' + eventServer.location;
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
            return $http.get(eventLocation)
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
            return $http.get(eventLocation + '/id/' + id)
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

        function createEvent(evt) {
            Logger.info('Trying to retrieve event by id ' + evt.id);
            return $http({
                url: eventLocation,
                method: 'POST',
                data: evt,
                headers: {
                    "Content-Type": "application/json"
                }
            })
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

            return $http.get(eventLocation + '/attend/eid/' + event.id + '/uid/' + user.id)
                .then(onAttendEventSuccess)
                .catch(onAttendEventError);

            function onAttendEventSuccess(response) {
                return response.data;
            }

            function onAttendEventError(error) {
                Logger.error(error);
            }
        }

        function unattend(event, user) {
            if (!event) {
                return {status: 'missing data', info: 'You must supply an event to unattend.'};
            }

            if (!user) {
                return {status: 'missing data', info: 'You must supply a user to unattend.'};
            }

            return $http.get(eventLocation + '/unattend/eid/' + event.id + '/uid/' + user.id)
                .then(onUnattendEventSuccess)
                .catch(onUnattendEventError);

            function onUnattendEventSuccess(response) {
                return response.data;
            }

            function onUnattendEventError(error) {
                Logger.error(error);
            }
        }
    }
})();
