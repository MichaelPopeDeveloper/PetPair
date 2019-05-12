import * as express from 'express';
import UserController from '../../controllers/User/UserController';
import MiddlewareController from '../../controllers/Middleware/MiddlewareController';

const passport = require('../../config/passport');

export const UserRoute = express.Router();

UserRoute.use(MiddlewareController.LogRequestUser);

UserRoute.get('/', MiddlewareController.CheckIfSessionActive, UserController.checkUser);

UserRoute.post('/login', passport.authenticate('local'), MiddlewareController.CheckIfSessionActive, UserController.Login);
UserRoute.post('/signup', UserController.SignupMiddleware, passport.authenticate('local'), MiddlewareController.CheckIfSessionActive, UserController.Signup);
UserRoute.post('/logout', MiddlewareController.CheckIfSessionActive, UserController.Logout);