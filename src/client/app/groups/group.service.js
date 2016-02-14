(function () {
    'use strict';

    angular
        .module('event-managing-groups')
        .factory('groupservice', groupservice);

    groupservice.$inject = ['$http', 'Logger'];

    /* @ngInject */
    function groupservice($http, Logger) {
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
            return userGroupInteraction('update', group, user);
        }

        function addUsersToGroup(group, users) {
            if (!group || !users) {
                return;
            }

            return $http.put('/api/group/id/' + group.id + '/users', users)
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
            var url = '/api/group/id/' + group.id + '/user/id/' + user.id;
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
