///<reference path="../../../../../tools/typings/angularjs/angular.d.ts"/>
///<reference path="../../blocks/logger/logger.ts"/>
/**
 * @ngdoc controller
 * @name GroupManagementController
 *
 * @description
 * _Please update the description and dependencies._
 *
 * @requires $scope
 * */
module schema.group.controllers {
    import IGroupService = schema.group.services.IGroupService;

    export class GroupManagementController implements IGroupManagementController {


        static controllerId = 'GroupManagementController';
        title:string;
        private $q:ng.IQService;
        static $inject = ['logger', 'groupservice', '$q'];

        private group: IGroup;

        /* @ngInject */
        constructor(private logger:app.blocks.ILogger, private groupService:IGroupService) {
            this.init();
        }

        private init() {
            this.title = 'Groups';
            //group = new Group();
            this.activate();
        }

        activate():void {
            this.logger.info('Activated Group View');
        }

        create():void {

        };
        delete():void {

        };
        update():void {

        };

    }
    angular.module('schema.group')
        .controller(GroupManagementController.controllerId, GroupManagementController);
}
