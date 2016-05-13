/**
 * Created by mhylle on 17-02-2016.
 */
(function () {
    'use strict';

    angular
        .module('event-managing-events')
        .controller('createeventcontroller', CreateEventController);

    CreateEventController.$inject = ['EventService', 'locationservice', 'Logger'];

    /* @ngInject */
    function CreateEventController(EventService, locationservice, Logger) {
        var vm = this;
        vm.title = 'CreateEventController';

        vm.event = {
            signstart : new Date()
        };
        vm.locations = [];

        vm.create = create;
        vm.submitForm = submitForm;

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
            },
            signstart: {
                today: function () {
                    vm.event.signstart = new Date();
                },
                open: function () {
                    vm.datepicker.signstart.opened = true;
                }
            },
            signend: {
                today: function () {
                    vm.event.signend = new Date();
                },
                open: function () {
                    vm.datepicker.signend.opened = true;
                }
            },
            lastAttend: {
                today: function () {
                    vm.event.lastAttend = new Date();
                },
                open: function () {
                    vm.datepicker.lastAttend.opened = true;
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
                        if (response.status === 'ok') {
                            Logger.message('Event created ok', 'ok');
                        }

                        if (response.status === 'failed') {
                            Logger.message('An error occured while creating the event', 'failed');
                        }
                    } else {
                        Logger.message('An error occured while creating the event', 'failed');
                    }
                } else {
                    Logger.message('An error occured while creating the event', 'failed');
                }
            });
        }

        function submitForm(isValid) {
            console.log('submitting');
            vm.formSubmitted = true;
            // check to make sure the form is completely valid
            if (isValid) {
                create();
                Logger.message('Form was validated to be ok');
            } else {
                console.log('not valid');
                Logger.message('We have a field in the form that is in error.');
            }
        }
    }
})();

