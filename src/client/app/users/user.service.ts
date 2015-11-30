///<reference path="../../../../tools/typings/angularjs/angular.d.ts"/>
module schema.user.services {
    import IUser = schema.user.controllers.IUser;
    'use strict';
    export interface IUserService {
        users: () => ng.IPromise<IUser[]>;
        createUser(user:IUser):ng.IPromise<boolean>;
    }

    class UserService implements IUserService {
        static serviceId = 'userservice';
        static $inject = ['$http', '$q', '$window'];
        private $http;
        private $q:ng.IQService;
        private $window:any;

        /* @ngInject */
        constructor($http:ng.IHttpService, $q:ng.IQService, $window:any) {
            this.$http = $http;
            this.$q = $q;
            this.$window = $window;
        }

        static instance($http:ng.IHttpService, $q:ng.IQService, $window:any):IUserService {
            return new UserService($http, $q, $window);
        }

        users():ng.IPromise<any> {
            var defer = this.$q.defer();
            this.$http.get('/api/users')
                .then(response => {
                    var data = response.data;
                    return defer.resolve(data);
                })
                .catch(error => {
                    return defer.resolve(error);
                });
            return defer.promise;
        }

        createUser(user:schema.user.controllers.IUser):ng.IPromise<boolean> {
            var defer = this.$q.defer();
            this.$http.post('/api/users/', user)
                .then(response => {
                    defer.resolve(true);
                }).catch(error => {
                defer.resolve(false);
            });
            return defer.promise;
        }

    }
    angular
        .module('schema.user')
        .factory(UserService.serviceId, UserService.instance);
}
