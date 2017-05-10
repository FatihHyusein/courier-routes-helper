import * as request from 'request';

import { IStop, IUser } from "../../../typings";
import { dataStoreConnections } from "./index";


const stops: [IStop] = [
    { address: "Sofia" },
    { address: "Varna" },
    { address: "Bourgas" },
];


export default class Stops {

    getDriverStops(loggedUser: IUser, driverId: string): Promise<[IStop]> {
        request({
            url: dataStoreConnections.gmaps.geocodeBaseUrl, qs: {
                address: stops[0].address,
                key: dataStoreConnections.gmaps.apikey
            }
        }, (err, res, body) => {
            if (err) {
                return;
            }

            let parsedBody;
            try {
                parsedBody = JSON.parse(body);
            }
            catch (e) {
                parsedBody = { results: 'Could not parse body' }
            }

            dataStoreConnections.mongoDbRef.collection('driver-routes').insertOne({
                driverId: driverId,
                stops: parsedBody.results
            }, (err, result) => {
                if (err) {

                }
            });
        });


        return Promise.resolve(stops);
    }
}

