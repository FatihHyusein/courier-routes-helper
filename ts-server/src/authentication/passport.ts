import * as passport from 'passport';
import {bearerStrategy} from './bearerStrategy';

export default (app) => {
    passport.use(bearerStrategy);
}


