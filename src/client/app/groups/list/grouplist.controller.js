(function () {
    'use strict';

    angular
        .module('event-managing-groups')
        .controller('grouplistcontroller', GroupListController);

    GroupListController.$inject = ['Logger', 'groupservice'];

    /* @ngInject */
    function GroupListController(Logger, groupservice) {
        var vm = this;
        vm.title = 'GroupListController';
        vm.status = {
            code: 'ok',
            message: ''
        };
        vm.groups = [];
        activate();

        vm.getIcon = getIcon;
        ////////////////
        function activate() {
            Logger.info('activating');
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

