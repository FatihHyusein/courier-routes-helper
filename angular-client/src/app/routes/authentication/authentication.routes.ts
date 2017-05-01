import {Route}  from '@angular/router';
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";

export const routes: Route[] = [
    <Route>{ path: 'register', component: RegisterComponent },
    < Route        > { path: 'login', component: LoginComponent }
];