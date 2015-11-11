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
module app.controllers {
    import ISecurityService = app.services.ISecurityService;
    export interface ISecurityController {
        title: string;
        username: string;
        password: string;
        loginStatus: string;
        activate: () => void;
        login: () => void;
    }

    export class SecurityController implements ISecurityController {
        static controllerId = 'SecurityController';
        title:string;
        username:string;
        password:string;
        loginStatus:string;

        static $inject = ['logger', 'securityservice'];
        private secService;
        /* @ngInject */
        constructor(private logger:app.blocks.ILogger, private securityService:ISecurityService) {
            this.secService = securityService;
            this.init();
        }

        private init() {
            this.title = 'Security';
            this.activate();
        }

        activate():void {
            this.logger.info('Activated Security View');
        }

        login():void {
            //this.logger.info('Logging in.');
            this.loginStatus = 'Logging in.';
            this.securityService.login(this.username, this.password).then(function(response) {
                if (response) {
                    this.loginStatus ='Successfully logged in';
                } else {
                    this.loginStatus =  'Failed login';
                }
            });
        }
    }
    angular.module('app')
        .controller(SecurityController.controllerId, SecurityController);
}
