(function () {
    'use strict';

    angular
        .module('event-managing-events')
        .controller('eventviewcontroller', eventviewcontroller);

    eventviewcontroller.$inject = ['$stateParams', '$filter', 'EventService', 'Session', 'Logger'];

    /* @ngInject */
    function eventviewcontroller($stateParams, $filter, EventService, Session, Logger) {
        /* jshint -W040 */
        var vm = this;
        vm.title = 'eventviewcontroller';

        vm.event = null;
        vm.eventid = '';
        vm.signstatus = '';
        vm.isSigned = false;
        vm.showAttendees = true;

        vm.status = {
            code: 'ok',
            message: ''
        };

        vm.signup = signup;

        activate();
        ////////////////
        function activate() {
            vm.eventid = $stateParams.id;
            Logger.info('got id ' + vm.eventid + ' passed in as start parameter.');
            getEvent();
        }

        function setEventStatus() {
            var attendingEvent = $filter('isattendingeventfilter')(vm.event, Session.user);
            if (attendingEvent) {
                vm.isSigned = true;
                vm.signstatus = 'Attending';
            } else {
                vm.signstatus = 'Not attending';
                vm.isSigned = false;
            }
        }

        function getEvent() {
            EventService.getEvent(vm.eventid).then(function (response) {
                if (!response) {
                    vm.status.code = 'failed';
                    vm.status.message = 'An error occured retrieving the event from the server';
                } else {
                    if (response.status === 'ok') {
                        vm.event = response.event;
                    } else {
                        vm.event = null;
                        vm.status.code = 'failed';
                        vm.status.message = response.info;
                    }
                }
                setEventStatus();
            });
        }

        function signup() {
            EventService.attend(vm.event, Session.user).then(function (response) {
                setEventStatus(response);
            });
        }
    }
})();
