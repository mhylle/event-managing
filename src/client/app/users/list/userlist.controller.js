/**
 * Created by mhylle on 16-01-2016.
 */
(function () {
    'use strict';

    angular
        .module('event-managing-users')
        .controller('userlistcontroller', UserListController);

    UserListController.$inject = ['$state', 'userservice', 'Session'];

    /* @ngInject */
    function UserListController($state, userservice, Session) {
        var vm = this;
        vm.title = 'UserListController';
        vm.status = {
            code: 'ok',
            message: ''
        };

        vm.user = Session.user;
        vm.users = [];
        vm.fetchUsers = fetchUsers;
        vm.gotoUser = gotoUser;

        activate();

        ////////////////

        function activate() {
            fetchUsers();
        }

        function fetchUsers() {
            userservice.getUsers().then(function (response) {
                if (!response) {
                    vm.status.code = 'error';
                    vm.status.message = 'No response returned from the server';
                    return;
                }
                vm.users = response;
                vm.status.code = 'ok';
                //if (response.status === 'RESPONSE_OK') {
                //    vm.users = response;
                //    vm.status.code = 'ok';
                //    vm.status.message = '';
                //} else {
                //    if (response.status === 'RESPONSE_ERROR') {
                //        vm.status.code = 'error';
                //    } else {
                //        vm.status.code = 'warning';
                //    }
                //    vm.status.message = response.message;
                //}
                //vm.status.response = response.status;
            });
        }

        function gotoUser(u) {
            console.log('trying to navigate to user ' + u.firstname + ' ' + u.lastname);
            $state.go('users.view', {id: u.id});
        }
    }
})();

