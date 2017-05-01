import {DocumentNode} from 'graphql';

import gql from 'graphql-tag';

export const registerMutation: DocumentNode = gql`
    mutation register($username: String!, $password: String!) {
        register(username: $username, password: $password) {
            username,
            password
        }
    }
`;
