/**
 * Created by mah on 05-01-2016.
 */
'use strict';

var expect = require('chai').expect;
var userService = require('../src/server/users/user.service');

describe('#securitySvc', function () {
    it('return some users', function () {
        var result = userService.getUsers();
        expect(result).to.be.defined;
    });
});