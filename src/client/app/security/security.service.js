/**
 * Created by mhylle on 11-12-2015.
 */
(function () {
    'use strict';

    angular
        .module('schema.security')
        .service('SecurityService', SecurityService);

    SecurityService.$inject = ['$http', 'Session'];

    /* @ngInject */
    function SecurityService($http, Session) {

        var authorizedRoles = [];

        this.login = login;
        this.isAuthenticated = isAuthenticated;
        this.isAuthorized = isAuthorized;

        ////////////////

        function login(credentials) {
            return $http
                .post('/api/login', credentials)
                .then(function (result) {
                    Session.create(result.data.id, result.data.user.id, result.data.user.role);
                    return result.data.user;
                });
        }

        function isAuthenticated() {
            return !!Session.userId;
        }

        function isAuthorized() {
            if (!angular.isArray(authorizedRoles)) {
                authorizedRoles = [authorizedRoles];
            }
            return (isAuthenticated() && authorizedRoles.indexOf(Session.userRole) !== -1);
        }
    }
})();

