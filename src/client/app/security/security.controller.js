(function () {
    'use strict';

    angular
        .module('event-managing-security')
        .controller('SecurityController', SecurityController);

    SecurityController.$inject = ['$rootScope', '$scope', 'AUTH_EVENTS', 'SecurityService'];

    /* @ngInject */
    function SecurityController($rootScope, $scope, AUTH_EVENTS, SecurityService) {
        var vm = this;
        vm.title = 'SecurityController';
        vm.status = {
            message: '',
            code: 'ok'
        };
        vm.credentials = {
            username: '',
            password: ''
        };

        init();
        vm.login = login;

        ////////////////
        function init() {

        }

        function login(credentials) {
            if (credentials) {
                console.log('Trying to login with ' + credentials.username + ' , ' + credentials.password);
            } else {
                vm.status.message = 'You must provide a username and password';
                console.log('You must provide a username and password');
                $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
                return;
            }
            SecurityService.login(credentials).then(function (response) {
                if (response) {
                    vm.status.message = 'Login Successful.';
                    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                } else {
                    vm.status.message = 'Login failed';
                    $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
                }
            }, function (err) {
                vm.status.message = 'An error occurred when trying to login, please try again later, ' + err.data.info;
                $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
            });

        }
    }

})();
