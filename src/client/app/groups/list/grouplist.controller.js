(function () {
    'use strict';

    angular
        .module('event-managing-groups')
        .controller('grouplistcontroller', GroupListController);

    GroupListController.$inject = ['$state', 'Logger', 'groupservice'];

    /* @ngInject */
    function GroupListController($state, Logger, groupservice) {
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
                if (response.status === 'RESPONSE_OK') {
                    vm.groups = response.groups;
                    vm.status.code = 'ok';
                    vm.status.message = '';
                } else {
                    if (response.status === 'RESPONSE_ERROR') {
                        vm.status.code = 'error';
                    } else {
                        vm.status.code = 'warning';
                    }
                    vm.status.message = response.message;
                }
                vm.status.response = response.status;
            });
        }

        function gotoGroup(g) {
            console.log('trying to navigate to group ' + g.name);
            $state.go('groups.view', {id: g.id});
        }

        function getIcon(group) {
            if (group.type === 'public') {
                return 'open.png';
            }
            if (group.type === 'private') {
                return 'lock.jpg';
            }
            return 'na.png';
        }
    }
})();

