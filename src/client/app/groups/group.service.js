(function () {
    'use strict';

    angular
        .module('event-managing-groups')
        .factory('groupservice', groupservice);

    groupservice.$inject = ['$http', 'Logger', 'groupsServer'];

    /* @ngInject */
    function groupservice($http, Logger, groupsServer) {
        var groupsLocation = groupsServer.url + ':' + groupsServer.port + '/api/' + groupsServer.location;
        var service = {
            name: 'groupservice',
            getGroups: getGroups,
            getGroup: getGroup,
            addUserToGroup: addUserToGroup,
            addUsersToGroup: addUsersToGroup,
            removeUserFromGroup: removeUserFromGroup
        };
        return service;

        ////////////////

        function getGroups() {
            return $http.get(groupsLocation)
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
            return $http.get(groupsLocation + '/id/' + id)
                .then(onGetGroupSuccess)
                .catch(onGetGroupError);

            function onGetGroupSuccess(response) {
                return response.data;
            }

            function onGetGroupError(error) {
                Logger.error(error);
            }
        }

        function addUserToGroup(group, user) {
            return userGroupInteraction('update', group, user);
        }

        function addUsersToGroup(group, users) {
            if (!group || !users) {
                return;
            }

            return $http.put(groupsLocation + '/id/' + group.id + '/users', users)
                .then(onSuccess)
                .catch(onError);
        }

        function removeUserFromGroup(group, user) {
            return userGroupInteraction('delete', group, user);
        }

        function userGroupInteraction(action, group, user) {
            if (!group || !user) {
                return;
            }
            var url = groupsLocation + '/id/' + group.id + '/user/id/' + user.id;
            switch (action) {
                case 'delete':
                    return $http.delete(url)
                        .then(onSuccess)
                        .catch(onError);
                case 'update':
                    return $http.put(url)
                        .then(onSuccess)
                        .catch(onError);
            }
        }

        function onSuccess(response) {
            return response;
        }

        function onError(error) {
            Logger.error(error);
            return {status: 'error', code: error};
        }
    }
})();
