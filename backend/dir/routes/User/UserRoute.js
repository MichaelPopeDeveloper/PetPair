"use strict";
exports.__esModule = true;
var express = require("express");
var UserController_1 = require("../../controllers/UserController");
var passport = require('../../config/passport');
var CheckIfSessionActive = function (req, res, next) {
    if (req.user)
        return next();
    return res.status(401).send({ msg: 'User session is not active' });
};
var LogRequestUser = function (req, res) { return console.log('req.user', req.user); };
exports.UserRoute = express.Router();
exports.UserRoute.use(LogRequestUser);
exports.UserRoute.get('/', CheckIfSessionActive, UserController_1["default"].checkUser);
exports.UserRoute.post('/login', passport.authenticate('local'), CheckIfSessionActive, UserController_1["default"].Login);
exports.UserRoute.post('/signup', UserController_1["default"].SignupMiddleware, passport.authenticate('local'), CheckIfSessionActive, UserController_1["default"].Signup);
exports.UserRoute.post('/logout', CheckIfSessionActive, UserController_1["default"].Logout);
//# sourceMappingURL=UserRoute.js.map