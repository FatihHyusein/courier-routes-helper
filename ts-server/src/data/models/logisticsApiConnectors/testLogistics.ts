import Axios, {AxiosResponse} from 'axios';

import { IStop, ILogisticApiResponse } from "../../../../typings";

export default class TestLogistics {
    private baseUrl = "http://localhost:3010/test.json";

    public getDriverStopsFromApi({ driverId: string }): Promise<ILogisticApiResponse> {
        return new Promise((resolve, reject) => {
            Axios.get(this.baseUrl).then((response:AxiosResponse) => {
                resolve(response.data);
            }).catch(err => {
                reject(err);
            });
        });
    }
}

