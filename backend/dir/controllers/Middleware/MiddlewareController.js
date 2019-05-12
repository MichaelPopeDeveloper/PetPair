"use strict";
exports.__esModule = true;
var MiddlewareController = (function () {
    function MiddlewareController() {
    }
    MiddlewareController.CheckIfSessionActive = function (req, res, next) {
        if (req.user)
            return next();
        return res.status(401).send({ msg: 'User session is not active' });
    };
    MiddlewareController.LogRequestUser = function (req, res, next) {
        console.log('req.user', req.user);
        next();
    };
    return MiddlewareController;
}());
exports["default"] = MiddlewareController;
//# sourceMappingURL=MiddlewareController.js.map