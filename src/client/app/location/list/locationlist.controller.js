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
                    Logger.message('No response returned from the server', 'error');
                    vm.locations = [];
                } else {
                    vm.locations = response;
                    Logger.status('ok');
                }
            });
        }

        function gotoLocation(l) {
            Logger.info('trying to navigate to location ' + l.name);
            $state.go('locations.view', {id: l.id});
        }
    }
})();

