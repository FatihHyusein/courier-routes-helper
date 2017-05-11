import * as request from 'request';

import {IStop, ILogisticApiResponse} from "../../../../typings";

export default class TestLogistics {
    private baseUrl = "http://localhost:3010/test.json";

    public getDriverStopsFromApi({key: string}): Promise<ILogisticApiResponse> {
        return new Promise((resolve, reject) => {
            request.get(this.baseUrl, (err: any, response: request.RequestResponse, body: any) => {
                if (err) {
                    reject(err);
                }

                let parsedBody;
                try {
                    parsedBody = JSON.parse(body);
                }
                catch (e) {
                    reject(e);
                }

                resolve(parsedBody);
            })
        });
    }
}

