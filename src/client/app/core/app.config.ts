///<reference path="../../../../tools/typings/angularjs/angular.d.ts"/>
/// <reference path="../../../../tools/typings/angularjs/angular-route.d.ts" />

'use strict';
angular.module('app', ['ngRoute'])
    .config([<any> '$locationProvider', '$routeProvider', function ($locationProvider: any, $routeProvider: any) {
    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/login', { templateUrl: 'security/login.html', controller: 'SecurityController' })
        .when('/users', { templateUrl: 'users/users.html', controller: 'UserController' })
        .when('/', { templateUrl: 'security/login.html', controller: 'SecurityController' })
        .otherwise({ redirectTo: '/login' });
}]);
