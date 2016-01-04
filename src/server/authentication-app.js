/*jshint node:true*/
'use strict';

var express = require('express'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    session = require('express-session'),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    TwitterStrategy = require('passport-twitter'),
    GoogleStrategy = require('passport-google'),
    FacebookStrategy = require('passport-facebook');

var app = express();

app.use(logger('combined'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json);
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(session({secret: 'haidaki', saveUninitialized: true, resave: true}));
app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
    var err = req.session.error,
        msg = req.session.notice,
        success = req.session.success;

    delete req.session.error;
    delete req.session.success;
    delete req.session.notice;

    if (err) {
        res.locals.error = err;
    }
    if (msg) {
        res.locals.notice = msg;
    }

    if (success) {
        res.locals.success = success;
    }

    next();
});

var port = process.env.PORT || 5000;
app.listen(port);
console.log('Listening on ' + port + '!');
