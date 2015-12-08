/**
 * Created by mhylle on 08-12-2015.
 */
(function () {
    'use strict';

    angular
        .module('schema.authentication')
        .service('AuthService', AuthService);

    AuthService.$inject = ['$http', 'Session'];

    /* @ngInject */
    function AuthService($http, Session) {
        this.login = login;
        this.isAuthenticated = isAuthenticated;
        this.isAuthorized = isAuthorized;

        ////////////////
        function login(credentials) {
            return $http.post('/api/login', credentials)
                .then(function (result) {
                    Session.create(result.data.id, result.data.user.id, result.data.user.role);
                    return result.data.user;
                });
        }

        function isAuthenticated() {
            return !!Session.userId;
        }

        function isAuthorized(authorizedRoles) {
            if (!angular.isArray(authorizedRoles)) {
                authorizedRoles = [authorizedRoles];
            }
            return (isAuthenticated() && authorizedRoles.indexOf(Session.userRole) !== -1);
        }
    }
})();

