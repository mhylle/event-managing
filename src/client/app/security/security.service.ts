///<reference path="../../../../tools/typings/angularjs/angular.d.ts"/>
module app.services {
    'use strict';
    export interface ISecurityService {
        login: (username:string, password:string) => ng.IPromise<boolean>;
        isLoggedIn: (username:string, password:string) => boolean;
    }

    class SecurityService implements ISecurityService {
        static $inject = ['$http', '$q'];
        private $http;
        private $q:ng.IQService;

        private userInfo:any;

        /* @ngInject */
        constructor($http:ng.IHttpService, $q:ng.IQService) {
            this.$http = $http;
            this.$q = $q;
        }


        login(username:string, password:string):ng.IPromise<any> {
            var defer = this.$q.defer();
            var that = this;
            this.$http.post('/api/login', {userName: username, password: password}).then(function (response) {
                that.userInfo = {
                    accessToken: response.data.accessToken,
                    userName: response.data.userName
                };

                return defer.resolve(that.userInfo);
            }, function (error) {
                defer.reject(error);
            });
            return defer.promise;
        }

        isLoggedIn(username:string, password:string):boolean {
            return false;
        };

        static instance($http:ng.IHttpService, $q:ng.IQService):ISecurityService {
            return new SecurityService($http, $q);
        }

        static serviceId = 'securityservice';

    }
    angular
        .module('app')
        .factory(SecurityService.serviceId, SecurityService.instance);
}
