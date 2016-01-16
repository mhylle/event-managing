/**
 * Created by mhylle on 16-01-2016.
 */
(function () {
    'use strict';

    angular
        .module('event-managing-events')
        .controller('EventController', EventController);

    EventController.$inject = ['Logger', 'EventService'];

    /* @ngInject */
    function EventController(Logger, EventService) {
        var vm = this;
        vm.title = 'EventController';
        vm.events = [];

        vm.fetchEvents = fetchEvents;

        activate();

        ////////////////

        function activate() {
            Logger.info('Activated Eventcontroller');
            fetchEvents();
        }

        function fetchEvents() {
            EventService.getEvents().then(function(response) {
                vm.events = response.data;
            })
        }

    }

})();

