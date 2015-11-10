module app {

    import IUser = app.IUser;
    'use strict';

    class UserController {
        users:IUser[] = null;

        //static $inject = ['userService'];

        constructor() {
            class User implements IUser {
                id: number;
                firstName: string;
                lastName: string;
            }
            var user1: User = new User();
            user1.id=1;
            user1.firstName = "Martin";
            user1.lastName= "Hylleberg";
            var user2: User = new User();
            user1.id=2;
            user1.firstName = "Kirsten";
            user1.lastName= "Chirstensen";
            this.users = [user1, user2];
        }
        //constructor(userService:UserService) {
        //    userService.getUsers()
        //        .then((usrs:IUser[]) => {
        //            this.users = usrs;
        //        });
        //}
    }

    angular.module('app')
        .controller('UserController', UserController);
}
