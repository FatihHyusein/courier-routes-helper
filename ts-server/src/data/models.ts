///<reference path="../../typings.d.ts"/>
import {sqlDbConnection} from './connections';
import {IUser} from "../../typings";


const users: [IUser] = [
    {id: 1, username: 'Tom', password: 'Coleman'},
    {id: 2, username: 'Sashko', password: 'Stubailo'},
    {id: 3, username: '1', password: '1'},
];


class Users {
    findByToken(token: string): Promise<IUser> {
        return Promise.resolve(users.find((u) => {
            return u.tokens && u.tokens.find(t => {
                    return t === token
                }) === token
        }));
    }

    findById(id: number): Promise<IUser> {
        return Promise.resolve(users[id]);
    }

    getList(): Promise<[IUser]> {
        return Promise.resolve(users);
    }

    add(newUser: IUser): Promise<IUser> {
        newUser = Object.assign({id: users.length}, newUser);
        users.push(newUser);

        return Promise.resolve(newUser);
    }

    login(user: IUser): Promise<IUser> {
        let currentUser = users.find((u: IUser) => {
            return u.password === user.password && u.username === user.username
        });
        if (!currentUser) {
            throw new Error('Invalid Credentials');
        }

        if (!currentUser.tokens) {
            currentUser.tokens = <[string]>[];
        }

        currentUser.tokens.push(currentUser.username + currentUser.password);
        return Promise.resolve(currentUser);
    }
}


let usersModel = new Users();

export  {
    usersModel
}