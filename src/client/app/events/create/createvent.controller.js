/**
 * Created by mhylle on 17-02-2016.
 */
(function () {
    'use strict';

    angular
        .module('event-managing-events')
        .controller('createeventcontroller', CreateEventController);

    CreateEventController.$inject = ['EventService', 'locationservice'];

    /* @ngInject */
    function CreateEventController(EventService, locationservice) {
        var vm = this;
        vm.title = 'CreateEventController';

        vm.event = {};
        vm.locations = [];
        vm.status = {
            code: 'ok',
            message: ''
        };

        vm.create = create;

        activate();
        vm.datepicker = {
            start: {
                today: function () {
                    vm.event.start = new Date();
                },
                open: function () {
                    vm.datepicker.start.opened = true;
                }
            },
            end: {
                today: function () {
                    vm.event.end = new Date();
                },
                open: function () {
                    vm.datepicker.end.opened = true;
                }
            }
        };

        ////////////////
        function activate() {
            locationservice.getLocations().then(function (response) {
                vm.locations = response;
            });
        }

        function create() {
            EventService.createEvent(vm.event).then(function (response) {
                if (response) {
                    if (response.status) {
                        if (response.status.code === 'ok') {
                            vm.status.code = 'ok';
                            vm.status.message = 'Event created ok';
                        }

                        if (response.status.code === 'failed') {
                            vm.status.code = 'failed';
                            vm.status.message = 'An error occured while creating the event';
                        }
                    }
                } else {
                    vm.status.code = 'failed';
                    vm.status.message = 'An error occured while creating the event';
                }
            });
        }
    }
})();

