/**
 * Created by mah on 05-01-2016.
 */
'use strict';

var expect = require('chai').expect;
var userService = require('../src/server/users/user.service');

describe('#userService', function () {
    it('Should return some users', function () {
        var result = userService.users();
        expect(result).to.be.defined;
    });
});
