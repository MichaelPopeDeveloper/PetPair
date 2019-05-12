"use strict";
exports.__esModule = true;
var User_1 = require("../models/User");
var Encryptor = require("../helper/Encryptor");
var UserController = (function () {
    function UserController() {
    }
    UserController.checkUser = function (req, res) {
        var user = Object.assign({}, req.user._doc);
        delete user.password;
        delete user._id;
        console.log('assign user', user);
        res.send({ user: user });
    };
    UserController.Login = function (req, res) {
        var user = Object.assign({}, req.user._doc);
        delete user.password;
        delete user._id;
        console.log('assign user', user);
        res.send({ user: user });
    };
    UserController.Signup = function (req, res) {
        var user = Object.assign({}, req.user._doc);
        delete user.password;
        delete user._id;
        console.log('assign user', user);
        res.send({ user: user });
    };
    UserController.SignupMiddleware = function (req, res, next) {
        var _a = req.body, username = _a.username, email = _a.email, password = _a.password;
        return User_1.User.findOne({ username: username })
            .then(function (user) {
            if (!user) {
                var newUser = new User_1.User({ username: username, email: email, password: Encryptor.encryptString(password) });
                return newUser.save()
                    .then(function () { return next(); })["catch"](function (err) { return console.log(err); });
            }
            console.log('username already exists');
            return res.send({ error: 'Username already exists' });
        })["catch"](function (error) { return res.send(error); });
    };
    UserController.Logout = function (req, res) {
        req.session.destroy(null);
        res.clearCookie('connect.sid');
        console.log('logout user', req.user);
        return res.json({ msg: 'logged user out' });
    };
    return UserController;
}());
exports["default"] = UserController;
//# sourceMappingURL=UserController.js.map