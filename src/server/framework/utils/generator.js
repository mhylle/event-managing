/**
 * Created by mhylle on 29-11-2015.
 */
module.exports = function () {
    var service = {
        uniqueID: uniqueID
    };
    return service;

    function uniqueID() {
        function chr4() {
            return Math.random().toString(16).slice(-4);
        }

        return chr4() + chr4() +
            '-' + chr4() +
            '-' + chr4() +
            '-' + chr4() +
            '-' + chr4() + chr4() + chr4();
    }
};
