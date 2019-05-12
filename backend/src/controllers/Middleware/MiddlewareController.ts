import { User } from '../../models/User';
import * as Encryptor from '../../helper/Encryptor';

export default class MiddlewareController {

  public static CheckIfSessionActive(req: any, res: any, next: any) {
    if (req.user) return next();
    return res.status(401).send({ msg: 'User session is not active' });
  }

  public static LogRequestUser(req: any, res: any, next: any) {
    console.log('req.user', req.user);
    next();
  }
}
