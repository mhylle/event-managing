(function () {
    'use strict';

    angular
        .module('event-managing-locations')
        .controller('locationlistcontroller', LocationListController);

    LocationListController.$inject = ['$scope', '$state', 'Logger', 'locationservice'];

    /* @ngInject */
    function LocationListController($scope, $state, Logger, locationservice) {
        var vm = this;
        vm.title = 'LocationListController';
        vm.status = {
            code: 'ok',
            message: ''
        };
        vm.locations = [];
        $scope.pageClass = 'page-locationlist';
        activate();

        vm.gotoLocation = gotoLocation;
        ////////////////

        function activate() {
            Logger.info('activating');
            getLocations();
        }

        function getLocations() {
            locationservice.getLocations().then(function (response) {
                Logger.info('getting initial locations');
                if (!response) {
                    vm.status.code = 'error';
                    vm.status.message = 'No response returned from the server';
                    vm.locations = [];
                } else {
                    if (response.status === 'ok') {
                        vm.locations = response.locations;
                        vm.status.code = 'ok';
                    } else {
                        vm.locations = [];
                        vm.status.code = response.status;
                        vm.status.message = response.info;
                    }
                }
            });
        }

        function gotoLocation(l) {
            console.log('trying to navigate to location ' + l.name);
            $state.go('locations.view', {id: l.id});
        }
    }
})();

