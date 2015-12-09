/**
 * Created by mhylle on 08-12-2015.
 */
(function () {
    'use strict';

    angular
        .module('schema')
        .service('Session', Session);

    Session.$inject = [];

    /* @ngInject */
    function Session() {
        this.create = create;
        this.destroy = destroy;

        this.id = null;
        this.userId = null;
        this.userRole = null;
        ////////////////

        function create(sessionId, userId, userRole) {
            this.id = sessionId;// jshint ignore:line
            this.userId = userId;// jshint ignore:line
            this.userRole = userRole;// jshint ignore:line
        }

        function destroy() {
            this.id = null;// jshint ignore:line
            this.userId = null;// jshint ignore:line
            this.userRole = null;// jshint ignore:line
        }
    }
})();

