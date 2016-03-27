(function () {
    'use strict';

    angular
        .module('event-managing-components')
        .controller('alertdialogcontroller', alertdialogcontroller);

    alertdialogcontroller.$inject = ['$scope', '$q', 'modals'];


    /**
     * Simple alert dialog controller
     * @param modals service for the modality state.
     */
    /* @ngInject */
    function alertdialogcontroller(modals) {
        var vm = this;
        vm.title = 'alertdialogcontroller';

        activate();

        vm.close = modals.resolve;
        ////////////////

        function activate() {
            vm.message = (modals.params().message);
        }
    }

})();

