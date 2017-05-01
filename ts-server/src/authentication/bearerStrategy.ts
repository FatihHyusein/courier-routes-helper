import  {IStrategyOptions, Strategy} from 'passport-http-bearer';
import {usersModel} from '../data/models';
import {IUser} from "../../typings";

const bearerStrategy = new Strategy((token: string, cb) => {
    usersModel.findByToken(token).then((user: IUser) => {
        return cb(null, user);
    }).catch((err) => {
        return cb(err, null);
    })
});

export  {
    bearerStrategy
}