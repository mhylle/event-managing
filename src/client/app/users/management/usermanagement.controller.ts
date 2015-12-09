///<reference path="../../../../../tools/typings/angularjs/angular.d.ts"/>
///<reference path="../../common/logger/logger.ts"/>
/**
 * @ngdoc controller
 * @name UserManagementController
 *
 * @description
 * _Please update the description and dependencies._
 *
 * @requires $scope
 * */
module schema.user.controllers {
    import IUserService = schema.user.services.IUserService;

    export class UserManagementController implements IUserManagementController {


        static controllerId = 'UserManagementController';
        title:string;
        private $q:ng.IQService;
        static $inject = ['logger', 'userservice', '$q'];

        private user: IUser;

        /* @ngInject */
        constructor(private logger:schema.ILogger, private userService:IUserService) {
            this.init();
        }

        private init() {
            this.title = 'Users';
            //user = new User();
            this.activate();
        }

        activate():void {
            this.logger.info('Activated User View');
        }

        create():void {

        };
        delete():void {

        };
        update():void {

        };

    }
    angular.module('schema.user')
        .controller(UserManagementController.controllerId, UserManagementController);
}
