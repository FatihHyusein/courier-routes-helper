import {Route}  from '@angular/router';
import {DriverStopsComponent} from "./driver-stops/driver-stops.component";

export const routes: Route[] = [
    <Route>{path: 'driver-stops', component: DriverStopsComponent}
];