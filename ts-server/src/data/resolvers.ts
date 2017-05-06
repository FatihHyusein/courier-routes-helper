import {IResolverObject, IResolvers} from "graphql-tools/dist/Interfaces";
import {IContext, IUser} from "../../typings";
import {usersModel} from './models';

export let resolvers: IResolvers = {
    Query: {
        myProfile(obj, args: { id: number }, context: IContext) {
            return usersModel.findById(args.id);
        },
        users(obj, args, context: IContext) {
            if (context.currentUser && context.currentUser.id) {
                return usersModel.getList();
            }
            return [];
        },
    },
    Mutation: {
        addUser(obj, args: IUser, context) {
            return usersModel.add(args);
        },

        login(obj, args: IUser, context) {
            return usersModel.login(args);
        },
    },
};
