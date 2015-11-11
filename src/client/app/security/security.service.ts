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

        /* @ngInject */
        constructor($http:ng.IHttpService, $q:ng.IQService) {
            this.$http = $http;
            this.$q = $q;

        }

        login(username:string, password:string):ng.IPromise {
            var defer = this.$q.defer();
            this.$http.get('/api/users').then(function (response) {
                var data = response.data;

                for (var i = 0; i<data.length; i++) {
                    if (data[i].firstname === username && data[i].lastname === password) {
                        return defer.resolve(true);
                    }
                }
                return defer.resolve(false);
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
