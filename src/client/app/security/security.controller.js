(function () {
    'use strict';

    angular
        .module('event-managing-security')
        .controller('SecurityController', SecurityController);

    SecurityController.$inject = ['$rootScope', 'AUTH_EVENTS', 'SecurityService', 'Logger'];

    /* @ngInject */
    function SecurityController($rootScope, AUTH_EVENTS, SecurityService, Logger) {
        var vm = this;
        vm.title = 'SecurityController';

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
                Logger.message('You must provide a username and password');
                $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
                return;
            }
            SecurityService.login(credentials).then(function (response) {
                if (response) {
                    Logger.message('Login Successful.');
                    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                } else {
                    Logger.message('Login failed');
                    $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
                }
            }, function (err) {
                Logger.message('An error occurred when trying to login, please try again later, ' + err.data.info);
                $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
            });

        }
    }

})();
