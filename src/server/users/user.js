/**
 * Created by mhylle on 29-11-2015.
 */
var utils = require('../framework/utils/generator')

function user() {
    this.internalId = utils.uniqueID();
    this.publicId = '';
    this.nickname = '';
    this.firstname = '';
    this.lastname = '';
    this.username = '';

    this.salt = '';
    this.hash = '';

    // todo handle address section..
    this.address = '';
    this.mail = '';
    this.phone = '';
    this.isadmin = false;

    this.groups = [];
}
