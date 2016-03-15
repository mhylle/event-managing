(function () {
    'use strict';

    angular
        .module('event-managing-security')
        .service('SecurityService', SecurityService);

    SecurityService.$inject = ['$http', 'Session'];

    /* @ngInject */
    function SecurityService($http, Session) {
        var service = this;
        service.login = login;
        service.isAuthenticated = isAuthenticated;
        service.isAuthorized = isAuthorized;

        ////////////////
        function login(credentials) {
            return $http
                .post('/api/login', credentials)
                .then(function (response) {
                    if (response.data.status === 200) {
                        var user = response.data.user;
                        Session.create(user.id, user, user.roles);
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

        function isAuthorized(authorizedRoles) {
            if (!angular.isArray(authorizedRoles)) {
                authorizedRoles = [authorizedRoles];
            }

            if (authorizedRoles.indexOf('*') !== -1) {
                return isAuthenticated();
            }
            var authorized = authorizedRoles.indexOf(Session.userRoles) !== -1;
            return (isAuthenticated() && authorized);
        }
    }
})();
