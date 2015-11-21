/**
 * Created by mhylle on 21-11-2015.
 */
module.exports = function () {
    var service = {
        add: add,
        get: get,
        remove: remove
    };
    return service;
    var data = [];

    function add(element) {
        data.push(element);
    }

    function remove(element) {
        data.remove(element);
    }

    function get() {
        if (data.length > 0) {
            return data[0];
        }
    }
};
