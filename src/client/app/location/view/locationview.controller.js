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
        vm.response = {};

        vm.status = {
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
                vm.location = response;
            });
        }
    }
})();
