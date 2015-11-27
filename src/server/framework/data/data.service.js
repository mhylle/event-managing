dataRepository = require('./data.repository.js')();
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

    function remove() {

    }
}
