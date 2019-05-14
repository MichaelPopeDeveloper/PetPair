"use strict";
exports.__esModule = true;
var MiddlewareController = (function () {
    function MiddlewareController() {
    }
    MiddlewareController.CheckIfSessionActive = function (req, res, next) {
        if (req.user)
            return next();
        return MiddlewareController.RedirectToLogin(req, res);
    };
    MiddlewareController.RedirectToLogin = function (req, res) {
        return res.redirect('/user/login');
    };
    MiddlewareController.LogRequestUser = function (req, res, next) {
        console.log('req.user', req.user);
        next();
    };
    MiddlewareController.SetNextJSHandle = function (handle) {
        MiddlewareController.handle = handle;
    };
    MiddlewareController.UseNextJSHandle = function (req, res) {
        MiddlewareController.handle(req, res);
    };
    return MiddlewareController;
}());
exports["default"] = MiddlewareController;
//# sourceMappingURL=MiddlewareController.js.map