import {makeExecutableSchema} from 'graphql-tools';
import {ITypeDefinitions} from 'graphql-tools/dist/Interfaces';
import {resolvers} from './resolvers';

const schema: ITypeDefinitions = [`
    type User {
      id: Int!
      username: String!
      tokens: [String]
    }
    
     type Stop {
      address: String
    }
    
    type Query {
      myProfile(id: Int!): User
      users: [User]
      driverStops(driverId: String):[Stop]
    }
    
    type Mutation {
      addUser(username: String!, password: String!): User
      login(username: String!, password: String!): User
      logout(token: String!): Boolean
    }
   
`];

export default makeExecutableSchema({
    typeDefs: schema,
    resolvers,
});