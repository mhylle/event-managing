(function () {
    'use strict';

    angular
        .module('event-managing-components')
        .controller('promptdialogcontroller', promptdialogcontroller);

    promptdialogcontroller.$inject = ['$scope', 'modals'];

    /* @ngInject */
    /**
     * controller for a prompt dialog
     * @param {scope} $scope the scope
     * @param {service} modals the modals service for modal dialogs
     */
    function promptdialogcontroller($scope, modals) {
        // var vm = this;
        $scope.title = 'promptdialogcontroller';

        activate();

        $scope.cancel = modals.reject;
        $scope.submit = submit;
        ////////////////

        function activate() {
            $scope.message = modals.params().message;

            $scope.form = {
                input: (modals.params().placeholder || '')
            };

            $scope.errorMessage = null;
        }

        function submit() {
            if (!$scope.form.input) {
                return ($scope.errorMessage = 'Please enter a value');
            }

            modals.resolve($scope.form.input);
        }
    }

})();

