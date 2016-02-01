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
        vm.totalPages = 1;
        vm.currentPage = 1;
        vm.firstButton = 1;
        vm.lastButton = 1;

        activate();

        vm.getIcon = getIcon;
        vm.getUsers = getUsers;
        vm.pageChanged = pageChanged;
        vm.setPage = setPage;
        vm.pageCount = pageCount;

        vm.paginationButtons = [];

        ////////////////

        function activate() {
            vm.groupid = $stateParams.id;
            console.log('got id ' + vm.groupid + ' passed in as start parameter.');
            getGroup();
            getUsers();
            populatePaginationButtons();
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
            userservice.getUsers().then(function (response) {
                if (response.status === 'RESPONSE_OK') {
                    vm.users = response.users;
                    $scope.$watch('vm.currentPage + vm.itemsPerPage', function () {
                        var begin = ((vm.currentPage - 1) * vm.itemsPerPage);
                        var end = begin + vm.itemsPerPage;
                        vm.filteredUsers = vm.users.slice(begin, end);
                        vm.totalPages = pageCount();
                        populatePaginationButtons();
                    });
                }
                vm.status.response = response.status;
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
    }
})();
