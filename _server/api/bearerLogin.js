import session from 'express-session';
import passport from 'passport';
import {Strategy as BearerStrategy} from 'passport-http-bearer';
import knex from './sql/connector';

const KnexSessionStore = require('connect-session-knex')(session);

const store = new KnexSessionStore({
    knex,
});

export function setUpBearerLogin(app) {
    passport.use(new BearerStrategy(
        function (token, done) {
            User.findOne({token: token}, function (err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false);
                }
                return done(null, user, {scope: 'all'});
            });
        }
    ));
}
