import ApolloClient, {createBatchingNetworkInterface} from 'apollo-client';
import {addGraphQLSubscriptions, SubscriptionClient} from "subscriptions-transport-ws/dist";

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
    applyBatchMiddleware(req, next) {
        if (!req.options.headers) {
            req.options.headers = {};  // Create the header object if needed.
        }
        // get the authentication token from local storage if it exists
        req.options.headers.authorization = `bearer ${localStorage['token'] || null}`;
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
