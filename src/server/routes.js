/* W0116 */
var express = require('express');
var router = express.Router();
var jwt = require('jwt-simple');
var four0four = require('./utils/404')();
var data = require('./data');

var app = express();
app.set('jwtTokenSecret', '123456ABCDEF');

router.get('/users', requiresAuthentication, getUsers);
router.get('/user/:id', requiresAuthentication, getUser);
router.post('/login/', login);
router.post('/logout/', requiresAuthentication, logout);
router.get('/*', four0four.notFoundMiddleware);

module.exports = router;

var tokens = [];
//////////////

function login(req, res, next) {
    var userName = req.body.userName;
    var password = req.body.password;
    var users = data.users;
    var foundUser = false;
    for (var i=0;i<users.length; i++) {
        var user = users[i];
        if (userName === user.username) {
            if (password === user.passtring) {
                var expires = new Date();
                expires.setDate((new Date()).getDate() + 5);
                var token = jwt.encode({
                    userName: userName,
                    expires: expires
                }, app.get('jwtTokenSecret'));
                tokens.push(token);
                foundUser = true;
                res.send(200, {accessToken: token, userName: userName});
                break;
            }
        }
    }
    if (!foundUser) {
        res.send(401, 'Invalid Credentials');
    }
}

function logout(req, res, next) {
    var token = req.headers.accessToken;
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
    console.log(request.headers);
    if (request.headers.accessToken) {
        var token = request.headers.accessToken;
        if (_.where(tokens, token).length > 0) {
            var decodedToken = jwt.decode(token, app.get('jwtTokenSecret'));
            if (new Date(decodedToken.expires) > new Date()) {
                next();
                return;
            } else {
                removeFromTokens();
                response.status(401).send('Your session is expired');
                return;
            }
        }
    }
    response.status(401).send('No access token found in the request');
}

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
