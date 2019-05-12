"use strict";
exports.__esModule = true;
var express = require("express");
var UserController_1 = require("../../controllers/User/UserController");
var MiddlewareController_1 = require("../../controllers/Middleware/MiddlewareController");
var passport = require('../../config/passport');
exports.UserRoute = express.Router();
exports.UserRoute.use(MiddlewareController_1["default"].LogRequestUser);
exports.UserRoute.get('/', MiddlewareController_1["default"].CheckIfSessionActive, UserController_1["default"].checkUser);
exports.UserRoute.post('/login', passport.authenticate('local'), MiddlewareController_1["default"].CheckIfSessionActive, UserController_1["default"].Login);
exports.UserRoute.post('/signup', UserController_1["default"].SignupMiddleware, passport.authenticate('local'), MiddlewareController_1["default"].CheckIfSessionActive, UserController_1["default"].Signup);
exports.UserRoute.post('/logout', MiddlewareController_1["default"].CheckIfSessionActive, UserController_1["default"].Logout);
//# sourceMappingURL=UserRoute.js.map