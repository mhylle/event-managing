var data = require('../data');
var _ = require('underscore');
var jwt = require('jwt-simple');
var secret = '4757hgf87348gfhj3rf89fhj8rgerg345';
var tokens = [];
var sha256 = require('crypto-hashing').sha256;
module.exports = function () {
    var service = {
        login: login,
        logout: logout,
        logout: logout,
        requiresAuthentication: requiresAuthentication
    };
    return service;

    function login(req, res, next) {
        var userName = req.body.userName;
        var passtring = req.body.passtring;
        var salt = req.body.salt;
        var hash = req.body.hash;
        var users = data.users;
        var foundUser = false;
        for (var i = 0; i < users.length; i++) {
            var user = users[i];
            if (userName === user.username) {
                var saltedpass = salt + passtring;
                var hashedsalt = sha256(saltedpass);

                if (hashedsalt === hash) {
                    //var expires = new Date();
                    //expires.setDate((new Date()).getDate() + 5);
                    var token = userName;

                    tokens.push(token);
                    foundUser = true;
                    res.send(200, {accesstoken: token, userName: userName});
                    return;
                }
            }
        }
        res.send(401, 'Invalid Credentials');
    }

    function logout(req, res, description) {
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
