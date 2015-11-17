///<reference path="../../../../tools/typings/angularjs/angular.d.ts"/>
///<reference path="../blocks/logger/logger.ts"/>

module app.controllers {
    import ISecurityService = app.services.ISecurityService;

    export class HeaderController implements IHeaderController {
        static controllerId = 'HeaderController';
        username:string;

        static $inject = ['$scope','logger', 'securityservice'];
        private title:string;

        /* @ngInject */
        constructor(private $scope: ng.IScope,  private logger:app.blocks.ILogger, private securityService:ISecurityService) {
            this.init();
        }

        private init() {
            this.title = 'Header';
            this.activate();
        }

        private activate():void {
           this.$scope.$watch(this.securityService.getSecurityToken(), function () {
                this.username = this.securityService.getSecurityToken();
            });
            this.username = this.securityService.getSecurityToken();
        }
    }

    angular.module('app')
        .controller(HeaderController.controllerId, HeaderController);

}
