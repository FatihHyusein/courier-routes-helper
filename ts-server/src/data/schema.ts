import {makeExecutableSchema} from 'graphql-tools';
import {ITypeDefinitions} from 'graphql-tools/dist/Interfaces';
import {resolvers} from './resolvers';

const schema: ITypeDefinitions = [`
    type User {
      id: Int!
      username: String!
    }
    
    type Query {
      myProfile(id: Int!): User
      users: [User]
    }
    
    type Mutation {
      addUser(username: String!, password: String!): User
    }
   
`];

export default makeExecutableSchema({
    typeDefs: schema,
    resolvers,
});