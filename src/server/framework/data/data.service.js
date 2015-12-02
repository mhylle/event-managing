var dataRepository = require('./data.repository.js')();
module.exports = function () {
    var service = {
        save: save,
        get: get,
        remove: remove
    };
    return service;

    function save(element) {
        dataRepository.add(element);
    }

    function get() {
        return dataRepository.get();
    }

    function getGroup(id) {
        // something wrong here, figure out how to handle different object types in a proper, simple, but
        // generic manner.
        return dataRepository.getGroup(id);
    }

    function remove() {

    }
};
