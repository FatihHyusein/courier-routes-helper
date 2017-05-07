import {NgModule} from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import {RouterModule} from "@angular/router";
import {AgmCoreModule} from 'angular2-google-maps/core';

import {routes} from "./map.routes";
import {MapComponent} from './map.component';
import {DriverStopsComponent} from "./driver-stops/driver-stops.component";


@NgModule({
    imports: [SharedModule, RouterModule.forChild(routes),
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyCBm1oErlZqO9UJFqedvw5jr1nQpiKJdV4'
        })],
    declarations: [
        MapComponent, DriverStopsComponent
    ],
    entryComponents: [
        MapComponent,
    ],
    bootstrap: [MapComponent],
})
export class MapModule {
}
