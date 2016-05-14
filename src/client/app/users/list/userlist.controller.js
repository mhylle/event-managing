/**
 * Created by mhylle on 16-01-2016.
 */
(function () {
    'use strict';

    angular
        .module('event-managing-users')
        .controller('userlistcontroller', UserListController);

    UserListController.$inject = ['$state', 'userservice', 'Session', 'Logger'];

    /* @ngInject */
    function UserListController($state, userservice, Session, Logger) {
        var vm = this;
        vm.title = 'UserListController';

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
                    Logger.message('No response returned from the server', 'error');
                    vm.users = [];
                } else {
                    vm.users = response;
                    Logger.status('ok');
                }
            });
        }

        function gotoUser(u) {
            Logger.info('trying to navigate to user ' + u.firstname + ' ' + u.lastname);
            $state.go('users.view', {id: u.id});
        }
    }
})();

