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
                    vm.users = [];
                } else {
                    if (response.status === 'ok') {
                        vm.users = response.users;
                        vm.status.code = 'ok';
                    } else {
                        vm.users = [];
                        vm.status.code = response.status;
                        vm.status.message = response.info;
                    }
                }
            });
        }

        function gotoUser(u) {
            console.log('trying to navigate to user ' + u.firstname + ' ' + u.lastname);
            $state.go('users.view', {id: u.id});
        }
    }
})();

