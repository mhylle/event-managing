(function () {
    'use strict';

    angular
        .module('event-managing-groups')
        .factory('groupservice', groupservice);

    groupservice.$inject = ['$http', 'Logger'];

    /* @ngInject */
    function groupservice($http, Logger) {
        var service = {
            getGroups: getGroups
        };
        return service;

        ////////////////

        function getGroups() {
            return $http.get('/api/groups')
                .then(onGetGroupsSuccess)
                .catch(onGetGroupsError);

            function onGetGroupsSuccess(response) {
                return response.data;
            }

            function onGetGroupsError(error) {
                Logger.error(error);
            }
        }
    }
})();
