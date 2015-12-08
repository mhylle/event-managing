/**
 * Created by mhylle on 08-12-2015.
 */
(function () {
    'use strict';

    angular
        .module('schema')
        .controller('ApplicationController', ApplicationController);

    ApplicationController.$inject = ['$scope', 'USER_ROLES', 'AuthService'];

    /* @ngInject */
    function ApplicationController($scope, USER_ROLES, AuthService) {
        var vm = this;
        vm.title = 'ApplicationController';

        activate();

        ////////////////

        function activate() {
            $scope.currentUser = null;
            $scope.userRoles = USER_ROLES;
            $scope.isAuthorized = AuthService.isAuthorized;

            $scope.setCurrentUser = function (user) {
                $scope.currentUser = user;
            };
        }
    }
})();

