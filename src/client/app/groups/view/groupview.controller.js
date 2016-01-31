(function () {
    'use strict';

    angular
        .module('event-managing-groups')
        .controller('groupviewcontroller', GroupViewController);

    GroupViewController.$inject = ['$scope', '$stateParams', 'Logger', 'groupservice', 'userservice'];

    /* @ngInject */
    function GroupViewController($scope, $stateParams, Logger, groupservice, userservice) {
        /* jshint -W040 */
        var vm = this;
        vm.title = 'groupviewcontroller';

        vm.group = null;
        vm.users = [];
        vm.groupid = '';
        vm.status = {};

        vm.totalItems = vm.users.length;
        vm.itemsPerPage = 12;
        vm.currentPage = 1;

        activate();

        vm.getIcon = getIcon;
        vm.getUsers = getUsers;
        vm.pageChanged = pageChanged;
        vm.setPage = setPage;
        vm.pageCount = function () {
            return Math.ceil(vm.users.length / vm.itemsPerPage);
        };

        ////////////////

        function activate() {
            vm.groupid = $stateParams.id;
            console.log('got id ' + vm.groupid + ' passed in as start parameter.');
            getGroup();
            getUsers();
        }

        function getGroup() {
            groupservice.getGroup(vm.groupid).then(function (response) {
                vm.group = response;
            });
        }

        // TODO This method need to be merged into a common routine.
        function getIcon(group) {
            if (!group) {
                return 'na.png';
            }

            if (group.type === 'public') {
                return 'open.png';
            }
            if (group.type === 'private') {
                return 'lock.jpg';
            }
            return 'na.png';
        }

        function getUsers() {
            Logger.info('getting users');
            userservice.users().then(function (response) {
                if (response.status === 'RESPONSE_OK') {
                    vm.users = response.users;
                    $scope.$watch('vm.currentPage + vm.itemsPerPage', function () {
                        var begin = ((vm.currentPage - 1) * vm.itemsPerPage);
                        var end = begin + vm.itemsPerPage;
                        vm.filteredUsers = vm.users.slice(begin, end);
                    });
                }
                vm.status.response = response.status;
            });
        }

        function pageChanged() {
            Logger.info('Page changed to: ' + vm.currentPage);
        }

        function setPage(pageNo) {
            vm.currentPage = pageNo;
        }
    }
})();
