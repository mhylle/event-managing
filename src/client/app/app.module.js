(function () {
    'use strict';

    angular.module('event-managing', [
        'ui.router',
        'angularMoment',
        'ui.bootstrap',
        'ngAnimate',
        'angular-loading-bar',
        'event-managing-logger',
        'event-managing-header',
        'event-managing-events',
        'event-managing-users',
        'event-managing-groups',
        'event-managing-locations',
        'event-managing-security'
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

    ApplicationController.$inject = ['$rootScope', '$scope', 'AUTH_EVENTS', 'USER_ROLES', 'SecurityService', 'Logger'];
    function ApplicationController($rootScope, $scope, AUTH_EVENTS, USER_ROLES, SecurityService, Logger) {
        $scope.currentUser = null;
        $scope.userRoles = USER_ROLES;
        $scope.isAuthorized = SecurityService.isAuthorized;

        $rootScope.$on(AUTH_EVENTS.notAuthorized, function () {
            // Logger.message('Not authorized to continue');
        });
        $rootScope.$on(AUTH_EVENTS.notAuthenticated, function () {
            // Logger.message('Not authenticated to continue');
        });
    }

    function setupSecurity($rootScope, AUTH_EVENTS, SecurityService, Logger) {
        // todo do an actual login, so we are running with a proper user..
        $rootScope.$on('$stateChangeStart', verifyAuthorization);

        function verifyAuthorization(event, next) {
            if (next) {
                if (next.data) {
                    var authorizedRoles = next.data.authorizedRoles;
                    if (!SecurityService.isAuthorized(authorizedRoles)) {
                        Logger.message('User was not authorized to proceed');
                        //event.preventDefault();
                        if (SecurityService.isAuthenticated()) {
                            // user is not allowed
                            $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
                        } else {
                            // user is not logged in
                            $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
                        }
                    }
                }
            } else {
                // event.preventDefault();
                $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
                Logger.error('data attribute did not exist on next object, this is an error..');
            }
        }
    }
})();
