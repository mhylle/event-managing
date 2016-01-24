(function () {
    'use strict';

    angular
        .module('event-managing-events')
        .controller('eventviewcontroller', eventviewcontroller);

    eventviewcontroller.$inject = ['$stateParams', '$filter', 'EventService'];

    /* @ngInject */
    function eventviewcontroller($stateParams, $filter, EventService) {
        /* jshint -W040 */
        var vm = this;
        vm.title = 'eventviewcontroller';

        vm.event = null;
        vm.eventid = '';
        vm.signstatus = '';

        activate();

        ////////////////

        function activate() {
            vm.eventid = $stateParams.id;
            console.log('got id ' + vm.eventid + ' passed in as start parameter.');
            EventService.getEvent(vm.eventid).then(function (response) {
                vm.event = response;
                var attendingEvent = $filter('isattendingeventfilter')(vm.event, null);
                if (attendingEvent) {
                    vm.signstatus = 'Attending';
                } else {
                    vm.signstatus = 'Not attending';
                }
            });
        }
    }
})();
