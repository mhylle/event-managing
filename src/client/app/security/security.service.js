(function () {
    'use strict';

    angular
        .module('event-managing-security')
        .service('SecurityService', SecurityService);

    SecurityService.$inject = ['$http', '$window', 'Session', 'lodash', 'securityServer'];

    /* @ngInject */
    function SecurityService($http, $window, Session, lodash, securityServer) {
        var securityLocation = securityServer.url + ':' + securityServer.port;
        var service = this;
        service.login = login;
        service.isAuthenticated = isAuthenticated;
        service.isAuthorized = isAuthorized;

        ////////////////
        function login(credentials) {
            return $http({
                url: securityLocation + '/api/login',
                method: 'POST',
                data: credentials,
                headers: {
                    common: {
                        Authorization: {
                            username: credentials.username,
                            password: credentials.password
                        }
                    },
                    "Content-Type": "application/json"
                }
            })
            return $http
                .post(securityLocation + '/api/login', credentials)
                .then(function (response) {
                    if (response.data.status === 200) {
                        var user = response.data.user;
                        $window.sessionStorage.userInfo = response.data.accesstoken;
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
                return true;
            }

            var authorized = lodash.intersection(authorizedRoles, Session.userRoles).length > 0;
            return (isAuthenticated() && authorized);
        }
    }
})();
