/**
 * Created by mhylle on 11-12-2015.
 */
(function () {
    'use strict';

    angular
        .module('event-managing-header')
        .controller('HeaderController', HeaderController);

    HeaderController.$inject = ['$scope', '$mdDialog', '$mdMedia', 'Logger'];

    /* @ngInject */
    function HeaderController($scope, $mdDialog, $mdMedia, Logger) {
        var vm = this;
        vm.title = 'HeaderController';

        // vm.showLoginDialog = showLoginDialog;
        // vm.handleCancel = handleCancel;
        // vm.handleSubmit = handleSubmit;
        activate();

        ////////////////

        function activate() {
            vm.title = 'Header';
            vm.logo = 'images/logo.png';
            $scope.$watch(function () {
                return null;//SecurityService.getSecurityToken();
            }, function (newVal) {
                Logger.info('watch triggered..');
                //if (typeof newVal !== 'undefined') {
                //    vm.username = newVal;
                //} else {
                //    vm.username = 'Not logged in.';
                //}
            });
        }

        // function handleSubmit() {
        //     return $mdDialog.hide();
        // }
        //
        // function handleCancel() {
        //     return $mdDialog.hide();
        // }
        //
        // function showLoginDialog(ev) {
        //     Logger.info('showLoginDialog');
        //     var confirm = $mdDialog.prompt({
        //             templateUrl: 'app/security/login/login.html',
        //         })
        //         .targetEvent(ev)
        //         .ok('Okay!')
        //         .cancel('I\'m a cat person');
        //     // .title('Please Login')
        //     // .textContent('Bowser is a common name.')
        //     // .placeholder('dog name')
        //     // .ariaLabel('Dog name')
        //     // .targetEvent(ev)
        //     // .ok('Okay!')
        //     // .cancel('I\'m a cat person');
        //
        //     function targetEvent(event){
        //         console.log('targer: ' + event);
        //     }
        //     $mdDialog.show(confirm).then(function (result) {
        //         $scope.status = 'You decided to name your dog ' + result + '.';
        //     }, function () {
        //         $scope.status = 'You didn\'t name your dog.';
        //     });
        // }
    }
})();

