import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Apollo} from 'apollo-angular';

import 'rxjs/add/operator/toPromise';

import {loginMutation} from '../authentication.model';
import {AppSessionService} from "../../../shared/services/app-session.service";

interface iLoginFormObject {
    username: string,
    password: string
}

@Component({
    selector: 'login-component',
    templateUrl: 'login.component.html'
})
export class LoginComponent {
    private registerFormObject: iLoginFormObject = {username: '', password: ''};
    private errors;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private apollo: Apollo,
                private appSessionService: AppSessionService) {
    }

    public ngOnInit(): void {
    }

    public submitForm(): void {
        if (!this.registerFormObject.username || !this.registerFormObject.password) {
            this.errors = [{message: 'All Fields are required'}];
            return;
        }

        this.apollo.mutate({
            mutation: loginMutation,
            variables: {
                username: this.registerFormObject.username,
                password: this.registerFormObject.password,
            },
        }).subscribe(({data}) => {
            if (data['login'].tokens) {
                this.appSessionService.init({user: data['login']});
            }

            this.registerFormObject = {username: '', password: ''};
            this.errors = [];

            this.router.navigate(['/']);
        }, (error) => {
            this.errors = error.graphQLErrors;
        });
    }

    public ngOnDestroy(): void {
    }
}
