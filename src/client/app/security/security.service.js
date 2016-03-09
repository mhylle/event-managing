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
        var service = this;
        service.authorizedRoles = [];
        service.login = login;
        service.isAuthenticated = isAuthenticated;
        service.isAuthorized = isAuthorized;

        ////////////////
        function login(credentials) {
            return $http
                .post('/api/login', credentials)
                .then(function (response) {
                    if (response.data.status === 200) {
                        Session.create(response.data.user.id, response.data.user.user, response.data.user.user.roles);
                        return true;
                    } else {
                        Session.destroy();
                        return false;
                    }
                });
        }

        function isAuthenticated() {
            return !!Session.id;
        }

        function isAuthorized() {
            if (!angular.isArray(service.authorizedRoles)) {
                service.authorizedRoles = [service.authorizedRoles];
            }
            var authorized = service.authorizedRoles.indexOf(Session.userRoles) !== -1;
            return (isAuthenticated() && authorized);
        }
    }
})();
