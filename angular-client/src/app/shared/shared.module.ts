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
    MdToolbarModule
} from '@angular/material';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        ApolloModule,
        InfiniteScrollModule,
        MdButtonModule, MdCheckboxModule, MdCardModule, MdInputModule, MdGridListModule, MdToolbarModule
    ],
    declarations: [],
    exports: [BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        ApolloModule,
        InfiniteScrollModule,
        MdButtonModule, MdCheckboxModule, MdCardModule, MdInputModule, MdGridListModule, MdToolbarModule
    ],
    providers: [],
    schemas: []
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: []
        };
    }
}
