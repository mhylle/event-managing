///<reference path="../../../../tools/typings/angularjs/angular.d.ts"/>
module schema.group.services {
    import IGroup = schema.group.controllers.IGroup;
    'use strict';
    export interface IGroupService {
        groups: () => ng.IPromise<IGroup[]>;
        createGroup(group:IGroup):ng.IPromise<boolean>;
    }

    class GroupService implements IGroupService {
        static serviceId = 'groupservice';
        static $inject = ['$http', '$q', '$window'];
        private $http;
        private $q:ng.IQService;
        private $window:any;

        /* @ngInject */
        constructor($http:ng.IHttpService, $q:ng.IQService, $window:any) {
            this.$http = $http;
            this.$q = $q;
            this.$window = $window;
        }

        static instance($http:ng.IHttpService, $q:ng.IQService, $window:any):IGroupService {
            return new GroupService($http, $q, $window);
        }

        groups():ng.IPromise<any> {
            var defer = this.$q.defer();
            this.$http.get('/api/groups')
                .then(response => {
                    var data = response.data;
                    return defer.resolve(data);
                })
                .catch(error => {
                    return defer.resolve(error);
                });
            return defer.promise;
        }

        createGroup(group:schema.group.controllers.IGroup):ng.IPromise<boolean> {
            var defer = this.$q.defer();
            this.$http.post('/api/groups/', group)
                .then(response => {
                    defer.resolve(true);
                }).catch(error => {
                defer.resolve(false);
            });
            return defer.promise;
        }

    }
    angular
        .module('schema.group')
        .factory(GroupService.serviceId, GroupService.instance);
}
