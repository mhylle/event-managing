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
        vm.userid = '';

        activate();

        ////////////////
        function activate() {
            Logger.info('got id ' + $stateParams.id + ' passed in as start parameter.');
            vm.userid = $stateParams.id;
            getUser();
        }

        function getUser() {
            userservice.getUser(vm.userid).then(function (response) {
                if (!response) {
                    Logger.message('An error occurred while retrieving the user from the server', 'error');
                    vm.user = null;
                } else {
                    if (response.status === 'ok') {
                        vm.user = response.user;
                    } else {
                        vm.user = null;
                        Logger.message(response.info, 'error');
                    }
                }
            });
        }
    }
})();
