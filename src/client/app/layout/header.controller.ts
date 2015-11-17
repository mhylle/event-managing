///<reference path="../../../../tools/typings/angularjs/angular.d.ts"/>
///<reference path="../blocks/logger/logger.ts"/>

module app.controllers {
    import ISecurityService = app.services.ISecurityService;

    export class HeaderController implements IHeaderController {

        static controllerId = 'HeaderController';
        username:string;

        static $inject = ['$scope', 'logger', 'securityservice'];
        private title:string;

        /* @ngInject */
        constructor(private $scope:ng.IScope, private logger:app.blocks.ILogger, private securityService:ISecurityService) {
            this.init();
        }

        private init() {
            this.title = 'Header';
            this.activate();
        }

        getUserName():string{
            return this.username;
        }
        private activate():void {
            var that = this;
            this.$scope.$watch(function () {
                that.logger.info('inside watch, token was: ' + that.securityService.getSecurityToken());
                return that.securityService.getSecurityToken();
            }, function (newVal, oldVal) {
                if (this.logger) {
                    this.logger.info('watch triggered..')
                }
                if (typeof newVal !=='undefined') {
                    that.username = newVal;
                } else {
                    that.username = 'Not logged in.';
                }

            });
        }
    }

    angular.module('app')
        .controller(HeaderController.controllerId, HeaderController);

}
