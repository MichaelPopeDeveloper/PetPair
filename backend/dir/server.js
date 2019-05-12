"use strict";
exports.__esModule = true;
var bodyParser = require("body-parser");
var express = require("express");
var session = require("express-session");
var passport = require("passport");
var logger = require("morgan");
var MainRoute_1 = require("./routes/MainRoute");
var UserRoute_1 = require("./routes/User/UserRoute");
var mongoose_1 = require("mongoose");
var Server = (function () {
    function Server() {
        this.port = process.env.PORT || 3001;
        this.dbName = 'pet-finder';
        this.app = express();
        this.config();
        this.routes();
        this.listen();
        this.api();
    }
    Server.bootstrap = function () {
        return new Server();
    };
    Server.prototype.api = function () {
    };
    Server.prototype.config = function () {
        this.app.use(logger('dev'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));
        this.app.use(session({
            secret: 'midoria-shonen',
            resave: false,
            saveUninitialized: false,
            cookie: {}
        }));
        this.app.use(passport.initialize());
        this.app.use(passport.session());
        mongoose_1.connect("mongodb://localhost:27017/" + this.dbName, { useNewUrlParser: true })
            .then(function () { return console.log('Connected to MongoDB'); })["catch"](function (err) { return console.log(err); });
    };
    Server.prototype.listen = function () {
        var _this = this;
        this.app.listen(this.port, function () {
            console.log("Listening on port " + _this.port);
        });
    };
    Server.prototype.routes = function () {
        this.app.use('/', MainRoute_1.MainRoute);
        this.app.use('/user', UserRoute_1.UserRoute);
    };
    return Server;
}());
exports.Server = Server;
//# sourceMappingURL=server.js.map