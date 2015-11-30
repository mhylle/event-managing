/**
 * Created by mhylle on 30-11-2015.
 */
module schema.user {
    'use strict';

    angular.module('schema.user', [
        'ui.router',
        'blocks.logger'
    ]).config(['$stateProvider', configuration]);

    function configuration($stateProvider) {
        $stateProvider
            .state('users', {
                url: '/users',
                templateUrl: 'app/users/users.html',
                access: {allowAnonymous: false}
            })
            .state('users.list', {
                url: '/list',
                templateUrl: 'app/users/list/userlist.html',
                access: {allowAnonymous: false}
            })
            .state('users.create', {
                url: '/create',
                templateUrl: 'app/users/create/createUser.html',
                access: {allowAnonymous: false}
            })
    }
}
