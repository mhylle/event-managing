var four0four = require('../utils/404')();

var data = require('../data');
module.exports = function () {
    var user = {
        internalId: '',
        publicId: '',
        nickname: '',
        firstname: '',
        lastname: '',
        username: '',
        passstring: '',
        address: address,
        mail: '',
        phone: ''
    };

    var address = {
        street: '',
        zip: ''
    };

    var service = {
        getUsers: getUsers,
        getUser: getUser,
        saveUser: saveUser
    };
    return service;

    function getUsers(req, res, next) {
        console.log('getusers start');
        res.status(200).send(data.users);
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

        // todo Create ID utility --> DB Responsibility, does it have to be assigned?
        user.internalId = req.body.internalId;
        user.publicId = req.body.publicId;
        user.nickname = req.body.nickname;
        user.firstname = req.body.firstname;
        user.lastname = req.body.lastname;
        user.username = req.body.username;

        // todo Create the passtring based on the password that we received.
        user.passstring = req.body.passstring;

        // todo handle address section..
        user.address = req.body.address;
        user.mail = req.body.mail;
        user.phone = req.body.phone;

        console.log(user);
    }
};
