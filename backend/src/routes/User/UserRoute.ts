import * as express from 'express';
import UserController from '../../controllers/UserController';
const passport = require('../../config/passport');

const CheckIfSessionActive = (req: any, res: any, next: any) => {
  if (req.user) return next();
  return res.status(401).send({msg: 'User session is not active'}); 
};

const LogRequestUser = (req: any, res: any) => console.log('req.user', req.user);

export const UserRoute = express.Router();

UserRoute.use(LogRequestUser);

UserRoute.get('/', CheckIfSessionActive, UserController.checkUser);

UserRoute.post('/login', passport.authenticate('local'), CheckIfSessionActive, UserController.Login);
UserRoute.post('/signup', UserController.SignupMiddleware, passport.authenticate('local'), CheckIfSessionActive, UserController.Signup);
UserRoute.post('/logout', CheckIfSessionActive, UserController.Logout);