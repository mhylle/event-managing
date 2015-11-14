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

        static serviceId = 'userservice';

    }
    angular
        .module('app')
        .factory(UserService.serviceId, UserService.instance);
}
