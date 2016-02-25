(function () {
    'use strict';

    angular
        .module('event-managing-locations')
        .controller('locationviewcontroller', LocationViewController);

    LocationViewController.$inject = [
        '$scope',
        '$stateParams',
        'Logger',
        'locationservice'];

    /* @ngInject */
    function LocationViewController($scope, $stateParams, Logger, locationservice) {
        /* jshint -W040 */
        var vm = this;
        vm.title = 'locationviewcontroller';

        $scope.pageClass = 'scrolled';

        vm.location = null;
        vm.locationid = '';

        vm.status = {
            code: 'ok',
            message: ''
        };

        activate();

        ////////////////

        function activate() {
            vm.locationid = $stateParams.id;
            Logger.info('got id ' + vm.locationid + ' passed in as start parameter.');
            getLocation();
        }

        function getLocation() {
            locationservice.getLocation(vm.locationid).then(function (response) {
                if (!response) {
                    vm.status.code = 'failed';
                    vm.status.message = 'An error occurred while retrieving the location from the server';
                } else {
                    if (response.status === 'ok') {
                        vm.location = response.location;
                    } else {
                        vm.location = null;
                        vm.status.code = 'failed';
                        vm.status.message = response.info;
                    }
                }
            });
        }
    }
})();
