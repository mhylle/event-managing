/**
 * Created by mhylle on 30-11-2015.
 */
module schema.user {
    'use strict';

    angular.module('schema.user', [
        'ui.router',
        'schema'
    ]).config(['$stateProvider', 'USER_ROLES', configuration]);

    function configuration($stateProvider, USER_ROLES) {
        $stateProvider
            .state('users', {
                url: '/users',
                templateUrl: 'app/users/users.html',
                data: {
                    authorizedRoles: [USER_ROLES.user]
                }
            })
            .state('users.list', {
                url: '/list',
                templateUrl: 'app/users/list/userlist.html',
                data: {
                    authorizedRoles: [USER_ROLES.user]
                }
            })
            .state('users.create', {
                url: '/create',
                templateUrl: 'app/users/create/createUser.html',
                data: {
                    authorizedRoles: [USER_ROLES.editor]
                }
            })
    }
}
