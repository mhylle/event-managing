///<reference path="../../../../tools/typings/angularjs/angular.d.ts"/>
module schema.security.services {
    'use strict';
    export interface ISecurityService {
        login: (username:string, password:string) => ng.IPromise<boolean>;
        logout: () => ng.IPromise<boolean>;
        isLoggedIn: (username:string, password:string) => boolean;
        getSecurityToken:() => string;
    }

    class SecurityService implements ISecurityService {

        static $inject = ['$http', '$q', '$window', '$location'];
        private $http:ng.IHttpService;
        private $q:ng.IQService;
        private $window:any;

        private userInfo:any;
        public userName:string;

        /* @ngInject */
        constructor($http:ng.IHttpService, $q:ng.IQService, $window:any) {
            this.$http = $http;
            this.$q = $q;
            this.$window = $window;
        }


        login(username:string, password:string):ng.IPromise<any> {
            var defer = this.$q.defer();
            var that = this;
            this.$http.post('/api/login', {userName: username, password: password})
                .then(response => {
                    that.userInfo = {
                        accesstoken: response.data.accesstoken,
                        userName: response.data.userName,
                    };
                    that.userName = username;
                    that.$window.sessionStorage["userInfo"] = JSON.stringify(that.userInfo);

                    defer.resolve(that.userInfo);
                }, function (error) {
                    defer.reject(error);
                });
            return defer.promise;
        }

        getSecurityToken():string {
            var token:string;
            var userInfo = this.$window.sessionStorage["userInfo"];
            if (userInfo && userInfo != null) {
                var userInfoString = JSON.parse(userInfo);
                if (userInfoString != null) {
                    token = userInfoString.accesstoken;
                }
                return token;
            }
        }

        logout():ng.IPromise<any> {
            var defer = this.$q.defer();
            var that = this;
            this.$http.get('/api/logout')
                .then(response => {
                    that.$window.sessionStorage["userInfo"] = null;
                    defer.resolve();
                });
            return defer.promise;
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
        .module('schema.security')
        .factory(SecurityService.serviceId, SecurityService.instance);
}
