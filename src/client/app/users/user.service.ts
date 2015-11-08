module userApp {
    export interface IUser {
        id: number;
        firstName: string;
        lastName: string;
    }

    export class UserService {
        static $inject = ['$http'];

        constructor(private $http:ng.IHttpService) {
        }

        getUsers():ng.IPromise<IUser[]> {
            return this.$http.get('users.json').then(response => {
                return response.data;
            });
        }
    }

    angular.module('userApp')
        .service('userApp.UserService', UserService);
}
