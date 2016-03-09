/* jshint -W040 */
/**
 * Created by mhylle on 11-12-2015.
 */
(function () {
    'use strict';

    angular
        .module('event-managing-security')
        .service('Session', Session);

    Session.$inject = [];

    /* @ngInject */
    function Session() {
        var session = this;
        session.id  = null;
        session.user = null;
        session.userRoles = null;

        this.create = create;
        this.destroy = destroy;

        ////////////////
        function create(sessionId, user, userRoles) {
            session.id = sessionId;
            session.user = user;
            session.userRoles = userRoles;
        }

        function destroy() {
            session.id = null;
            session.user = null;
            session.userRoles = null;
        }
    }
})();

