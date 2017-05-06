import {DocumentNode} from 'graphql';

import gql from 'graphql-tag';

export const registerMutation: DocumentNode = gql`
    mutation register($username: String!, $password: String!) {
        addUser(username: $username, password: $password) {
            id,
            username
        }
    }
`;

export const loginMutation: DocumentNode = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            id,
            username,
            tokens
        }
    }
`;
