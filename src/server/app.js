/*jshint node:true*/
'use strict';

var fs = require('fs');
var http = require('http');
var https = require('https');

//var privateKey  = fs.readFileSync('sslcert/priv.pem', 'utf8');
//var certificate = fs.readFileSync('sslcert/cert.cer', 'utf8');

//var options = {
//    key: fs.readFileSync('sslcert/priv.pem'),
//    cert: fs.readFileSync('sslcert/cert.cer')
//};

var express = require('express');
var app = express();

// your express configuration here
//
var compression = require('compression');
var environment = process.env.NODE_ENV;
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var logger = require('morgan');
var port = process.env.PORT || 8001;
var helmet = require('helmet');
var four0four = require('./framework/utils/404')();

var session = require('express-session');
app.use(compression({filter: shouldCompress}));

var expiryDate = new Date( Date.now() + 60 * 60 * 1000 ); // 1 hour
app.use(session({
    name: 'session',
    keys: ['key1', 'key2'],
    cookie: { secure: true,
        httpOnly: true,
        domain: 'localhost',
        path: 'foo/bar',
        expires: expiryDate
    }
}));

app.use(helmet());
app.use(favicon(__dirname + '/favicon.ico'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(logger('dev'));
//
app.use('/api', require('./routes'));

console.log('About to crank up node');
console.log('PORT=' + port);
console.log('NODE_ENV=' + environment);

switch (environment){
    case 'build':
        console.log('** BUILD **');
        app.use(express.static('./build/'));
        // Any invalid calls for templateUrls are under app/* and should return 404
        app.use('/app/*', function(req, res, next) {
            four0four.send404(req, res);
        });
        // Any deep link calls should return index.html
        app.use('/*', express.static('./build/index.html'));
        break;
    default:
        console.log('** DEV **');
        app.use(express.static('./src/client/'));
        app.use(express.static('./'));
        app.use(express.static('./tmp'));
        // Any invalid calls for templateUrls are under app/* and should return 404
        app.use('/app/*', function(req, res, next) {
            four0four.send404(req, res);
        });
        // Any deep link calls should return index.html
        app.use('/*', express.static('./src/client/index.html'));
        break;
}

//var httpsServer = https.createServer(options, app);
var httpServer = http.createServer(app);
httpServer.listen(8001, function () {
    console.log('Express server listening on port ' + port);
    console.log('env = ' + app.get('env') +
        '\n__dirname = ' + __dirname  +
        '\nprocess.cwd = ' + process.cwd());
});
//httpsServer.listen(443);

function shouldCompress(req, res) {
    if (req.headers['x-no-compression']) {
        // don't compress responses with this request header
        return false
    }

    // fallback to standard filter function
    return compression.filter(req, res)
}
