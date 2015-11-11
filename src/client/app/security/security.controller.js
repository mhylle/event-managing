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
                this.loginStatus = 'Logging in.';
                this.logger.info('Logging in');
                var that = this;
                this.securityService.login(this.username, this.password).then(function (response) {
                    that.logger.info('Inside promise');
                    if (response) {
                        that.logger.info('Successfully logged in.');
                        that.loginStatus = 'Successfully logged in.';
                    }
                    else {
                        that.logger.info('Failed login.');
                        that.loginStatus = 'Failed login.';
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
