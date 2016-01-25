(function () {
    'use strict';

    angular
        .module('event-managing-events')
        .filter('isattendingeventfilter', isattendingeventfilter);

    function isattendingeventfilter() {
        return filterFunction;

        ////////////////
        function filterFunction(event, user) {
            if (!event) {
                throw new Error('You must specify an event for this filter to work.');
            }

            return event.users.filter(function (u) {
                    if (user) {
                        return u.id === user.id;
                    }
                }).length > 0;
        }
    }
})();
