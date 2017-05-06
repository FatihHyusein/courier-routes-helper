import {Injectable} from '@angular/core';
import {IUser} from "../../../../../ts-server/typings";

@Injectable()
export class AppSessionService {
    private _user: IUser;

    constructor() {
        if (localStorage.user) {
            this._user = JSON.parse(localStorage.user);
        }
    }

    public get user(): IUser {
        return this._user;
    }

    public init(sessionInfo): boolean {
        this._user = sessionInfo.user;

        localStorage.user = JSON.stringify(this._user);
        localStorage.token = sessionInfo.user.tokens[0];
        return true;
    }

    public clear(): boolean {
        this._user = null;
        localStorage.token = null;
        localStorage.user = null;

        return true;
    }


}