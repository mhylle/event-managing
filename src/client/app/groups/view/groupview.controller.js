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
        'userservice',
        'lodash'];

    /* @ngInject */
    function GroupViewController($scope, $stateParams, Logger, groupservice, groupiconservice, userservice, lodash) {
        /* jshint -W040 */
        var vm = this;
        vm.title = 'groupviewcontroller';

        $scope.pageClass = 'scrolled';

        vm.group = null;
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
        vm.getIcon = getIcon;
        vm.addUserToGroup = addUserToGroup;
        vm.addAllUsersToGroup = addAllUsersToGroup;
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
            return Math.ceil(vm.availableUsers.length / vm.itemsPerPage);
        }

        function getGroup() {
            groupservice.getGroup(vm.groupid).then(function (response) {
                vm.group = response;
                calculateUserLists();
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
                if (!response.data) {
                    vm.status.message = 'Failed in adding user to group';
                }

                if (response.data.status === 'ok') {
                    vm.status.message = 'User successfully added to group';
                    vm.group = response.data.group;
                    lodash.remove(vm.availableUsers, function (u) {
                        return u.id === user.id;
                    });
                }
                if (response.data.status === 'failed') {
                    vm.status.message = response.data.info;
                }
            });
        }

        function addAllUsersToGroup() {
            var success = false;
            vm.status.message = 'Adding users to group';
            if (!vm.group) {
                vm.status.message = 'No group selected';
                return;
            }

            groupservice.addUsersToGroup(vm.group, vm.availableUsers).then(function(response) {
                if (!response.data) {
                    vm.status.message = 'Failed in adding all available to group';
                    success = true;
                }

                if (response.data.status === 'ok') {
                    vm.status.message = 'Available users successfully added to group';
                    vm.group = response.data.group;
                    vm.availableUsers = [];
                    success = true;
                }
                if (response.data.status === 'failed') {
                    vm.status.message = response.data.info;
                    success = true;
                }
            });
            if (!success) {
                vm.status.message = 'Something went wrong while trying to add users to the group';
            }
        }

        function removeUserFromGroup(user) {
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
                if (!response.data) {
                    vm.status.message = 'Failed in removing user from group';
                }

                if (response.data.status === 'ok') {
                    vm.status.message = 'User successfully removed from group';
                    vm.group = response.data.group;
                    vm.availableUsers.push(user);
                }
                if (response.data.status === 'failed') {
                    vm.status.message = response.data.info;
                }
            });
        }
    }
})();
