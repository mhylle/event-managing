/////<reference path="../../../../tools/typings/angularjs/angular.d.ts"/>
///// <reference path="../../../../tools/typings/angularjs/angular-route.d.ts" />

module schema {
    'use strict';

    angular.module('schema', [
        'ui.router',
        'schema.security',
        'schema.user',
        'schema.group'
    ]).config(['$stateProvider', configuration]);

    /* applicationVersion */
    var applicationVersion:string;

    function configuration($stateProvider, USER_ROLES) {

        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'app/security/login.html',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
                }
            })
            .state('home', {
                url: '/home',
                templateUrl: 'app/home.html',
                access: {allowAnonymous: true}
            });
    }
}
