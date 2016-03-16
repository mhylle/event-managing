/**
 * Created by mhylle on 11-12-2015.
 */
(function () {
    'use strict';

    angular
        .module('event-managing-header')
        .controller('HeaderController', HeaderController);

    HeaderController.$inject = ['$scope', 'Logger'];

    /* @ngInject */
    function HeaderController($scope, Logger) {
        var vm = this;
        vm.title = 'HeaderController';
        vm.status = {
            code: 'ok',
            message: ''
        };
        activate();

        ////////////////

        function activate() {
            vm.title = 'Header';
            vm.logo = 'images/logo.png';
            $scope.$watch(function () {
                return null;//that.securityService.getSecurityToken();
            }, function (newVal) {
                Logger.info('watch triggered..');
                //if (typeof newVal !== 'undefined') {
                //    vm.username = newVal;
                //} else {
                //    vm.username = 'Not logged in.';
                //}
            });
        }
    }
})();

