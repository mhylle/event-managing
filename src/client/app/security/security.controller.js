///<reference path="../../../../tools/typings/angularjs/angular.d.ts"/>
/**
 * @ngdoc controller
 * @name SecurityController
 *
 * @description
 * _Please update the description and dependencies._
 *
 * @requires $scope
 * */
var app;
(function (app) {
    var controllers;
    (function (controllers) {
        var SecurityController = (function () {
            /* @ngInject */
            function SecurityController($log) {
                this.$log = $log;
                this.init();
            }
            SecurityController.prototype.init = function () {
                this.title = 'Security';
                this.activate();
            };
            SecurityController.prototype.activate = function () {
                this.$log.info('Activated Security View');
                //this.logger.info('Activated Security View');
            };
            SecurityController.prototype.login = function () {
                this.status = 'Logging in.';
                if (this.username === 'mah' && this.password === 'mah') {
                    this.status = 'Login Successful.';
                }
                else {
                    this.status = 'Login Failed';
                }
            };
            SecurityController.controllerId = 'SecurityController';
            SecurityController.$inject = ['$log'];
            return SecurityController;
        })();
        controllers.SecurityController = SecurityController;
        angular.module('app')
            .controller(SecurityController.controllerId, SecurityController);
    })(controllers = app.controllers || (app.controllers = {}));
})(app || (app = {}));
