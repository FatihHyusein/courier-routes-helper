import {Route}  from '@angular/router';
import {UsersComponent} from "./users/users.component";

export const routes: Route[] = [
    <Route>{ path: 'users', component: UsersComponent }
];