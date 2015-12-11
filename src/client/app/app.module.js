(function () {
    'use strict';

    angular.module('schema', [
        'ui.router',
        'schema.logger',
        'schema.header',
        'schema.user',
        'schema.group',
        'schema.security'
    ]).config(['$stateProvider', 'USER_ROLES', configuration])
        .controller('ApplicationController', ApplicationController)
        .run(setupSecurity);

    function configuration($stateProvider, USER_ROLES) {

        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'app/security/login.html',
                data: {
                    authorizedRoles: [USER_ROLES.all]
                }
            })
            .state('home', {
                url: '/home',
                templateUrl: 'app/home.html',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
                }
            });
    }

    ApplicationController.$inject = ['$scope', 'USER_ROLES', 'SecurityService'];
    function ApplicationController($scope, USER_ROLES, SecurityService) {
        $scope.currentUser = null;
        $scope.userRoles = USER_ROLES;
        $scope.isAuthorized = SecurityService.isAuthorized;

        $scope.setCurrentUser = function (user) {
            $scope.currentUser = user;
        };
    }

    function setupSecurity($rootScope, AUTH_EVENTS, SecurityService) {
        $rootScope.$on('$stateChangeStart', function (event, next) {
            var authorizedRoles = next.data.authorizedRoles;
            if (!SecurityService.isAuthorized(authorizedRoles)) {
                event.preventDefault();
                if (SecurityService.isAuthenticated()) {
                    // user is not allowed
                    $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
                } else {
                    // user is not logged in
                    $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
                }
            }
        });
    }
})();
