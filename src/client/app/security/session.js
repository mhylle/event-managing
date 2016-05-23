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

        this.create = create;
        this.destroy = destroy;

        ////////////////
        function create(sessionId, user) {
            session.id = sessionId;
            session.user = user;
        }

        function destroy() {
            session.id = null;
            session.user = null;
        }
    }
})();

