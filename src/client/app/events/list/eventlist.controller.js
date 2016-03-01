/**
 * Created by mhylle on 16-01-2016.
 */
(function () {
    'use strict';

    angular
        .module('event-managing-events')
        .controller('EventController', EventController);

    EventController.$inject = ['$scope', '$state', 'EventService', 'Session', 'lodash'];

    /* @ngInject */
    function EventController($scope, $state, EventService, Session, lodash) {
        var vm = this;
        vm.title = 'EventController';
        vm.events = [];
        vm.status = {
            code: 'ok',
            message: ''
        };
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
                    vm.status.code = 'error';
                    vm.status.message = 'No response returned from the server';
                    vm.events = [];
                } else {
                    if (response.status === 'ok') {
                        vm.events = response.events;
                        vm.status.code = 'ok';
                    } else {
                        vm.events = [];
                        vm.status.code = response.status;
                        vm.status.message = response.info;
                    }
                }
            });
        }

        function gotoEvent(e) {
            console.log('trying to navigate to event ' + e.name);
            $state.go('events.view', {id: e.id});
        }

        function signup(e) {
            EventService.attend(e, Session.user).then(function (response) {
                var index = lodash.findIndex(
                    vm.events, function(evt) {
                        return e.id === evt.id;
                    }
                );
                lodash.merge(vm.events[index], response.event);
            });
        }
    }
})();

