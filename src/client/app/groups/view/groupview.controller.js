(function () {
    'use strict';

    angular
        .module('event-managing-groups')
        .controller('groupviewcontroller', GroupViewController);

    GroupViewController.$inject = [
        '$scope',
        '$stateParams',
        'lodash',
        'Logger',
        'groupservice',
        'groupiconservice',
        'userservice'];

    /* @ngInject */
    function GroupViewController($scope, $stateParams, lodash, Logger, groupservice, groupiconservice, userservice) {
        /* jshint -W040 */
        var vm = this;
        vm.title = 'groupviewcontroller';

        $scope.pageClass = 'scrolled';

        vm.group = null;
        vm.groupIcon = null;
        vm.availableUsers = [];
        vm.groupid = '';
        vm.response = {};

        vm.totalItems = vm.availableUsers.length;
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
        vm.addUserToGroup = addUserToGroup;
        vm.addAllUsersToGroup = addAllUsersToGroup;
        vm.removeUserFromGroup = removeUserFromGroup;

        vm.paginationButtons = [];

        ////////////////

        function activate() {
            vm.groupid = $stateParams.id;
            Logger.info('got id ' + vm.groupid + ' passed in as start parameter.');
            getGroup();
            getUsers();
            populatePaginationButtons();
        }

        function pageCount() {
            return Math.ceil(vm.availableUsers.length / vm.itemsPerPage);
        }

        function getGroup() {
            groupservice.getGroup(vm.groupid).then(function (response) {
                if (response.status === 'ok') {
                    vm.group = response.group;
                    vm.groupIcon = groupiconservice.getIcon(vm.group);
                    calculateUserLists();
                } else {
                    vm.group = null;
                    vm.status.message = 'An error occurred when retrieving the group';
                }
            });
        }

        function calculateUserLists() {
            if (vm.group.users) {
                vm.availableUsers = lodash.remove(vm.group.users, function (user) {
                    return lodash.indexOf(vm.availableUsers, user) !== -1;
                });
            }
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
                vm.availableUsers = response;
                if (vm.availableUsers) {
                    $scope.$watch('vm.currentPage + vm.itemsPerPage', function () {
                        var begin = ((vm.currentPage - 1) * vm.itemsPerPage);
                        var end = begin + vm.itemsPerPage;
                        vm.filteredUsers = vm.availableUsers.slice(begin, end);
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
            if (!vm.group) {
                vm.status.message = 'No group selected';
                return;
            }
            if (!user) {
                vm.status.message = 'No user selected';
                return;
            }
            Logger.info('Trying to add user ' + user.id + ' to group ' + vm.group.id);
            groupservice.addUserToGroup(vm.group, user).then(function (response) {
                if (!response) {
                    vm.status.message = 'Failed in adding user to group';
                    return;
                }

                if (response.status === 'ok') {
                    vm.status.message = 'User successfully added to group';
                    vm.group = response.group;
                    lodash.remove(vm.availableUsers, function (u) {
                        return u.id === user.id;
                    });
                }
                if (response.status === 'failed') {
                    vm.status.message = response.info;
                }
            });
        }

        function addAllUsersToGroup() {
            vm.status.message = 'Adding users to group';
            if (!vm.group) {
                vm.status.message = 'No group selected';
                return;
            }

            groupservice.addUsersToGroup(vm.group, vm.availableUsers).then(function (response) {
                if (!response) {
                    vm.status.message = 'Failed in adding all users to the group';
                    return;
                }

                if (response.status === 'ok') {
                    vm.status.message = 'All users not in the group was added to the group.';
                    vm.group = response.group;
                    vm.availableUsers = [];
                }
                if (response.status === 'failed') {
                    vm.status.message = response.info;
                }
            });
        }

        function removeUserFromGroup(user) {
            vm.status.message = '';
            if (!vm.group) {
                vm.status.message = 'No group selected';
                return;
            }
            if (!user) {
                vm.status.message = 'No user selected';
                return;
            }
            Logger.info('Trying to remove user ' + user.id + ' from group ' + vm.group.id);
            groupservice.removeUserFromGroup(vm.group, user).then(function (response) {
                if (!response) {
                    vm.status.message = 'Failed in removing user from group';
                    return;
                }

                if (response.status === 'ok') {
                    vm.status.message = 'User successfully removed from group';
                    vm.group = response.group;
                    vm.availableUsers.push(user);
                }
                if (response.status === 'failed') {
                    vm.status.message = response.info;
                }
            });
        }
    }
})();
