///<reference path="../../../../tools/typings/angularjs/angular.d.ts"/>
///<reference path="../blocks/logger/logger.ts"/>
/**
 * @ngdoc controller
 * @name HeaderController
 *
 * @description
 * The header controller is currently responsible for listening to login/logout events and makes sure that
 * the current username can be displayed in the header.
 *
 * @requires $scope
 * */
module schema.controllers {
    import ISecurityService = schema.security.services.ISecurityService;

    export class HeaderController implements IHeaderController {

        static controllerId = 'HeaderController';
        username:string;

        static $inject = ['$scope', 'logger', 'securityservice'];
        private title:string;

        /* @ngInject */
        constructor(private $scope:ng.IScope, private logger:schema.blocks.ILogger, private securityService:ISecurityService) {
            this.init();
        }

        private init() {
            this.title = 'Header';
            this.activate();
        }

        private activate():void {
            var that = this;
            this.$scope.$watch(function () {
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

    angular.module('schema')
        .controller(HeaderController.controllerId, HeaderController);

}
