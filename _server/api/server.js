import path from 'path';
import express from 'express';
import cors from 'cors';
import {graphqlExpress, graphiqlExpress} from 'graphql-server-express';
import bodyParser from 'body-parser';
import {isString} from 'lodash';
import {createServer} from 'http';
import {SubscriptionServer} from 'subscriptions-transport-ws';

import {setUpBearerLogin} from './bearerLogin';

import {Entries, Comments, Users} from './sql/models';
import {subscriptionManager} from './subscriptions';

import schema from './schema';

const SUBSCRIPTIONS_PATH = '/subscriptions';

// Arguments usually come from env vars
export function run({PORT: portFromEnv = 3010} = {}) {

    let port = portFromEnv;
    if (isString(portFromEnv)) {
        port = parseInt(portFromEnv, 10);
    }

    const subscriptionsURL = process.env.NODE_ENV !== 'production'
        ? `ws://localhost:${port}${SUBSCRIPTIONS_PATH}`
        : `ws://api.githunt.com${SUBSCRIPTIONS_PATH}`;

    const app = express();

    app.use(cors());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    setUpBearerLogin(app);

    app.use('/graphql', graphqlExpress((req) => {
        // Get the query, the same way express-graphql does it
        // https://github.com/graphql/express-graphql/blob/3fa6e68582d6d933d37fa9e841da5d2aa39261cd/src/index.js#L257
        const query = req.query.query || req.body.query;
        if (query && query.length > 2000) {
            // None of our app's queries are this long
            // Probably indicates someone trying to send an overly expensive query
            throw new Error('Query too large.');
        }

        let user;
        if (req.user) {
            // We get req.user from passport-github with some pretty oddly named fields,
            // let's convert that to the fields in our schema, which match the GitHub
            // API field names.
            user = {
                login: req.user.username,
                html_url: req.user.profileUrl,
                avatar_url: req.user.photos[0].value,
            };
        }


        return {
            schema,
            context: {
                user,
                Users: new Users(),
                Entries: new Entries(),
                Comments: new Comments(),
            },
        };
    }));

    app.use('/graphiql', graphiqlExpress({
        endpointURL: '/graphql',
        subscriptionsEndpoint: subscriptionsURL,
        query: `{
            feed (type: NEW, limit: 5) {
              repository {
                owner { login }
                name
              }
        
              postedBy { login }
            }
          }
    `,
    }));

    // Serve our helpful static landing page. Not used in production.
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'index.html'));
    });

    const server = createServer(app);

    server.listen(port, () => {
        console.log(`API Server is now running on http://localhost:${port}`); // eslint-disable-line no-console
        console.log(`API Subscriptions server is now running on ws://localhost:${port}${SUBSCRIPTIONS_PATH}`); // eslint-disable-line no-console
    });

    new SubscriptionServer(
        {
            subscriptionManager,

            // the onSubscribe function is called for every new subscription
            // and we use it to set the GraphQL context for this subscription
            onSubscribe: (msg, params) => {
                return Object.assign({}, params, {
                    context: {
                        Users: new Users(),
                        Entries: new Entries(),
                        Comments: new Comments(),
                    },
                });
            },
        },
        {
            path: SUBSCRIPTIONS_PATH,
            server,
        },
    );

    return server;
}
