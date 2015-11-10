///<reference path="../../../../tools/typings/angularjs/angular.d.ts"/>
///<reference path="../blocks/logger/logger.ts"/>
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
            function SecurityController(logger) {
                this.logger = logger;
                this.init();
            }
            SecurityController.prototype.init = function () {
                this.title = 'Security';
                this.activate();
            };
            SecurityController.prototype.activate = function () {
                this.logger.info('Activated Security View');
            };
            SecurityController.prototype.login = function () {
                //this.logger.info('Logging in.');
                this.status = 'Logging in.';
                if (this.username === 'mah' && this.password === 'mah') {
                    this.status = 'Login Successful.';
                }
                else {
                    this.status = 'Login Failed';
                }
            };
            SecurityController.controllerId = 'SecurityController';
            SecurityController.$inject = ['logger'];
            return SecurityController;
        })();
        controllers.SecurityController = SecurityController;
        angular.module('app')
            .controller(SecurityController.controllerId, SecurityController);
    })(controllers = app.controllers || (app.controllers = {}));
})(app || (app = {}));
