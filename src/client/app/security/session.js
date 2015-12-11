/* jshint -W040 */
/**
 * Created by mhylle on 11-12-2015.
 */
(function () {
    'use strict';

    angular
        .module('schema.security')
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

