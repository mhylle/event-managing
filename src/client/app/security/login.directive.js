(function () {
    'use strict';

    angular
        .module('eventmanaging.security')
        .directive('loginDialog', loginDialog);

    loginDialog.$inject = ['AUTH_EVENTS'];

    /* @ngInject */
    function loginDialog(AUTH_EVENTS) {
        var directive = {
            bindToController: true,
            controller: LoginDialogController,
            controllerAs: 'vm',
            link: link,
            restrict: 'A',
            template: '<div ng-if="visible" ng-include="\'login.html\'">',
            scope: {}
        };
        return directive;

        function link(scope, element, attrs) {
            var showDialog = function () {
                scope.visible = true;
            };
            scope.visible = false;
            scope.$on(AUTH_EVENTS.notAuthenticated, showDialog);
            scope.$on(AUTH_EVENTS.sessionTimeout, showDialog);
        }
    }

    LoginDialogController.$inject = ['AUTH_EVENTS'];

    /* @ngInject */
    function LoginDialogController(AUTH_EVENTS) {

    }

})();