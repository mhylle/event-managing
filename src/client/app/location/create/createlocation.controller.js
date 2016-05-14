/**
 * Created by mhylle on 17-02-2016.
 */
(function () {
    'use strict';

    angular
        .module('event-managing-locations')
        .controller('createlocationcontroller', CreateLocationController);

    CreateLocationController.$inject = ['locationservice', 'Logger'];

    /* @ngInject */
    function CreateLocationController(locationservice, Logger) {
        var vm = this;
        vm.title = 'CreateLocationController';

        vm.location = {};

        vm.create = create;

        activate();

        ////////////////
        function activate() {
        }

        function create() {
            locationservice.createLocation(vm.location).then(function (response) {
                if (response) {
                    if (response.data) {
                        if (response.data.location) {
                            Logger.message('Location created ok', 'ok');
                        }

                        if (response.status !== 200) {
                            Logger.message('An error occured while creating the location', 'failed');
                        }
                    } else {
                        Logger.message('An error occured while creating the location', 'failed');
                    }
                } else {
                    Logger.message('An error occured while creating the location', 'failed');
                }
            });
        }
    }
})();

