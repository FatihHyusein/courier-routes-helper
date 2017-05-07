import {DocumentNode} from 'graphql';

import gql from 'graphql-tag';

export const getDriverStops: DocumentNode = gql`
    query driverStops($driverId: String) {
        driverStops(driverId: $driverId) {
           address
        }
    }
`;

