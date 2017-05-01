import ApolloClient, {createBatchingNetworkInterface} from 'apollo-client';
import {SubscriptionClient, addGraphQLSubscriptions} from 'subscriptions-transport-ws/dist/client';

// Polyfill fetch
import 'whatwg-fetch';

interface Result {
    id?: string;
    __typename?: string;
}

const wsClient = new SubscriptionClient('ws://localhost:3010/subscriptions', {
    reconnect: true,
});

const networkInterface = createBatchingNetworkInterface({
    uri: 'http://localhost:3010/graphql',
    batchInterval: 10
});

networkInterface.use([{
    applyMiddleware(req, next) {
        if (!req.options.headers) {
            req.options.headers = {};  // Create the header object if needed.
        }
        // get the authentication token from local storage if it exists
        req.options.headers.authorization = localStorage.getItem('token') || null;
        next();
    }
}]);

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
    networkInterface,
    wsClient,
);

const client = new ApolloClient({
    networkInterface: networkInterfaceWithSubscriptions,
});

export function provideClient(): ApolloClient {
    return client;
}