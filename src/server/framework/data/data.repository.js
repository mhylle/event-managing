/**
 * Created by mhylle on 21-11-2015.
 */

var seededData = require('./data');
var data = [];
module.exports = function () {

    var service = {
        add: add,
        get: get,
        remove: remove
    };
    return service;


    function add(element) {
        data.push(element);
    }

    function remove(element) {
        data.remove(element);
    }

    function get() {
        if (data.length > 0) {
            return data;
        } else {
            return seededData;
        }
    }
};
