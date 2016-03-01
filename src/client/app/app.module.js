(function () {
    'use strict';

    angular.module('eventmanaging', [
        'ui.router',
        'angularMoment',
        'ui.bootstrap',
        'ngAnimate',
        'angular-loading-bar',
        'event-managing-logger',
        'eventmanaging.header',
        'event-managing-events',
        'event-managing-users',
        'event-managing-groups',
        'event-managing-locations',
        'eventmanaging.security'
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

    ApplicationController.$inject = ['$scope', 'USER_ROLES', 'SecurityService', 'Logger'];
    function ApplicationController($scope, USER_ROLES, SecurityService, Logger) {
        var vm = this;

        vm.logger = Logger;
        $scope.currentUser = null;
        $scope.userRoles = USER_ROLES;
        $scope.isAuthorized = SecurityService.isAuthorized;

        $scope.setCurrentUser = function (user) {
            $scope.currentUser = user;
        };
    }

    function setupSecurity($rootScope, AUTH_EVENTS, SecurityService, Logger, Session) {
        Session.create(null, {
            id: 2,
            gender: 'Male',
            firstname: 'Martin',
            lastname: 'Hylleberg',
            username: 'mah',
            passtring: 'mah',
            address: 'Tousvej 6a, 8230 Åbyhøj, Danmark',
            email: 'mhylle@gmail.com',
            phone: '61791394',
            logicalId: '2020743'
        }, null);
        $rootScope.$on('$stateChangeStart', function (event, next) {
            if (next.data) {
                var authorizedRoles = next.data.authorizedRoles;
                if (!SecurityService.isAuthorized(authorizedRoles)) {
                    Logger.info('user was not authorized to proceed');
                    event.preventDefault();
                    if (SecurityService.isAuthenticated()) {
                        // user is not allowed
                        $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
                    } else {
                        // user is not logged in
                        $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
                    }
                }
            } else {
                event.preventDefault();
                $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
                Logger.error('data attribute did not exist on next object, this is an error..');
            }
        });
    }
})();
