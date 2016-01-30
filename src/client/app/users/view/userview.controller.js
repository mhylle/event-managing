(function () {
    'use strict';

    angular
        .module('eventmanaging.user')
        .controller('userviewcontroller', userviewcontroller);

    userviewcontroller.$inject = ['$stateParams', 'userservice'];

    /* @ngInject */
    function userviewcontroller($stateParams, userservice) {
        /* jshint -W040 */
        var vm = this;
        vm.title = 'userviewcontroller';
        vm.user = {};

        activate();

        ////////////////
        function activate() {

            console.log('got id ' + $stateParams.id + ' passed in as start parameter.');
            userservice.user($stateParams.id).then(function (response) {
                vm.user = response;
            });
        }
    }
})();
