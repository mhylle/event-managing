(function () {
    'use strict';

    angular
        .module('event-managing-events')
        .controller('eventviewcontroller', eventviewcontroller);

    eventviewcontroller.$inject = ['$stateParams', 'EventService'];

    /* @ngInject */
    function eventviewcontroller($stateParams, EventService) {
        /* jshint -W040 */
        var vm = this;
        vm.title = 'eventviewcontroller';

        vm.event = null;
        vm.eventid = '';
        activate();

        ////////////////

        function activate() {
            vm.eventid = $stateParams.id;
            console.log('got id ' + vm.eventid + ' passed in as start parameter.');
            EventService.getEvent(vm.eventid).then(function(response) {
                vm.event = response;
            });
        }
    }

})();
