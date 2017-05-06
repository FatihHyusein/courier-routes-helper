import {Component} from '@angular/core';
import {AppSessionService} from "./shared/services/app-session.service";
import {Apollo} from "apollo-angular";
import {DocumentNode} from "graphql";
import gql from "graphql-tag";
import {Router} from "@angular/router";

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.less']
})
export class AppComponent {
    constructor(private appSessionService: AppSessionService, private apollo: Apollo, private router: Router) {
    }

    private logout() {
        this.apollo.mutate({
            mutation: logoutMutation,
            variables: {
                token: localStorage.token,
            },
        }).subscribe(({data}) => {
            this.appSessionService.clear();

            this.router.navigate(['/login']);
        }, (error) => {

        });

    }
}



const logoutMutation: DocumentNode = gql`
    mutation logout($token: String!) {
        logout(token: $token)
    }
`;