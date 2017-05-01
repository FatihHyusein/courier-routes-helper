import {sqlDbConnection} from './connections';
import {IUser} from "../../typings";


const users: [IUser] = [
    { id: 1, username: 'Tom', password: 'Coleman' },
    { id: 2, username: 'Sashko', password: 'Stubailo' },
];


class Users {
    findByToken(token: string): Promise<IUser> {
        let tempUser: IUser = {
            id: 3,
            username: 'logged',
            tokens: [token]
        };

        return Promise.resolve(tempUser)
    }

    findById(id: number): Promise<IUser> {
        return Promise.resolve(users[id]);
    }

    getList(): Promise<[IUser]> {
        return Promise.resolve(users);
    }

    add(newUser: IUser): Promise<[IUser]> {
        newUser = Object.assign({ id: users.length }, newUser);
        users.push(newUser);

        return Promise.resolve(users);
    }
}


let usersModel = new Users();

export  {
    usersModel
}