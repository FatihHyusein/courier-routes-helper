import {ILogisticApiResponse, IStop, IUser} from "../../../typings";
import {dataStoreConnections} from "./index";


export default class Stops {
    getDriverStops(loggedUser: IUser, driverId: string): Promise<[IStop]> {
        return new Promise((resolve, reject) => {
            dataStoreConnections.logistics.testLogistics.getDriverStopsFromApi({key: 'wtf'}).then((response: ILogisticApiResponse) => {
                this.getGeocodes(response.stops).then(stopsWithGeoCodes => {
                    console.log(stopsWithGeoCodes);
                    resolve(stopsWithGeoCodes);

                    dataStoreConnections.mongoDbRef.collection('driver-routes').insertOne({
                        driverId: driverId,
                        stops: stopsWithGeoCodes.json.results
                    }, (err, result) => {
                        if (err) {

                        }
                    });
                }).catch((err) => {
                    reject(err);
                });
            }).catch((err) => {
                reject(err);
            });
        })
    }

    private getGeocodes(stops: IStop[]): Promise<any> {
        let geoCodePromises = stops.map(stop => {
            return new Promise((resolve, reject) => {
                dataStoreConnections.googleMapsClient.geocode({
                    address: stop.address
                }, function (err, response) {
                    if (err) {
                        reject(err);
                        return;
                    }

                    resolve(response.json.results);
                });
            });
        });

        return Promise.all(geoCodePromises);
    }
}

