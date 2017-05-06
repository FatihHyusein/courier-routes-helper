import {DocumentNode} from 'graphql';

import gql from 'graphql-tag';

export const usersQuery: DocumentNode = gql`
    query users {
        users {
            id,
            username,
            tokens
        }
    }
`;
