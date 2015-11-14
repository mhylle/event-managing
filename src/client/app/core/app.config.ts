/////<reference path="../../../../tools/typings/angularjs/angular.d.ts"/>
///// <reference path="../../../../tools/typings/angularjs/angular-route.d.ts" />

module app {
    'use strict';

    function routes($routeProvider: ng.route.IRouteProvider) {
        $routeProvider
            .when('/login', {
                templateUrl: 'app/security/login.html',
                controller: 'SecurityController',
                controllerAs: 'vm'
            })
            .when('/users', {
                templateUrl: 'users/users.html',
                controller: 'UserController',
                controllerAs: 'vm'
            })
            .when('/', {
                templateUrl: 'security/login.html',
                controller: 'SecurityController',
                controllerAs: 'vm'
            })
            .otherwise({
                redirectTo: '/login'
            });
    }


    routes.$inject = ['$routeProvider'];

    angular.module('app').config(routes);
}
