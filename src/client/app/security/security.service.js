(function () {
    'use strict';

    angular
        .module('event-managing-security')
        .service('SecurityService', SecurityService);

    SecurityService.$inject = ['$http', '$window', 'Session', 'lodash', 'base64', 'securityServer'];

    /* @ngInject */
    function SecurityService($http, $window, Session, lodash, base64, securityServer) {
        var securityLocation = securityServer.url + ':' + securityServer.port;
        var service = this;
        service.login = login;
        service.isAuthenticated = isAuthenticated;
        service.isAuthorized = isAuthorized;

        ////////////////
        function login(credentials) {
            var authdata = base64.encode(credentials.username + ':' + credentials.password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;

            return $http(
                {
                    url: securityLocation + '/api/login',
                    method: 'POST',
                    data: credentials,
                })
                .then(function (response) {
                    if (response.status === 200) {
                        var user = response.data.user;
                        $window.sessionStorage.userInfo = response.data.accessToken;
                        Session.create(response.data.accessToken, user, user.roles);
                        return true;
                    } else {
                        Session.destroy();
                        return false;
                    }
                })
                .catch(function (response) {
                    if (response.status === 401) {
                        console.log('Unable to login: ' + response);
                        Session.destroy();
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

            var user = Session.user;
            var groups = user.groups;
            var authorized = lodash.intersection(authorizedRoles, Session.userRoles).length > 0;
            return (isAuthenticated() && authorized);
        }
    }
})();
