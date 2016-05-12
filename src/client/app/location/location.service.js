(function () {
    'use strict';

    angular
        .module('event-managing-locations')
        .factory('locationservice', locationservice);

    locationservice.$inject = ['$http', 'Logger', 'locationServer'];

    /* @ngInject */
    function locationservice($http, Logger, locationServer) {
        var locationLocation = locationServer.url + ':' + locationServer.port + '/api/' + locationServer.location;
        var service = {
            name: 'locationservice',
            getLocations: getLocations,
            getLocation: getLocation,
            createLocation: createLocation
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

        function createLocation(loc) {
            Logger.info('Trying to retrieve location by id ' + loc.id);
            return $http({
                url: locationLocation,
                method: 'POST',
                data: loc,
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(onCreateLocationSuccess)
                .catch(onCreateLocationError);

            function onCreateLocationSuccess(response) {
                Logger.info(response.name);
                return response;
            }

            function onCreateLocationError(error) {
                Logger.error(error);
            }
        }
    }
})();
