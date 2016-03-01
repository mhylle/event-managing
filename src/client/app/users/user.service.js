(function () {
    'use strict';

    angular
        .module('event-managing-users')
        .factory('userservice', userservice);

    userservice.$inject = ['$http', 'Logger'];

    /* @ngInject */
    function userservice($http, Logger) {
        var service = {
            name: 'userservice',
            getUsers: getUsers,
            getUser: getUser,
            createUser: createUser
        };
        return service;

        ////////////////
        function getUsers() {
            return $http.get('/api/user')
                .then(onGetUsersSuccess)
                .catch(onGetUsersError);

            function onGetUsersSuccess(response) {
                return response.data;
            }

            function onGetUsersError(error) {
                Logger.error(error);
            }
        }

        function getUser(id) {
            Logger.info('Trying to retrieve user by id ' + id);
            return $http.get('/api/user/id/' + id)
                .then(onGetUserSuccess)
                .catch(onGetUserError);

            function onGetUserSuccess(response) {
                Logger.info(response.data.name);
                return response.data;
            }

            function onGetUserError(error) {
                Logger.error(error);
            }
        }

        function createUser(user) {
            return $http.post('/api/user/', user)
                .then(onCreateUserSuccess)
                .catch(onCreateUserError);

            function onCreateUserSuccess(response) {
                return response.data;
            }

            function onCreateUserError(error) {
                Logger.error(error);
            }
        }
    }
})();

