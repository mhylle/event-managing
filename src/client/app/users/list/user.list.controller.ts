/////<reference path="../../../../../tools/typings/angularjs/angular.d.ts"/>
/////<reference path="../../common/logger/logger.ts"/>
///**
// * @ngdoc controller
// * @name UserListController
// *
// * @description
// * _Please update the description and dependencies._
// *
// * @requires $scope
// * */
//module schema.user.controllers {
//    import IUserService = schema.user.services.IUserService;
//
//    export class UserListController implements IUserListController {
//
//        static controllerId = 'UserListController';
//        title:string;
//        userList:IUser[];
//        private $q:ng.IQService;
//        static $inject = ['logger', 'userservice', '$q'];
//        errorMessage:string;
//
//        /* @ngInject */
//        constructor(private logger:schema.logger.ILogger, private userService:IUserService) {
//            this.init();
//        }
//
//        private init() {
//            this.title = 'Users';
//            this.activate();
//        }
//
//        activate():void {
//            this.logger.info('Activated User View');
//        }
//
//        users():void {
//            var that = this;
//            this.logger.info('calling users');
//            this.userList = null;
//            this.userService.users()
//                .then(response => {
//                    if (response) {
//                        // if there was an error we will have a status code. that we can then use to show the error.
//                        // if there is no status code it means that we successfully retrieved the data.
//                        if (response.status) {
//                            that.logger.error('Got an error while trying to retrieve users. Code: ' + response.status + ' , Message: ' + response.data)
//                            that.userList = [];
//                            that.errorMessage = response.data;
//                        } else {
//                            that.logger.info('Successfully called the users service.');
//                            that.userList = response;
//                        }
//                    } else {
//                        that.logger.info('Could not retrieve user list.');
//                        that.userList = null;
//                    }
//                });
//        }
//    }
//    angular.module('schema.user')
//        .controller(UserListController.controllerId, UserListController);
//}
