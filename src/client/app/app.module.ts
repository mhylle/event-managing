/////<reference path="../../../../tools/typings/angularjs/angular.d.ts"/>
///// <reference path="../../../../tools/typings/angularjs/angular-route.d.ts" />

module app {
    'use strict';

    angular.module('app', [
        'ui.router',
        'blocks.logger'
    ]).config(['$stateProvider', configuration]);

    function configuration($stateProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'app/security/login.html'
            })
            .state('users', {
                url: '/users',
                templateUrl: 'app/users/users.html'
            })
            .state('users.create', {
                url: '/users.create',
                templateUrl: 'app/users/createUser.html'
            })
            .state('home', {
                url: '/home',
                templateUrl: 'app/home.html'
            });
    }
}
