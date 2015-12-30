/**
 * Created by mhylle on 30-11-2015.
 */
module eventmanaging.group {
    'use strict';

    angular.module('eventmanaging.group', [
        'ui.router',
        'eventmanaging.logger'
    ]).config(['$stateProvider', configuration]);

    function configuration($stateProvider) {
        $stateProvider
            .state('groups', {
                url: '/groups',
                templateUrl: 'app/groups/groups.html',
                access: {allowAnonymous: false}
            })
            .state('groups.list', {
                url: '/list',
                templateUrl: 'app/groups/list/grouplist.html',
                access: {allowAnonymous: false}
            })
            .state('groups.create', {
                url: '/create',
                templateUrl: 'app/groups/create/createGroup.html',
                access: {allowAnonymous: false}
            })
    }
}
