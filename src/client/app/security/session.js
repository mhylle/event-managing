/* jshint -W040 */
/**
 * Created by mhylle on 11-12-2015.
 */
(function () {
    'use strict';

    angular
        .module('eventmanaging.security')
        .service('Session', Session);

    Session.$inject = [];

    /* @ngInject */
    function Session() {
        this.create = create;
        this.destroy = destroy;

        ////////////////
        function create(sessionId, user, userRole) {
            this.id = sessionId;
            this.user = user;
            this.userRole = userRole;
        }

        function destroy() {
            this.id = null;
            this.user = null;
            this.userRole = null;
        }
    }
})();

