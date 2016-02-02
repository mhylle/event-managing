(function () {
    'use strict';

    angular
        .module('event-managing-groups')
        .factory('groupiconservice', groupiconservice);

    groupiconservice.$inject = [];

    /* @ngInject */
    function groupiconservice() {
        var service = {
            getIcon: getIcon
        };
        return service;

        ////////////////
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
    }
})();
