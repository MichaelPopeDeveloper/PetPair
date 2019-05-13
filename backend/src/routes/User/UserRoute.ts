import * as express from 'express';
import * as next from 'next';
import UserController from '../../controllers/User/UserController';
import MiddlewareController from '../../controllers/Middleware/MiddlewareController';
import PetFinderController from '../../controllers/API/PetFinder/PetFinderController';

const passport = require('../../config/passport');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

export const UserRoute = express.Router();
nextApp.prepare()
  .then(() => {

    UserRoute.get('*', (req, res) => {
      return handle(req, res);
    });

    // UserRoute.get('/testpage/:id', (req: any, res: any) => {
    //   const actualPage = '/test';
    //   return nextApp.render(req, res, actualPage, req.params);
    // })

    UserRoute.use(MiddlewareController.LogRequestUser);

    UserRoute.get('/', MiddlewareController.CheckIfSessionActive, UserController.checkUser);

    UserRoute.post('/login', passport.authenticate('local'), MiddlewareController.CheckIfSessionActive, UserController.Login);
    UserRoute.post('/signup', UserController.SignupMiddleware, passport.authenticate('local'), MiddlewareController.CheckIfSessionActive, UserController.Signup);
    UserRoute.post('/logout', MiddlewareController.CheckIfSessionActive, UserController.Logout);
    UserRoute.post('/petfinder', PetFinderController.GetToken);
  })
  .catch(error => console.log(error));