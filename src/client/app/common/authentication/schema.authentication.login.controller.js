/**
 * Created by mhylle on 08-12-2015.
 */
(function () {
    'use strict';

    angular
        .module('schema')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope', '$rootScope', 'AUTH_EVENTS', 'AuthService'];

    /* @ngInject */
    function LoginController($scope, $rootScope, AUTH_EVENTS, AuthService) {
        var vm = this;
        vm.title = 'LoginController';
        vm.activate = activate;
        vm.login = login;

        activate();

        ////////////////
        function activate() {
            $scope.credentials = {
                username: '',
                password: ''
            };
        }

        function login(credentials) {
            AuthService.login(credentials).then(function (user) {
                $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                $scope.setCurrentUser(user);
            }, function () {
                $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
            });
        }
    }

})();

