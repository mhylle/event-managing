/**
 * Created by mah on 05-01-2016.
 */
'use strict';

var expect = require('chai').expect;
var _ = require('lodash');
var userService = require('./../server/users/user.service.js');

describe('#userService', function () {
    it('Should return some users', function () {

        if (!_.isUndefined(userService)) {
            var result1 = userService.users();
            expect(result1).to.be.defined;
            var result = userService.getUsers();
            expect(result).to.be.defined;
        } else {
            expect(false);
        }
    });
});
