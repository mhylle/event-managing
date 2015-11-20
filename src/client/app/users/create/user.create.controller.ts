///<reference path="../../../../../tools/typings/angularjs/angular.d.ts"/>
///<reference path="../../blocks/logger/logger.ts"/>
/**
 * @ngdoc controller
 * @name UserListController
 *
 * @description
 * _Please update the description and dependencies._
 *
 * @requires $scope
 * */
module app.controllers {
    import IUserService = app.services.IUserService;

    export class UserCreateController implements IUserCreateController {


        static controllerId = 'UserCreateController';
        title:string;

        private user: IUser;
        private $q:ng.IQService;
        static $inject = ['logger', 'userservice', '$q'];


        /* @ngInject */
        constructor(private logger:app.blocks.ILogger, private userService:IUserService) {
            this.init();
        }

        private init() {
            this.title = 'Users';
            this.activate();
        }

        activate():void {
            this.logger.info('Activated User View');
        }

        create():boolean {
            this.userService.createUser(this.user);
            return false;
        };

    }
    angular.module('app')
        .controller(UserCreateController.controllerId, UserCreateController);
}