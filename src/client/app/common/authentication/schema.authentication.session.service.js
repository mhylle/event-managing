/**
 * Created by mhylle on 08-12-2015.
 */
(function () {
    'use strict';

    angular
        .module('schema.authentication')
        .service('Session', Session);

    Session.$inject = [];

    /* @ngInject */
    function Session() {
        this.create = create;
        this.destroy = destroy;

        ////////////////

        function create(sessionId, userId, userRole) {
            this.id = sessionId;
            this.userId = userId;
            this.userRole = userRole;
        }

        function destroy() {
            this.id = null;
            this.userId = null;
            this.userRole = null;
        }
    }
})();

