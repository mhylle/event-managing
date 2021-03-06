(function () {
    'use strict';

    angular
        .module('event-managing-components')
        .controller('alertdialogcontroller', alertdialogcontroller);

    alertdialogcontroller.$inject = ['modals'];

    /* @ngInject */
    /**
     * Controller for the alert dialog
     * @param {service} modals  modals service for modal dialogs
     */
    function alertdialogcontroller(modals) {
        /* jshint -W040 */
        var vm = this;
        /* jshint +W040 */
        vm.title = 'alertdialogcontroller';
        var params;
        activate();

        vm.confirm = modals.resolve;
        vm.deny = modals.reject;
        ////////////////

        function activate() {
            params = modals.params();
            vm.message = (params.message || 'Are you sure?');
            vm.confirmButton = (params.confirmButton || 'Yes');
            vm.denyButton = (params.denyButton || 'No');
        }
    }
})();
