/////<reference path="../../../../tools/typings/angularjs/angular.d.ts"/>
///// <reference path="../../../../tools/typings/angularjs/angular-route.d.ts" />

module app {
    'use strict';

    angular.module('app', [
        'ui.router',
        'blocks.logger',
        'schema.user',
        'schema.group'
    ]).config(['$stateProvider', configuration]);
    //.config(toastrConfig);

    //function toastrConfig(toastr: Toastr) {
        //toastr.options.timeOut = 4000;
        //toastr.options.positionClass = 'toastr-bottom-right';
    //}

    /* applicationVersion */
    var applicationVersion : string;
    function configuration($stateProvider) {

        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'app/security/login.html',
                access: {allowAnonymous: true}
            })
            .state('home', {
                url: '/home',
                templateUrl: 'app/home.html',
                access: {allowAnonymous: true}
            });
    }
}
