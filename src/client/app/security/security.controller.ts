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
module app.controllers {
    export interface ISecurityController {
        title: string;
        username: string;
        password: string;
        status: string;
        activate: () => void;
        login: () => void;
    }

    export class SecurityController implements ISecurityController {
        static controllerId = 'SecurityController';
        title:string;
        username:string;
        password:string;
        status:string;


        static $inject = ['$log'];
        /* @ngInject */
        constructor(private $log:any) {
            this.init();
        }

        private init() {
            this.title = 'Security';
            this.activate();
        }

        activate():void {
            this.$log.info('Activated Security View');
            //this.logger.info('Activated Security View');
        }

        login():void {
            this.status = 'Logging in.'
            if (this.username === 'mah' && this.password === 'mah') {
                this.status = 'Login Successful.';
            } else {

                this.status = 'Login Failed';
            }
        }
    }
    angular.module('app')
        .controller(SecurityController.controllerId, SecurityController);
}
