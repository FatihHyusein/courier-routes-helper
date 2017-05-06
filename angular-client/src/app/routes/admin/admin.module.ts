import {NgModule} from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import {RouterModule} from "@angular/router";

import {routes} from "./admin.routes";
import {AdminComponent} from './admin.component';
import {UsersComponent} from "./users/users.component";

@NgModule({
    imports: [SharedModule, RouterModule.forChild(routes)],
    declarations: [
        AdminComponent, UsersComponent
    ],
    entryComponents: [
        AdminComponent,
    ],
    bootstrap: [AdminComponent],
})
export class AdminModule {
}
