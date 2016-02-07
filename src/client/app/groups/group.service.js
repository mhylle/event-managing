(function () {
    'use strict';

    angular
        .module('event-managing-groups')
        .factory('groupservice', groupservice);

    groupservice.$inject = ['$http', '$q', 'Logger'];

    /* @ngInject */
    function groupservice($http, $q, Logger) {
        var service = {
            name: 'groupservice',
            getGroups: getGroups,
            getGroup: getGroup,
            addUserToGroup: addUserToGroup
        };
        return service;

        ////////////////

        function getGroups() {
            return $http.get('/api/group')
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
            return $http.get('/api/group/id/' + id)
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

        function addUserToGroup(group, user) {
            if (!group || !user) {
                return;
            }

            return $http.put('/api/group/id/' + group.id + '/user/id/' + user.id)
                .then(onAddUserToGroupSuccess)
                .catch(onAddUserToGroupError);

            function onAddUserToGroupSuccess(response) {
                Logger.info('Response from addUserToGroup: ' + response);
                return response;
            }

            function onAddUserToGroupError(error) {
                Logger.error(error);
            }
        }
    }
})();
