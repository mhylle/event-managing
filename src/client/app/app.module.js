(function () {
    'use strict';

    angular.module('schema', [
        'ui.router',
        'schema.logger',
        'schema.header',
        'schema.user',
        'schema.group',
        'schema.security'
    ]).config(['$stateProvider', configuration])
        .controller('ApplicationController', ApplicationController);
//    /* applicationVersion */
//    var applicationVersion : string;
    function configuration($stateProvider) {

        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'app/security/login.html',
                access: {allowAnonymous: true}
            })
            .state('home', {
                url: '/home',
                templateUrl: 'app/home.html',
                access: {allowAnonymous: true}
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
})();
