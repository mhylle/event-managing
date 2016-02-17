(function () {
    'use strict';

    angular
        .module('event-managing-locations')
        .factory('locationservice', locationservice);

    locationservice.$inject = ['$http', 'Logger'];

    /* @ngInject */
    function locationservice($http, Logger) {
        var service = {
            name: 'locationservice',
            getLocations: getLocations,
            getLocation: getLocation
        };
        return service;

        ////////////////

        function getLocations() {
            return $http.get('/api/location')
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
            return $http.get('/api/location/id/' + id)
                .then(onGetLocationSuccess)
                .catch(onGetLocationError);

            function onGetLocationSuccess(response) {
                Logger.info(response.data.name);
                return response.data;
            }

            function onGetLocationError(error) {
                Logger.error(error);
            }
        }
    }
})();
