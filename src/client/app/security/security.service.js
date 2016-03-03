/**
 * Created by mhylle on 11-12-2015.
 */
(function () {
    'use strict';

    angular
        .module('event-managing-security')
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
                    Session.create(result.data.id, result.data.user, result.data.user.role);
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
            //var authorized = authorizedRoles.indexOf(Session.userRole) !== -1;
            return true;//(isAuthenticated() && authorized);
        }
    }
})();

