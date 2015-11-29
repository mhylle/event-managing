var four0four = require('../framework/utils/404')();

var data = require('../framework/data/data');
var dataService = require('../framework/data/data.service')();
//var rand = require('csprng');
//var sha256 = require('crypto-hashing').sha256;
var bcrypt = require('bcrypt-nodejs');

module.exports = function () {

    var service = {
        getUsers: getUsers,
        getUser: getUser,
        saveUser: saveUser
    };
    return service;

    function getUsers() {
        console.log('getusers start');
        return dataService.get();
    }

    function getUser(req, res, next) {
        var id = +req.param.id;
        var user = data.users.filter(function (p) {
            return p.id === id;
        })[0];
        if (user) {
            res.status(200).send(user);
        } else {
            four0four.send404(req, res, 'user ' + id + ' not found');
        }
    }

    function saveUser(req, res, next) {

        var user = new user();
        // todo Create ID utility --> DB Responsibility, does it have to be assigned?
        user.internalId = req.body.internalId;
        user.publicId = req.body.publicId;
        user.nickname = req.body.nickname;
        user.firstname = req.body.firstname;
        user.lastname = req.body.lastname;
        user.username = req.body.username;

        user.salt = bcrypt.genSaltSync(req.body.password, 36);
        user.hash = bcrypt.hashSync(req.body.password, user.salt);

        // todo handle address section..
        user.address = req.body.address;
        user.mail = req.body.mail;
        user.phone = req.body.phone;
        user.isadmin = false;

        console.log(user);
        dataService.save(user);
    }
};
