/**
 * Created by mhylle on 11-12-2015.
 */
(function () {
    'use strict';

    angular
        .module('eventmanaging.header')
        .controller('HeaderController', HeaderController);

    HeaderController.$inject = ['$scope', 'Logger'];

    /* @ngInject */
    function HeaderController($scope, Logger) {
        var vm = this;
        vm.title = 'HeaderController';

        init();

        ////////////////

        function init() {
            vm.title = 'Header';
            $scope.$watch(function () {
                return null;//that.securityService.getSecurityToken();
            }, function (newVal, oldVal) {
                if (Logger) {
                    Logger.info('watch triggered..');
                }
                if (typeof newVal !== 'undefined') {
                    vm.username = newVal;
                } else {
                    vm.username = 'Not logged in.';
                }

            });
        }
    }

})();

