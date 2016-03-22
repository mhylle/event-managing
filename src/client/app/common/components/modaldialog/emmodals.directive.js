(function () {
    'use strict';

    angular
        .module('event-managing-components')
        .directive('emmodals', emmodals);

    emmodals.$inject = ['$rootScope', 'modals', 'Logger'];

    /* @ngInject */
    function emmodals($rootScope, modals, Logger) {
        var directive = {
            link: link,
            restrict: 'A',
            scope: {}
        };
        return directive;

        function link(scope, element, attrs) {
            $rootScope.subview = null;

            element.on('click', function handleClickEvent(event) {
                if (element[0] !== event.target) {
                    return;
                }
                scope.$apply(modals.reject);
            });

            $rootScope.$on('modals.open', function handleModalOpenEven(event, modalType) {
                Logger.info('received modals.open event, ' + event + ' modaltype: ' + modalType);
                $rootScope.subview = modalType;
                Logger.message($rootScope.subview);
            });

            $rootScope.$on('modals.close', function handleModalCloseEvent(event) {
                $rootScope.subview = null;
            });
        }
    }
})();

