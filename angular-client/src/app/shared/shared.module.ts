import {ModuleWithProviders, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {ApolloModule} from 'apollo-angular';
import {EmojifyModule} from 'angular2-emojify';
import {InfiniteScrollModule} from 'angular2-infinite-scroll';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        ApolloModule,
        EmojifyModule,
        InfiniteScrollModule
    ],
    declarations: [],
    exports: [BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        ApolloModule,
        EmojifyModule,
        InfiniteScrollModule],
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
