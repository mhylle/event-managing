(function () {
    'use strict';

    angular
        .module('event-managing-events')
        .controller('eventviewcontroller', eventviewcontroller);

    eventviewcontroller.$inject = ['$stateParams', '$filter', 'EventService', 'Session'];

    /* @ngInject */
    function eventviewcontroller($stateParams, $filter, EventService, Session) {
        /* jshint -W040 */
        var vm = this;
        vm.title = 'eventviewcontroller';

        vm.event = null;
        vm.eventid = '';
        vm.signstatus = '';
        vm.isSigned = false;

        vm.signup = signup;

        activate();

        ////////////////
        function activate() {
            vm.eventid = $stateParams.id;
            console.log('got id ' + vm.eventid + ' passed in as start parameter.');
            EventService.getEvent(vm.eventid).then(function (response) {
                vm.event = response;
                var attendingEvent = $filter('isattendingeventfilter')(vm.event, Session.user);
                if (attendingEvent) {
                    vm.isSigned = true;
                    vm.signstatus = 'Attending';
                } else {
                    vm.signstatus = 'Not attending';
                    vm.isSigned = false;
                }
            });
        }

        function signup() {
            EventService.attend(vm.event, Session.user).then(function (response) {
                vm.isSigned = response.data;
            });
        }
    }
})();
