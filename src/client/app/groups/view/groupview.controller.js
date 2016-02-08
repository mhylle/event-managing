(function () {
    'use strict';

    angular
        .module('event-managing-groups')
        .controller('groupviewcontroller', GroupViewController);

    GroupViewController.$inject = [
        '$scope',
        '$stateParams',
        'Logger',
        'groupservice',
        'groupiconservice',
        'userservice'];

    /* @ngInject */
    function GroupViewController($scope, $stateParams, Logger, groupservice, groupiconservice, userservice) {
        /* jshint -W040 */
        var vm = this;
        vm.title = 'groupviewcontroller';

        vm.group = null;
        vm.users = [];
        vm.groupid = '';
        vm.response = {};

        vm.totalItems = vm.users.length;
        vm.itemsPerPage = 12;
        vm.totalPages = 0;
        vm.currentPage = 0;
        vm.firstButton = 1;
        vm.lastButton = 1;

        vm.status = {
            message: '',
            groups: 'ok',
            users: 'ok'
        };

        activate();

        vm.getUsers = getUsers;
        vm.pageChanged = pageChanged;
        vm.setPage = setPage;
        vm.pageCount = pageCount;
        vm.getIcon = getIcon;
        vm.addUserToGroup = addUserToGroup;
        vm.removeUserFromGroup = removeUserFromGroup;

        vm.paginationButtons = [];

        ////////////////

        function activate() {
            vm.groupid = $stateParams.id;
            console.log('got id ' + vm.groupid + ' passed in as start parameter.');
            getGroup();
            getUsers();
            populatePaginationButtons();
        }

        function getIcon(group) {
            return groupiconservice.getIcon(group);
        }

        function pageCount() {
            return Math.ceil(vm.users.length / vm.itemsPerPage);
        }

        function getGroup() {
            groupservice.getGroup(vm.groupid).then(function (response) {
                vm.group = response;
            });
        }

        function populatePaginationButtons() {
            var pages = pageCount();
            Logger.info('vm.pageCount: ' + pages);
            vm.firstButton = vm.currentPage - 3;
            vm.lastButton = vm.currentPage + 3;

            if (vm.firstButton < 1) {
                vm.firstButton = 1;
            }

            if (vm.lastButton > pages) {
                vm.lastButton = pages;
            }
            vm.paginationButtons = [];
            for (var i = 1; i < pages; i++) {
                vm.paginationButtons.push(i);
            }
        }

        function getUsers() {
            Logger.info('getting users');
            userservice.getUsers().then(function (response) {
                vm.users = response;
                if (vm.users) {
                    $scope.$watch('vm.currentPage + vm.itemsPerPage', function () {
                        var begin = ((vm.currentPage - 1) * vm.itemsPerPage);
                        var end = begin + vm.itemsPerPage;
                        vm.filteredUsers = vm.users.slice(begin, end);
                        vm.totalPages = pageCount();
                        populatePaginationButtons();
                    });
                } else {
                    vm.status.users = 'failed';
                }
            });
        }

        function pageChanged(page) {
            Logger.info('Page changed to: ' + vm.currentPage);
            if (page >= 1 && page < vm.totalPages) {
                vm.currentPage = page;
            }
        }

        function setPage(pageNo) {
            vm.currentPage = pageNo;
        }

        function addUserToGroup(user) {
            Logger.info('Trying to add user ' + user.id + ' to group ' + vm.group.id);
            groupservice.addUserToGroup(vm.group, user).then(function (response) {
                if (!response.data) {
                    vm.status.message = 'Failed in adding user to group';
                }

                if (response.data.status === 'ok') {
                    vm.status.message = 'User successfully added to group';
                    vm.group = response.data.group;
                }
                if (response.data.status === 'failed') {
                    vm.status.message = response.data.info;
                }
            });
        }
        function removeUserFromGroup(user) {
            Logger.info('Trying to remove user ' + user.id + ' from group ' + vm.group.id);
            groupservice.removeUserFromGroup(vm.group, user).then(function (response) {
                if (!response.data) {
                    vm.status.message = 'Failed in removing user from group';
                }

                if (response.data.status === 'ok') {
                    vm.status.message = 'User successfully removed from group';
                    vm.group = response.data.group;
                }
                if (response.data.status === 'failed') {
                    vm.status.message = response.data.info;
                }
            });
        }
    }
})();
