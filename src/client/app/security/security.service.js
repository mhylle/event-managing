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
                        Session.create(response.data.user.id, response.data.user, response.data.user.role);
                        return true;
                    } else {
                        Session.destroy();
                        return false;
                    }
                });
        }

        function isAuthenticated() {
            return !!Session.userId;
        }

        function isAuthorized() {
            if (!angular.isArray(service.authorizedRoles)) {
                service.authorizedRoles = [service.authorizedRoles];
            }
            //var authorized = authorizedRoles.indexOf(Session.userRole) !== -1;
            return true;//(isAuthenticated() && authorized);
        }
    }
})();
