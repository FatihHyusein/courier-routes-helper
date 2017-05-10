import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { authenticate } from 'passport';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import { printSchema } from "graphql";

import initPassportAuthentication from './authentication/passport';
import schema from './data/schema';
import { initDataStoreConnections } from "./data/models";

const PORT = 3010;
const app = express();

initPassportAuthentication(app);

app.use('*', cors());

app.use('/graphql', bodyParser.json(), authenticate('bearer', { session: false }),
    graphqlExpress((req) => {
        return {
            schema: schema,
            context: {
                currentUser: req.user
            }
        };
    }));

app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql',
}));


app.use('/schema', (req, res) => {
    res.set('Content-Type', 'text/plain');
    res.send(printSchema(schema));
});

initDataStoreConnections(app).then(() => {
    app.listen(PORT, () => {
        console.log(`started at port ${PORT}`)
    });
});