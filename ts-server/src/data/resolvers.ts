import {IResolverObject, IResolvers} from "graphql-tools/dist/Interfaces";
import {IContext, IUser} from "../../typings";
import {stopsModel, usersModel} from './models';

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

        driverStops(obj, {driverId}, context: IContext) {
            if (context.currentUser && context.currentUser.id) {
                return stopsModel.getDriverStops(context.currentUser, driverId);
            }
            return [];
        },
    },
    Mutation: {
        addUser(obj, args: IUser, context: IContext) {
            return usersModel.add(args);
        },

        login(obj, args: IUser, context: IContext) {
            return usersModel.login(args);
        },
        logout(obj, {token}, context: IContext) {
            return usersModel.logout(context.currentUser, token);
        }
    },
};
