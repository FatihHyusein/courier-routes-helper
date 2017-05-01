import {property, constant} from 'lodash';

// import schema from './sql.graphqls';

const schema = [`{
    type User {
      id: Int!
      username: string
      password: string,
      tokens: {
        token
      }
    }
}`];

const resolvers = {
    User: {
        id: property('id'),
        username: property('username'),
        password: property('password'),
        tokens(id) {
            return context.Users.getTokens(id);
        },
    }
};

export  {
    schema,
    resolvers
}
