import {ModuleWithProviders, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {ApolloModule} from 'apollo-angular';
import {InfiniteScrollModule} from 'angular2-infinite-scroll';


import {
    MdButtonModule,
    MdCheckboxModule,
    MdCardModule,
    MdInputModule,
    MdGridListModule,
    MdToolbarModule, MdMenuModule, MdIconModule
} from '@angular/material';
const materialDesignModules = [MdButtonModule, MdCheckboxModule, MdCardModule, MdInputModule, MdGridListModule, MdToolbarModule, MdMenuModule, MdIconModule];


import {AppSessionService} from "./services/app-session.service";


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        ApolloModule,
        InfiniteScrollModule,
        ...materialDesignModules
    ],
    declarations: [],
    exports: [BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        ApolloModule,
        InfiniteScrollModule,
        ...materialDesignModules
    ],
    providers: [],
    schemas: []
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [AppSessionService]
        };
    }
}
