/**
 * Created by mhylle on 30-11-2015.
 */
module eventmanaging.user {
    'use strict';

    angular.module('eventmanaging.user', [
        'ui.router',
        'eventmanaging',
        'eventmanaging.security'
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
            .state('users.view', {
                url: '/view/:id',
                templateUrl: 'app/users/view/user.html',
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
