(function () {
    'use strict';

    angular
        .module('event-managing-groups')
        .controller('grouplistcontroller', GroupListController);

    GroupListController.$inject = ['$state', 'Logger', 'groupservice', 'groupiconservice'];

    /* @ngInject */
    function GroupListController($state, Logger, groupservice, groupiconservice) {
        var vm = this;
        vm.title = 'GroupListController';
        vm.status = {
            code: 'ok',
            message: ''
        };
        vm.groups = [];
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
                    return;
                }
                vm.groups = response;
                vm.status.code = 'ok';
            });
        }

        function gotoGroup(g) {
            console.log('trying to navigate to group ' + g.name);
            $state.go('groups.view', {id: g.id});
        }

        function getIcon(group) {
            return groupiconservice.getIcon(group);
        }
    }
})();

