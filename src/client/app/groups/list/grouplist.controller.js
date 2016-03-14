(function () {
    'use strict';

    angular
        .module('event-managing-groups')
        .controller('grouplistcontroller', GroupListController);

    GroupListController.$inject = ['$scope', '$state', 'Logger', 'groupservice', 'groupiconservice'];

    /* @ngInject */
    function GroupListController($scope, $state, Logger, groupservice, groupiconservice) {
        var vm = this;
        vm.title = 'GroupListController';
        vm.status = {
            code: 'ok',
            message: ''
        };
        vm.groups = [];
        $scope.pageClass = 'page-grouplist';
        activate();

        vm.getIcon = getIcon;
        vm.gotoGroup = gotoGroup;
        ////////////////

        function activate() {
            Logger.info('activating');
            getGroups();
        }

        function getGroups() {
            groupservice.getGroups().then(function (response) {
                Logger.info('getting initial groups');
                if (!response) {
                    vm.status.code = 'error';
                    vm.status.message = 'No response returned from the server';
                    vm.users = [];
                } else {
                    if (response.status === 'ok') {
                        vm.groups = response.groups;
                        vm.status.code = 'ok';
                    } else {
                        vm.groups = [];
                        vm.status.code = response.status;
                        vm.status.message = response.info;
                    }
                }
            });
        }

        function gotoGroup(g) {
            Logger.info('trying to navigate to group ' + g.name);
            $state.go('groups.view', {id: g.id});
        }

        function getIcon(group) {
            return groupiconservice.getIcon(group);
        }
    }
})();

