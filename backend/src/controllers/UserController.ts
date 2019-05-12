import {User} from '../models/User';
import * as Encryptor from '../helper/Encryptor';

export default class UserController {

    public static checkUser(req: any, res: any) {
        console.log('req.session', req.session);
        console.log('req.user', req.user);
        if (req.user) {
            const user = Object.assign({}, req.user._doc);
            delete user.password;
            delete user._id;
            console.log('assign user', user);
            res.send({ user });
        } else {
            res.status(401).send({ user: false });
        }
    }

    public static Login(req: any, res: any) {
        console.log('req.body', req.body);
        console.log('req.user', req.user);
        if (req.user) {
            const user = Object.assign({}, req.user._doc);
            delete user.password;
            delete user._id;
            console.log('assign user', user);
            res.send({ user });
        } else {
            res.sendStatus(401).send({user: false});
        }
    }

    public static Signup(req: any, res: any) {
        console.log('req.body', req.body);
        console.log('req.user', req.user);
        if (req.user) {
            const user = Object.assign({}, req.user._doc);
            delete user.password;
            delete user._id;
            res.send({ user });
        } else {
            res.sendStatus(401).send({user: false});
        }
    }

    public static SignupMiddleware(req: any, res: any, next: any) {
        const { username, email, password } = req.body;
        return User.findOne({ username })
            .then(user => {
                if (!user) {
                    const newUser = new User({ username, email, password: Encryptor.encryptString(password) });
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
        if (req.user) {
            req.session.destroy(null);
            res.clearCookie('connect.sid');
            console.log('logout user', req.user);
            return res.json({ msg: 'logged user out' });
        }
        return res.json({ msg: 'no user to log out' });
        // req.logout();
        // res.send('Logged out!');
    }
}