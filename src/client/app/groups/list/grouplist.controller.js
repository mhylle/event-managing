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
                    Logger.message('No response returned from the server', 'error');
                    vm.users = [];
                } else {
                    if (response.status === 'ok') {
                        vm.groups = response.groups;
                        Logger.status('ok');
                    } else {
                        vm.groups = [];
                        Logger.message(response.info, response.status);
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

