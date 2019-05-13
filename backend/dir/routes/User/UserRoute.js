"use strict";
exports.__esModule = true;
var express = require("express");
var next = require("next");
var UserController_1 = require("../../controllers/User/UserController");
var MiddlewareController_1 = require("../../controllers/Middleware/MiddlewareController");
var PetFinderController_1 = require("../../controllers/API/PetFinder/PetFinderController");
var passport = require('../../config/passport');
var dev = process.env.NODE_ENV !== 'production';
var nextApp = next({ dev: dev });
var handle = nextApp.getRequestHandler();
exports.UserRoute = express.Router();
nextApp.prepare()
    .then(function () {
    exports.UserRoute.get('*', function (req, res) {
        return handle(req, res);
    });
    exports.UserRoute.use(MiddlewareController_1["default"].LogRequestUser);
    exports.UserRoute.get('/', MiddlewareController_1["default"].CheckIfSessionActive, UserController_1["default"].checkUser);
    exports.UserRoute.post('/login', passport.authenticate('local'), MiddlewareController_1["default"].CheckIfSessionActive, UserController_1["default"].Login);
    exports.UserRoute.post('/signup', UserController_1["default"].SignupMiddleware, passport.authenticate('local'), MiddlewareController_1["default"].CheckIfSessionActive, UserController_1["default"].Signup);
    exports.UserRoute.post('/logout', MiddlewareController_1["default"].CheckIfSessionActive, UserController_1["default"].Logout);
    exports.UserRoute.post('/petfinder', PetFinderController_1["default"].GetToken);
})["catch"](function (error) { return console.log(error); });
//# sourceMappingURL=UserRoute.js.map