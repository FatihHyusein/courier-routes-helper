import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ApolloModule} from 'apollo-angular';

import {AppComponent} from './app.component';

import {routes} from './routes';
import {provideClient} from './client';

import {SharedModule} from "./shared/shared.module";
import {AuthenticationModule} from "./routes/authentication/authentication.module";

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
        ApolloModule.forRoot(provideClient),
        SharedModule.forRoot(),
        AuthenticationModule,
        BrowserAnimationsModule
    ],
    declarations: [
        AppComponent
    ],
    entryComponents: [
        AppComponent
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
