///<reference path="../../../../tools/typings/angularjs/angular.d.ts"/>
module app.services {
    'use strict';
    export interface ISecurityService {
        login: (username:string, password:string) => ng.IPromise<boolean>;
        logout: () =>void;
        isLoggedIn: (username:string, password:string) => boolean;
    }

    class SecurityService implements ISecurityService {

        static $inject = ['$http', '$q', '$window'];
        private $http:ng.IHttpService;
        private $q:ng.IQService;
        private $window:any;

        private userInfo:any;

        /* @ngInject */
        constructor($http:ng.IHttpService, $q:ng.IQService, $window:any) {
            this.$http = $http;
            this.$q = $q;
            this.$window = $window;
        }


        login(username:string, password:string):ng.IPromise<any> {
            var defer = this.$q.defer();
            var that = this;
            this.$http.post('/api/login', {userName: username, password: password}).then(function (response) {
                that.userInfo = {
                    accessToken: response.data.accesstoken,
                    userName: response.data.userName
                };
                that.$window.sessionStorage["userInfo"] = JSON.stringify(that.userInfo);

                return defer.resolve(that.userInfo);
            }, function (error) {
                defer.reject(error);
            });
            return defer.promise;
        }

        logout() : void {
            this.$http.get('/api/logout').then(function (response) {

            });
        }
        isLoggedIn(username:string, password:string):boolean {
            return false;
        };

        static instance($http:ng.IHttpService, $q:ng.IQService, $window:any):ISecurityService {
            return new SecurityService($http, $q, $window);
        }

        static serviceId = 'securityservice';

    }
    angular
        .module('app')
        .factory(SecurityService.serviceId, SecurityService.instance);
}
