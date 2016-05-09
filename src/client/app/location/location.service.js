(function () {
    'use strict';

    angular
        .module('event-managing-locations')
        .factory('locationservice', locationservice);

    locationservice.$inject = ['$http', 'Logger', 'location_server'];

    /* @ngInject */
    function locationservice($http, Logger, location_server) {
        var locationLocation = location_server.url + ':' + location_server.port + '/api/' + location_server.location;
        var service = {
            name: 'locationservice',
            getLocations: getLocations,
            getLocation: getLocation
        };
        return service;

        ////////////////

        function getLocations() {
            return $http.get(locationLocation)
                .then(onGetLocationsSuccess)
                .catch(onGetLocationsError);

            function onGetLocationsSuccess(response) {
                return response.data;
            }

            function onGetLocationsError(error) {
                Logger.error(error);
            }
        }

        function getLocation(id) {
            Logger.info('Trying to retrieve location by id ' + id);
            return $http.get(locationLocation + '/id/' + id)
                .then(onGetLocationSuccess)
                .catch(onGetLocationError);

            function onGetLocationSuccess(response) {
                Logger.info(response.data.location.name);
                return response.data;
            }

            function onGetLocationError(error) {
                Logger.error(error);
            }
        }
    }
})();
