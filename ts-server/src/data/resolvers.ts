import {IResolverObject, IResolvers} from "graphql-tools/dist/Interfaces";
import {IContext, IUser} from "../../typings";
import {usersModel} from './models';

export let resolvers: IResolvers = {
    Query: {
        myProfile(obj, args: { id: number }, context: IContext) {
            return usersModel.findById(args.id);
        },
        users() {
            return usersModel.getList();
        },
    },
    Mutation: {
        addUser(obj, args: IUser, context) {
            return usersModel.add(args);
        },
    },
};
