/**
 * Created by mhylle on 29-11-2015.
 */
var utils = require('../framework/utils/generator');
module.exports = function () {
    var user =  {
        internalId : utils.uniqueID(),
        publicId : '',
        nickname : '',
        firstname : '',
        lastname :'',
        username : '',

        salt : '',
        hash : '',

        // todo handle address section..
        address : '',
        mail : '',
        phone : '',
        isadmin : false,

        groups : []
    };

    return user;
};
