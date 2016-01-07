/**
 * Created by mah on 05-01-2016.
 */
'use strict';

var expect = require('chai').expect;
var userService = require('./user.service');

describe('#userService', function () {
    it('Should return some users', function () {
        var result1 = userService.users();
        expect(result1).to.be.defined;
        var result = userService.getUsers();
        expect(result).to.be.defined;
    });
});
