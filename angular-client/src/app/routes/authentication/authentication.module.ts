import {NgModule} from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import {RouterModule} from "@angular/router";

import {routes} from "./authentication.routes";
import {AuthenticationComponent} from './authentication.component';
import {RegisterComponent} from "./register/register.component";

@NgModule({
    imports: [SharedModule, RouterModule.forChild(routes)],
    declarations: [
        AuthenticationComponent, RegisterComponent
    ],
    entryComponents: [
        AuthenticationComponent,
    ],
    bootstrap: [AuthenticationComponent],
})
export class AuthenticationModule {
}
