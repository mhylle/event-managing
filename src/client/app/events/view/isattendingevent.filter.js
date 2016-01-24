(function () {
    'use strict';

    angular
        .module('event-managing-events')
        .filter('isattendingeventfilter', isattendingeventfilter);

    function isattendingeventfilter() {
        return isattendingeventfilterFilter;

        ////////////////

        function isattendingeventfilterFilter(event, user) {
            return event.users.indexOf(user) > -1;
        }
    }
})();
