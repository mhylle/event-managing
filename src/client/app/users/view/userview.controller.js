(function () {
    'use strict';

    angular
        .module('event-managing-users')
        .controller('userviewcontroller', userviewcontroller);

    userviewcontroller.$inject = ['$stateParams', 'userservice', 'Logger'];

    /* @ngInject */
    function userviewcontroller($stateParams, userservice, Logger) {
        /* jshint -W040 */
        var vm = this;
        vm.title = 'userviewcontroller';
        vm.user = null;

        vm.status = {
            message : ''
        };
        activate();

        ////////////////
        function activate() {
            Logger.info('got id ' + $stateParams.id + ' passed in as start parameter.');
            userservice.getUser($stateParams.id).then(function (response) {
                vm.user = response;
            });
        }
    }
})();
