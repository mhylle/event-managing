(function () {
    'use strict';

    angular
        .module('app')
        .controller('UserController', UserController);

    UserController.$inject = ['$location'];

    /* @ngInject */
    function UserController($location) {
        var vm = this;
        vm.title = 'UserController';

        vm.user = {
            id: '',
            firstname: '',
            lastname: ''

        };
        activate();

        ////////////////

        function activate() {

        }
    }

})();

