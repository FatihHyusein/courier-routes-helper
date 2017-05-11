// Typings reference file, see links for more information
// https://github.com/typings/typings
// https://www.typescriptlang.org/docs/handbook/writing-declaration-files.html

export interface IUser {
    id?: number,
    username: string,
    password?: string,
    tokens?: [string]
}

export interface IStop {
    address: string
}

export interface IContext {
    currentUser: IUser
}

export interface ILogisticApiResponse {
    driverId: string,
    key: string,
    stops: Array<IStop>
}