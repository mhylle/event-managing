var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.model('OAuthTokens', new Schema({
    accessToken: {type: String},
    accessTokenExpiresOn: {type: Date},
    clientId: {type: String},
    refreshToken: {type: String},
    refreshTokenExpiresOn: {type: Date},
    userId: {type: String}
}));

mongoose.model('OAuthClients', new Schema({
    clientId: {type: String},
    clientSecret: {type: String},
    redirectUris: {type: Array}
}));

mongoose.model('OAuthUsers', new Schema({
    id: {type: Number},
    gender: {type: String},
    name: {
        firstname: {type: String},
        lastname: {type: String}
    },
    tmppass: {type: String},
    email: {type: String},
    birthday: {type: Date},
    avatar: {type: String},
    roles: {type: String},
    Groups: {type: Array}
}));

var OAuthTokensModel = mongoose.model('OAuthTokens');
var OAuthClientsModel = mongoose.model('OAuthClients');
var OAuthUsersModel = mongoose.model('OAuthUsers');

module.exports.getAccessToken = function (bearerToken) {
    console.log('in getAccessToken (bearerToken: ' + bearerToken + ')');
    return OAuthTokensModel.findOne({accessToken: bearerToken});
};

module.exports.getClient = function (clientId, clientSecret) {
    console.log('in getClient (clientId: ' + clientId + ', clientSecret: ' + clientSecret + ')');
    return OAuthClientsModel.findOne({clientId: clientId, clientSecret: clientSecret});
};

module.exports.getRefreshToken = function (refreshToken) {
    console.log('in getRefreshToken (refreshToken: ' + refreshToken + ')');
    return OAuthTokensModel.findOne({refreshToken: refreshToken});
};

module.exports.getUser = function (username, password) {
    console.log('in getUser (username: ' + username + ', password: ' + password + ')');
    return OAuthUsersModel.findOne({username: username, password: password});
};

module.exports.saveToken = function (token, client, user) {
    console.log('in saveToken (token: ' + token + ')');

    var accessToken = new OAuthTokensModel({
        accessToken: token.accessToken,
        accessTokenExpiresOn: token.accessTokenExpiresOn,
        clientId: client.id,
        refreshToken: token.refreshToken,
        refreshTokenExpiresOn: token.refreshTokenExpiresOn,
        userId: user.id
    });

    return accessToken.save();
};
