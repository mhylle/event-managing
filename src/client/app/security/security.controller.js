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
            function SecurityController(logger, securityService) {
                this.logger = logger;
                this.securityService = securityService;
                this.secService = securityService;
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
                this.loginStatus = 'Logging in.';
                this.securityService.login(this.username, this.password).then(function (response) {
                    if (response) {
                        this.loginStatus = 'Successfully logged in';
                    }
                    else {
                        this.loginStatus = 'Failed login';
                    }
                });
            };
            SecurityController.controllerId = 'SecurityController';
            SecurityController.$inject = ['logger', 'securityservice'];
            return SecurityController;
        })();
        controllers.SecurityController = SecurityController;
        angular.module('app')
            .controller(SecurityController.controllerId, SecurityController);
    })(controllers = app.controllers || (app.controllers = {}));
})(app || (app = {}));
