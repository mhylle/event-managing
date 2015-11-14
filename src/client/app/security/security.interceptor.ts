/////<reference path="../../../../tools/typings/angularjs/angular.d.ts"/>
//module app.interceptors {
//    'use strict';
//    export interface ISecurityInterceptor {
//
//    }
//
//    class SecurityInterceptor implements ISecurityInterceptor {
//        static $inject = ['$window'];
//        private $window:any;
//        private userInfo:any;
//
//        /* @ngInject */
//        constructor($window:any) {
//            this.$window = $window;
//            var sessionInjector = {
//                request: function (config) {
//                    config.headers['accessToken'] = $window.sessionStorage["userInfo"];
//                    return config;
//                }
//            };
//            return sessionInjector;
//        }
//
//        static instance($window:any):ISecurityInterceptor {
//            return new SecurityInterceptor($window);
//        }
//
//        static serviceId = 'securityinterceptor';
//
//    }
//    angular
//        .module('app')
//        .factory(SecurityInterceptor.serviceId, SecurityInterceptor.instance);
//}
