/**
 * Created by mhylle on 16-01-2016.
 */
(function () {
    'use strict';

    angular
        .module('event-managing-events')
        .controller('EventController', EventController);

    EventController.$inject = ['$scope', '$state', 'EventService', 'Session', 'lodash', 'Logger'];

    /* @ngInject */
    function EventController($scope, $state, EventService, Session, lodash, Logger) {
        var vm = this;
        vm.title = 'EventController';
        vm.events = [];

        $scope.pageClass = 'scrolled';

        vm.user = Session.user;
        vm.fetchEvents = fetchEvents;
        vm.gotoEvent = gotoEvent;
        vm.signup = signup;

        activate();

        ////////////////

        function activate() {
            //Logger.info('Activated Eventcontroller');
            fetchEvents();
        }

        function fetchEvents() {
            EventService.getEvents().then(function (response) {
                if (!response) {
                    Logger.message('No response returned from the server', 'error');
                    vm.events = [];
                } else {
                    if (response.status === 'ok') {
                        vm.events = response.events;
                        Logger.status('ok');
                    } else {
                        vm.events = [];
                        Logger.message(response.info, response.status);
                    }
                }
            });
        }

        function gotoEvent(e) {
            Logger.info('trying to navigate to event ' + e.name);
            $state.go('events.view', {id: e.id});
        }

        function signup(e) {
            EventService.attend(e, Session.user).then(function (response) {
                var index = lodash.findIndex(
                    vm.events, function (evt) {
                        return e.id === evt.id;
                    }
                );
                lodash.merge(vm.events[index], response.event);
            });
        }
    }
})();

