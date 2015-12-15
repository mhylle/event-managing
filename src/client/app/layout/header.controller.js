/**
 * Created by mhylle on 11-12-2015.
 */
(function () {
    'use strict';

    angular
        .module('schema.header')
        .controller('HeaderController', HeaderController);

    HeaderController.$inject = ['$scope', 'schema.logger'];

    /* @ngInject */
    function HeaderController($scope, logger) {
        var vm = this;
        vm.title = 'HeaderController';

        init();

        ////////////////

        function init() {
            vm.title = 'Header';
            $scope.$watch(function () {
                return null;//that.securityService.getSecurityToken();
            }, function (newVal, oldVal) {
                if (logger) {
                    logger.info('watch triggered..');
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

