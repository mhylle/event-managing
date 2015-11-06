/**
 * @ngdoc controller
 * @name SecurityController
 *
 * @description
 * _Please update the description and dependencies._
 *
 * @requires $scope
 * */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('SecurityController', SecurityController);

    SecurityController.$inject = [];

    /* @ngInject */
    function SecurityController() {
        var vm = this;
        vm.title = 'SecurityController';
        vm.username = '';
        vm.password = '';
        vm.status = '';

        activate();

        ////////////////
        vm.login = doLogin;

        function activate() {

        }

        function doLogin() {
            if (vm.username === '' || vm.password === '') {
                vm.status = 'Login Failed';
            }

            if (vm.username === 'mah' && vm.password === 'mah') {
                vm.status = 'Login Successful.';
            }
        }
    }

})();

