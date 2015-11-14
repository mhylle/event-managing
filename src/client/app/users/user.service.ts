///<reference path="../../../../tools/typings/angularjs/angular.d.ts"/>
module app.services {
    import IUser = app.controllers.IUser;
    'use strict';
    export interface IUserService {
        users: () => ng.IPromise<IUser[]>;
    }

    class UserService implements IUserService {
        users():ng.IPromise<any> {
            var defer = this.$q.defer();
            this.$http.get('/api/users')
                .then(function (response) {
                    var data = response.data;
                    return defer.resolve(data);
                })
                .catch(function (error) {
                    return defer.resolve(error);
                });
            return defer.promise;
        }

        static $inject = ['$http', '$q'];
        private $http;
        private $q:ng.IQService;

        /* @ngInject */
        constructor($http:ng.IHttpService, $q:ng.IQService) {
            this.$http = $http;
            this.$q = $q;

        }

        static instance($http:ng.IHttpService, $q:ng.IQService):IUserService {
            return new UserService($http, $q);
        }

        static serviceId = 'userservice';

    }
    angular
        .module('app')
        .factory(UserService.serviceId, UserService.instance);
}
