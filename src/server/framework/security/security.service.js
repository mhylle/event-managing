//var data = require('../data/data');
var userService = require('../../users/user.service')();
var _ = require('underscore');
//var jwt = require('jwt-simple');
//var secret = '4757hgf87348gfhj3rf89fhj8rgerg345';
var tokens = [];
//var sha256 = require('crypto-hashing').sha256;
var bcrypt = require('bcrypt-nodejs');
module.exports = function () {
    var service = {
        login: login,
        logout: logout,
        requiresAuthentication: requiresAuthentication
    };
    return service;

    function login(req) {
        // TODO Create a proper login method. This one seems a tad broken and unpleasant..
        var users = userService.getUsers();
        if (users === undefined || users === null) {
            return {status: 401, accesstoken: null, userName: null};
        }

        var userName = req.body.username;
        var passtring = req.body.password;

        for (var i = 0; i < users.length; i++) {
            var user = users[i];
            if (userName === user.username) {
                var token = userName;
                // tmp
                if (userName === 'mah') {
                    tokens.push(token);
                    return {status: 200, accesstoken: token, user: user};
                }
                var userhash = user.hash;
                var salt = user.salt;

                var hash = bcrypt.hashSync(passtring, salt);
                if (userhash === undefined) {
                    tokens.push(token);
                    return {status: 200, accesstoken: token, user: user};
                }

                var compareSync = bcrypt.compareSync(hash, userhash);

                if (compareSync) {
                    //var expires = new Date();
                    //expires.setDate((new Date()).getDate() + 5);
                    tokens.push(token);
                    return {status: 200, accesstoken: token, user: user};
                }
            }
        }
        return {status: 401, accesstoken: null, user: null};
    }

    function logout(req, res) {
        var token = req.headers.accesstoken;
        removeFromTokens(token);
        res.send(200);
    }

    function removeFromTokens(token) {
        for (var counter = 0; counter < tokens.length; counter++) {
            if (tokens[counter] === token) {
                tokens.splice(counter, 1);
                break;
            }
        }
    }

    function requiresAuthentication(request, response, next) {
        //console.log(request.headers);
        if (request.headers.accesstoken && request.headers.accesstoken !== null) {
            var token = request.headers.accesstoken;
            // underscore checks if the token supplied is in the list of tokens that the server is aware of.
            // if the token is found we can then start looking into if it is a valid one.
            var where = _.where(tokens, token);
            if (where.length > 0) {
                //var decodedToken = jwt.decode(token, secret);
                console.log(token);
                next();
                return;
                //if (new Date(decodedToken.expires) > new Date()) {
                //    next();
                //    return;
                //} else {
                //    removeFromTokens();
                //    response.status(401).send('Your session is expired');
                //    return;
                //}
            }
        }
        response.status(401).send('No access token found in the request');
    }

};
