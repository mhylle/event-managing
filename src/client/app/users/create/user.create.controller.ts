///<reference path="../../../../../tools/typings/angularjs/angular.d.ts"/>
///<reference path="../../../../../tools/typings/toastr/toastr.d.ts"/>
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
module schema.user.controllers {
    import IUserService = schema.user.services.IUserService;

    export class UserCreateController implements IUserCreateController {

        static controllerId = 'UserCreateController';
        title:string;

        private user: IUser;
        private $q:ng.IQService;
        static $inject = ['schema.logger', 'userservice', '$q'];


        /* @ngInject */
        constructor(private logger:schema.ILogger, private userService:IUserService) {
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
            //this.toastr.info('User ' + this.user + ' created!');
            return false;
        };

    }
    angular.module('schema.user')
        .controller(UserCreateController.controllerId, UserCreateController);
}
