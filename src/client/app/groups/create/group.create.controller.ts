///<reference path="../../../../../tools/typings/angularjs/angular.d.ts"/>
///<reference path="../../../../../tools/typings/toastr/toastr.d.ts"/>
///<reference path="../../blocks/logger/logger.ts"/>
/**
 * @ngdoc controller
 * @name GroupListController
 *
 * @description
 * _Please update the description and dependencies._
 *
 * @requires $scope
 * */
module schema.group.controllers {
    import IGroupService = schema.group.services.IGroupService;

    export class GroupCreateController implements IGroupCreateController {

        static controllerId = 'GroupCreateController';
        title:string;

        private group: IGroup;
        private $q:ng.IQService;
        static $inject = ['logger', 'groupservice', '$q'];


        /* @ngInject */
        constructor(private logger:app.blocks.ILogger, private groupService:IGroupService) {
            this.init();
        }

        private init() {
            this.title = 'Groups';
            this.activate();
        }

        activate():void {
            this.logger.info('Activated Group View');
        }

        create():boolean {
            this.groupService.createGroup(this.group);
            //this.toastr.info('Group ' + this.group + ' created!');
            return false;
        };

    }
    angular.module('schema.group')
        .controller(GroupCreateController.controllerId, GroupCreateController);
}
