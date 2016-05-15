/* jshint -W117, -W030 */
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
        /* jshint -W040 */
        var vm = this;
        /* jshint +W040 */
        vm.title = 'alertdialogcontroller';

        activate();

        vm.close = modals.resolve;
        ////////////////

        function activate() {
            vm.message = (modals.params().message);
        }
    }

})();
