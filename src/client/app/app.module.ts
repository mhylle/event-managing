/////<reference path="../../../../tools/typings/angularjs/angular.d.ts"/>
///// <reference path="../../../../tools/typings/angularjs/angular-route.d.ts" />

module app {
    'use strict';

    angular.module('app', [
        'ui.router',
        'blocks.logger'
    ]).config(['$stateProvider', configuration]);

    /* applicationVersion */
    var applicationVersion : string;
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
            .state('users.list', {
                url: '/list',
                templateUrl: 'app/users/list/userlist.html'
            })
            .state('users.create', {
                url: '/create',
                templateUrl: 'app/users/create/createUser.html'
            })
            .state('home', {
                url: '/home',
                templateUrl: 'app/home.html'
            });
    }
}
