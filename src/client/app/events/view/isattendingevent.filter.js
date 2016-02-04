(function () {
    'use strict';

    angular
        .module('event-managing-events')
        .filter('isattendingeventfilter', isattendingeventfilter);

    isattendingeventfilter.$inject = ['lodash'];

    function isattendingeventfilter(lodash) {
        return filterFunction;

        ////////////////
        function filterFunction(event, user) {
            if (!event) {
                throw new Error('You must specify an event for this filter to work.');
            }

            if (!user) {
                return false;
            }

            if (event.users === undefined || event.users === null || event.users.length === 0) {
                return false;
            }

            var find = lodash.find(event.users, {id: user.id});
            return find === undefined ? false : true;
        }
    }
})();
