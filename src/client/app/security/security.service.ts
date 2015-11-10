///<reference path="../../../../tools/typings/angularjs/angular.d.ts"/>
module app.services {
    'use strict';
    export interface ISecurityService {
        login: (username:string, password:string) => boolean;
        isLoggedIn: (username:string, password:string) => boolean;
    }

    class SecurityService implements ISecurityService {
        static $inject = ['$http'];
        private httpService;

        /* @ngInject */
        constructor($http:ng.IHttpService) {
            this.httpService = $http;
        }


        login(username:string, password:string):boolean {
            this.httpService.get('/api/users').then(function (response) {
                //console.log(response.data);
                var data = response.data;
                for (var i = 0; i<data.length; i++) {
                    if (data[i].firstname === username && data[i].lastname === password) {
                        return true;
                    }

                }
            });
            return false;
        }

        isLoggedIn(username:string, password:string):boolean {
            return false;
        };

        static instance($http:ng.IHttpService):ISecurityService {
            return new SecurityService($http);
        }

        static serviceId = 'securityservice';

    }
    angular
        .module('app')
        .factory(SecurityService.serviceId, SecurityService.instance);
}
