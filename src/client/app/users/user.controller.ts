module userApp {

    'use strict';

    class UserController {
        users:IUser[] = null;

        static $inject = ['userApp.userService'];

        constructor(userService:UserService) {
            userService.getUsers()
                .then((usrs:IUser[]) => {
                    this.users = usrs;
                });
        }
    }

    angular.module('userApp')
        .controller('userApp.UserController', UserController);
}
