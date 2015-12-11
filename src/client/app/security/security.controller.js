(function () {
    'use strict';

    angular
        .module('schema.security')
        .controller('SecurityController', SecurityController);

    SecurityController.$inject = ['$rootScope', '$scope', 'AUTH_EVENTS', 'SecurityService'];

    /* @ngInject */
    function SecurityController($rootScope, $scope, AUTH_EVENTS, SecurityService) {
        var vm = this;
        vm.title = 'SecurityController';
        vm.securityService = SecurityService;
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
            vm.securityService.login(credentials).then(function (user) {
                $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                $scope.setCurrentUser(user);
            }, function () {
                $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
            });
            if (credentials) {
                console.log('Trying to login with ' + credentials.username + ' , ' + credentials.password);
            } else {
                console.log('Trying to login with nothing entered in credentials');
            }
        }
    }

})();
