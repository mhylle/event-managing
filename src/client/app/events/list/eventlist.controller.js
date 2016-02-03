/**
 * Created by mhylle on 16-01-2016.
 */
(function () {
    'use strict';

    angular
        .module('event-managing-events')
        .controller('EventController', EventController);

    EventController.$inject = ['$state', 'EventService', 'Session', 'lodash'];

    /* @ngInject */
    function EventController($state, EventService, Session, lodash) {
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
                if (!response) {
                    vm.status.code = 'error';
                    vm.status.message = 'No response returned from the server';
                    return;
                }
                vm.events = response;
                vm.status.code = 'ok';
                //if (response.status === 'RESPONSE_OK') {
                //    vm.events = response.events;
                //    vm.status.code = 'ok';
                //    vm.status.message = '';
                //} else {
                //    if (response.status === 'RESPONSE_ERROR') {
                //        vm.status.code = 'error';
                //    } else {
                //        vm.status.code = 'warning';
                //    }
                //    vm.status.message = response.message;
                //}
                //vm.status.response = response.status;
            });
        }

        function gotoEvent(e) {
            console.log('trying to navigate to event ' + e.name);
            $state.go('events.view', {id: e.id});
        }

        function signup(e) {
            EventService.attend(e, Session.user).then(function (response) {
                var index = lodash.findIndex(
                    vm.events,
                    {
                        id: e.id
                    }
                );
                lodash.merge(vm.events[index], response);
            });
        }
    }
})();

