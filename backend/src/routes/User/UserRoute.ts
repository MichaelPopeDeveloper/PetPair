import * as express from 'express';
import * as next from 'next';
import UserController from '../../controllers/User/UserController';
import MiddlewareController from '../../controllers/Middleware/MiddlewareController';
import PetFinderController from '../../controllers/API/PetFinder/PetFinderController';

const passport = require('../../config/passport');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

// Config Controllers to have handle
MiddlewareController.SetNextJSHandle(handle);

export const UserRoute = express.Router();
nextApp.prepare()
  .then(() => {

    UserRoute.use(MiddlewareController.LogRequestUser);


    UserRoute.get('/login', MiddlewareController.UseNextJSHandle);
    UserRoute.get('/signup', MiddlewareController.UseNextJSHandle);

    UserRoute.get('*', MiddlewareController.CheckIfSessionActive, MiddlewareController.UseNextJSHandle);

    // UserRoute.get('*', (req, res) => {
    //   return handle(req, res);
    // });

    UserRoute.post('/login', passport.authenticate('local'), MiddlewareController.CheckIfSessionActive, UserController.Login);
    UserRoute.post('/signup', UserController.SignupMiddleware, passport.authenticate('local'), MiddlewareController.CheckIfSessionActive, UserController.Signup);
    UserRoute.post('/logout', MiddlewareController.CheckIfSessionActive, UserController.Logout);
    UserRoute.post('/petfinder', PetFinderController.GetToken);
  })
  .catch(error => console.log(error));