/**
 * Created by mhylle on 16-01-2016.
 */
(function () {
    'use strict';

    angular
        .module('event-managing-events')
        .controller('EventController', EventController);

    EventController.$inject = ['EventService'];

    /* @ngInject */
    function EventController( EventService) {
        var vm = this;
        vm.title = 'EventController';
        vm.events = [];
        vm.status = {
            code: 'ok',
            message: ''
        };

        vm.fetchEvents = fetchEvents;

        activate();

        ////////////////

        function activate() {
            //Logger.info('Activated Eventcontroller');
            fetchEvents();
        }

        function fetchEvents() {
            EventService.getEvents().then(function(response) {
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
            });
        }
    }

})();

