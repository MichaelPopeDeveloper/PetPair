import { User } from '../../models/User';
import * as Encryptor from '../../helper/Encryptor';

export default class UserController {

  public static checkUser(req: any, res: any) {
    const user = Object.assign({}, req.user._doc);
    delete user.password;
    delete user._id;
    console.log('assign user', user);
    res.send({ user });
  }

  public static Login(req: any, res: any) {
    const user = Object.assign({}, req.user._doc);
    delete user.password;
    delete user._id;
    console.log('assign user', user);
    res.send({ user });
  }

  public static Signup(req: any, res: any) {
    const user = Object.assign({}, req.user._doc);
    delete user.password;
    delete user._id;
    console.log('assign user', user);
    res.send({ user });
  }

  public static SignupMiddleware(req: any, res: any, next: any) {
    const { username, password } = req.body;
    return User.findOne({ username })
      .then(user => {
        if (!user) {
          const newUser = new User({ username, password: Encryptor.encryptString(password) });
          return newUser.save()
            .then(() => next())
            .catch(err => console.log(err));
        }
        console.log('username already exists');
        return res.send({ error: 'Username already exists' });

      })
      .catch(error => res.send(error));
  }

  public static Logout(req: any, res: any) {
    req.session.destroy(null);
    res.clearCookie('connect.sid');
    console.log('logout user', req.user);
    return res.json({ msg: 'logged user out' });
    // req.logout();
  }
}