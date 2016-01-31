(function () {
    'use strict';

    angular
        .module('event-managing-groups')
        .factory('groupservice', groupservice);

    groupservice.$inject = ['$http', 'Logger'];

    /* @ngInject */
    function groupservice($http, Logger) {
        var service = {
            getGroups: getGroups,
            getGroup: getGroup
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

        function getGroup(id) {
            Logger.info('Trying to retrieve group by id ' + id);
            return $http.get('/api/groups/id/' + id)
                .then(onGetGroupSuccess)
                .catch(onGetGroupError);

            function onGetGroupSuccess(response) {
                Logger.info(response.data.name);
                return response.data;
            }

            function onGetGroupError(error) {
                Logger.error(error);
            }
        }
    }
})();
