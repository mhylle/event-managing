/**
 * Created by mhylle on 11-12-2015.
 */
(function () {
    'use strict';

    angular
        .module('event-managing-header')
        .controller('HeaderController', HeaderController);

    HeaderController.$inject = ['$scope', 'Logger', 'modals', 'SecurityService', 'Session'];

    /* @ngInject */
    function HeaderController($scope, Logger, modals, SecurityService, Session) {
        var vm = this;
        vm.title = 'HeaderController';

        vm.isAuthorized = isAuthorized;
        vm.showLoginDialog = showLoginDialog;
        activate();

        ////////////////

        function activate() {
            vm.title = 'Header';
            vm.logo = 'images/logo.png';
            $scope.$watch(function () {
                return Session.user;
            }, function (newVal) {
                Logger.info('watch triggered..');
                if (typeof newVal !== 'undefined' && newVal !== null) {
                    vm.username = newVal.name.firstname + ' ' + newVal.name.lastname;
                } else {
                    vm.username = 'Guest';
                }
            });
        }

        function showLoginDialog(ev) {
            Logger.info('showLoginDialog');

            var promise = modals.open('prompt', {
                message: 'Please login',
                placeholder: ''
            });

            promise.then(function handleResolve(response) {
                Logger.message('Prompt resolved with ' + response, +'.');
                var credentials = {username: response.username, password: response.password};
                SecurityService.login(credentials).then(function (response) {
                    if (response) {
                        Logger.message('Welcome ' + Session.user.name.firstname +
                            ' ' + Session.user.name.lastname + '!');
                        vm.username = Session.user.name.firstname + ' ' + Session.user.name.lastname;
                    } else {
                        Logger.message('Login failed. Did you supply the correct username or password?');
                    }
                });


            }, function handleReject(error) {
                Logger.message('Prompt rejected: ' + error);
            });
        }

        function isAuthorized(module) {
            return true;
        }
    }
})();

