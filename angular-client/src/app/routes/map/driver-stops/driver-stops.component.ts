import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Apollo} from 'apollo-angular';

import 'rxjs/add/operator/toPromise';
import {getDriverStops} from "../map.model";
import {IStop} from "../../../../../../ts-server/typings";

@Component({
    selector: 'driver-stops-component',
    templateUrl: 'driver-stops.component.html',
    styleUrls: ['driver-stops.component.less']
})
export class DriverStopsComponent {
    driverId: string;
    lat: number = 51.678418;
    lng: number = 7.809007;
    stops: Array<IStop>;

    constructor(private route: ActivatedRoute,
                private apollo: Apollo) {
    }

    public ngOnInit(): void {
        navigator.geolocation.getCurrentPosition((pos) => {
            this.lat = pos.coords.latitude;
            this.lng = pos.coords.longitude;
        })

    }

    private getDriverStops(driverId: string) {
        this.apollo.watchQuery({
            query: getDriverStops,
            variables: {
                driverId: this.driverId
            }
        }).subscribe(({data}) => {
            this.stops = data['driverStops'];
        });
    }
}
