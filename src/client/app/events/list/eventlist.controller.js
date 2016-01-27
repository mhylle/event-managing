/**
 * Created by mhylle on 16-01-2016.
 */
(function () {
    'use strict';

    angular
        .module('event-managing-events')
        .controller('EventController', EventController);

    EventController.$inject = ['$state', 'EventService', 'Session'];

    /* @ngInject */
    function EventController($state, EventService, Session) {
        var vm = this;
        vm.title = 'EventController';
        vm.events = [];
        vm.status = {
            code: 'ok',
            message: ''
        };

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
                if (response.status === 'RESPONSE_OK') {
                    vm.events = response.events;
                    vm.status.code = 'ok';
                    vm.status.message = '';
                } else {
                    if (response.status === 'RESPONSE_ERROR') {
                        vm.status.code = 'error';
                    } else {
                        vm.status.code = 'warning';
                    }
                    vm.status.message = response.message;
                }
                vm.status.response = response.status;
            });
        }

        function gotoEvent(e) {
            console.log('trying to navigate to event ' + e.name);
            $state.go('events.view', {id: e.id});
        }

        function signup(e) {
            EventService.attend(e, Session.user).then(function (response) {
                // todo Need to get the ui to update the button when we are done with the call.
                // easy but wrong way to do it would be to update the entire event list, but that
                // since we are only changing one event it would be better to figure out how to trigger
                // the change for the specific event changed..
            });
        }
    }
})();

